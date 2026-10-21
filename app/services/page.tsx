'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CreditCard,
  ShieldCheck,
  QrCode,
  Database,
  ArrowRight,
  Download,
  PackageCheck,
  Sparkles,
  BookOpen,
  Gamepad2,
  Boxes,
  Coins,
  Bell,
  Lock,
  Clock,
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

  const upcomingCategories = [
    {
      title: 'Action Figure Authentication',
      status: 'IN DEVELOPMENT',
      statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: PackageCheck,
      desc: 'Pemeriksaan moulding orisinal pabrikan, ketegangan persendian joints, kelengkapan blister, dan sertifikasi stamping.',
      target: 'Target: Q3 2026',
    },
    {
      title: 'Photocard Grading (K-Pop & Idol)',
      status: 'COMING SOON',
      statusColor: 'bg-white/10 text-gray-300 border-white/10',
      icon: Sparkles,
      desc: 'Penilaian kartu idola resmi agensi vs fanmade, analisis album press mark, dan proteksi micro-slab ultrasonik compact.',
      target: 'Target: Q3 2026',
    },
    {
      title: 'Comic & Manga Grading',
      status: 'COMING SOON',
      statusColor: 'bg-white/10 text-gray-300 border-white/10',
      icon: BookOpen,
      desc: 'Kelenturan kertas, retensi gloss cover, deteksi spine roll, karat staples vintage, dan enkapsulasi archival acid-free.',
      target: 'Target: Q4 2026',
    },
    {
      title: 'Retro Video Games',
      status: 'COMING SOON',
      statusColor: 'bg-white/10 text-gray-300 border-white/10',
      icon: Gamepad2,
      desc: 'Kondisi cartridge/disc optik, keaslian segel pabrik (H-seam seal & vent holes), serta casing display akrilik presisi.',
      target: 'Target: Q4 2026',
    },
    {
      title: 'LEGO Minifigures & Sets',
      status: 'COMING SOON',
      statusColor: 'bg-white/10 text-gray-300 border-white/10',
      icon: Boxes,
      desc: 'Keaslian part ber-logo resmi, keutuhan print torso mikro, kelenturan joints, dan verifikasi segel tape kardus.',
      target: 'Target: Q4 2026',
    },
    {
      title: 'Coins & Banknotes (Numismatik)',
      status: 'COMING SOON',
      statusColor: 'bg-white/10 text-gray-300 border-white/10',
      icon: Coins,
      desc: 'Identifikasi varian cetak koin kuno & uang kertas, uji kilau lustre kertas, serta spektrometri non-destruktif paduan logam.',
      target: 'Target: 2027',
    },
  ];

  return (
    <div className="bg-[#0A0C10] text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH SLA BANNER                                           */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-4">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Layanan Grading &<br />
              Sertifikasi Standar <span className="text-red-500">Presisi</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              Perhitungan fisik tingkat mikron dan dokumentasi digital tersinkronisasi untuk memvalidasi serta melipatgandakan nilai aset koleksi Anda di pasar Indonesia dan global.
            </p>
          </div>

          {/* TURNAROUND TIME SLA CARD */}
          <div className="bg-[#12151C] border border-white/10 rounded-2xl p-5 min-w-[280px] sm:min-w-[320px] shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-medium">
              <span className="uppercase tracking-widest text-[10px] text-gray-400">SIKLUS PENGERJAAN AKTIF</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ON SCHEDULE
              </span>
            </div>
            <p className="text-2xl font-extrabold text-white">5 - 10 Hari Kerja</p>
            <p className="text-xs text-gray-500 mt-1">Tier Express & Regular menerima submisi gelombang batch 14.</p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CATALOG HEADER BADGE                                                  */}
        {/* ========================================================================= */}
        <div className="border-t border-white/5 pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Katalog & Status Layanan Koleksi ICS
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Ekosistem standardisasi fisik dan rekam jejak digital untuk kolektor Indonesia.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. FEATURED LIVE SERVICE (TCG GRADING)                                    */}
        {/* ========================================================================= */}
        <div className="bg-[#12151C] border border-red-500/40 hover:border-red-500/70 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-red-950/20 transition-all duration-300 relative overflow-hidden">
          
          {/* Subtle Ambient Red Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* LEFT DETAILS */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-950/60 border border-red-500/40 text-[10px] font-bold text-red-400 uppercase tracking-wider">
                  <CreditCard className="w-3.5 h-3.5" /> LAYANAN UTAMA AKTIF
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  ● OPERASIONAL PENUH / LIVE NOW
                </span>
              </div>

              {/* Service Title & Description */}
              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                  TCG Grading & Certification
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mt-3 leading-relaxed">
                  Standardisasi penilaian kelas dunia untuk seluruh trading card game populer: <strong className="text-white">Pokémon TCG, One Piece Card Game, Magic: The Gathering, Yu-Gi-Oh!, Union Arena, Weiss Schwarz</strong>, serta <strong className="text-white">Sports Cards (NBA/Topps/Panini)</strong>.
                </p>
              </div>

              {/* 4 Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                {/* Feature 1 */}
                <div className="bg-[#15181F] border border-white/5 rounded-xl p-4 space-y-1 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-2 text-red-500">
                    <CheckCircle2 className="w-4 h-4" />
                    <h4 className="text-xs font-bold text-white">Penilaian Kondisi Presisi</h4>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-normal">
                    Kalibrasi optik mikroskopis mikron dengan toleransi tanpa bias subjektif.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-[#15181F] border border-white/5 rounded-xl p-4 space-y-1 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-2 text-red-500">
                    <ShieldCheck className="w-4 h-4" />
                    <h4 className="text-xs font-bold text-white">Enkapsulasi Akrilik UV-Proof</h4>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-normal">
                    Slab sonically-welded tahan benturan, anti-kelembapan, dan proteksi sinar UV.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-[#15181F] border border-white/5 rounded-xl p-4 space-y-1 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-2 text-red-500">
                    <QrCode className="w-4 h-4" />
                    <h4 className="text-xs font-bold text-white">Dual NFC & QR Verifikasi</h4>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-normal">
                    Enkripsi NXP NTAG 424 DNA untuk verifikasi instan tap smartphone bebas tiruan.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-[#15181F] border border-white/5 rounded-xl p-4 space-y-1 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-2 text-red-500">
                    <Database className="w-4 h-4" />
                    <h4 className="text-xs font-bold text-white">Registri Digital Nasional</h4>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-normal">
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
                    className="rounded-xl border border-white/20 shadow-2xl shadow-black/80 bg-[#15181F] p-1.5 backdrop-blur-md"
                />
                </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. PIPELINE RESEARCH GRID (6 UPCOMING CATEGORIES)                         */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-400 border-b border-white/5 pb-3">
            <span className="font-bold tracking-wider text-gray-300 uppercase">
              KATEGORI KOLEKSI DALAM PIPELINE RISET (2026 - 2027)
            </span>
            <span>Segera Hadir Bertahap</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingCategories.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#12151C] border border-white/10 hover:border-white/20 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group hover:translate-y-[-2px]"
                >
                  <div>
                    {/* Header Icon & Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-[#15181F] border border-white/10 text-gray-300 group-hover:text-red-400 transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className={`text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full border ${cat.statusColor}`}>
                        {cat.status}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Target Date */}
                  <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                    <span>{cat.target}</span>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. EARLY ACCESS / WAITLIST BANNER                                         */}
        {/* ========================================================================= */}
        <div className="bg-[#12151C] border border-white/10 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          
          {/* Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-[10px] font-bold text-red-400 uppercase tracking-widest">
              ● VIP EARLY ACCESS
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Punya Koleksi Selain TCG yang Ingin Dinilai?
            </h2>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Tinggalkan kontak dan kategori minatmu. Kamu akan menerima undangan submisi gelombang perdana, diskon grading khusus peluncuran, dan update progress standar.
            </p>

            {/* WAITLIST FORM */}
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                placeholder="nama@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#15181F] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/60 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-red-600/30 whitespace-nowrap transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Ingatkan Saya <Bell className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-2">
              <Lock className="w-3.5 h-3.5 text-gray-500" />
              <span>Data Anda terlindungi oleh enkripsi TLS 256-bit. Tanpa spam komersial pihak ketiga.</span>
            </div>

            <p className="text-xs text-gray-400 font-medium">
              <strong className="text-white">3,480+</strong> Kolektor Terdaftar di Daftar Tunggu
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}