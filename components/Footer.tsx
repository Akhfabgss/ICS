'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const [email, setEmail] = useState('');
  const pathname = usePathname();

  // Sembunyikan Footer khusus untuk halaman under-construction atau login
  if (pathname === '/under-construction' || pathname === '/login') {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Terima kasih telah berlangganan dengan email: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0A0C10] text-gray-300 border-t border-white/10 pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP SECTION: LOGO, DESKRIPSI & NAVIGASI LINK */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">

          {/* LOGO & DESKRIPSI BRAND */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="bg-[#0A0C10] border border-white/10 px-4 py-2 rounded-md transition-all duration-300 group-hover:border-red-500/50">
                <img src="./images/logo/ICS-Logo.png" alt="Logo-ICS" className='w-12 h-12' />
              </div>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Standar Baru Dokumentasi & Nilai Koleksi di Indonesia. Platform verifikasi keaslian, enkapsulasi sonik presisi, dan ekosistem registry terpercaya untuk aset koleksi bernilai tinggi.
            </p>
          </div>

          {/* LINK GROUP 1: ECOSYSTEM */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">ECOSYSTEM</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/services" className="hover:text-red-500 transition-colors duration-200">
                  Services & Tiers
                </Link>
              </li>
              <li>
                <Link href="/under-construction" className="hover:text-red-500 transition-colors duration-200">
                  Set Registry
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-red-500 transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/grading-standards" className="hover:text-red-500 transition-colors duration-200">
                  Grading Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* LINK GROUP 2: LEGAL & TRUST */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">LEGAL & TRUST</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/terms" className="hover:text-red-500 transition-colors duration-200">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-red-500 transition-colors duration-200">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/verify-tech" className="hover:text-red-500 transition-colors duration-200">
                  Verifikasi Barcode & RFID
                </Link>
              </li>
            </ul>
          </div>

          {/* LINK GROUP 3: TENTANG */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">TENTANG</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-red-500 transition-colors duration-200">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-red-500 transition-colors duration-200">
                  Karir & Internship
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* HORIZONTAL DIVIDER */}
        <hr className="border-white/10 my-8" />

        {/* MIDDLE SECTION: NEWSLETTER, KONTAK, & ALAMAT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-4 items-start">

          {/* STAY UPDATED / NEWSLETTER */}
          <div className="lg:col-span-6 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">STAY UPDATED</h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Dapatkan akses awal drop grade, alert populasi, dan analisis pasar kartu koleksi Indonesia.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center max-w-md bg-[#15181F] border border-white/10 rounded-xl p-1 focus-within:border-red-500/50 transition-all">
              <input
                type="email"
                placeholder="Email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white text-xs sm:text-sm px-3 py-2 w-full focus:outline-none placeholder-gray-500"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-500 text-white font-medium text-xs sm:text-sm px-5 py-2 rounded-lg transition-all shadow-md shadow-red-600/20 whitespace-nowrap"
              >
                Langganan
              </button>
            </form>
          </div>

          {/* KONTAK TELEPON & EMAIL */}
          <div className="lg:col-span-3 lg:border-l border-white/10 lg:pl-8 space-y-2 py-2">
            <p className="text-xs sm:text-sm text-gray-300 hover:text-red-500 transition-colors">
              +62 21-1234-5678
            </p>
            <p className="text-xs sm:text-sm text-gray-300 hover:text-red-500 transition-colors">
              testing@gmail.com
            </p>
          </div>

          {/* ALAMAT & SOSIAL MEDIA */}
          <div className="lg:col-span-3 space-y-3">
            <div>
              <h4 className="text-xs font-bold text-white tracking-wider">Address</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Based in Indonesia</p>
            </div>

            {/* SOCIAL MEDIA ICONS */}
            <div className="flex items-center gap-3 pt-1 text-gray-400">
              {/* WhatsApp / Chat */}
              <a href="#" aria-label="Chat" className="p-2 bg-[#15181F] rounded-full border border-white/10 hover:text-red-500 hover:border-red-500/50 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </a>

              {/* Verified Check */}
              <a href="#" aria-label="Verify" className="p-2 bg-[#15181F] rounded-full border border-white/10 hover:text-red-500 hover:border-red-500/50 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>

              {/* TikTok / Music */}
              <a href="#" aria-label="TikTok" className="p-2 bg-[#15181F] rounded-full border border-white/10 hover:text-red-500 hover:border-red-500/50 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </a>

              {/* YouTube / Play */}
              <a href="#" aria-label="YouTube" className="p-2 bg-[#15181F] rounded-full border border-white/10 hover:text-red-500 hover:border-red-500/50 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: COPYRIGHT & CREDIT */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 pt-8 border-t border-white/5 mt-8 gap-2">
          <p>© 2026</p>
          <p className="flex items-center gap-1">
            Situs oleh <span className="text-white font-semibold">PT Kodehana</span>
          </p>
        </div>

      </div>
    </footer>
  );
}