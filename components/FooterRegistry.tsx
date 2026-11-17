import Link from 'next/link';
import {
  Trophy,
  ShieldCheck,
  Database,
  ArrowUpRight,
  Layers,
  Award,
} from 'lucide-react';

export default function FooterRegistry() {
  return (
    <footer className="bg-[#0A0C10] text-white border-t border-line-hitam mt-12">
      <div className="max-w-7xl mx-auto px-6 py-14 space-y-10">

        {/* Top Row: Portal Identity & Ledger Status */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-line-hitam-soft">

          {/* Brand & Description */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo/ICS-logo.png"
                alt="Logo-ICS"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain group-hover:scale-105 transition-transform"
              />

              <div>
                <span className="font-bold text-sm tracking-tight text-foreground-putih block">
                  ICS SET REGISTRY & VAULT
                </span>
                <span className="text-[11px] font-mono text-red-600">
                  Indonesia Collectibles Standar
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-putih leading-relaxed max-w-md">
              Platform katalogisasi digital, pelacakan populasi grade, dan papan peringkat kolektor resmi Indonesia Collectibles Standar. Bangun set impianmu dan verifikasi kepemilikan berbasis Dual-NFC.
            </p>

          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">

            {/* Column 1: Eksplorasi Set */}
            <div className="space-y-3">
              <h4 className="font-bold text-foreground-putih uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-red-500" /> Kategori Set
              </h4>
              <ul className="space-y-2 text-muted-putih">
                <li>
                  <Link href="/set-registry" className="hover:text-foreground-putih transition-colors">
                    Pokémon TCG Sets
                  </Link>
                </li>
                <li>
                  <Link href="/set-registry" className="hover:text-foreground-putih transition-colors">
                    One Piece Card Game
                  </Link>
                </li>
                <li>
                  <Link href="/set-registry" className="hover:text-foreground-putih transition-colors">
                    Yu-Gi-Oh! OCG/TCG
                  </Link>
                </li>
                <li>
                  <Link href="/set-registry" className="hover:text-foreground-putih transition-colors">
                    Magic: The Gathering
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Kompetisi & Poin */}
            <div className="space-y-3">
              <h4 className="font-bold text-foreground-putih uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Klasemen & Vault
              </h4>
              <ul className="space-y-2 text-muted-putih">
                <li>
                  <Link href="/set-registry/klasemen" className="hover:text-foreground-putih transition-colors">
                    Hall of Fame 2026
                  </Link>
                </li>
                <li>
                  <Link href="/grading-standar" className="hover:text-foreground-putih transition-colors">
                    Bobot Poin Grade (1–10)
                  </Link>
                </li>
                <li>
                  <Link href="/set-registry/check-ics" className="hover:text-foreground-putih transition-colors">
                    Verifikasi Serial Slab
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-foreground-putih transition-colors">
                    Klaim Kepemilikan NFC
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Ekosistem ICS */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="font-bold text-foreground-putih uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-red-500" /> Layanan Utama ICS
              </h4>
              <ul className="space-y-2 text-muted-putih">
                <li>
                  <Link href="/" target="_blank" className="hover:text-foreground-putih transition-colors inline-flex items-center gap-1">
                    Beranda ICS Grading
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" target="_blank" className="hover:text-foreground-putih transition-colors">
                    Tarif & Paket Grading
                  </Link>
                </li>
                <li>
                  <Link href="/services" target="_blank" className="hover:text-foreground-putih transition-colors">
                    Katalog Layanan
                  </Link>
                </li>
                <li>
                  <Link href="/contact" target="_blank" className="hover:text-foreground-putih transition-colors">
                    Hubungi Konsultan
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Copyright & Security Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-subtle-putih">
          <p>© 2026 Indonesia Collectibles Standar (ICS) — Set Registry Division. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" /> NXP NTAG 424 Encrypted
            </span>
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-red-500" /> Immutable Ledger
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}