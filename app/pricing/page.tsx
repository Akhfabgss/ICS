'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Package,
  Coins,
  Sparkles,
  BookOpen,
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

  const categories = [
    { id: 'tcg', label: 'Card / TCG', icon: CreditCard, active: true },
    { id: 'figure', label: 'Action Figure', icon: Package, active: false },
    { id: 'coins', label: 'Coins & Banknotes', icon: Coins, active: false },
    { id: 'photocard', label: 'Photocard', icon: Sparkles, active: false },
    { id: 'comics', label: 'Comic & Games', icon: BookOpen, active: false },
  ];

  const faqs = [
    {
      q: 'Apa perbedaan mendasar Founder\'s Batch vs Standard?',
      a: 'Founder\'s Batch adalah paket perkenalan berkuota terbatas (20–30 kartu awal) dengan harga promo Rp150.000 untuk membangun portofolio awal. Layanan Standard (Rp199.000) adalah tarif operasional reguler dengan jaminan pengerjaan yang stabil.',
    },
    {
      q: 'Berapa lama estimasi pengerjaan untuk masing-masing tier?',
      a: 'SLA Standard membutuhkan waktu 14–21 hari kerja. Untuk tier Priority (Rp249.000), estimasi pengerjaan dipercepat menjadi 3–7 hari kerja.',
    },
    {
      q: 'Kapan kategori Action Figure dan lainnya dibuka?',
      a: 'Kategori Action Figure dijadwalkan masuk tahap beta pada Q3 2026. Anda dapat mendaftarkan email di halaman Services untuk notifikasi awal.',
    },
    {
      q: 'Apakah ada jaminan kartu saya mendapatkan grade 10?',
      a: 'Tidak. ICS melakukan penilaan secara independen dan objektif berdasarkan kriteria fisik asli tanpa dipengaruhi oleh permintaan pelanggan atau harga pasar kartu.',
    },
  ];

  return (
    <div className="bg-[#0A0C10] text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15181F] border border-white/10 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
            STRUKTUR TARIF TERBUKA & RESMI ICS
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Pilih Kategori & <span className="text-red-500">Paket Grading</span> Koleksimu
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Tanpa biaya langganan. Dapatkan sertifikasi fisik premium dan rekam jejak digital tepercaya untuk setiap aset koleksi.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. CATEGORY TABS (TCG ACTIVE, OTHERS DISABLED)                            */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                disabled={!cat.active}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  cat.active
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 cursor-default'
                    : 'bg-[#12151C] border border-white/5 text-gray-500 cursor-not-allowed opacity-60'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{cat.label}</span>
                {!cat.active && (
                  <span className="text-[9px] bg-white/5 text-gray-500 px-1.5 py-0.5 rounded uppercase font-semibold">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. PRICING CARDS GRID (CLEAN & REFINED)                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* TIER 1: FOUNDER'S BATCH */}
          <div className="bg-[#12151C] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                  KUOTA TERBATAS
                </span>
                <span className="text-xs text-gray-500 font-mono">BATCH 01</span>
              </div>

              <h3 className="text-xl font-extrabold text-white">ICS Founder's Batch</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed min-h-[36px]">
                Cocok untuk 20–30 kartu pertama. Membantu menguji proses operasional dan membangun portofolio awal.
              </p>

              <div className="my-6 pt-4 border-t border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">Rp 150.000</span>
                  <span className="text-xs text-gray-500 font-medium">/ kartu</span>
                </div>
                <p className="text-[11px] text-amber-400/80 mt-1">SLA Pengerjaan Perkenalan</p>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Grading & Inspeksi 4 Parameter (Centering, Corners, Edges, Surface)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Slab Akrilik Pelindung + Label Unik ICS</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Nomor Sertifikat & QR Code Verification</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Pencatatan Permanen di Database Digital ICS</span>
                </li>
              </ul>
            </div>

            <Link
              href="/order/founders"
              className="w-full bg-[#15181F] hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              Pesan Tier Founder's <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* TIER 2: STANDARD (FEATURED) */}
          <div className="bg-[#12151C] border-2 border-red-500/70 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl shadow-red-950/30 hover:border-red-500 transition-all duration-200">
            
            {/* Featured Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md">
              RECOMMENDED / UTAMA
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-md">
                  LAYANAN STANDAR
                </span>
                <span className="text-xs text-gray-400 font-mono">14–21 HARI</span>
              </div>

              <h3 className="text-xl font-extrabold text-white">ICS Standard</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed min-h-[36px]">
                Layanan grading standar yang disarankan dengan proses operasional yang stabil, presisi, dan konsisten.
              </p>

              <div className="my-6 pt-4 border-t border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">Rp 199.000</span>
                  <span className="text-xs text-gray-500 font-medium">/ kartu</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">Standard Turnaround (14–21 Hari Kerja)</p>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Semua fitur yang ada di Founder's Batch</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Stiker Segel Hologram Keamanan (Anti-Tamper)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Tag Dual NFC & QR Code Verification</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Foto Dokumentasi HD Forensik di Database ICS</span>
                </li>
              </ul>
            </div>

            <Link
              href="/order/standard"
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              Pesan Paket Standard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* TIER 3: PRIORITY */}
          <div className="bg-[#12151C] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-200">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">
                  EXPRESS SLA
                </span>
                <span className="text-xs text-gray-400 font-mono">3–7 HARI</span>
              </div>

              <h3 className="text-xl font-extrabold text-white">ICS Priority</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed min-h-[36px]">
                Layanan prioritas bagi kamu yang membutuhkan proses pengerjaan dan penyelesaian lebih cepat.
              </p>

              <div className="my-6 pt-4 border-t border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">Rp 249.000</span>
                  <span className="text-xs text-gray-500 font-medium">/ kartu</span>
                </div>
                <p className="text-[11px] text-blue-400/80 mt-1">Priority Turnaround (3–7 Hari Kerja)</p>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Semua fitur lengkap di paket Standard</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Antrean Pengerjaan Prioritas (SLA Tercepat)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Penanganan Khusus Aset Koleksi Bernilai Tinggi</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>Notifikasi Pembaruan Status Real-Time via WA/Email</span>
                </li>
              </ul>
            </div>

            <Link
              href="/order/priority"
              className="w-full bg-[#15181F] hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              Pesan Paket Priority <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. GENERAL NOTES & POLICIES                                               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="bg-[#12151C] border border-white/5 rounded-xl p-5 flex items-start gap-3">
            <Truck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Logistik & Ongkos Kirim</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Biaya di atas belum termasuk ongkos kirim ke dan dari markas ICS. Opsi Drop Point resmi tersedia di kota-kota besar.
              </p>
            </div>
          </div>

          <div className="bg-[#12151C] border border-white/5 rounded-xl p-5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Objektivitas & Independensi</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Penilaian dilakukan secara independen dan objektif sesuai kriteria fisik asli barang tanpa pengaruh harga pasar.
              </p>
            </div>
          </div>

          <div className="bg-[#12151C] border border-white/5 rounded-xl p-5 flex items-start gap-3">
            <Database className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Database Digital Permanen</h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Seluruh item yang di-grade otomatis tercatat di database digital ICS secara permanen tanpa biaya bulanan apa pun.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. FREQUENTLY ASKED QUESTIONS (FAQ)                                       */}
        {/* ========================================================================= */}
        <div className="max-w-7xl mx-auto pt-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
              TRANSPARENCY & BILLING
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Pertanyaan Seputar Biaya & Paket Grading
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Penjelasan lengkap mengenai pilihan tier, jangka waktu pengerjaan, dan jaminan transparansi penilaian.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#12151C] border border-white/10 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between text-xs sm:text-sm font-bold text-white hover:text-red-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-red-500' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. CALL TO ACTION BANNER                                                  */}
        {/* ========================================================================= */}
        <div className="bg-[#12151C] border border-white/10 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[220px] bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-[10px] font-bold text-red-400 uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5" /> BULK & DEALER INQUIRIES
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Siap Memberikan Identitas & Perlindungan Terbaik untuk Koleksimu?
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
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
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#15181F] hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-red-500" /> Hubungi CS untuk Order Jumlah Banyak (Bulk)
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-500 pt-4">
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