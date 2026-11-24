'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShieldCheck,
  Camera,
  ScanLine,
  Cpu,
  FileCheck2,
} from 'lucide-react';

export default function CheckIcsPage() {
  const router = useRouter();
  const [certInput, setCertInput] = useState('');

  const goToCertPage = (rawCode: string) => {
    const formattedCode = rawCode.trim().toUpperCase();
    if (!formattedCode) return;
    router.push(`/check-ics/${encodeURIComponent(formattedCode)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToCertPage(certInput);
  };

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 md:pt-52 pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center mx-auto space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-elevated-putih border border-line-putih text-[11px] font-semibold text-muted-hitam uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            VERIFIKASI RESMI SERTIFIKAT &amp; DATABASE ICS
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground-hitam tracking-tight leading-tight">
            Verifikasi Keaslian &amp; <span className="text-accent">Rekam Jejak Digital</span> ICS
          </h1>

          <p className="text-muted-hitam text-sm sm:text-base leading-relaxed">
            Masukkan Nomor Sertifikat ICS atau gunakan pemindai QR/NFC untuk membuka rincian kartu dan keaslian penilaian resmi.
          </p>
        </div>

        <div className="bg-card-hitam border border-line-hitam rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md mx-auto space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
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
                className="flex-1 sm:flex-initial bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 whitespace-nowrap transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                Cari Sertifikat
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

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-line-hitam-soft">
            <span className="text-subtle-putih font-medium">Contoh Sertifikat:</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => goToCertPage('ICS-TR-638069')}
                className="text-[11px] font-mono text-muted-putih hover:text-foreground-putih bg-elevated-hitam px-2.5 py-1 rounded-md border border-line-hitam-soft hover:border-red-500/40 transition-colors cursor-pointer"
              >
                ICS-TR-638069
              </button>
              <button
                type="button"
                onClick={() => goToCertPage('NOTFOUND')}
                className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/40 px-2.5 py-1 rounded-md border border-rose-500/30 transition-colors cursor-pointer"
              >
                Contoh Tidak Ditemukan
              </button>
            </div>
          </div>
        </div>

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
                  Ketik ID Sertifikat di kolom atas atau scan QR Code / chip NFC pada slab akrilik ICS untuk melihat data sertifikasi resmi.
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
              <h4 className="text-xs font-bold text-foreground-hitam">2. Sinkronisasi Database Resmi</h4>
              <p className="text-xs text-muted-hitam leading-relaxed">
                Sistem mencocokkan nomor sertifikat dan parameter kartu langsung dengan database pusat ICS.
              </p>
            </div>

            <div className="bg-card-putih border border-line-putih rounded-2xl p-5 space-y-2 shadow-xs">
              <div className="p-2.5 rounded-xl bg-elevated-putih border border-line-putih text-accent w-fit">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-foreground-hitam">3. Rincian Hasil Penilaian</h4>
              <p className="text-xs text-muted-hitam leading-relaxed">
                Dapatkan transparansi 4 parameter sub-grades, foto resolusi tinggi, dan status enkapsulasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}