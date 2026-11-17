import Link from 'next/link';
import {
  Scale,
  ArrowLeft,
  ShieldCheck,
  FileCheck2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Mail,
} from 'lucide-react';
import { ICS_LEGAL_DATA, type LegalHighlightItem } from '@/data/companyData';

export const metadata = {
  title: 'Syarat & Ketentuan | Indonesia Collectibles Standar (ICS)',
  description:
    'Ketentuan resmi layanan pengujian, penilaian (grading), enkapsulasi sonik, dan ekosistem Set Registry Indonesia Collectibles Standar.',
};

function renderHighlightIcon(iconName: LegalHighlightItem['iconName'], className: string) {
  switch (iconName) {
    case 'shield-check':
      return <ShieldCheck className={`w-4 h-4 shrink-0 ${className}`} />;
    case 'file-check':
      return <FileCheck2 className={`w-4 h-4 shrink-0 ${className}`} />;
    default:
      return <Sparkles className={`w-4 h-4 shrink-0 ${className}`} />;
  }
}

export default function TermsPage() {
  const data = ICS_LEGAL_DATA.terms;

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* 1. BREADCRUMB NAVIGATION */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-hitam hover:text-accent transition-colors bg-card-putih border border-line-putih px-4 py-2 rounded-xl shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>

          <span className="text-[11px] text-muted-hitam bg-elevated-putih border border-line-putih px-3 py-1.5 rounded-lg">
            {data.lastUpdated}
          </span>
        </div>

        {/* 2. HERO BANNER (CARD HITAM KONTRAS) */}
        <div className="bg-card-hitam border border-line-hitam rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/30 text-[10px] font-extrabold text-red-400 uppercase tracking-widest">
              <Scale className="w-3.5 h-3.5" /> {data.badgeText}
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground-putih tracking-tight leading-tight">
              {data.titlePrefix}
              <span className="text-red-500">{data.titleAccent}</span>
            </h1>

            <p className="text-xs sm:text-sm text-muted-putih leading-relaxed">
              {data.description}
            </p>

            {/* Ringkasan Poin Utama */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              {data.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3 flex items-center gap-2.5"
                >
                  {renderHighlightIcon(item.iconName, item.iconColorClass)}
                  <span className="text-[11px] font-semibold text-foreground-putih">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. QUICK JUMP TABLE OF CONTENTS (CARD PUTIH) */}
        <div className="bg-card-putih border border-line-putih rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-hitam block">
            {data.tocHeading}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {data.sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-elevated-putih hover:border-red-500/40 border border-line-putih-soft text-xs font-bold text-foreground-hitam hover:text-accent transition-all"
              >
                <span className="font-mono text-[10px] text-accent bg-accent-soft px-2 py-0.5 rounded">
                  {sec.number}
                </span>
                <span className="truncate">{sec.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* 4. KONTEN PASAL SYARAT & KETENTUAN (CARD PUTIH) */}
        <div className="space-y-6">
          {data.sections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              className="scroll-mt-28 bg-card-putih border border-line-putih rounded-3xl p-6 sm:p-8 shadow-xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-line-putih-soft pb-4">
                <span className="w-9 h-9 rounded-xl bg-accent-soft border border-accent-border text-accent font-mono font-black text-xs flex items-center justify-center shrink-0">
                  {sec.number}
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-foreground-hitam">
                  {sec.title}
                </h2>
              </div>

              <div className="space-y-3">
                {sec.content.map((paragraph, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-hitam leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                    <p>{paragraph}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 5. FOOTER NOTE & KONTAK LEGAL */}
        <div className="bg-card-putih border border-line-putih rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-3.5 max-w-xl">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-foreground-hitam">
                {data.ctaBox.title}
              </h3>
              <p className="text-xs text-muted-hitam leading-relaxed">
                {data.ctaBox.descriptionPrefix}
                <Link
                  href={data.ctaBox.relatedLinkHref}
                  className="text-accent font-bold hover:underline"
                >
                  {data.ctaBox.relatedLinkLabel}
                </Link>
                {data.ctaBox.descriptionSuffix}
              </p>
            </div>
          </div>

          <a
            href={data.ctaBox.buttonHref}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg shadow-red-600/20 transition-all shrink-0"
          >
            <Mail className="w-4 h-4" /> {data.ctaBox.buttonLabel}
          </a>
        </div>

      </div>
    </div>
  );
}