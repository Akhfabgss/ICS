'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Microscope,
  Scan,
  Maximize2,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  Info,
} from 'lucide-react';

export default function GradingStandardsPage() {
  const [filter, setFilter] = useState<'all' | 'high' | 'mid' | 'low'>('all');

  const gradeList = [
    {
      score: '10',
      badge: 'PERFECT',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      title: 'Gem Mint / Perfect',
      subtitle: 'Pristine Condition',
      desc: 'Kartu dalam kondisi sempurna tanpa cacat fisik apa pun. Centering sangat presisi (50/50 hingga 55/45), 4 sudut tajam sempurna di bawah 30x optik zoom, tepi bersih bebas whiteline/chipping, dan permukaan mengkilap tanpa noda pabrik.',
      tag: 'Grade Sempurna Kolektor • Investasi Tertinggi',
      psa: 'PSA 10',
      bgs: 'BGS 9.5 - 10',
      cgc: 'CGC 10',
      categoryGroup: 'high',
    },
    {
      score: '9.5',
      badge: 'MINT+',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      title: 'Mint+',
      subtitle: 'Near Perfect',
      desc: 'Kondisi kartu hampir tanpa cela. Hanya memiliki 1 cacat mikroskopis terisolasi (misal centering sedikit bergeser 60/40 atau garis halus cetakan pabrik/print-line yang sangat samar hanya terlihat di bawah sinar UV).',
      tag: 'Top Registry Grade Tier',
      psa: 'PSA 9.5',
      bgs: 'BGS 9.5',
      cgc: 'CGC 9.5',
      categoryGroup: 'high',
    },
    {
      score: '9.0',
      badge: 'MINT',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      title: 'Mint',
      subtitle: 'Superb High-Grade',
      desc: 'Kartu dalam kondisi sangat prima. Memiliki 1 cacat minor yang sangat tipis (seperti spek putih mikro di salah satu sudut), namun secara kasat mata tetap terlihat sempurna dan mempertahankan kilau foil asli.',
      tag: 'High Premium Investment Grade',
      psa: 'PSA 9',
      bgs: 'BGS 9.0',
      cgc: 'CGC 9.0',
      categoryGroup: 'high',
    },
    {
      score: '8.0 - 8.5',
      badge: 'NM-MT',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      title: 'Near Mint / Mint (NM-MT)',
      subtitle: 'Excellent High-Grade',
      desc: 'Kartu tampak sangat bersih. Di bawah pemeriksaan mikroskopik, terlihat 1-2 cacat ringan seperti whiteline tipis di tepi (edges) atau flek halus pada permukaan lapisan foil pelindung.',
      tag: 'Koleksi Terawat Prima',
      psa: 'PSA 8 - 8.5',
      bgs: 'BGS 8 - 8.5',
      cgc: 'CGC 8 - 8.5',
      categoryGroup: 'high',
    },
    {
      score: '7.0',
      badge: 'NM',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      title: 'Near Mint (NM)',
      subtitle: 'High-Grade Condition',
      desc: 'Kartu menunjukkan tanda penanganan fisik sangat minim. Terlihat whiteline ringan di sudut/tepi atau bekas gesekan halus, tanpa ada lipatan (crease) atau kerusakan struktur inti kertas.',
      tag: 'Standar Pasar Binder Klasik',
      psa: 'PSA 7',
      bgs: 'BGS 7.0',
      cgc: 'CGC 7.0',
      categoryGroup: 'mid',
    },
    {
      score: '5.0 - 6.5',
      badge: 'EX / EX-MT',
      badgeBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      title: 'Excellent (EX) / Excellent-Mint (EX-MT)',
      subtitle: 'Mid-Grade / Lightly Played',
      desc: 'Terdapat bekas pemakaian fisik yang jelas terlihat, seperti sudut yang mulai tumpul, pengelupasan warna tipis di tepi, atau goresan halus di permukaan tanpa mengurangi nilai historis kartu.',
      tag: 'Kondisi Kartu Koleksi Vintage',
      psa: 'PSA 5 - 6',
      bgs: 'BGS 5.0 - 6.5',
      cgc: 'CGC 5.0 - 6.5',
      categoryGroup: 'mid',
    },
    {
      score: '3.0 - 4.5',
      badge: 'VG / GOOD',
      badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      title: 'Very Good (VG) / Good (G)',
      subtitle: 'Played Condition',
      desc: 'Kartu menunjukkan bekas penanganan nyata. Terdapat tumpul sudut, fading warna, atau cetakan lipatan halus (minor crease) yang tidak merusak keutuhan struktur lembaran kartu.',
      tag: 'Otentisitas & Preservasi Slab',
      psa: 'PSA 3 - 4',
      bgs: 'BGS 3.0 - 4.5',
      cgc: 'CGC 3.0 - 4.5',
      categoryGroup: 'low',
    },
    {
      score: '1.0 - 2.5',
      badge: 'POOR / FAIR',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      title: 'Poor / Fair',
      subtitle: 'Heavily Damaged',
      desc: 'Kartu mengalami kerusakan fisik signifikan seperti lipatan parah (heavy crease), noda, atau pengelupasan kertas. Keaslian kartu tetap terverifikasi secara forensik dan terlindungi permanen dalam cangkang akrilik.',
      tag: 'Autentikasi Terjamin & Terkunci',
      psa: 'PSA 1 - 2',
      bgs: 'BGS 1.0 - 2.5',
      cgc: 'CGC 1.0 - 2.5',
      categoryGroup: 'low',
    },
  ];

  const filteredGrades = gradeList.filter((item) => {
    if (filter === 'all') return true;
    return item.categoryGroup === filter;
  });

  return (
    <div className="bg-[#0A0C10] text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15181F] border border-white/10 text-[11px] font-semibold text-gray-300 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            STANDAR AKREDITASI & FORENSIK KOLEKSI NASIONAL
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Skala Penilaian Standar <span className="text-red-500">ICS (1 - 10)</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Penilaian fisik transparan yang diselaraskan dengan standar grading internasional (seperti PSA, BGS, dan CGC) untuk kepastian nilai, likuiditas instan, dan pengakuan global koleksimu.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-gray-400 bg-[#12151C] border border-white/10 px-5 py-2.5 rounded-2xl">
            <div className="flex items-center gap-1.5 font-medium text-white">
              <Microscope className="w-4 h-4 text-red-500" />
              <span>Parameter & Terminologi Global Terpadu</span>
            </div>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <span className="text-xs text-gray-400 font-mono">
              Harmonisasi: PSA • BGS • CGC
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. GRADE HIERARCHY LIST & FILTER                                          */}
        {/* ========================================================================= */}
        <div className="space-y-8">
          
          {/* Section Title & Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                TINGKATAN KONDISI FISIK
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                Hierarki Grade ICS Resmi
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-[#12151C] border border-white/10 p-1 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filter === 'all'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Semua Grade
              </button>
              <button
                onClick={() => setFilter('high')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filter === 'high'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                High (8-10)
              </button>
              <button
                onClick={() => setFilter('mid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filter === 'mid'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mid (5-7)
              </button>
              <button
                onClick={() => setFilter('low')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  filter === 'low'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Low (1-4)
              </button>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {filteredGrades.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#12151C] border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-200 hover:translate-y-[-1px] group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left Column: Grade Number & Details */}
                  <div className="flex items-start gap-5 flex-1">
                    
                    {/* Score Box */}
                    <div className="bg-[#15181F] border border-white/10 rounded-xl p-4 text-center min-w-[90px] shrink-0 group-hover:border-red-500/40 transition-colors">
                      <p className="text-3xl font-black text-white">{item.score}</p>
                      <span className={`text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded border block mt-1.5 ${item.badgeBg}`}>
                        {item.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-xs text-gray-400 font-mono">
                          • {item.subtitle}
                        </span>
                      </div>
                      
                      <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
                        {item.desc}
                      </p>
                    </div>

                  </div>

                  {/* Right Column: Industry Equivalent Tags */}
                  <div className="lg:text-right border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0 shrink-0 space-y-1.5">
                    <span className="inline-block text-[10px] font-bold text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md">
                      {item.tag}
                    </span>
                    <p className="text-[11px] text-gray-400 font-mono">
                      Equivalent: <strong className="text-gray-300">{item.psa}</strong> • <strong className="text-gray-300">{item.bgs}</strong> • <strong className="text-gray-300">{item.cgc}</strong>
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. 4 PARAMETER FORENSIK SUB-GRADES                                        */}
        {/* ========================================================================= */}
        <div className="bg-[#12151C] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-8">
          
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-500 uppercase tracking-widest">
              <Scan className="w-3.5 h-3.5" /> FORENSIK OPTIK 4 PILAR
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              4 Parameter Forensik Sub-Grades ICS
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Setiap kartu diperiksa secara objektif menggunakan mikroskop optik presisi dan instrumen digital terkalibrasi melalui 4 pilar utama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Parameter 1 */}
            <div className="bg-[#15181F] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-500">01</span>
                <Maximize2 className="w-4 h-4 text-gray-400" />
              </div>
              <h3 className="text-base font-bold text-white">Centering</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Perataan simetri margin cetakan gambar terhadap tepi kartu depan dan belakang dengan toleransi mikron digital (50/50 hingga 60/40).
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Calibrated AI Edge Scanner
              </div>
            </div>

            {/* Parameter 2 */}
            <div className="bg-[#15181F] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-500">02</span>
                <Scan className="w-4 h-4 text-gray-400" />
              </div>
              <h3 className="text-base font-bold text-white">Corners</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Ketajaman dan keutuhan ke-4 sudut kartu bebas tumpul, fraying, serat terurai, atau benturan impak mikroskopis.
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 30x Optical Zoom Inspection
              </div>
            </div>

            {/* Parameter 3 */}
            <div className="bg-[#15181F] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-500">03</span>
                <Layers className="w-4 h-4 text-gray-400" />
              </div>
              <h3 className="text-base font-bold text-white">Edges</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Pemeriksaan tepi samping kartu dari bekas potongan pabrik yang kasar, whiteline/chipping, burr, atau dent penanganan.
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Edge Profile Shadowgraph
              </div>
            </div>

            {/* Parameter 4 */}
            <div className="bg-[#15181F] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-500">04</span>
                <Sparkles className="w-4 h-4 text-gray-400" />
              </div>
              <h3 className="text-base font-bold text-white">Surface</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Kebersihan foil holografis, cetakan pabrik, ketahanan gloss UV, serta deteksi goresan mikro, sidik jari, atau noda kimiawi.
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Multi-Spectrum UV Luminescence
              </div>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-[#15181F] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4 text-red-500 shrink-0" />
              Sub-Grades tercetak langsung di plat label akrilik tahan manipulasi dan tersimpan permanen di ledger digital ICS.
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/60 border border-red-500/30 px-3 py-1 rounded-lg shrink-0">
              ICS DIGITAL ENCAPSULATION CORE
            </span>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. CONVERSION & COMPARISON TABLE                                          */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
              STANDARISASI SILANG GLOBAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Tabel Konversi & Komparasi Internasional
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Harmonisasi nilai koleksi ICS terhadap otoritas grading dunia utama untuk menjamin penerimaan pasar kolektor internasional.
            </p>
          </div>

          <div className="bg-[#12151C] border border-white/10 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-[#15181F]">
                  <th className="py-4 px-6 text-red-500">ICS SKALA</th>
                  <th className="py-4 px-6">KONDISI ICS</th>
                  <th className="py-4 px-6">PSA EQUIVALENT</th>
                  <th className="py-4 px-6">BGS METRIC</th>
                  <th className="py-4 px-6">CGC BENCHMARK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-xs">
                {gradeList.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-red-400">{row.score}</td>
                    <td className="py-3.5 px-6 font-sans font-semibold text-white">{row.title}</td>
                    <td className="py-3.5 px-6 text-gray-300">{row.psa}</td>
                    <td className="py-3.5 px-6 text-gray-300">{row.bgs}</td>
                    <td className="py-3.5 px-6 text-gray-300">{row.cgc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. CALL TO ACTION BANNER                                                  */}
        {/* ========================================================================= */}
        <div className="bg-[#12151C] border border-white/10 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[220px] bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Ingin Tahu Berapa Nilai Grade Kartu Koleksimu?
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
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
                className="w-full sm:w-auto bg-[#15181F] hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl transition-all"
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