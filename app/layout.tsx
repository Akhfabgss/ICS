import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
    <html lang="id">
      <body className="bg-[#0A0C10] text-white antialiased min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}