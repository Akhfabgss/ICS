'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  Layers,
  FolderGit2,
  TrendingUp,
  Lock,
  Radio,
  ShieldCheck,
  Landmark,
  Check,
  Truck,
  Search,
  QrCode,
  CreditCard,
  Package,
  Car,
  Bell,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  // State untuk 4 Langkah "Cara Kerja ICS"
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '1',
      title: 'Submit & Record',
      desc: 'Kirim atau serahkan kartu dan barang koleksi favoritmu secara online atau melalui Drop Point resmi ICS di berbagai kota Indonesia.',
      icon: Truck,
    },
    {
      num: '2',
      title: 'Microscopic Inspection',
      desc: 'Pemeriksaan fisik 4 parameter (Centering, Corners, Edges, Surface) menggunakan mikroskop optik presisi tinggi.',
      icon: Search,
    },
    {
      num: '3',
      title: 'Sonic Encapsulation',
      desc: 'Enkapsulasi kartu ke dalam slab akrilik custom berteknologi Sonic-Welded yang kedap udara, dilindungi label hologram & NFC.',
      icon: ShieldCheck,
    },
    {
      num: '4',
      title: 'Digital Passport Live',
      desc: 'Sertifikat digital terbit permanen di database ICS. Bebas verifikasi via QR Code & Tap NFC kapan saja.',
      icon: QrCode,
    },
  ];
  return (
    <div className="bg-[#0A0C10] text-white min-h-screen overflow-x-hidden pt-24 pb-16">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH FLOATING CARDS                                       */}
      {/* ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-6 pt-12 pb-20 text-center flex flex-col items-center justify-center min-h-[85vh]">

        {/* BACKGROUND GLOW EFFECT */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-900/15 blur-[140px] rounded-full pointer-events-none" />

        {/* Top-Left Card */}
        <div className="hidden lg:block absolute top-4 left-6 w-18 xl:w-24 rotate-[-14deg] animate-float-slow hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/home/card1.webp"
            alt="ICS Graded Card 1"
            width={180}
            height={260}
            className="rounded-xl border border-white/20 shadow-2xl shadow-black/80 bg-[#15181F] p-1.5 backdrop-blur-md"
          />
        </div>

        {/* Bottom-Left Card */}
        <div className="hidden lg:block absolute bottom-12 left-16 w-18 xl:w-32 rotate-[12deg] animate-float-delayed hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/home/card1.webp"
            alt="ICS Graded Card 1"
            width={180}
            height={260}
            className="rounded-xl border border-white/20 shadow-2xl shadow-black/80 bg-[#15181F] p-1.5 backdrop-blur-md"
          />
        </div>

        {/* Top-Right Card */}
        <div className="hidden lg:block absolute top-6 right-8 w-18 xl:w-32 rotate-[15deg] animate-float-delayed hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/home/card1.webp"
            alt="ICS Graded Card 1"
            width={180}
            height={260}
            className="rounded-xl border border-white/20 shadow-2xl shadow-black/80 bg-[#15181F] p-1.5 backdrop-blur-md"
          />
        </div>

        {/* Bottom-Right Card */}
        <div className="hidden lg:block absolute bottom-32 right-14 w-18 xl:w-24 rotate-[-10deg] animate-float-slow hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/home/card1.webp"
            alt="ICS Graded Card 1"
            width={180}
            height={260}
            className="rounded-xl border border-white/20 shadow-2xl shadow-black/80 bg-[#15181F] p-1.5 backdrop-blur-md"
          />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">

          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#15181F] border border-white/10 text-[11px] font-semibold text-gray-300 tracking-widest uppercase">
            INDONESIA COLLECTIBLES STANDAR
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Standar Baru Dokumentasi &<br />
            Nilai Koleksi Anda di<br />
            <span className="text-red-500 underline decoration-red-500/40 underline-offset-8">
              Indonesia.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            Pemeriksaan transparan, perlindungan fisik presisi, dan rekam jejak digital tepercaya untuk aset TCG & barang koleksi favoritmu.
          </p>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. STATS & INDICATORS SECTION                                             */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-8">

        {/* STATS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* Stat 1 */}
          <div className="bg-[#12151C] border border-white/10 hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] group">
            <p className="text-3xl sm:text-4xl font-extrabold text-red-500 group-hover:text-red-400 transition-colors">
              142,850+
            </p>
            <p className="text-sm font-bold text-white mt-2">Total Koleksi Terdata</p>
            <p className="text-xs text-gray-500 mt-1">Dalam Ekosistem Registry ICS</p>
          </div>

          {/* Stat 2 */}
          <div className="bg-[#12151C] border border-white/10 hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] group">
            <p className="text-3xl sm:text-4xl font-extrabold text-white group-hover:text-red-500 transition-colors">
              98,420+
            </p>
            <p className="text-sm font-bold text-white mt-2">Sertifikat Terverifikasi</p>
            <p className="text-xs text-gray-500 mt-1">Aktif Terenkripsi Dual-NFC</p>
          </div>

          {/* Stat 3 */}
          <div className="bg-[#12151C] border border-white/10 hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] group">
            <p className="text-3xl sm:text-4xl font-extrabold text-red-500 group-hover:text-red-400 transition-colors">
              100%
            </p>
            <p className="text-sm font-bold text-white mt-2">Standar Inspeksi Mikroskopik</p>
            <p className="text-xs text-gray-500 mt-1">Akurasi Optik Skala 10-Point</p>
          </div>

          {/* Stat 4 */}
          <div className="bg-[#12151C] border border-white/10 hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] group">
            <p className="text-3xl sm:text-4xl font-extrabold text-white group-hover:text-red-500 transition-colors">
              3+
            </p>
            <p className="text-sm font-bold text-white mt-2">Kategori Didukung</p>
            <p className="text-xs text-gray-500 mt-1">TCG, Action Figure & Diecast</p>
          </div>

        </div>

        {/* SECURITY & TRUST BADGES WITH LUCIDE ICONS */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium pt-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-red-500" /> Keamanan Sonic Welded
          </div>
          <span className="text-gray-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-500" /> NFC Digital Passport
          </div>
          <span className="text-gray-700 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-500" /> Standar Grading Internasional
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. ECOSYSTEM ARCHITECTURE SECTION (FULL RIGHT EDGE IMAGE)                  */}
      {/* ========================================================================= */}
      <section className="w-full pt-20 pb-12 overflow-hidden">

        {/* Container Split: Left Padding Standard, Right Edge Full W-Full */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pl-6 sm:pl-12 lg:pl-20 xl:pl-32 pr-0">

          {/* LEFT COLUMN: FEATURES & CTA */}
          <div className="w-full lg:w-1/2 max-w-xl space-y-8 pr-6 lg:pr-0 px-6">

            {/* Section Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-950/40 border border-red-500/30 text-[11px] font-bold text-red-400 uppercase tracking-widest">
              <Landmark className="w-3.5 h-3.5 text-red-400" /> END-TO-END COLLECTOR ARCHITECTURE
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Satu Platform untuk Seluruh Ekosistem Koleksi Anda
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Dari penilaian fisik tingkat mikron hingga pelacakan portofolio digital real-time.
            </p>

            {/* FEATURE LIST WITH LUCIDE ICONS */}
            <div className="space-y-6 pt-2">

              {/* Feature 1 */}
              <div className="flex items-start gap-4 group">
                <div className="mt-1">
                  <CheckCircle2 className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    Authentic Grading & Inspection
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                    Bagikan link profil pribadimu seperti binder virtual dengan resolusi ultra tajam.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 group">
                <div className="mt-1">
                  <Layers className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    Physical Encapsulation
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                    Daftar lengkap ekspansi Pokémon 151, One Piece Romance Dawn, hingga MTG Master Sets.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 group">
                <div className="mt-1">
                  <FolderGit2 className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    ICS Collector Registry
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                    Dapatkan reputasi sebagai kolektor peringkat atas di komunitas nasional.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-4 group">
                <div className="mt-1">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    Digital Verification Page
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                    Dihitung otomatis berdasarkan data transaksi agregat terbaru di pasar sekunder.
                  </p>
                </div>
              </div>

            </div>

            {/* CALL TO ACTION BOX */}
            <div className="bg-[#12151C] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div>
                <h4 className="text-base font-bold text-white">Koleksimu Masih Berserakan?</h4>
                <p className="text-xs text-gray-400 mt-0.5">Buat katalog digital gratis dalam 2 menit.</p>
              </div>
              <Link
                href="/register"
                className="bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
              >
                Buka Registry Akun Gratis
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN: FULL RIGHT-EDGE IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-end items-center pl-0 pr-0">
            <div className="relative w-full max-w-[850px] flex justify-end">
              {/* Subtle Red Glow behind Image */}
              <div className="absolute inset-0 bg-red-600/10 blur-3xl rounded-full pointer-events-none" />

              {/* Showcase Image - Bleeds directly to the right viewport border */}
              <Image
                src="/images/home/about.png"
                alt="ICS Collectible Authentication System Showcase"
                width={1000}
                height={700}
                className="w-full h-auto object-contain object-right drop-shadow-2xl"
                priority
              />
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: CARA KERJA ICS (CERTIFIED GRADING PIPELINE)                    */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-2">
              CERTIFIED GRADING PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Cara Kerja <span className="text-red-500">ICS</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md leading-relaxed">
            Proses 4 langkah mudah untuk mengamankan dan mendokumentasikan aset koleksi bernilai tinggi Anda.
          </p>
        </div>

        {/* INTERACTIVE PIPELINE STEPS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* STEP CARD DISPLAY */}
          <div className="lg:col-span-7 bg-[#12151C] border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">

            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-3xl rounded-full pointer-events-none group-hover:bg-red-600/20 transition-all duration-500" />

            <div>
              {/* Step Number Badge */}
              <div className="w-12 h-12 rounded-xl bg-red-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-red-600/30 mb-6">
                {steps[activeStep].num}
              </div>

              {/* Step Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const IconComp = steps[activeStep].icon;
                  return <IconComp className="w-6 h-6 text-red-500" />;
                })()}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {steps[activeStep].title}
                </h3>
              </div>

              {/* Step Description */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {steps[activeStep].desc}
              </p>
            </div>

            {/* PIPELINE PROGRESS BAR (RED LINE) */}
            <div className="pt-10">
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-red-600 h-full transition-all duration-500"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-3 font-medium">
                <span>Langkah {activeStep + 1} dari 4</span>
                <span>Alur Otentikasi ICS</span>
              </div>
            </div>

          </div>

          {/* STEP NAVIGATION CONTROLS */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${isActive
                      ? 'bg-[#15181F] border-red-500/50 shadow-lg shadow-red-950/30'
                      : 'bg-[#12151C]/60 border-white/5 hover:border-white/20 text-gray-400 hover:text-white'
                    }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${isActive
                        ? 'bg-red-600 text-white'
                        : 'bg-white/5 text-gray-400'
                      }`}
                  >
                    {step.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>
                      {step.title}
                    </p>
                  </div>
                  <StepIcon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-gray-600'}`} />
                </button>
              );
            })}
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: KATEGORI KOLEKSI (ECOSYSTEM EXPANSION)                          */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">

        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
            ECOSYSTEM EXPANSION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Kategori Koleksi yang Didukung & Segera Hadir
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Ekspansi komprehensif untuk melayani seluruh spektrum kolektor hobi bernilai tinggi di Indonesia.
          </p>
        </div>

        {/* 3 CATEGORY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD 1: TCG & TRADING CARDS (ACTIVE) */}
          <div className="bg-[#12151C] border-2 border-red-500/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl shadow-red-950/20 group hover:border-red-500 transition-all duration-300">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-red-600/10 border border-red-500/30 rounded-xl text-red-500">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-red-600 text-white px-2.5 py-1 rounded-full shadow-md">
                  ● ACTIVE / PRIORITY
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-extrabold text-white mb-2">TCG & Trading Cards</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Pokémon TCG, One Piece Card Game, Yu-Gi-Oh!, Magic: The Gathering, Union Arena, and Sports Cards.
              </p>

              {/* Specification Box */}
              <div className="bg-[#15181F] border border-white/5 rounded-xl p-4 space-y-2 mb-8">
                <p className="text-xs font-bold text-gray-300">Fitur Tersedia Lengkap:</p>
                <ul className="text-xs text-gray-400 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <span className="text-red-500">•</span> Full Micro-Optics Grading & Sub-grades
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-red-500">•</span> Sonic-Welded Acrylic Slabs & Dual NFC
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-red-500">•</span> Integrasi Set Registry & Leaderboard Nasional
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Button */}
            <Link
              href="/pricing"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              Kirim Kartu Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* CARD 2: ACTION FIGURE & VINYL (COMING SOON) */}
          <div className="bg-[#12151C]/80 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group hover:border-white/20 transition-all duration-300">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400">
                  <Package className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 text-gray-300 px-2.5 py-1 rounded-full border border-white/10">
                  COMING SOON — Q3 2026
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-extrabold text-white mb-2">Action Figure & Vinyl</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Hot Toys, Bearbrick 1000%/400%, Funko Pop! Grails, Designer Toys, Sofubi, dan Figurine Eksklusif.
              </p>

              {/* Specification Box */}
              <div className="bg-[#15181F]/60 border border-white/5 rounded-xl p-4 space-y-2 mb-8">
                <p className="text-xs font-bold text-gray-400">Spesifikasi Layanan:</p>
                <ul className="text-xs text-gray-500 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <span>•</span> Verifikasi Box, Seal Keaslian & Cetakan Cat
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>•</span> Case Akrilik Custom UV-Proof dengan Lock Hologram
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>•</span> Sertifikasi Serial Number Produsen Resmi
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
              <Bell className="w-4 h-4 text-red-400" /> Ingatkan Saat Rilis
            </button>
          </div>

          {/* CARD 3: DIECAST & MEMORABILIA (PLANNED) */}
          <div className="bg-[#12151C]/50 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group hover:border-white/15 transition-all duration-300">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-500">
                  <Car className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase bg-white/5 text-gray-400 px-2.5 py-1 rounded-full border border-white/5">
                  PLANNED EXPANSION
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-extrabold text-gray-300 mb-2">Diecast & Memorabilia</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Hot Wheels RLC & Super Treasure Hunt, Tomica Limited Vintage, LEGO Sealed Sets, & Tanda Tangan Terverifikasi.
              </p>

              {/* Specification Box */}
              <div className="bg-[#15181F]/40 border border-white/5 rounded-xl p-4 space-y-2 mb-8">
                <p className="text-xs font-bold text-gray-500">Spesifikasi Layanan:</p>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  <li className="flex items-center gap-1.5">
                    <span>•</span> Blister & Cardboard Integrity Grading
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>•</span> Otentikasi Tanda Tangan & COA Matching
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>•</span> Archival Encasement Khusus Skala 1:64
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Button */}
            <button
              disabled
              className="w-full bg-white/5 border border-white/5 text-gray-500 font-medium text-xs sm:text-sm py-3 px-4 rounded-xl cursor-not-allowed text-center"
            >
              Roadmap ICS 2026
            </button>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: FINAL CALL TO ACTION BANNER                                    */}
      {/* ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-6 py-24 text-center border-t border-white/5">

        {/* Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#15181F] border border-white/10 text-[11px] font-bold text-red-400 uppercase tracking-widest">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> JOIN THE STANDARD OF COLLECTORS
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Siap Memberikan Perlindungan & Nilai Maksimal untuk Koleksimu?
          </h2>

          {/* Subheadline */}
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Bergabunglah bersama ribuan kolektor di seluruh Indonesia. Daftarkan koleksimu di ICS Registry hari ini tanpa biaya dan rasakan ketenangan autentikasi presisi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-xl shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Mulai Sekarang Gratis <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto bg-[#15181F] hover:bg-white/10 border border-white/10 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-red-500" /> Cek Biaya Layanan Grading
            </Link>
          </div>

          {/* Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 pt-6">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-red-500" /> Tanpa Biaya Pendaftaran Registry
            </span>
            <span className="text-gray-700 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-red-500" /> Jaminan Enkapsulasi Asli
            </span>
            <span className="text-gray-700 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-red-500" /> Drop Point Tersedia di Jakarta, Surabaya & Bandung
            </span>
          </div>

        </div>

      </section>


    </div>
  );
}