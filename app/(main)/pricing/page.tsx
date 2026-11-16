'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PRICING_CATEGORIES, PRICING_TIERS, PRICING_FAQS } from '@/data/companyData';
import {
  Check,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Truck,
  Database,
  Lock,
  MessageSquare,
} from 'lucide-react';

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 md:pt-52 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-16">

        {/* ========================================================================= */}
        {/* 1. HERO HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-elevated-putih border border-line-putih text-[11px] font-semibold text-muted-hitam uppercase tracking-widest">
            STRUKTUR TARIF TERBUKA & RESMI ICS
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground-hitam tracking-tight leading-tight">
            Pilih Kategori & <span className="text-accent">Paket Grading</span> Koleksimu
          </h1>

          <p className="text-muted-hitam text-sm sm:text-base leading-relaxed">
            Tanpa biaya langganan. Dapatkan sertifikasi fisik premium dan rekam jejak digital tepercaya untuk setiap aset koleksi.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. CATEGORY TABS (DARI companyData)                                       */}
        {/* ========================================================================= */}
        <div className="w-full overflow-x-auto pb-3 pt-1 no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 min-w-max px-4">
            {PRICING_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  disabled={!cat.active}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    cat.active
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 cursor-default'
                      : 'bg-card-putih border border-line-putih-soft text-subtle-hitam cursor-not-allowed opacity-70'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{cat.label}</span>
                  {!cat.active && (
                    <span className="text-[9px] bg-elevated-putih text-subtle-hitam px-1.5 py-0.5 rounded uppercase font-semibold">
                      Soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. PRICING CARDS GRID (DARI companyData)                                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const isFeatured = tier.is_featured;

            const badgeClass =
              tier.badge_style === 'amber'
                ? 'text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 rounded-md'
                : tier.badge_style === 'red'
                ? 'text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/15 border border-red-500/30 px-2.5 py-1 rounded-md'
                : 'text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/25 px-2.5 py-1 rounded-md';

            const slaNoteClass =
              tier.badge_style === 'amber'
                ? 'text-[11px] text-amber-600 dark:text-amber-400/80 mt-1'
                : tier.badge_style === 'red'
                ? 'text-[11px] text-muted-putih mt-1'
                : 'text-[11px] text-blue-600 dark:text-blue-400/80 mt-1';

            return (
              <div
                key={tier.id}
                className={
                  isFeatured
                    ? 'bg-card-hitam border-2 border-red-500/75 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl hover:border-red-500 transition-all duration-200 backdrop-blur-md'
                    : 'bg-card-putih border border-line-putih rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-red-500/30 transition-all duration-200 shadow-xs'
                }
              >
                {isFeatured && tier.featured_label && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md text-center">
                    {tier.featured_label}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={badgeClass}>{tier.badge}</span>
                    <span
                      className={`text-xs font-mono ${
                        isFeatured ? 'text-muted-putih' : 'text-subtle-hitam'
                      }`}
                    >
                      {tier.sla_code}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-extrabold ${
                      isFeatured ? 'text-foreground-putih' : 'text-foreground-hitam'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`text-xs mt-2 leading-relaxed min-h-[36px] ${
                      isFeatured ? 'text-muted-putih' : 'text-muted-hitam'
                    }`}
                  >
                    {tier.description}
                  </p>

                  <div
                    className={`my-6 pt-4 border-t ${
                      isFeatured ? 'border-line-hitam-soft' : 'border-line-putih-soft'
                    }`}
                  >
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-3xl sm:text-4xl font-extrabold ${
                          isFeatured ? 'text-foreground-putih' : 'text-foreground-hitam'
                        }`}
                      >
                        {tier.price_formatted}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isFeatured ? 'text-subtle-putih' : 'text-subtle-hitam'
                        }`}
                      >
                        {tier.unit}
                      </span>
                    </div>
                    <p className={slaNoteClass}>{tier.sla_note}</p>
                  </div>

                  <ul
                    className={`space-y-3 text-xs mb-8 ${
                      isFeatured ? 'text-muted-putih' : 'text-muted-hitam'
                    }`}
                  >
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isFeatured ? 'text-red-500' : 'text-accent'
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={tier.cta_href}
                  className={
                    isFeatured
                      ? 'w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]'
                      : 'w-full bg-elevated-putih hover:opacity-80 border border-line-putih text-foreground-hitam font-bold text-xs sm:text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all'
                  }
                >
                  {tier.cta_label} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 4. GENERAL NOTES & POLICIES (CARD PUTIH)                                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="bg-card-putih border border-line-putih-soft rounded-xl p-5 flex items-start gap-3 shadow-xs">
            <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-foreground-hitam">Logistik & Ongkos Kirim</h4>
              <p className="text-xs text-muted-hitam mt-1 leading-relaxed">
                Biaya di atas belum termasuk ongkos kirim ke dan dari markas ICS. Opsi Drop Point resmi tersedia di kota-kota besar.
              </p>
            </div>
          </div>

          <div className="bg-card-putih border border-line-putih-soft rounded-xl p-5 flex items-start gap-3 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-foreground-hitam">Objektivitas & Independensi</h4>
              <p className="text-xs text-muted-hitam mt-1 leading-relaxed">
                Penilaian dilakukan secara independen dan objektif sesuai kriteria fisik asli barang tanpa pengaruh harga pasar.
              </p>
            </div>
          </div>

          <div className="bg-card-putih border border-line-putih-soft rounded-xl p-5 flex items-start gap-3 shadow-xs">
            <Database className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-foreground-hitam">Database Digital Permanen</h4>
              <p className="text-xs text-muted-hitam mt-1 leading-relaxed">
                Seluruh item yang di-grade otomatis tercatat di database digital ICS secara permanen tanpa biaya bulanan apa pun.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ - DARI companyData)                    */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto pt-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
              TRANSPARENCY & BILLING
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground-hitam">
              Pertanyaan Seputar Biaya & Paket Grading
            </h2>
            <p className="text-xs sm:text-sm text-muted-hitam">
              Penjelasan lengkap mengenai pilihan tier, jangka waktu pengerjaan, dan jaminan transparansi penilaian.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            {PRICING_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-card-putih border border-line-putih rounded-xl overflow-hidden transition-colors shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between text-xs sm:text-sm font-bold text-foreground-hitam hover:text-accent transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-hitam transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-accent' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-muted-hitam leading-relaxed border-t border-line-putih-soft pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. CALL TO ACTION BANNER (CARD HITAM KONTRAS)                             */}
        {/* ========================================================================= */}
        <div className="bg-card-hitam border border-line-hitam rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl backdrop-blur-md">

          <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[220px] bg-red-600/15 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/40 text-[10px] font-bold text-red-400 uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5" /> BULK & DEALER INQUIRIES
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground-putih leading-tight">
              Siap Memberikan Identitas & Perlindungan Terbaik untuk Koleksimu?
            </h2>

            <p className="text-xs sm:text-sm text-muted-putih leading-relaxed">
              Daftarkan kartumu sekarang secara online atau hubungi konsultan kami untuk penanganan koleksi dalam volume besar (bulk submission).
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Daftar Sekarang
              </Link>
              <a
                href="https://wa.me/625693228743"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-elevated-hitam hover:bg-white/10 border border-line-hitam text-foreground-putih font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-red-500" /> Hubungi CS untuk Order Jumlah Banyak (Bulk)
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-subtle-putih pt-4">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" /> Asuransi Pengiriman Aman Brinks
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-red-500" /> Ultrasonic Tamper-Proof Enclosure
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-red-500" /> Rekam Jejak Permanen
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}