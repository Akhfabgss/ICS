'use client';

import Image from 'next/image';
import Link from 'next/link';
import { WORKFLOW_STEPS, SERVICE_CATEGORIES_SHOWCASE } from '@/data/companyData';
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
  CreditCard,
  Bell,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen overflow-x-hidden pt-24 pb-16 transition-colors duration-300">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH FLOATING CARDS                                       */}
      {/* ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-6 pt-12 pb-20 text-center flex flex-col items-center justify-center min-h-[85vh]">

        {/* BACKGROUND GLOW EFFECT */}
        <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none" />

        {/* Top-Left Card (Frame Hitam Kontras) */}
        <div className="hidden lg:block absolute top-8 left-6 w-18 xl:w-24 rotate-[-14deg] animate-float-slow hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/home/card1.jpg"
            alt="ICS Graded Card 1"
            width={180}
            height={260}
            className="rounded-xl border border-line-hitam shadow-2xl bg-elevated-hitam p-1.5 backdrop-blur-md"
          />
        </div>

        {/* Bottom-Left Card */}
        <div className="hidden lg:block absolute bottom-12 left-16 w-18 xl:w-32 rotate-[12deg] animate-float-delayed hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/home/card2.jpg"
            alt="ICS Graded Card 1"
            width={180}
            height={260}
            className="rounded-xl border border-line-hitam shadow-2xl bg-elevated-hitam p-1.5 backdrop-blur-md"
          />
        </div>

        {/* Top-Right Card */}
        <div className="hidden lg:block absolute top-10 right-8 w-18 xl:w-32 rotate-[15deg] animate-float-delayed hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/home/card3.jpg"
            alt="ICS Graded Card 1"
            width={180}
            height={260}
            className="rounded-xl border border-line-hitam shadow-2xl bg-elevated-hitam p-1.5 backdrop-blur-md"
          />
        </div>

        {/* Bottom-Right Card */}
        <div className="hidden lg:block absolute bottom-24 right-14 w-18 xl:w-24 rotate-[-10deg] animate-float-slow hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/home/card4.jpg"
            alt="ICS Graded Card 1"
            width={180}
            height={260}
            className="rounded-xl border border-line-hitam shadow-2xl bg-elevated-hitam p-1.5 backdrop-blur-md"
          />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">

          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-[#15181f] bg-red-600 dark:border dark:border-line-putih text-[11px] font-semibold text-white dark:text-[#9ca3af] tracking-widest uppercase">
            INDONESIA COLLECTIBLES STANDAR
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground-hitam leading-[1.15]">
            Standar Baru Dokumentasi &<br />
            Nilai Koleksi Anda di<br />
            <span className="text-accent underline decoration-red-500/40 underline-offset-8">
              Indonesia.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted-hitam text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            Pemeriksaan transparan, perlindungan fisik presisi, dan rekam jejak digital tepercaya untuk aset TCG & barang koleksi favoritmu.
          </p>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. STATS & INDICATORS SECTION (CARD PUTIH)                                */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-8">

        {/* STATS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* Stat 1 */}
          <div className="bg-card-putih border border-line-putih hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] group shadow-xs">
            <p className="text-3xl sm:text-4xl font-extrabold text-accent group-hover:text-accent-hover transition-colors">
              142,850+
            </p>
            <p className="text-sm font-bold text-foreground-hitam mt-2">Total Koleksi Terdata</p>
            <p className="text-xs text-subtle-hitam mt-1">Dalam Ekosistem Registry ICS</p>
          </div>

          {/* Stat 2 */}
          <div className="bg-card-putih border border-line-putih hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] group shadow-xs">
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground-hitam group-hover:text-accent transition-colors">
              98,420+
            </p>
            <p className="text-sm font-bold text-foreground-hitam mt-2">Sertifikat Terverifikasi</p>
            <p className="text-xs text-subtle-hitam mt-1">Aktif Terenkripsi Dual-NFC</p>
          </div>

          {/* Stat 3 */}
          <div className="bg-card-putih border border-line-putih hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] group shadow-xs">
            <p className="text-3xl sm:text-4xl font-extrabold text-accent group-hover:text-accent-hover transition-colors">
              100%
            </p>
            <p className="text-sm font-bold text-foreground-hitam mt-2">Standar Inspeksi Mikroskopik</p>
            <p className="text-xs text-subtle-hitam mt-1">Akurasi Optik Skala 10-Point</p>
          </div>

          {/* Stat 4 */}
          <div className="bg-card-putih border border-line-putih hover:border-red-500/40 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-2px] group shadow-xs">
            <p className="text-3xl sm:text-4xl font-extrabold text-foreground-hitam group-hover:text-accent transition-colors">
              3+
            </p>
            <p className="text-sm font-bold text-foreground-hitam mt-2">Kategori Didukung</p>
            <p className="text-xs text-subtle-hitam mt-1">TCG, Action Figure & Diecast</p>
          </div>

        </div>

        {/* SECURITY & TRUST BADGES WITH LUCIDE ICONS */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-hitam font-medium pt-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-accent" /> Keamanan Sonic Welded
          </div>
          <span className="text-subtle-hitam hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-accent" /> NFC Digital Passport
          </div>
          <span className="text-subtle-hitam hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" /> Standar Grading Internasional
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. ECOSYSTEM ARCHITECTURE SECTION (FULL RIGHT EDGE IMAGE)                  */}
      {/* ========================================================================= */}
      <section className="w-full pt-20 pb-12 overflow-hidden">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pl-6 sm:pl-12 lg:pl-20 xl:pl-32 pr-0">

          {/* LEFT COLUMN: FEATURES & CTA */}
          <div className="w-full lg:w-1/2 max-w-xl space-y-8 pr-6 lg:pr-0 px-6">

            {/* Section Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent-soft border border-accent-border text-[11px] font-bold text-accent uppercase tracking-widest">
              <Landmark className="w-3.5 h-3.5 text-accent" /> END-TO-END COLLECTOR ARCHITECTURE
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground-hitam leading-tight">
              Satu Platform untuk Seluruh Ekosistem Koleksi Anda
            </h2>

            <p className="text-muted-hitam text-sm sm:text-base leading-relaxed">
              Dari penilaian fisik tingkat mikron hingga pelacakan portofolio digital real-time.
            </p>

            {/* FEATURE LIST WITH LUCIDE ICONS */}
            <div className="space-y-6 pt-2">

              <div className="flex items-start gap-4 group">
                <div className="mt-1">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground-hitam group-hover:text-accent transition-colors">
                    Authentic Grading & Inspection
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-hitam mt-1 leading-relaxed">
                    Bagikan link profil pribadimu seperti binder virtual dengan resolusi ultra tajam.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1">
                  <Layers className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground-hitam group-hover:text-accent transition-colors">
                    Physical Encapsulation
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-hitam mt-1 leading-relaxed">
                    Daftar lengkap ekspansi Pokémon 151, One Piece Romance Dawn, hingga MTG Master Sets.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1">
                  <FolderGit2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground-hitam group-hover:text-accent transition-colors">
                    ICS Collector Registry
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-hitam mt-1 leading-relaxed">
                    Dapatkan reputasi sebagai kolektor peringkat atas di komunitas nasional.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground-hitam group-hover:text-accent transition-colors">
                    Digital Verification Page
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-hitam mt-1 leading-relaxed">
                    Dihitung otomatis berdasarkan data transaksi agregat terbaru di pasar sekunder.
                  </p>
                </div>
              </div>

            </div>

            {/* CALL TO ACTION BOX (CARD HITAM KONTRAS) */}
            <div className="bg-card-hitam border border-line-hitam rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl backdrop-blur-md">
              <div>
                <h4 className="text-base font-bold text-foreground-putih">Koleksimu Masih Berserakan?</h4>
                <p className="text-xs text-muted-putih mt-0.5">Buat katalog digital gratis dalam 2 menit.</p>
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
              <div className="hidden dark:block absolute inset-0 bg-red-600/10 blur-3xl rounded-full pointer-events-none" />
              <Image
                src="/images/home/about2.png"
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
      {/* SECTION 1: CARA KERJA ICS (CERTIFIED GRADING PIPELINE - DARI companyData) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-line-putih-soft">

        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">
              CERTIFIED GRADING PIPELINE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground-hitam">
              Cara Kerja <span className="text-accent">ICS</span>
            </h2>
          </div>
          <p className="text-muted-hitam text-sm max-w-md leading-relaxed">
            Proses {WORKFLOW_STEPS.length} langkah mudah untuk mengamankan dan mendokumentasikan aset koleksi bernilai tinggi Anda.
          </p>
        </div>

        {/* INTERACTIVE PIPELINE STEPS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* STEP CARD DISPLAY (CARD HITAM UTAMA) */}
          <div className="lg:col-span-7 bg-card-hitam border border-line-hitam rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-xl backdrop-blur-md">

            <div className="hidden dark:block absolute top-0 right-0 w-64 h-64 bg-red-600/15 blur-3xl rounded-full pointer-events-none group-hover:bg-red-600/25 transition-all duration-500" />

            <div>
              <div className="w-12 h-12 rounded-xl bg-red-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-red-600/30 mb-6">
                {WORKFLOW_STEPS[activeStep].num}
              </div>

              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const IconComp = WORKFLOW_STEPS[activeStep].icon;
                  return <IconComp className="w-6 h-6 text-red-500" />;
                })()}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground-putih">
                  {WORKFLOW_STEPS[activeStep].title}
                </h3>
              </div>

              <p className="text-muted-putih text-sm sm:text-base leading-relaxed max-w-xl">
                {WORKFLOW_STEPS[activeStep].desc}
              </p>
            </div>

            {/* PIPELINE PROGRESS BAR */}
            <div className="pt-10">
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-red-600 h-full transition-all duration-500"
                  style={{ width: `${((activeStep + 1) / WORKFLOW_STEPS.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs text-subtle-putih mt-3 font-medium">
                <span>Langkah {activeStep + 1} dari {WORKFLOW_STEPS.length}</span>
                <span>Alur Otentikasi ICS</span>
              </div>
            </div>

          </div>

          {/* STEP NAVIGATION CONTROLS (CARD PUTIH INTERAKTIF) */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            {WORKFLOW_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-card-hitam border-red-500/60 shadow-lg'
                      : 'bg-card-putih border-line-putih hover:border-red-500/30 text-muted-hitam hover:text-foreground-hitam'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                      isActive
                        ? 'bg-red-600 text-white'
                        : 'bg-elevated-putih text-muted-hitam'
                    }`}
                  >
                    {step.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-bold truncate ${
                        isActive ? 'text-foreground-putih' : 'text-foreground-hitam'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  <StepIcon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-subtle-hitam'}`} />
                </button>
              );
            })}
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: KATEGORI KOLEKSI (ECOSYSTEM EXPANSION - DARI companyData)      */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-line-putih-soft">

        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">
            ECOSYSTEM EXPANSION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground-hitam">
            Kategori Koleksi yang Didukung & Segera Hadir
          </h2>
          <p className="text-muted-hitam text-sm sm:text-base leading-relaxed">
            Ekspansi komprehensif untuk melayani seluruh spektrum kolektor hobi bernilai tinggi di Indonesia.
          </p>
        </div>

        {/* 3 CATEGORY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_CATEGORIES_SHOWCASE.map((cat) => {
            const Icon = cat.icon;
            const isFeatured = cat.is_featured;

            return (
              <div
                key={cat.id}
                className={
                  isFeatured
                    ? 'bg-card-hitam border-2 border-red-500/70 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl group hover:border-red-500 transition-all duration-300 backdrop-blur-md'
                    : 'bg-card-putih border border-line-putih rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group hover:border-red-500/30 transition-all duration-300 shadow-xs'
                }
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={
                        isFeatured
                          ? 'p-3 bg-red-600/15 border border-red-500/30 rounded-xl text-red-500'
                          : 'p-3 bg-elevated-putih border border-line-putih rounded-xl text-muted-hitam'
                      }
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={
                        isFeatured
                          ? 'text-[10px] font-bold tracking-widest uppercase bg-red-600 text-white px-2.5 py-1 rounded-full shadow-md'
                          : 'text-[10px] font-bold tracking-widest uppercase bg-elevated-putih text-muted-hitam px-2.5 py-1 rounded-full border border-line-putih'
                      }
                    >
                      {cat.badge_text}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-extrabold mb-2 ${
                      isFeatured ? 'text-foreground-putih' : 'text-foreground-hitam'
                    }`}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed mb-6 ${
                      isFeatured ? 'text-muted-putih' : 'text-muted-hitam'
                    }`}
                  >
                    {cat.description}
                  </p>

                  <div
                    className={
                      isFeatured
                        ? 'bg-elevated-hitam border border-line-hitam-soft rounded-xl p-4 space-y-2 mb-8'
                        : 'bg-elevated-putih border border-line-putih-soft rounded-xl p-4 space-y-2 mb-8'
                    }
                  >
                    <p
                      className={`text-xs font-bold ${
                        isFeatured ? 'text-foreground-putih' : 'text-muted-hitam'
                      }`}
                    >
                      {cat.feature_heading}
                    </p>
                    <ul
                      className={`text-xs space-y-1.5 ${
                        isFeatured ? 'text-muted-putih' : 'text-subtle-hitam'
                      }`}
                    >
                      {cat.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className={isFeatured ? 'text-red-500' : ''}>•</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {cat.cta_href ? (
                  <Link
                    href={cat.cta_href}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {cat.cta_label} <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="w-full bg-elevated-putih hover:opacity-80 border border-line-putih text-foreground-hitam font-medium text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Bell className="w-4 h-4 text-accent" /> {cat.cta_label}
                  </button>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: FINAL CALL TO ACTION BANNER (CARD HITAM KONTRAS)               */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="relative bg-card-hitam border border-line-hitam rounded-3xl px-6 py-20 text-center overflow-hidden shadow-2xl backdrop-blur-md">

          {/* Background Glow Effect */}
          <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-elevated-hitam border border-line-hitam text-[11px] font-bold text-red-400 uppercase tracking-widest">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> JOIN THE STANDARD OF COLLECTORS
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground-putih leading-tight">
              Siap Memberikan Perlindungan & Nilai Maksimal untuk Koleksimu?
            </h2>

            {/* Subheadline */}
            <p className="text-muted-putih text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
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
                className="w-full sm:w-auto bg-elevated-hitam hover:bg-white/10 border border-line-hitam text-foreground-putih font-bold text-sm px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-red-500" /> Cek Biaya Layanan Grading
              </Link>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-subtle-putih pt-6">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-red-500" /> Tanpa Biaya Pendaftaran Registry
              </span>
              <span className="text-subtle-putih hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-red-500" /> Jaminan Enkapsulasi Asli
              </span>
              <span className="text-subtle-putih hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-red-500" /> Drop Point Tersedia di Jakarta, Surabaya & Bandung
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}