'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import CollectorAvatar from '@/components/CollectorAvatar';
import {
  Search,
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
  ScanLine,
  Cpu,
  FileCheck2,
  Loader2,
} from 'lucide-react';

interface CollectorInfo {
  id: string;
  username?: string;
  display_name?: string;
  full_name?: string;
  avatar_bg?: string | null;
}

interface CollectorInfo {
  id: string;
  username?: string;
  display_name?: string;
  full_name?: string;
}

interface CardRegistryRecord {
  id: string;
  cert_number: string;
  submission_id: string | null;
  card_name: string;
  set_name: string;
  card_number: string | null;
  language: string | null;
  tcg_type: string | null;
  final_grade: number;
  grade_label: string;
  sub_centering: number;
  sub_corners: number;
  sub_edges: number;
  sub_surface: number;
  grader_notes: string | null;
  front_image_url: string;
  back_image_url: string;
  nfc_uid: string | null;
  is_encapsulated: boolean | null;
  is_frozen: boolean | null;
  created_at: string | null;
  collector_id: string | null;
  points: number;
  collectors?: CollectorInfo | null;
}

function CheckIcsContent() {
  const searchParams = useSearchParams();
  const initialCertParam = searchParams.get('cert') || '';

  const [certInput, setCertInput] = useState(initialCertParam);
  const [activeTab, setActiveTab] = useState<'front' | 'back'>('front');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isNotFoundState, setIsNotFoundState] = useState(false);
  const [certData, setCertData] = useState<CardRegistryRecord | null>(null);

  const fetchCertificate = useCallback(async (rawCode: string) => {
    const formattedCode = rawCode.trim().toUpperCase();
    if (!formattedCode) return;

    setIsLoading(true);
    setCertInput(formattedCode);

    const { data, error } = await supabase
      .from('card_registry')
      .select(`
        *,
        collectors (*)
      `)
      .eq('cert_number', formattedCode)
      .maybeSingle();

    setIsLoading(false);
    setIsSearched(true);

    if (error) {
      console.error('Supabase error detail:', error.message, error.code, error.details);
      setCertData(null);
      setIsNotFoundState(true);
      return;
    }

    if (!data) {
      setCertData(null);
      setIsNotFoundState(true);
      return;
    }

    setCertData(data as CardRegistryRecord);
    setIsNotFoundState(false);
  }, []);

  // Otomatis cari jika URL punya ?cert=ICS-TR-638069
  useEffect(() => {
    if (initialCertParam) {
      fetchCertificate(initialCertParam);
    }
  }, [initialCertParam, fetchCertificate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCertificate(certInput);
  };

  const resetSearch = () => {
    setIsSearched(false);
    setIsNotFoundState(false);
    setCertInput('');
    setCertData(null);
  };

  const formatTanggal = (isoString: string | null) => {
    if (!isoString) return '-';
    return new Date(isoString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatAuditTimestamp = (isoString: string | null) => {
    if (!isoString) return 'TERVERIFIKASI LEDGER';
    return new Date(isoString).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).toUpperCase() + ' WIB';
  };

  // Ambil handle kolektor dari relasi tabel collectors
  const collectorHandle = certData?.collectors?.username
    ? certData.collectors.username.startsWith('@')
      ? certData.collectors.username
      : `@${certData.collectors.username}`
    : certData?.collectors?.display_name || certData?.collectors?.full_name || null;

  const collectorSlug = certData?.collectors?.username
    ? certData.collectors.username.replace('@', '')
    : 'kyoto';

  // 1. Tambahkan fungsi helper ini di atas komponen atau di file terpisah
  function resolveCardImageUrl(url: string | null | undefined): string {
    if (!url) return '/images/home/card1.jpg';
    const trimmed = url.trim();
    if (trimmed.startsWith('/')) return trimmed;

    try {
      const parsed = new URL(trimmed);

      // Konversi link Google Drive ke endpoint thumbnail CDN agar bebas blokir CORS/ORB
      if (parsed.hostname === 'drive.google.com' || parsed.hostname === 'docs.google.com') {
        const fileMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/);
        const idParam = parsed.searchParams.get('id');
        const driveId = fileMatch?.[1] || idParam;
        if (driveId) {
          return `https://drive.google.com/thumbnail?id=${driveId}&sz=w800`;
        }
      }

      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return trimmed;
      }
    } catch {
      // Fallback jika bukan URL valid
    }

    return '/images/home/card1.jpg';
  }

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 md:pt-52 pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* ========================================================================= */}
        {/* 1. HERO SEARCH HEADER                                                     */}
        {/* ========================================================================= */}
        <div className="text-center mx-auto space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-elevated-putih border border-line-putih text-[11px] font-semibold text-muted-hitam uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            ENCRYPTED LEDGER & FORENSIC VERIFICATION ENGINE
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground-hitam tracking-tight leading-tight">
            Verifikasi Keaslian & <span className="text-accent">Rekam Jejak Digital</span> ICS
          </h1>

          <p className="text-muted-hitam text-sm sm:text-base leading-relaxed">
            Masukkan Nomor Sertifikat ICS atau gunakan pemindai QR/NFC untuk membuka laporan pemeriksaan resmi dan rekam jejak aset terenkripsi.
          </p>
        </div>

        {/* SEARCH BOX INTERFACE (CARD HITAM KONTRAS) */}
        <div className="bg-card-hitam border border-line-hitam rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md mx-auto space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-muted-putih absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Masukkan Cert ID (Contoh: ICS-TR-638069)"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                className="w-full bg-elevated-hitam border border-line-hitam rounded-xl pl-12 pr-4 py-3.5 text-sm text-foreground-putih placeholder-subtle-putih focus:outline-none focus:border-red-500/60 transition-colors uppercase font-mono font-bold"
                required
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 sm:flex-initial bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 whitespace-nowrap transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Memeriksa...
                  </>
                ) : (
                  'Cari Sertifikat'
                )}
              </button>

              <button
                type="button"
                onClick={() => alert('Membuka Kamera Pemindai QR... (Gunakan smartphone untuk Tap NFC)')}
                className="bg-elevated-hitam hover:bg-white/10 border border-line-hitam text-muted-putih font-bold text-xs sm:text-sm p-3.5 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                title="Scan QR Code via Kamera"
              >
                <Camera className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </form>

          {/* Quick Demo Code Hints */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-line-hitam-soft">
            <span className="text-subtle-putih font-medium">Uji Coba Database Ledger:</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => fetchCertificate('ICS-TR-638069')}
                className="text-[11px] font-mono text-muted-putih hover:text-foreground-putih bg-elevated-hitam px-2.5 py-1 rounded-md border border-line-hitam-soft hover:border-red-500/40 transition-colors cursor-pointer"
              >
                ICS-TR-638069
              </button>
              <button
                type="button"
                onClick={() => fetchCertificate('NOTFOUND')}
                className="text-[11px] font-mono text-rose-400 hover:text-rose-300 bg-rose-950/40 px-2.5 py-1 rounded-md border border-rose-500/30 transition-colors cursor-pointer"
              >
                Simulasi Tidak Sah
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INITIAL PLACEHOLDER STATE (SEBELUM CARI / SCAN)                        */}
        {/* ========================================================================= */}
        {!isSearched && !isLoading && (
          <div className="mx-auto space-y-8 animate-fadeIn">
            <div className="bg-card-hitam border border-line-hitam rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl backdrop-blur-md">
              <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 blur-[120px] pointer-events-none rounded-full" />

              <div className="relative z-10 space-y-6 max-w-xl mx-auto">
                <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-red-600/15 border border-red-500/30 animate-ping" />
                  <div className="w-24 h-24 rounded-full bg-elevated-hitam border border-line-hitam flex items-center justify-center shadow-xl">
                    <ScanLine className="w-10 h-10 text-red-500 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground-putih">
                    Siap Memeriksa Keaslian Koleksimu
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-putih leading-relaxed">
                    Ketik ID Sertifikat di kolom atas atau pemindai chip NFC / QR Code pada slab akrilik ICS untuk mendapatkan data forensik real-time.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card-putih border border-line-putih rounded-2xl p-5 space-y-2 shadow-xs">
                <div className="p-2.5 rounded-xl bg-elevated-putih border border-line-putih text-accent w-fit">
                  <ScanLine className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-foreground-hitam">1. Scan QR atau Tap NFC</h4>
                <p className="text-xs text-muted-hitam leading-relaxed">
                  Tempelkan smartphone pada label slab ICS atau scan QR Code unik yang tertera di sertifikat fisik.
                </p>
              </div>

              <div className="bg-card-putih border border-line-putih rounded-2xl p-5 space-y-2 shadow-xs">
                <div className="p-2.5 rounded-xl bg-elevated-putih border border-line-putih text-accent w-fit">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-foreground-hitam">2. Dekripsi Ledger Digital</h4>
                <p className="text-xs text-muted-hitam leading-relaxed">
                  Sistem langsung mengotentikasi kecocokan tanda tangan kriptografi dengan database pusat ICS.
                </p>
              </div>

              <div className="bg-card-putih border border-line-putih rounded-2xl p-5 space-y-2 shadow-xs">
                <div className="p-2.5 rounded-xl bg-elevated-putih border border-line-putih text-accent w-fit">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-foreground-hitam">3. Tampilan Hasil Forensik</h4>
                <p className="text-xs text-muted-hitam leading-relaxed">
                  Dapatkan transparansi 4 parameter sub-grades, foto resolusi tinggi, dan status enkapsulasi.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. SEARCH RESULT: VERIFIED RECORD FOUND STATE (LIVE DARI card_registry)    */}
        {/* ========================================================================= */}
        {isSearched && !isNotFoundState && certData && (
          <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto">

            {/* Status Banner */}
            <div
              className={`bg-card-hitam border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl backdrop-blur-md ${
                certData.is_frozen ? 'border-amber-500/50' : 'border-emerald-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl border ${
                    certData.is_frozen
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                      : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  }`}
                >
                  {certData.is_frozen ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-foreground-putih">ICS VERIFIED RECORD</h3>
                    {certData.is_frozen ? (
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                        FROZEN / DALAM PENINJAUAN
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                        AUTENTIK & SAH
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-putih mt-0.5">
                    Terverifikasi pada Ledger ICS • Status:{' '}
                    <strong className={certData.is_frozen ? 'text-amber-400 font-normal' : 'text-emerald-400 font-normal'}>
                      {certData.is_encapsulated ? 'Aktif & Sonic Encapsulated' : 'TERDAFTAR (NON-ENCAPSULATED)'}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs text-muted-putih font-mono">
                  <span className="block text-[10px] text-subtle-putih uppercase">Tercatat Pada Ledger</span>
                  <span className="text-foreground-putih font-semibold">{formatAuditTimestamp(certData.created_at)}</span>
                </div>
                <button
                  type="button"
                  onClick={resetSearch}
                  className="p-2 bg-elevated-hitam hover:bg-white/10 border border-line-hitam text-muted-putih hover:text-foreground-putih rounded-xl transition-colors cursor-pointer"
                  title="Cari Lagi"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Result Card */}
            <div className="bg-card-hitam border border-line-hitam rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Card Photos */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2 bg-elevated-hitam p-1 rounded-xl border border-line-hitam-soft">
                    <button
                      type="button"
                      onClick={() => setActiveTab('front')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        activeTab === 'front'
                          ? 'bg-red-600 text-white'
                          : 'text-muted-putih hover:text-foreground-putih'
                      }`}
                    >
                      Tampak Depan
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('back')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        activeTab === 'back'
                          ? 'bg-red-600 text-white'
                          : 'text-muted-putih hover:text-foreground-putih'
                      }`}
                    >
                      Tampak Belakang
                    </button>
                  </div>

                  <div className="relative aspect-[3/4] bg-[#0A0C10] rounded-2xl border border-line-hitam p-4 flex items-center justify-center overflow-hidden group">
                    <Image
                      src={resolveCardImageUrl(
                        activeTab === 'front' ? certData.front_image_url : certData.back_image_url
                      )}
                      alt={certData.card_name}
                      width={320}
                      height={460}
                      unoptimized
                      className="object-contain max-h-full drop-shadow-2xl group-hover:scale-[1.03] transition-transform duration-300"
                    />

                    <div className="absolute bottom-3 left-3 right-3 bg-elevated-hitam/90 backdrop-blur-md border border-line-hitam rounded-xl p-2.5 flex items-center justify-between text-[11px]">
                      <span className="font-mono text-muted-putih">CERT: {certData.cert_number}</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <Lock className="w-3 h-3" /> {certData.is_encapsulated ? 'SONIC SEALED' : 'VERIFIED'}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-muted-putih font-mono px-1">
                    <span className="flex items-center gap-1">
                      <Radio className="w-3.5 h-3.5 text-red-500" />{' '}
                      {certData.nfc_uid ? `NFC: ${certData.nfc_uid}` : 'NFC Chip Active'}
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-red-500" /> Tamper-Proof Seal
                    </span>
                  </div>
                </div>

                {/* Right Column: Verified Specifications */}
                <div className="lg:col-span-7 space-y-6">

                  <div className="space-y-1.5 border-b border-line-hitam-soft pb-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest">
                        {certData.tcg_type || 'TCG'} • {certData.language || 'Japanese'}
                      </span>
                      {certData.card_number && (
                        <span className="text-[10px] font-mono text-muted-putih bg-elevated-hitam px-2 py-0.5 rounded border border-line-hitam-soft">
                          {certData.card_number}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-foreground-putih leading-snug">
                      {certData.set_name} — {certData.card_name}
                      {certData.card_number ? ` ${certData.card_number}` : ''}
                    </h2>
                  </div>

                  {/* Score & Category Display */}
                  <div className="bg-elevated-hitam border border-line-hitam rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-foreground-putih">
                          {Number(certData.final_grade).toFixed(1)}
                        </span>
                        <span className="text-lg font-black text-emerald-400 tracking-wider uppercase">
                          {certData.grade_label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-putih mt-1">
                        Hasil Audit Forensik Resmi Indonesia Card Slab
                      </p>
                      <p className="text-[11px] text-amber-400 font-mono mt-0.5">
                        Registry Score Value: +{certData.points.toLocaleString('id-ID')} PTS
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center font-black text-xl shrink-0">
                      {Number(certData.final_grade) === 10 ? '10' : Number(certData.final_grade).toFixed(1)}
                    </div>
                  </div>

                  {/* Metadata Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3">
                      <span className="text-subtle-putih text-[10px] block uppercase font-mono">NOMOR SERTIFIKAT</span>
                      <span className="font-bold font-mono text-foreground-putih mt-0.5 block truncate">{certData.cert_number}</span>
                    </div>
                    <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3">
                      <span className="text-subtle-putih text-[10px] block uppercase font-mono">TANGGAL GRADING</span>
                      <span className="font-bold text-foreground-putih mt-0.5 block">{formatTanggal(certData.created_at)}</span>
                    </div>
                    <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3">
                      <span className="text-subtle-putih text-[10px] block uppercase font-mono">BAHASA / EDISI</span>
                      <span className="font-bold text-emerald-400 mt-0.5 block">{certData.language || 'Japanese'}</span>
                    </div>
                    <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3">
                      <span className="text-subtle-putih text-[10px] block uppercase font-mono">LAB PEMERIKSA</span>
                      <span className="font-bold text-foreground-putih mt-0.5 block">Lab Forensik JKT</span>
                    </div>
                  </div>

                  {/* 4 Parameter Sub-Grades Bar */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold text-foreground-putih">
                      <span>Sub-Grade Forensik 4 Parameter</span>
                      <span className="text-[10px] text-subtle-putih font-mono">Standar ISO/IEC 17025</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3 space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span className="text-muted-putih">Centering</span>
                          <span className="text-emerald-400">{Number(certData.sub_centering).toFixed(1)}</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${certData.sub_centering * 10}%` }} />
                        </div>
                        <span className="text-[10px] text-subtle-putih block font-mono">Precision Laser Calibration</span>
                      </div>

                      <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3 space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span className="text-muted-putih">Corners (Sudut)</span>
                          <span className="text-emerald-400">{Number(certData.sub_corners).toFixed(1)}</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${certData.sub_corners * 10}%` }} />
                        </div>
                        <span className="text-[10px] text-subtle-putih block font-mono">30x Optical Inspection</span>
                      </div>

                      <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3 space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span className="text-muted-putih">Edges (Tepi)</span>
                          <span className="text-emerald-400">{Number(certData.sub_edges).toFixed(1)}</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${certData.sub_edges * 10}%` }} />
                        </div>
                        <span className="text-[10px] text-subtle-putih block font-mono">Micro Factory Spec</span>
                      </div>

                      <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3 space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span className="text-muted-putih">Surface (Permukaan)</span>
                          <span className="text-emerald-400">{Number(certData.sub_surface).toFixed(1)}</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${certData.sub_surface * 10}%` }} />
                        </div>
                        <span className="text-[10px] text-subtle-putih block font-mono">Foil & Print Layer Check</span>
                      </div>
                    </div>
                  </div>

                  {/* Grader Notes */}
                  {certData.grader_notes && (
                    <div className="bg-elevated-hitam border border-line-hitam-soft rounded-2xl p-4 text-xs space-y-1">
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block">
                        CATATAN FORENSIK SENIOR GRADER
                      </span>
                      <p className="text-muted-putih italic leading-relaxed">
                        &ldquo;{certData.grader_notes}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Owner Collector Badge */}
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between p-3.5 bg-elevated-hitam border border-line-hitam-soft rounded-2xl text-xs">
                    <div className="flex items-center gap-2.5">
                      <CollectorAvatar
                        avatarBg={certData.collectors?.avatar_bg}
                        username={collectorHandle || 'U'}
                        sizeClass="w-8 h-8"
                        textSizeClass="text-xs"
                        shapeClass="rounded-full"
                        fallbackBgClass="bg-red-600/20 text-red-500"
                      />
                      <div>
                        <span className="text-subtle-putih text-[10px] block">PEMILIK TERDAFTAR</span>
                        <strong className="text-foreground-putih">
                          {collectorHandle || 'UNCLAIMED (Belum Diklaim di Registry)'}
                        </strong>
                      </div>
                    </div>

                    {collectorHandle ? (
                      <Link
                        href={`/set-registry/user/${collectorSlug}`}
                        className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 text-[11px] mt-4 md:mt-0 justify-end"
                      >
                        Lihat Koleksi di Registry <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <Link
                        href="/set-registry/submit"
                        className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 text-[11px] mt-4 md:mt-0 justify-end"
                      >
                        Klaim Sertifikat Ini <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>

                </div>

              </div>
            </div>

            {/* Action Buttons Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">

              <a
                href="#"
                className="bg-card-putih hover:bg-elevated-putih border border-line-putih text-foreground-hitam font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-xs"
              >
                <Download className="w-4 h-4 text-accent" /> Cetak / Unduh Laporan Lengkap (PDF)
              </a>

              <a
                href="https://wa.me/625693228743"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
              >
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" /> Laporkan Dugaan Pemalsuan / Fraud
              </a>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. SEARCH RESULT: NOT FOUND / INVALID STATE                               */}
        {/* ========================================================================= */}
        {isSearched && isNotFoundState && (
          <div className="bg-card-hitam border border-rose-500/50 rounded-3xl p-8 text-center space-y-6 max-w-4xl mx-auto shadow-2xl backdrop-blur-md animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-foreground-putih">
                PERINGATAN: Sertifikat &ldquo;{certInput}&rdquo; Tidak Terdaftar Dalam Ledger ICS
              </h3>
              <p className="text-xs sm:text-sm text-muted-putih leading-relaxed">
                Jika nomor sertifikat tidak memunculkan data terverifikasi atau segel slab fisik rusak/terbuka, waspadai indikasi rekondisi atau slab tiruan. Setiap sertifikat resmi ICS tercatat permanen pada ledger tanpa jeda indeks.
              </p>
            </div>

            <div className="bg-elevated-hitam border border-line-hitam-soft rounded-2xl p-4 text-left text-xs space-y-2 text-muted-putih">
              <span className="font-bold text-rose-400 block">Indikasi Potensi Pemalsuan:</span>
              <ul className="space-y-1 text-muted-putih list-disc list-inside">
                <li>Ciri Segel Rusak: Bekas lem perekat bukan sonic weld.</li>
                <li>Chip NFC tidak merespon URL resmi domain `ics.id`.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={resetSearch}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Coba Cari ID Lain
              </button>
              <a
                href="https://wa.me/625693228743"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-elevated-hitam hover:bg-white/10 border border-line-hitam text-foreground-putih font-bold text-xs px-6 py-3 rounded-xl transition-all"
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

export default function CheckIcsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface pt-40 text-center text-muted-hitam text-sm">Memuat mesin verifikasi...</div>}>
      <CheckIcsContent />
    </Suspense>
  );
}