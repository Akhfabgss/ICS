'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Search,
  Radio,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  PlusCircle,
} from 'lucide-react';

export default function SubmitRegistryPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [certInput, setCertInput] = useState('');
  const [selectedSet, setSelectedSet] = useState('set-pokemon-sv3');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Mock Data Sertifikat yang Ditemukan
  const mockCardData = {
    certId: certInput || 'ICS-TR-026184',
    cardName: 'Charizard ex (Secret Rare) #134/185 RR',
    setName: '2023 Pokémon Japanese SV3 Ruler of the Black Flame',
    grade: '9.5 GEM MINT',
    pointsValue: '+1,850 PTS',
    ownerStatus: 'UNCLAIMED (Tersedia untuk Diklaim)',
    image: '/images/home/card1.jpg',
  };

  const handleVerifyCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;

    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      if (certInput.trim().toUpperCase() === 'INVALID' || certInput.trim().toUpperCase() === 'CLAIMED') {
        setErrorMsg('Sertifikat ini sudah diklaim oleh pemilik lain atau tidak terdaftar di database ICS.');
      } else {
        setStep(2);
      }
    }, 1000);
  };

  const handleClaimSubmit = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
    }, 1200);
  };

  const resetForm = () => {
    setStep(1);
    setCertInput('');
    setErrorMsg('');
  };

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 space-y-10">

        {/* ========================================================================= */}
        {/* 1. TOP BREADCRUMB & STEP INDICATOR                                        */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/set-registry"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-hitam hover:text-accent transition-colors bg-card-putih border border-line-putih px-4 py-2 rounded-xl w-fit shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Set Registry
          </Link>

          {/* Stepper Progress */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span
              className={`px-3 py-1 rounded-lg border font-bold transition-colors ${
                step >= 1
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-elevated-putih text-subtle-hitam border-line-putih-soft'
              }`}
            >
              1. Input ID
            </span>
            <span className="text-subtle-hitam">•</span>
            <span
              className={`px-3 py-1 rounded-lg border font-bold transition-colors ${
                step >= 2
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-elevated-putih text-subtle-hitam border-line-putih-soft'
              }`}
            >
              2. Verifikasi Set
            </span>
            <span className="text-subtle-hitam">•</span>
            <span
              className={`px-3 py-1 rounded-lg border font-bold transition-colors ${
                step === 3
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-elevated-putih text-subtle-hitam border-line-putih-soft'
              }`}
            >
              3. Sukses
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. HERO TITLE                                                             */}
        {/* ========================================================================= */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-soft border border-accent-border text-[11px] font-extrabold text-accent uppercase tracking-widest">
            <PlusCircle className="w-3.5 h-3.5 text-accent" />
            ICS VAULT CLAIM & REGISTRY ASSIGNMENT
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground-hitam tracking-tight leading-tight">
            Klaim Kartu & <span className="text-accent">Tambah ke Set Registry</span>
          </h1>

          <p className="text-muted-hitam text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Masukkan Nomor Sertifikat ICS yang ada pada fisik slab kartu kamu untuk memverifikasi keaslian dan mendaftarkannya ke profil koleksimu.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: INPUT CERTIFICATE ID (CARD PUTIH)                                 */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="bg-card-putih border border-line-putih rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm animate-fadeIn">
            <div className="space-y-2 border-b border-line-putih-soft pb-4">
              <h3 className="text-xl font-extrabold text-foreground-hitam flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-accent" /> Masukkan Cert ID atau Tap NFC
              </h3>
              <p className="text-xs text-muted-hitam">
                Gunakan Cert ID 10 karakter unik yang tertera di label akrilik slab ICS kamu.
              </p>
            </div>

            <form onSubmit={handleVerifyCert} className="space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-subtle-hitam absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Contoh: ICS-TR-026184"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  className="w-full bg-elevated-putih border border-line-putih rounded-2xl pl-12 pr-4 py-4 text-sm text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 font-mono font-bold uppercase transition-colors"
                  required
                />
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-700 dark:text-rose-300 font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full sm:flex-1 bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isVerifying ? 'Memeriksa Database...' : 'Verifikasi Sertifikat'} <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCertInput('ICS-TR-026184');
                    setStep(2);
                  }}
                  className="w-full sm:w-auto bg-elevated-putih hover:bg-gray-200/70 dark:hover:bg-white/10 border border-line-putih text-foreground-hitam font-bold text-xs py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Radio className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Tap via NFC Smartphone
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-line-putih-soft flex items-center justify-between text-xs text-subtle-hitam font-mono">
              <span>Coba Demo Valid ID:</span>
              <button
                type="button"
                onClick={() => setCertInput('ICS-TR-026184')}
                className="text-accent font-bold hover:underline cursor-pointer"
              >
                Gunakan ID Demo ICS-TR-026184
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: CARD PREVIEW (CARD HITAM) & SET ASSIGNMENT (CARD PUTIH)           */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="bg-card-putih border border-line-putih rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm animate-fadeIn">

            {/* Card Found Info Box (CARD HITAM KONTRAS) */}
            <div className="bg-card-hitam border border-emerald-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-6 shadow-xl backdrop-blur-md">
              <div className="w-24 h-32 bg-[#0A0C10] rounded-xl border border-line-hitam p-1.5 flex items-center justify-center shrink-0">
                <Image
                  src={mockCardData.image}
                  alt={mockCardData.cardName}
                  width={90}
                  height={120}
                  className="object-contain max-h-full"
                />
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded">
                    TERVERIFIKASI AUTENTIK
                  </span>
                  <span className="text-xs font-mono text-muted-putih font-bold">{mockCardData.certId}</span>
                </div>

                <h3 className="text-lg font-bold text-foreground-putih">{mockCardData.cardName}</h3>
                <p className="text-xs text-muted-putih">{mockCardData.setName}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs pt-1 font-mono">
                  <span className="text-foreground-putih font-bold">
                    Grade: <strong className="text-emerald-400">{mockCardData.grade}</strong>
                  </span>
                  <span className="text-amber-400 font-bold">Estimasi Poin: {mockCardData.pointsValue}</span>
                </div>
              </div>
            </div>

            {/* Set Selection Options */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-foreground-hitam block">
                Pilih Set Registry Tujuan Untuk Mendaftarkan Kartu Ini:
              </label>

              <select
                value={selectedSet}
                onChange={(e) => setSelectedSet(e.target.value)}
                className="w-full bg-elevated-putih border border-line-putih rounded-xl px-4 py-3.5 text-xs sm:text-sm text-foreground-hitam focus:outline-none focus:border-red-500/60 cursor-pointer"
              >
                <option value="set-pokemon-sv3">2023 Pokémon Japanese SV3 Ruler of the Black Flame (Sesuai Kartu)</option>
                <option value="set-pokemon-151">2023 Pokémon Japanese SV2a Pokémon Card 151</option>
                <option value="vault-only">Simpan di Vault Profil Saja (Tanpa Set Registry)</option>
              </select>

              <p className="text-[11px] text-subtle-hitam leading-relaxed">
                * Kartu yang dimasukkan ke Set Registry resmi akan menambahkan skor total akun kamu di Klasemen Nasional secara otomatis.
              </p>
            </div>

            {/* Confirm Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-line-putih-soft">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto text-xs font-bold text-muted-hitam hover:text-foreground-hitam bg-elevated-putih px-5 py-3 rounded-xl border border-line-putih transition-colors cursor-pointer"
              >
                Ganti Cert ID
              </button>

              <button
                type="button"
                onClick={handleClaimSubmit}
                disabled={isVerifying}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isVerifying ? 'Mengklaim ke Vault...' : 'Klaim & Simpan Kartu'} <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: CLAIM SUCCESS STATE (CARD HITAM KONTRAS)                          */}
        {/* ========================================================================= */}
        {step === 3 && (
          <div className="bg-card-hitam border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl backdrop-blur-md animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                KLAIM SUKSES & DITERBITKAN
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground-putih">
                Kartu Berhasil Ditambahkan ke Vault!
              </h2>
              <p className="text-xs sm:text-sm text-muted-putih leading-relaxed">
                Sertifikat <strong className="text-foreground-putih font-mono">{mockCardData.certId}</strong> sekarang resmi terhubung ke profil akun kamu. Skor registry kamu bertambah <strong className="text-amber-400 font-mono">{mockCardData.pointsValue}</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/set-registry/user/kyoto"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
              >
                Lihat Vault Profil Kamu <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto bg-elevated-hitam hover:bg-white/10 border border-line-hitam text-foreground-putih font-bold text-xs sm:text-sm px-7 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Klaim Kartu Lainnya
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}