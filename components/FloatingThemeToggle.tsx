'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function FloatingThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ics-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ics-theme', 'light');
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Aktifkan Mode Terang' : 'Aktifkan Mode Gelap'}
      title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-card-hitam border border-line-hitam px-4 py-3 text-xs font-bold text-foreground-putih shadow-2xl hover:border-red-500/60 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Mode Terang</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-red-400" />
          <span className="hidden sm:inline">Mode Gelap</span>
        </>
      )}
    </button>
  );
}