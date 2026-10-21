'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Download,
  AlertTriangle,
  Radio,
  Lock,
  Camera,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

export default function CheckIcsPage() {
  const [certInput, setCertInput] = useState('ICS-TR-026184');
  const [activeTab, setActiveTab] = useState<'front' | 'back'>('front');
  const [isSearched, setIsSearched] = useState(true);
  const [isNotFoundState, setIsNotFoundState] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (certInput.trim().toUpperCase() === 'NOTFOUND' || certInput.trim().toUpperCase() === 'INVALID') {
      setIsNotFoundState(true);
    } else {
      setIsNotFoundState(false);
    }
    setIsSearched(true);
  };

  const fillPopularCert = (code: string) => {
    setCertInput(code);
    setIsNotFoundState(false);
    setIsSearched(true);
  };

  return (
    <div className="bg-[#0A0C10] text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. HERO SEARCH HEADER                                                     */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15181F] border border-white/10 text-[11px] font-semibold text-gray-300 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            ENCRYPTED LEDGER & FORENSIC VERIFICATION ENGINE
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Verifikasi Keaslian & <span className="text-red-500">Rekam Jejak Digital</span> ICS
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Masukkan Nomor Sertifikat ICS atau gunakan pemindai QR untuk membuka laporan pemeriksaan resmi dan rekam jejak aset terenkripsi.
          </p>
        </div>

        {/* SEARCH BOX INTERFACE */}
        <div className="bg-[#12151C] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl max-w-4xl mx-auto space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Masukkan Cert ID (Contoh: ICS-TR-026184)"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                className="w-full bg-[#15181F] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/60 transition-colors uppercase font-mono font-bold"
                required
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="flex-1 sm:flex-initial bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 whitespace-nowrap transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Cari Sertifikat
              </button>

              <button
                type="button"
                onClick={() => alert('Membuka Kamera Pemindai QR... (Gunakan smartphone untuk NFC Tap)')}
                className="bg-[#15181F] hover:bg-white/10 border border-white/10 text-gray-300 font-bold text-xs sm:text-sm p-3.5 rounded-xl flex items-center justify-center transition-all"
                title="Scan QR Code via Kamera"
              >
                <Camera className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </form>

          {/* Quick Demo Code Hints */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1 border-t border-white/5">
            <span className="text-gray-500 font-medium">Contoh Demo ID:</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => fillPopularCert('ICS-TR-026184')}
                className="text-[11px] font-mono text-gray-300 hover:text-white bg-[#15181F] px-2.5 py-1 rounded-md border border-white/5 hover:border-red-500/40 transition-colors"
              >
                ICS-TR-026184 (Pokémon)
              </button>
              <button
                onClick={() => fillPopularCert('ICS-AF-009120')}
                className="text-[11px] font-mono text-gray-300 hover:text-white bg-[#15181F] px-2.5 py-1 rounded-md border border-white/5 hover:border-red-500/40 transition-colors"
              >
                ICS-AF-009120 (One Piece)
              </button>
              <button
                onClick={() => fillPopularCert('NOTFOUND')}
                className="text-[11px] font-mono text-rose-400 hover:text-rose-300 bg-rose-950/30 px-2.5 py-1 rounded-md border border-rose-500/30 transition-colors"
              >
                Simulasi Tidak Sah
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SEARCH RESULT: VERIFIED RECORD FOUND STATE                             */}
        {/* ========================================================================= */}
        {isSearched && !isNotFoundState && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Status Banner */}
            <div className="bg-[#12151C] border border-emerald-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">ICS VERIFIED RECORD</h3>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      AUTENTIK & SAH
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Terverifikasi pada Ledger ICS • Status: <strong className="text-emerald-400 font-normal">AKTIF & TERENKAPSI</strong>
                  </p>
                </div>
              </div>

              <div className="text-right text-xs text-gray-400 font-mono self-end sm:self-auto">
                <span className="block text-[10px] text-gray-500 uppercase">Terakhir Di-audit</span>
                <span className="text-white font-semibold">21 OKTOBER 2026, 15:19 WIB</span>
              </div>
            </div>

            {/* Main Result Card */}
            <div className="bg-[#12151C] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Card Photos with Tab Switch */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Image Tab Switcher */}
                  <div className="flex items-center gap-2 bg-[#15181F] p-1 rounded-xl border border-white/5">
                    <button
                      onClick={() => setActiveTab('front')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                        activeTab === 'front'
                          ? 'bg-red-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Tampak Depan
                    </button>
                    <button
                      onClick={() => setActiveTab('back')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                        activeTab === 'back'
                          ? 'bg-red-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Tampak Belakang
                    </button>
                  </div>

                  {/* Photo Display Box */}
                  <div className="relative aspect-[3/4] bg-[#0A0C10] rounded-2xl border border-white/10 p-4 flex items-center justify-center overflow-hidden group">
                    <Image
                      src={
                        activeTab === 'front'
                          ? '/images/home/card1.webp'
                          : '/images/home/card1.webp'
                      }
                      alt="ICS Graded Card Showcase"
                      width={320}
                      height={460}
                      className="object-contain max-h-full drop-shadow-2xl group-hover:scale-[1.03] transition-transform duration-300"
                    />

                    <div className="absolute bottom-3 left-3 right-3 bg-[#15181F]/90 backdrop-blur-md border border-white/10 rounded-xl p-2.5 flex items-center justify-between text-[11px]">
                      <span className="font-mono text-gray-400">CERT: {certInput}</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <Lock className="w-3 h-3" /> SONIC SEALED
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-gray-400 font-mono px-1">
                    <span className="flex items-center gap-1">
                      <Radio className="w-3.5 h-3.5 text-red-500" /> NFC Chip Active
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-red-500" /> Tamper-Proof Seal
                    </span>
                  </div>
                </div>

                {/* Right Column: Verified Specifications */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Title & Collection Name */}
                  <div className="space-y-1.5 border-b border-white/5 pb-5">
                    <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest">
                      REGISTRY ID: #ID-TCG-78291
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                      2025 Pokémon Japanese SV3 Ruler of the Black Flame — Charizard ex #134/185 RR
                    </h2>
                  </div>

                  {/* Score & Category Display */}
                  <div className="bg-[#15181F] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">9.5</span>
                        <span className="text-lg font-black text-emerald-400 tracking-wider">
                          GEM MINT
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Kondisi Kartu Mendekati Sempurna (Near Perfect Condition)
                      </p>
                      <p className="text-[11px] text-amber-400 font-mono mt-0.5">
                        Top 4.2% dari Populasi ICS Terdaftar
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center font-black text-xl shrink-0">
                      10
                    </div>
                  </div>

                  {/* Metadata Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-[#15181F] border border-white/5 rounded-xl p-3">
                      <span className="text-gray-500 text-[10px] block uppercase font-mono">NOMOR SERTIFIKAT</span>
                      <span className="font-bold font-mono text-white mt-0.5 block">{certInput}</span>
                    </div>
                    <div className="bg-[#15181F] border border-white/5 rounded-xl p-3">
                      <span className="text-gray-500 text-[10px] block uppercase font-mono">TANGGAL GRADING</span>
                      <span className="font-bold text-white mt-0.5 block">12 Okt 2026</span>
                    </div>
                    <div className="bg-[#15181F] border border-white/5 rounded-xl p-3">
                      <span className="text-gray-500 text-[10px] block uppercase font-mono">ESTIMASI PASAR</span>
                      <span className="font-bold text-emerald-400 mt-0.5 block">Rp 18.500.000</span>
                    </div>
                    <div className="bg-[#15181F] border border-white/5 rounded-xl p-3">
                      <span className="text-gray-500 text-[10px] block uppercase font-mono">LAB PEMERIKSA</span>
                      <span className="font-bold text-white mt-0.5 block">Lab Forensik JKT</span>
                    </div>
                  </div>

                  {/* 4 Parameter Sub-Grades Bar */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>Sub-Grade Forensik 4 Parameter</span>
                      <span className="text-[10px] text-gray-500 font-mono">Standar ISO/IEC 17025</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Centering */}
                      <div className="bg-[#15181F] border border-white/5 rounded-xl p-3 space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-300">Centering</span>
                          <span className="text-emerald-400">9.5</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[95%]" />
                        </div>
                        <span className="text-[10px] text-gray-500 block font-mono">Precision Laser 55/45</span>
                      </div>

                      {/* Corners */}
                      <div className="bg-[#15181F] border border-white/5 rounded-xl p-3 space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-300">Corners (Sudut)</span>
                          <span className="text-emerald-400">10.0</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[100%]" />
                        </div>
                        <span className="text-[10px] text-gray-500 block font-mono">Zero Fraying (30x)</span>
                      </div>

                      {/* Edges */}
                      <div className="bg-[#15181F] border border-white/5 rounded-xl p-3 space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-300">Edges (Tepi)</span>
                          <span className="text-emerald-400">9.5</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[95%]" />
                        </div>
                        <span className="text-[10px] text-gray-500 block font-mono">Micro factory spec</span>
                      </div>

                      {/* Surface */}
                      <div className="bg-[#15181F] border border-white/5 rounded-xl p-3 space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span className="text-gray-300">Surface (Permukaan)</span>
                          <span className="text-emerald-400">9.0</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[90%]" />
                        </div>
                        <span className="text-[10px] text-gray-500 block font-mono">Print layer micro variance</span>
                      </div>
                    </div>
                  </div>

                  {/* Grader Notes */}
                  <div className="bg-[#15181F] border border-white/5 rounded-2xl p-4 text-xs space-y-1">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block">
                      CATATAN FORENSIK SENIOR GRADER
                    </span>
                    <p className="text-gray-300 italic leading-relaxed">
                      "Minor factory printing variance on upper right edge. Keutuhan foil 99.8% optimal. Struktur kartu sempurna tanpa crease, whitening, scratch, atau denting mekanis."
                    </p>
                  </div>

                  {/* Owner Collector Badge */}
                  <div className="flex items-center justify-between p-3.5 bg-[#15181F] border border-white/5 rounded-2xl text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-500 font-bold flex items-center justify-center">
                        K
                      </div>
                      <div>
                        <span className="text-gray-400 text-[10px] block">PEMILIK TERDAFTAR</span>
                        <strong className="text-white">@KyotoCollector_ID</strong>
                      </div>
                    </div>
                    <Link
                      href="/registry/user/kyoto"
                      className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 text-[11px]"
                    >
                      Lihat Koleksi di Registry <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>

              </div>
            </div>

            {/* Action Buttons Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Tautan rekam jejak digital berhasil disalin!');
                }}
                className="bg-[#12151C] hover:bg-white/10 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
              >
                <Share2 className="w-4 h-4 text-red-500" /> Bagikan Rekam Jejak Digital
              </button>

              <a
                href="#"
                className="bg-[#12151C] hover:bg-white/10 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-red-500" /> Cetak / Unduh Laporan Lengkap (PDF)
              </a>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" /> Laporkan Dugaan Pemalsuan / Fraud
              </a>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. SEARCH RESULT: NOT FOUND / INVALID STATE                               */}
        {/* ========================================================================= */}
        {isSearched && isNotFoundState && (
          <div className="bg-[#12151C] border border-rose-500/50 rounded-3xl p-8 text-center space-y-6 max-w-2xl mx-auto shadow-2xl animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white">
                PERINGATAN: Sertifikat Tidak Terdaftar Dalam Ledger ICS
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Jika nomor sertifikat tidak memunculkan data terverifikasi atau segel slab fisik rusak/terbuka, waspadai indikasi rekondisi atau slab tiruan. Setiap sertifikat resmi ICS tercatat permanen pada ledger tanpa jeda indeks.
              </p>
            </div>

            <div className="bg-[#15181F] border border-white/5 rounded-2xl p-4 text-left text-xs space-y-2 text-gray-300">
              <span className="font-bold text-rose-400 block">Indikasi Potensi Pemalsuan:</span>
              <ul className="space-y-1 text-gray-400 list-disc list-inside">
                <li>Ciri Segel Rusak: Bekas lem perekat bukan sonic weld.</li>
                <li>Chip NFC tidak merespon URL resmi domain `ics.id`.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setCertInput('ICS-TR-026184');
                  setIsNotFoundState(false);
                }}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Coba Cari ID Lain
              </button>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#15181F] hover:bg-white/10 border border-white/10 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all"
              >
                Laporkan Temuan Slab Palsu
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}