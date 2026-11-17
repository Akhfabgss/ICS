import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Readable } from 'stream';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const username = (formData.get('username') as string) || 'collector';

    if (!file) {
      return NextResponse.json({ error: 'File gambar tidak ditemukan' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File harus berupa gambar (JPG/PNG/WEBP)' }, { status: 400 });
    }

    if (file.size > 3 * 1024 * 1024) {
      return NextResponse.json({ error: 'Ukuran maksimal foto profil adalah 3MB' }, { status: 400 });
    }

    const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID?.trim();
    const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET?.trim();
    const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN?.trim();
    const folderId = process.env.GOOGLE_DRIVE_AVATAR_FOLDER_ID?.trim();

    if (!clientId || !clientSecret || !refreshToken || !folderId) {
      return NextResponse.json(
        { error: 'Konfigurasi OAuth Google Drive di server (.env.local) belum lengkap' },
        { status: 500 }
      );
    }

    // Menggunakan OAuth2 dengan Refresh Token akun Google Drive ICS
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'https://developers.google.com/oauthplayground'
    );
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const stream = Readable.from(buffer);

    const cleanUsername = username.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() || 'user';
    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `avatar_${cleanUsername}_${Date.now()}.${ext}`;

    // Upload langsung ke folder Google Drive ICS
    const uploadRes = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
      fields: 'id',
    });

    const fileId = uploadRes.data.id;
    if (!fileId) {
      return NextResponse.json({ error: 'Gagal mendapatkan ID file dari Google Drive' }, { status: 500 });
    }

    // Set akses file agar publik (Anyone with the link -> Viewer)
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const publicImageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

    return NextResponse.json({
      url: publicImageUrl,
      fileId,
    });
  } catch (err: unknown) {
    console.error('Google Drive OAuth upload error:', err);
    const message =
      err instanceof Error ? err.message : 'Terjadi kesalahan saat mengunggah foto ke Google Drive';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}