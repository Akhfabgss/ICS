import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Pemetaan label kategori agar lebih mudah dibaca di email
    const subjectLabels: Record<string, string> = {
      general: 'Pertanyaan General & Prosedur',
      bulk: 'Submisi Volume Besar (Bulk Order)',
      status: 'Status Pengerjaan Grading',
      verify: 'Kendala Verifikasi Sertifikat',
      partnership: 'Kemitraan & Dealer Program',
    };

    const formattedSubjectLabel = subjectLabels[subject] || subject.toUpperCase();

    // Kirim email dengan desain HTML murni (CSS Inline)
    const data = await resend.emails.send({
      from: 'ICS Contact Form <onboarding@resend.dev>',
      to: ['ics.official.registry@gmail.com'],
      subject: `[Pesan Kontak Baru] - ${formattedSubjectLabel} dari ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Notifikasi Pesan Kontak ICS</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f7; color: #111827; margin: 0; padding: 40px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              
              <!-- Header -->
              <tr>
                <td style="background-color: #12151C; padding: 30px; text-align: center; border-bottom: 3px solid #DC2626;">
                  <h1 style="color: #ffffff; font-size: 18px; margin: 0 0 5px 0; font-weight: bold;">ICS SET REGISTRY PORTAL</h1>
                  <p style="color: #9ca3af; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Notifikasi Pesan Kontak Baru</p>
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding: 30px;">
                  
                  <!-- Badge Kategori -->
                  <div style="display: inline-block; background-color: #fef2f2; color: #dc2626; font-size: 11px; font-weight: bold; padding: 6px 12px; border-radius: 6px; margin-bottom: 20px; text-transform: uppercase; border: 1px solid #fee2e2;">
                    Kategori: ${formattedSubjectLabel}
                  </div>
                  
                  <!-- Tabel Informasi Pengirim -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 8px 0; font-size: 13px; color: #6b7280; font-weight: bold; width: 130px;">Nama Pengirim:</td>
                      <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: bold;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 13px; color: #6b7280; font-weight: bold;">Alamat Email:</td>
                      <td style="padding: 8px 0; font-size: 13px; color: #dc2626; font-weight: bold;">
                        <a href="mailto:${email}" style="color: #dc2626; text-decoration: none;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-size: 13px; color: #6b7280; font-weight: bold;">No. WhatsApp/HP:</td>
                      <td style="padding: 8px 0; font-size: 13px; color: #111827; font-weight: bold;">
                        ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #111827; text-decoration: none;">${phone}</a>` : '-'}
                      </td>
                    </tr>
                  </table>

                  <!-- Kotak Pesan -->
                  <div style="background-color: #f3f4f6; border-left: 4px solid #dc2626; padding: 15px 20px; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
                    <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; color: #4b5563; font-weight: bold; letter-spacing: 0.5px;">Isi Pesan / Pertanyaan:</p>
                    <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>

                  <!-- Tombol Balas -->
                  <div style="text-align: center;">
                    <a href="mailto:${email}?subject=Re: Konfirmasi Pesan ICS Registry" style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: bold; padding: 12px 24px; border-radius: 6px; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">
                      Balas Pesan Ini
                    </a>
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7280;">
                  <p style="margin: 0;">Email otomatis ini dikirim dari Formulir Kontak <strong>Indonesia Collectibles Standard (ICS)</strong>.</p>
                  <p style="margin: 5px 0 0 0; color: #9ca3af;">© 2026 ICS Registry. Hak Cipta Dilindungi.</p>
                </td>
              </tr>

            </table>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}