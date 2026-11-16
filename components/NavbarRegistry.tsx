'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  PlusCircle,
  User,
} from 'lucide-react';

export default function NavbarRegistry() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/set-registry' },
    { label: 'Katalog', href: '/set-registry/katalog' },
    { label: 'Pop-Report', href: '/set-registry/pop-report' },
    { label: 'Klasemen', href: '/set-registry/klasemen' },
    { label: 'Check ICS', href: '/set-registry/check-ics' },
  ];

  // Cek active route (exact match untuk /set-registry, startsWith untuk sub-halaman)
  const checkIsActive = (href: string) => {
    if (href === '/set-registry') {
      return pathname === '/set-registry';
    }
    if (href.includes('#')) {
      return false; // Anchor link di halaman yang sama
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      {/* ===================================================================== */}
      {/* TOP UTILITY BAR: PORTAL SWITCHER (ALA PSA ECOSYSTEM)                  */}
      {/* ===================================================================== */}
      <div className="bg-card-hitam border-b border-line-hitam-soft text-[11px] text-muted-putih">
        <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono tracking-wider uppercase text-[10px]">
              ICS ECOSYSTEM - <strong className="text-foreground-putih">SET REGISTRY PORTAL</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hover:text-foreground-putih transition-colors flex items-center gap-1 font-medium"
            >
              ICS Grading Utama
            </Link>
            <span className="text-subtle-putih hidden sm:inline">|</span>
            <Link
              href="/pricing"
              className="hidden sm:inline hover:text-foreground-putih transition-colors"
            >
              Ajukan Grading Baru
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MAIN REGISTRY NAVBAR                                                  */}
      {/* ===================================================================== */}
      <nav className="bg-surface/90 backdrop-blur-xl border-b border-line-putih shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* Brand Logo + Registry Badge (Tanpa Nested Link) */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center group" title="Kembali ke Beranda ICS Utama">
              <img
                src="/images/logo/ics-Logo2.png"
                alt="Logo-ICS"
                className="hidden not-dark:block w-12 h-12 sm:w-14 sm:h-14 object-contain group-hover:scale-105 transition-transform"
              />
              <img
                src="/images/logo/ICS-Logo.png"
                alt="Logo-ICS"
                className="hidden dark:block w-12 h-12 sm:w-14 sm:h-14 object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            <Link href="/set-registry" className="flex flex-col group">
              <span className="font-extrabold text-sm tracking-tight text-foreground-hitam group-hover:text-accent transition-colors">
                SET REGISTRY VAULT
              </span>
              <span className="text-[10px] text-subtle-hitam hidden sm:block">
                Indonesia Collectibles Standar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links (Teks Merah + Garis Bawah Merah) */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = checkIsActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-xs font-bold transition-colors group ${
                    isActive
                      ? 'text-accent'
                      : 'text-muted-hitam hover:text-accent'
                  }`}
                >
                  <span>{item.label}</span>

                  {/* Garis Bawah Merah (Active & Hover) */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-red-600 rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* <Link
              href="/check-ics"
              className="p-2.5 rounded-xl bg-card-putih hover:bg-elevated-putih border border-line-putih text-muted-hitam hover:text-accent transition-colors"
              title="Cari Sertifikat Slab"
            >
              <Search className="w-4 h-4" />
            </Link> */}

            {/* Akses ke Profil / Vault Kolektor */}
            <Link
              href="/set-registry/user"
              className="px-4 py-2 rounded-xl bg-card-putih hover:bg-elevated-putih border border-line-putih text-xs font-bold text-foreground-hitam hover:text-accent flex items-center gap-1.5 transition-colors"
            >
              <User className="w-3.5 h-3.5" /> Vault Saya
            </Link>

            {/* Akses ke Form Submit / Klaim Kartu Baru */}
            <Link
              href="/set-registry/submit"
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/25 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Submit Slab
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-card-putih border border-line-putih text-foreground-hitam cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-surface border-b border-line-putih px-6 py-4 space-y-3">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = checkIsActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-2.5 text-xs font-bold border-b border-line-putih-soft transition-colors flex items-center justify-between ${
                      isActive
                        ? 'text-accent border-red-600'
                        : 'text-foreground-hitam hover:text-accent'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <Link
                href="/set-registry/user"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-center rounded-xl bg-card-putih border border-line-putih text-xs font-bold text-foreground-hitam hover:text-accent"
              >
                Vault Saya
              </Link>
              <Link
                href="/set-registry/submit"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-center rounded-xl bg-red-600 text-white text-xs font-bold"
              >
                Submit Slab
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}