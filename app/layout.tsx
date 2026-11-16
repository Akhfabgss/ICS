import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ICS — Indonesia Collectible Standard',
    template: '%s | ICS — Indonesia Collectible Standard',
  },
  description:
    'Standar baru pemeriksaan, penilaian kondisi (grading), dan rekam jejak digital aset koleksi di Indonesia.',
  icons: {
    icon: '/images/logo/ICS-Logo2.ico',
    shortcut: '/images/logo/ICS-Logo2.ico',
    apple: '/images/logo/ICS-Logo2.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Default: Mode Terang (Light). Jika user pernah memilih 'dark', aktifkan sebelum render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var savedTheme = localStorage.getItem('ics-theme');
                  if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-surface text-foreground-hitam antialiased min-h-screen flex flex-col justify-between transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}