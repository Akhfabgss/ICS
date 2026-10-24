'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Mencegah Hydration Mismatch & deteksi scroll
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Otomatis tutup menu mobile jika rute/halaman berpindah
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Service', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Set Registry', href: '/under-construction' },
    { name: 'Grading Standar', href: '/grading-standar' },
    { name: 'Check ICS', href: '/check-ics' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
          ? 'bg-[#15181F]/95 backdrop-blur-md shadow-lg border-b border-white/5 py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO ICS */}
        <Link href="/" className="flex items-center gap-2 group">
          <div>
            <img src="/images/logo/ICS-Logo.png" alt="Logo-ICS" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
          </div>
        </Link>

        {/* DESKTOP NAVIGATION MENU */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navItems.map((item, idx) => {
            const isActive = mounted && pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-200 py-1 ${isActive
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-red-500'
                  }`}
              >
                {item.name}
                {/* Active Indicator Line */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP BUTTON MASUK & MOBILE HAMBURGER BUTTON */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/login"
            className="hidden sm:inline-block bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 rounded-2xl shadow-lg shadow-red-600/30 hover:shadow-red-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Masuk
          </Link>

          {/* HAMBURGER TOGGLE BUTTON (Hanya muncul di Mobile / Screen < md) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 text-gray-300 hover:text-white bg-[#12151C] border border-white/10 rounded-xl transition-all focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-red-500" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#15181F] border-b border-white/10 px-6 pt-4 pb-6 mt-3 animate-fadeIn space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item, idx) => {
              const isActive = mounted && pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                      ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-red-500" />}
                </Link>
              );
            })}
          </nav>

          {/* Tombol Masuk versi Mobile */}
          <div className="pt-2">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold text-sm py-3 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center transition-all"
            >
              Masuk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}