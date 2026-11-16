'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UPCOMING_CATEGORIES } from '@/data/companyData';
import {
  ShieldCheck,
  QrCode,
  Database,
  ArrowRight,
  Bell,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export default function ServicesPage() {
  const [email, setEmail] = useState('');

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Terima kasih! Email ${email} telah terdaftar dalam antrean VIP Early Access.`);
      setEmail('');
    }
  };

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 md:pt-52 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH SLA BANNER                                           */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground-hitam leading-tight tracking-tight">
              Layanan Grading &<br />
              Sertifikasi Standar <span className="text-accent">Presisi</span>
            </h1>
            <p className="text-muted-hitam text-sm sm:text-base leading-relaxed max-w-2xl">
              Perhitungan fisik tingkat mikron dan dokumentasi digital tersinkronisasi untuk memvalidasi serta melipatgandakan nilai aset koleksi Anda di pasar Indonesia dan global.
            </p>
          </div>

          {/* TURNAROUND TIME SLA CARD (CARD HITAM KONTRAS) */}
          <div className="bg-card-hitam border border-line-hitam rounded-2xl p-5 min-w-[280px] sm:min-w-[320px] shadow-xl backdrop-blur-md relative overflow-hidden group">
            <div className="flex items-center justify-between text-xs text-muted-putih mb-2 font-medium">
              <span className="uppercase tracking-widest text-[10px]">SIKLUS PENGERJAAN AKTIF</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                ON SCHEDULE
              </span>
            </div>
            <p className="text-2xl font-extrabold text-foreground-putih">7 - 14 Hari Kerja</p>
            <p className="text-xs text-subtle-putih mt-1">Tier Express & Regular menerima submisi gelombang batch 14.</p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CATALOG HEADER BADGE                                                  */}
        {/* ========================================================================= */}
        <div className="border-t border-line-putih-soft pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground-hitam">
              Katalog & Status Layanan Koleksi ICS
            </h2>
            <p className="text-muted-hitam text-xs sm:text-sm mt-1">
              Ekosistem standardisasi fisik dan rekam jejak digital untuk kolektor Indonesia.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. FEATURED LIVE SERVICE (TCG GRADING - CARD HITAM UTAMA)                 */}
        {/* ========================================================================= */}
        <div className="bg-card-hitam border border-red-500/50 hover:border-red-500/80 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300 relative overflow-hidden backdrop-blur-md">
          
          {/* Subtle Ambient Red Glow */}
          <div className="hidden dark:block absolute -top-24 -left-24 w-96 h-96 bg-red-600/15 blur-[100px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* LEFT DETAILS */}
            <div className="lg:col-span-7 space-y-6">

              {/* Service Title & Description */}
              <div>
                <h3 className="text-2xl sm:text-4xl font-bold text-foreground-putih">
                  TCG Grading & Certification
                </h3>
                <p className="text-muted-putih text-xs sm:text-sm mt-3 leading-relaxed">
                  Standardisasi penilaian kelas dunia untuk seluruh trading card game populer: Pokémon TCG, One Piece Card Game, Magic: The Gathering, Yu-Gi-Oh!, Union Arena, Weiss Schwarz, serta Sports Cards (NBA/Topps/Panini).
                </p>
              </div>

              {/* 4 Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-4 space-y-1 hover:border-line-hitam transition-colors">
                  <div className="flex items-center gap-2 text-red-500">
                    <CheckCircle2 className="w-4 h-4" />
                    <h4 className="text-xs font-bold text-foreground-putih">Penilaian Kondisi Presisi</h4>
                  </div>
                  <p className="text-[11px] text-muted-putih leading-normal">
                    Kalibrasi optik mikroskopis mikron dengan toleransi tanpa bias subjektif.
                  </p>
                </div>

                <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-4 space-y-1 hover:border-line-hitam transition-colors">
                  <div className="flex items-center gap-2 text-red-500">
                    <ShieldCheck className="w-4 h-4" />
                    <h4 className="text-xs font-bold text-foreground-putih">Enkapsulasi Akrilik UV-Proof</h4>
                  </div>
                  <p className="text-[11px] text-muted-putih leading-normal">
                    Slab sonically-welded tahan benturan, anti-kelembapan, dan proteksi sinar UV.
                  </p>
                </div>

                <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-4 space-y-1 hover:border-line-hitam transition-colors">
                  <div className="flex items-center gap-2 text-red-500">
                    <QrCode className="w-4 h-4" />
                    <h4 className="text-xs font-bold text-foreground-putih">Dual NFC & QR Verifikasi</h4>
                  </div>
                  <p className="text-[11px] text-muted-putih leading-normal">
                    Enkripsi NXP NTAG 424 DNA untuk verifikasi instan tap smartphone bebas tiruan.
                  </p>
                </div>

                <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-4 space-y-1 hover:border-line-hitam transition-colors">
                  <div className="flex items-center gap-2 text-red-500">
                    <Database className="w-4 h-4" />
                    <h4 className="text-xs font-bold text-foreground-putih">Registri Digital Nasional</h4>
                  </div>
                  <p className="text-[11px] text-muted-putih leading-normal">
                    Pencatatan ledger permanen, populasi grade terbuka, dan transfer kepemilikan aman.
                  </p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/pricing"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Ajukan Grading TCG <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* RIGHT SLAB SHOWCASE PREVIEW */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="lg:block h-full hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/home/card1.webp"
                  alt="ICS Graded Card 1"
                  width={180}
                  height={260}
                  className="rounded-xl border border-line-hitam shadow-2xl bg-elevated-hitam p-1.5 backdrop-blur-md"
                />
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. PIPELINE RESEARCH GRID (6 UPCOMING CATEGORIES - DARI companyData)      */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-muted-hitam border-b border-line-putih-soft pb-3">
            <span className="font-bold tracking-wider text-foreground-hitam uppercase">
              KATEGORI KOLEKSI DALAM PIPELINE RISET (2026 - 2027)
            </span>
            <span>Segera Hadir Bertahap</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {UPCOMING_CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="bg-card-putih border border-line-putih hover:border-red-500/30 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group hover:translate-y-[-2px] shadow-xs"
                >
                  <div>
                    {/* Header Icon & Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-elevated-putih border border-line-putih text-muted-hitam group-hover:text-accent transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className={`text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full border ${cat.status_color}`}>
                        {cat.status}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-base font-bold text-foreground-hitam group-hover:text-accent transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-muted-hitam mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Target Date */}
                  <div className="pt-6 mt-4 border-t border-line-putih-soft flex items-center justify-between text-xs text-subtle-hitam">
                    <span>{cat.target}</span>
                    <ArrowRight className="w-4 h-4 text-subtle-hitam group-hover:text-foreground-hitam transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. EARLY ACCESS / WAITLIST BANNER (CARD HITAM KONTRAS)                    */}
        {/* ========================================================================= */}
        <div className="bg-card-hitam border border-line-hitam rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl backdrop-blur-md">
          
          {/* Glow Effect */}
          <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-red-600/15 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-[10px] font-bold text-red-400 uppercase tracking-widest">
              VIP EARLY ACCESS
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground-putih leading-tight">
              Punya Koleksi Selain TCG yang Ingin Dinilai?
            </h2>

            <p className="text-muted-putih text-xs sm:text-sm leading-relaxed">
              Tinggalkan kontak dan kategori minatmu. Kamu akan menerima undangan submisi gelombang perdana, diskon grading khusus peluncuran, dan update progress standar.
            </p>

            {/* WAITLIST FORM */}
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                placeholder="nama@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-elevated-hitam border border-line-hitam rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground-putih placeholder-subtle-putih focus:outline-none focus:border-red-500/60 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-red-600/30 whitespace-nowrap transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                Ingatkan Saya <Bell className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[11px] text-subtle-putih pt-2">
              <Lock className="w-3.5 h-3.5 text-subtle-putih" />
              <span>Data Anda terlindungi oleh enkripsi TLS 256-bit. Tanpa spam komersial pihak ketiga.</span>
            </div>

            <p className="text-xs text-muted-putih font-medium">
              <strong className="text-foreground-putih">3,480+</strong> Kolektor Terdaftar di Daftar Tunggu
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}