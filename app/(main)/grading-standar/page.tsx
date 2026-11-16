'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GRADING_SCALE_LIST } from '@/data/companyData';
import {
  ShieldCheck,
  Microscope,
  Scan,
  Maximize2,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Info,
} from 'lucide-react';

export default function GradingStandardsPage() {
  const [filter, setFilter] = useState<'all' | 'high' | 'mid' | 'low'>('all');

  const filteredGrades = GRADING_SCALE_LIST.filter((item) => {
    if (filter === 'all') return true;
    return item.category_group === filter;
  });

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 md:pt-52 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-elevated-putih border border-line-putih text-[11px] font-semibold text-muted-hitam uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            STANDAR AKREDITASI & FORENSIK KOLEKSI NASIONAL
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground-hitam tracking-tight leading-tight">
            Skala Penilaian Standar <span className="text-accent">ICS (1 - 10)</span>
          </h1>

          <p className="text-muted-hitam text-sm sm:text-base leading-relaxed">
            Penilaian fisik transparan yang diselaraskan dengan standar grading internasional (seperti PSA, BGS, dan CGC) untuk kepastian nilai, likuiditas instan, dan pengakuan global koleksimu.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-muted-hitam bg-card-putih border border-line-putih px-5 py-2.5 rounded-2xl shadow-xs">
            <div className="flex items-center gap-1.5 font-medium text-foreground-hitam">
              <Microscope className="w-4 h-4 text-accent" />
              <span>Parameter & Terminologi Global Terpadu</span>
            </div>
            <span className="text-subtle-hitam hidden sm:inline">•</span>
            <span className="text-xs text-muted-hitam font-mono">
              Harmonisasi: PSA • BGS • CGC
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. GRADE HIERARCHY LIST & FILTER (DARI companyData)                       */}
        {/* ========================================================================= */}
        <div className="space-y-8">
          
          {/* Section Title & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line-putih-soft pb-4">
            <div>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                TINGKATAN KONDISI FISIK
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground-hitam mt-0.5">
                Hierarki Grade ICS Resmi
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-card-putih border border-line-putih p-1 rounded-xl self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-red-600 text-white'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                Semua Grade
              </button>
              <button
                type="button"
                onClick={() => setFilter('high')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'high'
                    ? 'bg-red-600 text-white'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                High (8-10)
              </button>
              <button
                type="button"
                onClick={() => setFilter('mid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'mid'
                    ? 'bg-red-600 text-white'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                Mid (5-7)
              </button>
              <button
                type="button"
                onClick={() => setFilter('low')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  filter === 'low'
                    ? 'bg-red-600 text-white'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                Low (1-4)
              </button>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {filteredGrades.map((item) => (
              <div
                key={item.final_grade}
                className="bg-card-putih border border-line-putih hover:border-red-500/30 rounded-2xl p-6 transition-all duration-200 hover:translate-y-[-1px] group shadow-xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left Column: Grade Number & Details */}
                  <div className="flex items-start gap-5 flex-1">
                    
                    {/* Score Box */}
                    <div className="bg-elevated-putih border border-line-putih rounded-xl p-4 text-center min-w-[90px] shrink-0 group-hover:border-red-500/40 transition-colors">
                      <p className="text-3xl font-black text-foreground-hitam">{item.score_display}</p>
                      <span className={`text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded border block mt-1.5 ${item.badge_bg}`}>
                        {item.grade_label}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-foreground-hitam group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-xs text-subtle-hitam font-mono">
                          • {item.subtitle}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-hitam leading-relaxed max-w-3xl">
                        {item.description}
                      </p>
                    </div>

                  </div>

                  {/* Right Column: Industry Equivalent Tags */}
                  <div className="lg:text-right border-t lg:border-t-0 border-line-putih-soft pt-4 lg:pt-0 shrink-0 space-y-1.5">
                    <span className="inline-block text-[10px] font-bold text-amber-600 dark:text-amber-400/90 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-md">
                      {item.tag}
                    </span>
                    <p className="text-[11px] text-muted-hitam font-mono">
                      Equivalent: <strong className="text-foreground-hitam">{item.psa}</strong> • <strong className="text-foreground-hitam">{item.bgs}</strong> • <strong className="text-foreground-hitam">{item.cgc}</strong>
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. 4 PARAMETER FORENSIK SUB-GRADES (CARD HITAM KONTRAS)                   */}
        {/* ========================================================================= */}
        <div className="bg-card-hitam border border-line-hitam rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl backdrop-blur-md">
          
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-500 uppercase tracking-widest">
              <Scan className="w-3.5 h-3.5" /> FORENSIK OPTIK 4 PILAR
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground-putih">
              4 Parameter Forensik Sub-Grades ICS
            </h2>
            <p className="text-xs sm:text-sm text-muted-putih">
              Setiap kartu diperiksa secara objektif menggunakan mikroskop optik presisi dan instrumen digital terkalibrasi melalui 4 pilar utama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Parameter 1 */}
            <div className="bg-elevated-hitam border border-line-hitam rounded-2xl p-5 space-y-3 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-500">01</span>
                <Maximize2 className="w-4 h-4 text-muted-putih" />
              </div>
              <h3 className="text-base font-bold text-foreground-putih">Centering</h3>
              <p className="text-xs text-muted-putih leading-relaxed">
                Perataan simetri margin cetakan gambar terhadap tepi kartu depan dan belakang dengan toleransi mikron digital (50/50 hingga 60/40).
              </p>
              <div className="pt-2 border-t border-line-hitam-soft flex items-center gap-1.5 text-[10px] text-muted-putih font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Calibrated AI Edge Scanner
              </div>
            </div>

            {/* Parameter 2 */}
            <div className="bg-elevated-hitam border border-line-hitam rounded-2xl p-5 space-y-3 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-500">02</span>
                <Scan className="w-4 h-4 text-muted-putih" />
              </div>
              <h3 className="text-base font-bold text-foreground-putih">Corners</h3>
              <p className="text-xs text-muted-putih leading-relaxed">
                Ketajaman dan keutuhan ke-4 sudut kartu bebas tumpul, fraying, serat terurai, atau benturan impak mikroskopis.
              </p>
              <div className="pt-2 border-t border-line-hitam-soft flex items-center gap-1.5 text-[10px] text-muted-putih font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 30x Optical Zoom Inspection
              </div>
            </div>

            {/* Parameter 3 */}
            <div className="bg-elevated-hitam border border-line-hitam rounded-2xl p-5 space-y-3 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-500">03</span>
                <Layers className="w-4 h-4 text-muted-putih" />
              </div>
              <h3 className="text-base font-bold text-foreground-putih">Edges</h3>
              <p className="text-xs text-muted-putih leading-relaxed">
                Pemeriksaan tepi samping kartu dari bekas potongan pabrik yang kasar, whiteline/chipping, burr, atau dent penanganan.
              </p>
              <div className="pt-2 border-t border-line-hitam-soft flex items-center gap-1.5 text-[10px] text-muted-putih font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Edge Profile Shadowgraph
              </div>
            </div>

            {/* Parameter 4 */}
            <div className="bg-elevated-hitam border border-line-hitam rounded-2xl p-5 space-y-3 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-500">04</span>
                <Sparkles className="w-4 h-4 text-muted-putih" />
              </div>
              <h3 className="text-base font-bold text-foreground-putih">Surface</h3>
              <p className="text-xs text-muted-putih leading-relaxed">
                Kebersihan foil holografis, cetakan pabrik, ketahanan gloss UV, serta deteksi goresan mikro, sidik jari, atau noda kimiawi.
              </p>
              <div className="pt-2 border-t border-line-hitam-soft flex items-center gap-1.5 text-[10px] text-muted-putih font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Multi-Spectrum UV Luminescence
              </div>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-elevated-hitam border border-line-hitam flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-putih">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4 text-red-500 shrink-0" />
              Sub-Grades tercetak langsung di plat label akrilik tahan manipulasi dan tersimpan permanen di ledger digital ICS.
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/70 border border-red-500/35 px-3 py-1 rounded-lg shrink-0">
              ICS DIGITAL ENCAPSULATION CORE
            </span>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. CONVERSION & COMPARISON TABLE (DARI companyData)                       */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
              STANDARISASI SILANG GLOBAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground-hitam">
              Tabel Konversi & Komparasi Internasional
            </h2>
            <p className="text-xs sm:text-sm text-muted-hitam">
              Harmonisasi nilai koleksi ICS terhadap otoritas grading dunia utama untuk menjamin penerimaan pasar kolektor internasional.
            </p>
          </div>

          <div className="bg-card-putih border border-line-putih rounded-2xl overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-line-putih text-[10px] font-bold uppercase tracking-wider text-muted-hitam bg-elevated-putih">
                  <th className="py-4 px-6 text-accent">ICS SKALA</th>
                  <th className="py-4 px-6">KONDISI ICS</th>
                  <th className="py-4 px-6">PSA EQUIVALENT</th>
                  <th className="py-4 px-6">BGS METRIC</th>
                  <th className="py-4 px-6">CGC BENCHMARK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-putih-soft font-mono text-xs">
                {GRADING_SCALE_LIST.map((row) => (
                  <tr key={row.final_grade} className="hover:bg-elevated-putih/70 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-accent">{row.score_display}</td>
                    <td className="py-3.5 px-6 font-sans font-semibold text-foreground-hitam">{row.title}</td>
                    <td className="py-3.5 px-6 text-muted-hitam">{row.psa}</td>
                    <td className="py-3.5 px-6 text-muted-hitam">{row.bgs}</td>
                    <td className="py-3.5 px-6 text-muted-hitam">{row.cgc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. CALL TO ACTION BANNER (CARD HITAM KONTRAS)                             */}
        {/* ========================================================================= */}
        <div className="bg-card-hitam border border-line-hitam rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[220px] bg-red-600/15 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground-putih leading-tight">
              Ingin Tahu Berapa Nilai Grade Kartu Koleksimu?
            </h2>

            <p className="text-xs sm:text-sm text-muted-putih leading-relaxed">
              Ajukan penilaian fisik kartu favoritmu atau buat katalog inventaris digital secara gratis di ICS Registry.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/pricing"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Cek Tarif & Paket Grading <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto bg-elevated-hitam hover:bg-white/10 border border-line-hitam text-foreground-putih font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl transition-all"
              >
                Buka ICS Digital Registry
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}