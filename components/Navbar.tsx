'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#15181F]/90 backdrop-blur-md shadow-lg border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO ICS */}
        <Link href="/" className="flex items-center gap-2 group">
          <div>
            <img src="/images/logo/ICS-Logo.png" alt="Logo-ICS" className="w-16 h-16 object-contain" />
          </div>
        </Link>

        {/* NAVIGATION MENU */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item, idx) => {
            // Hanya cocokkan pathname setelah mounted di client side
            const isActive = mounted && pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-200 py-1 ${
                  isActive
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

        {/* BUTTON MASUK */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="bg-red-600 hover:bg-red-500 text-white font-semibold text-sm px-6 py-2.5 rounded-2xl shadow-lg shadow-red-600/30 hover:shadow-red-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Masuk
          </Link>
        </div>
      </div>
    </header>
  );
}