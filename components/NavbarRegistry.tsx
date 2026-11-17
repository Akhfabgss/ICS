'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import CollectorAvatar from '@/components/CollectorAvatar';
import {
  Menu,
  X,
  PlusCircle,
  LogIn,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react';

interface CollectorProfile {
  username: string;
  display_name: string;
  avatar_bg: string;
}

export default function NavbarRegistry() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState<CollectorProfile | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Home', href: '/set-registry' },
    { label: 'Katalog', href: '/set-registry/katalog' },
    { label: 'Pop-Report', href: '/set-registry/pop-report' },
    { label: 'Klasemen', href: '/set-registry/klasemen' },
    { label: 'Check ICS', href: '/set-registry/check-ics' },
  ];

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadUserSession() {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) {
        if (isMounted) {
          setProfile(null);
          setAuthChecked(true);
        }
        return;
      }

      // Ambil data lengkap (username, display_name, avatar_bg) dari public.collectors
      const { data: collector } = await supabase
        .from('collectors')
        .select('username, display_name, avatar_bg')
        .eq('user_id', user.id)
        .maybeSingle();

      if (isMounted) {
        if (collector) {
          setProfile({
            username: collector.username.replace(/^@/, ''),
            display_name: collector.display_name || collector.username,
            avatar_bg: collector.avatar_bg,
          });
        } else {
          const fallbackName = (user.user_metadata?.username as string) || 'collector';
          setProfile({
            username: fallbackName.replace(/^@/, ''),
            display_name: (user.user_metadata?.display_name as string) || fallbackName,
            avatar_bg: 'from-indigo-500 to-purple-600',
          });
        }
        setAuthChecked(true);
      }
    }

    loadUserSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setProfile(null);
      } else {
        loadUserSession();
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setDropdownOpen(false);
    setMobileOpen(false);
    router.push('/set-registry');
    router.refresh();
  };

  const checkIsActive = (href: string) => {
    if (href === '/set-registry') {
      return pathname === '/set-registry';
    }
    if (href.includes('#')) {
      return false;
    }
    return pathname.startsWith(href);
  };

  const cleanUsername = profile?.username ? profile.username.replace(/^@/, '') : '';
  const vaultHref = cleanUsername ? `/set-registry/user/${encodeURIComponent(cleanUsername)}` : '/login';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      {/* ===================================================================== */}
      {/* TOP UTILITY BAR: PORTAL SWITCHER                                      */}
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

          {/* Brand Logo + Registry Badge */}
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

          {/* Desktop Navigation Links */}
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

                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-red-600 rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons / User Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {authChecked && profile ? (
              <div className="relative" ref={dropdownRef}>
                {/* Trigger Button dengan Foto, Display Name & Username */}
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-transparent transition-all cursor-pointer"
                >
                  <CollectorAvatar
                    avatarBg={profile.avatar_bg}
                    username={profile.username}
                    sizeClass="w-8 h-8"
                    textSizeClass="text-xs"
                    shapeClass="rounded-xl"
                  />
                  <div className="text-left hidden xl:block">
                    <span className="text-xs font-bold text-foreground-hitam block leading-tight truncate max-w-[120px]">
                      {profile.display_name}
                    </span>
                    <span className="text-[10px] font-mono text-muted-hitam block leading-tight">
                      @{profile.username}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-hitam transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-card-putih border border-line-putih shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-line-putih-soft mb-1">
                      <p className="text-xs font-extrabold text-foreground-hitam truncate">
                        {profile.display_name}
                      </p>
                      <p className="text-[11px] font-mono text-muted-hitam truncate">
                        @{profile.username}
                      </p>
                    </div>

                    <Link
                      href={vaultHref}
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-foreground-hitam hover:bg-elevated-putih transition-colors"
                    >
                      <User className="w-4 h-4 text-accent" /> Profil Saya
                    </Link>

                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfJwltK1BBXswOVU8UOT3nrEbzb-XbQhO0594ozh-i9YRMZNA/viewform?usp=sharing&ouid=102457983179027679383"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-foreground-hitam hover:bg-elevated-putih transition-colors"
                    >
                      <PlusCircle className="w-4 h-4 text-red-600" /> Submit Slab
                    </a>

                    <div className="border-t border-line-putih-soft my-1" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Keluar (Logout)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Tombol Login jika belum masuk */}
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl bg-card-putih hover:bg-elevated-putih border border-line-putih text-xs font-bold text-foreground-hitam hover:text-accent flex items-center gap-1.5 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" /> Masuk
                </Link>
              </>
            )}
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
            {authChecked && profile && (
              <div className="flex items-center gap-3 p-3 bg-card-putih border border-line-putih rounded-2xl mb-2">
                <CollectorAvatar
                  avatarBg={profile.avatar_bg}
                  username={profile.username}
                  sizeClass="w-10 h-10"
                  textSizeClass="text-sm"
                  shapeClass="rounded-xl"
                />
                <div className="overflow-hidden">
                  <p className="text-xs font-extrabold text-foreground-hitam truncate">
                    {profile.display_name}
                  </p>
                  <p className="text-[11px] font-mono text-muted-hitam truncate">
                    @{profile.username}
                  </p>
                </div>
              </div>
            )}

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
              {authChecked && profile ? (
                <Link
                  href={vaultHref}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-card-putih border border-line-putih text-xs font-bold text-foreground-hitam hover:text-accent flex items-center justify-center gap-1"
                >
                  <User className="w-3.5 h-3.5 text-accent" /> Vault Saya
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-card-putih border border-line-putih text-xs font-bold text-foreground-hitam hover:text-accent flex items-center justify-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5" /> Masuk
                </Link>
              )}

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfJwltK1BBXswOVU8UOT3nrEbzb-XbQhO0594ozh-i9YRMZNA/viewform?usp=sharing&ouid=102457983179027679383"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-center rounded-xl bg-red-600 text-white text-xs font-bold flex items-center justify-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Submit Slab
              </a>
            </div>

            {authChecked && profile && (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-600 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <LogOut className="w-3.5 h-3.5" /> Keluar (Logout)
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}