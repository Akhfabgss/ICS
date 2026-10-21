'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Settings, ArrowRight, Home, ShieldAlert } from 'lucide-react';

export default function UnderConstructionPage() {
  return (
    <div className="bg-[#0A0C10] text-white min-h-screen flex items-center justify-center pt-24 pb-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: TEXT CONTENT & ACTIONS                                       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* System Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181F] border border-red-500/30 text-[11px] font-bold text-red-400 tracking-wider uppercase">
              <Settings className="w-3.5 h-3.5 text-red-500 animate-spin" />
              SISTEM SEDANG DIPERBARUI
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Oops!<br />
              Sedang Dalam<br />
              <span className="text-red-500 underline decoration-red-500/30 underline-offset-8">
                Peningkatan.
              </span>
            </h1>

            {/* Sub-headline / Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Kami sedang meningkatkan infrastruktur registri database dan verifikasi sertifikat fisik ICS agar perlindungan serta pengecekan slab koleksi Anda berjalan semakin cepat, aman, dan presisi.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Hubungi CS / Status Live <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/"
                className="w-full sm:w-auto bg-[#15181F] hover:bg-white/10 border border-white/10 text-gray-300 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Home className="w-4 h-4 text-gray-400" /> Kembali ke Beranda
              </Link>
            </div>

            {/* Emergency Notice Footer */}
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <p>
                Perlu verifikasi keaslian darurat? Hubungi WhatsApp resmi Tim Sertifikasi ICS:{' '}
                <a
                  href="https://wa.me/6281234567890"
                  className="font-mono font-bold text-white underline hover:text-red-400 transition-colors"
                >
                  0812-ICS-AUTH
                </a>
              </p>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: ILLUSTRATION IMAGE FROM PATH                                */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-xl group">
              
              {/* Subtle Red Ambient Glow behind image */}
              <div className="absolute inset-0 bg-red-600/10 blur-3xl rounded-full pointer-events-none group-hover:bg-red-600/20 transition-all duration-500" />

              {/* Main Under Construction / Calibration Illustration Image */}
              <div className="relative rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
                <Image
                  src="/images/contact/contact-icon.png"
                  alt="ICS Core System Upgrade Illustration"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl"
                  priority
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}