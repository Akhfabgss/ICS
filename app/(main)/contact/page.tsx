'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Building2,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 md:pt-52 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-elevated-putih border border-line-putih text-[11px] font-semibold text-muted-hitam uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5 text-accent" />
            HUBUNGI TIM KAMI
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground-hitam tracking-tight leading-tight">
            Ada Pertanyaan Seputar <span className="text-accent">Grading & Submisi?</span>
          </h1>

          <p className="text-muted-hitam text-sm sm:text-base leading-relaxed">
            Tim konsultan dan penilai forensik ICS siap membantu kebutuhan otentikasi, informasi layanan bulk order, hingga asistensi drop point.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN CONTACT SECTION (FORM + INFO CARDS)                                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: CONTACT INFO & QUICK ACCESS (CARD HITAM KONTRAS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="bg-card-hitam border border-line-hitam rounded-2xl p-6 space-y-6 shadow-2xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-foreground-putih border-b border-line-hitam-soft pb-3">
                Saluran Kontak Resmi
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Phone & WA */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-elevated-hitam border border-line-hitam text-red-500 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-subtle-putih text-[10px] block uppercase font-mono">Layanan WhatsApp & Hotline</span>
                    <a
                      href="https://wa.me/625693228743"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-foreground-putih hover:text-red-400 transition-colors"
                    >
                      +62 856-9322-8743
                    </a>
                    <p className="text-[11px] text-muted-putih mt-0.5">Respons cepat jam 09:00 - 18:00 WIB</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-elevated-hitam border border-line-hitam text-red-500 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-subtle-putih text-[10px] block uppercase font-mono">Email Resmi Support</span>
                    <a
                      href="mailto:ics.official.registry@gmail.com"
                      className="font-bold text-foreground-putih hover:text-red-400 transition-colors"
                    >
                      ics.official.registry@gmail.com
                    </a>
                    <p className="text-[11px] text-muted-putih mt-0.5">Untuk pertanyaan kemitraan & bulk submission</p>
                  </div>
                </div>

                {/* Main Lab Address */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-elevated-hitam border border-line-hitam text-red-500 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-subtle-putih text-[10px] block uppercase font-mono">Markas & Lab Forensik ICS</span>
                    <p className="font-bold text-foreground-putih leading-snug">
                      Bogor & Jakarta, Indonesia
                    </p>
                    <p className="text-[11px] text-muted-putih mt-0.5">Menerima kiriman ekspedisi & drop-off terjadwal.</p>
                  </div>
                </div>

                {/* Lab Operational Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-elevated-hitam border border-line-hitam text-red-500 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-subtle-putih text-[10px] block uppercase font-mono">Jam Operasional Laboratorium</span>
                    <p className="font-bold text-foreground-putih">Senin – Jumat: 09:00 – 17:00 WIB</p>
                    <p className="text-[11px] text-muted-putih mt-0.5">Sabtu, Minggu & Hari Libur Nasional: Tutup</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct WhatsApp CS Banner (CARD HITAM DENGAN AKSEN EMERALD) */}
            <div className="bg-card-hitam border border-emerald-500/40 rounded-2xl p-6 space-y-3 shadow-xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/15 blur-2xl rounded-full pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  CUSTOMER SERVICE FAST RESPONSE
                </div>
                <h4 className="text-base font-extrabold text-foreground-putih">
                  Butuh Bantuan Konsultasi Cepat?
                </h4>
                <p className="text-xs text-muted-putih leading-relaxed">
                  Langsung terhubung dengan Tim Support ICS via WhatsApp untuk estimasi grade awal atau status pengiriman kartu.
                </p>
                <a
                  href="https://wa.me/625693228743"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl inline-flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/50"
                >
                  Chat Via WhatsApp CS
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CONTACT FORM (CARD PUTIH) */}
          <div className="lg:col-span-7">
            <div className="bg-card-putih border border-line-putih rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
              
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-3xl rounded-full pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-extrabold text-foreground-hitam">Kirim Pesan ke Tim ICS</h3>
                  <p className="text-xs sm:text-sm text-muted-hitam mt-1">
                    Isi formulir di bawah ini dan kami akan membalas via email dalam waktu 1x24 jam kerja.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-foreground-hitam">Pesan Anda Terkirim!</h4>
                    <p className="text-xs text-muted-hitam">
                      Terima kasih telah menghubungi ICS. Tim konsultan kami akan segera meninjau pesan Anda.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground-hitam">Nama Lengkap *</label>
                        <input
                          type="text"
                          required
                          placeholder="Masukkan nama Anda"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-elevated-putih border border-line-putih rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground-hitam">Alamat Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="nama@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-elevated-putih border border-line-putih rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone & Subject Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground-hitam">Nomor WhatsApp / HP</label>
                        <input
                          type="tel"
                          placeholder="0812xxxxxxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-elevated-putih border border-line-putih rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground-hitam">Kategori Pertanyaan *</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-elevated-putih border border-line-putih rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground-hitam focus:outline-none focus:border-red-500/60 transition-colors"
                        >
                          <option value="general">Pertanyaan General & Prosedur</option>
                          <option value="bulk">Submisi Volume Besar (Bulk Order)</option>
                          <option value="status">Status Pengerjaan Grading</option>
                          <option value="verify">Kendala Verifikasi Sertifikat</option>
                          <option value="partnership">Kemitraan & Dealer Program</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground-hitam">Pesan / Detail Pertanyaan *</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tuliskan detail pertanyaan atau daftar koleksi yang ingin Anda koordinasikan..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-elevated-putih border border-line-putih rounded-xl p-4 text-xs sm:text-sm text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      Kirim Pesan Sekarang <Send className="w-4 h-4" />
                    </button>

                    <p className="text-[11px] text-subtle-hitam text-center pt-1">
                      Data Anda aman bersama ICS. Kami tidak pernah membagikan email Anda ke pihak ketiga.
                    </p>

                  </form>
                )}

              </div>

            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. DROP POINTS & LOCATION HINT (CARD PUTIH)                               */}
        {/* ========================================================================= */}
        <div className="bg-card-putih border border-line-putih rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line-putih-soft pb-4">
            <div>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                OFFICIAL DROP POINTS & HUB
              </span>
              <h2 className="text-2xl font-extrabold text-foreground-hitam mt-0.5">
                Drop Point Resmi ICS
              </h2>
            </div>
            <span className="text-xs text-muted-hitam">
              Penyerahan fisik barang koleksi secara langsung
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            
            {/* Hub 1 */}
            <div className="bg-elevated-putih border border-line-putih-soft rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-accent font-bold">
                <Building2 className="w-4 h-4" /> Hub Utama Bogor
              </div>
              <p className="text-foreground-hitam font-semibold">
                Jl. Ps. Hewan No.75, RT.01/RW.06, Tanah Sareal, Kota Bogor, Jawa Barat 16162
              </p>
              <p className="text-muted-hitam leading-relaxed text-xs">
                Tanah Sareal, Kota Bogor. Menerima pengiriman ekspedisi paket kilat.
              </p>
            </div>

            {/* Hub 2 */}
            <div className="bg-elevated-putih border border-line-putih-soft rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-accent font-bold">
                <Building2 className="w-4 h-4" /> Hub Regional Jakarta
              </div>
              <p className="text-foreground-hitam font-semibold">
                Jl. Kudus No.8, RT.7/RW.6, Dukuh Atas, Menteng, Kota Jakarta Pusat, DKI Jakarta 10310
              </p>
              <p className="text-muted-hitam leading-relaxed text-xs">
                Menteng, DKI Jakarta. Penyerahan kartu langsung setiap akhir pekan.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}