'use client';

import { useState, useEffect } from 'react';

interface CollectorAvatarProps {
  avatarBg: string | null | undefined;
  username: string;
  sizeClass?: string;
  textSizeClass?: string;
  shapeClass?: string;
  borderClass?: string;
  fallbackBgClass?: string;
}

export function extractGoogleDriveFileId(value: string): string | null {
  try {
    const parsed = new URL(value);
    if (
      parsed.hostname === 'drive.google.com' ||
      parsed.hostname === 'docs.google.com'
    ) {
      // Format: /file/d/FILE_ID/view
      const fileMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/);
      if (fileMatch && fileMatch[1]) return fileMatch[1];

      // Format: /uc?export=view&id=FILE_ID atau /open?id=FILE_ID atau /thumbnail?id=FILE_ID
      const idParam = parsed.searchParams.get('id');
      if (idParam) return idParam;
    }
  } catch {
    // Abaikan jika bukan URL valid
  }
  return null;
}

export function resolveAvatarImageUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  // Path lokal di folder /public
  if (trimmed.startsWith('/')) return trimmed;

  // Jika link Google Drive, konversi ke endpoint CDN thumbnail agar bebas blokir ORB/CORS
  const driveFileId = extractGoogleDriveFileId(trimmed);
  if (driveFileId) {
    return `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w400`;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return trimmed;
    }
  } catch {
    // Jika class Tailwind ("from-indigo-500 to-purple-600"), kembalikan null
  }

  return null;
}

export default function CollectorAvatar({
  avatarBg,
  username,
  sizeClass = 'w-9 h-9',
  textSizeClass = 'text-sm',
  shapeClass = 'rounded-full',
  borderClass = '',
  fallbackBgClass,
}: CollectorAvatarProps) {
  const imageUrl = resolveAvatarImageUrl(avatarBg);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [imageUrl]);

  const cleanInitial = (username.replace(/^@/, '').trim().charAt(0) || 'I').toUpperCase();

  if (imageUrl && !imgFailed) {
    return (
      <img
        src={imageUrl}
        alt={`Avatar ${username}`}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className={`${sizeClass} ${shapeClass} ${borderClass} object-cover shrink-0 bg-elevated-hitam`}
      />
    );
  }

  const isTailwindGradient =
    avatarBg &&
    !avatarBg.startsWith('http') &&
    !avatarBg.startsWith('/') &&
    avatarBg.includes('from-');

  const resolvedBg =
    fallbackBgClass ||
    (isTailwindGradient
      ? `bg-gradient-to-br ${avatarBg} text-white`
      : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white');

  return (
    <div
      className={`${sizeClass} ${shapeClass} ${borderClass} ${resolvedBg} flex items-center justify-center font-black ${textSizeClass} shrink-0`}
    >
      {cleanInitial}
    </div>
  );
}