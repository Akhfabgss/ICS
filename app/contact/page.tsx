'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
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
    <div className="bg-[#0A0C10] text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. HERO HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#15181F] border border-white/10 text-[11px] font-semibold text-gray-300 uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5 text-red-500" />
            HUBUNGI TIM TIM KAMI
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ada Pertanyaan Seputar <span className="text-red-500">Grading & Submisi?</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Tim konsultan dan penilai forensik ICS siap membantu kebutuhan otentikasi, informasi layanan bulk order, hingga asistensi drop point.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN CONTACT SECTION (FORM + INFO CARDS)                                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: CONTACT INFO & QUICK ACCESS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="bg-[#12151C] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3">
                Saluran Kontak Resmi
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Phone & WA */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#15181F] border border-white/10 text-red-500 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block uppercase font-mono">Layanan WhatsApp & Hotline</span>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-red-400 transition-colors">
                      +62 812-3456-7890
                    </a>
                    <p className="text-[11px] text-gray-500 mt-0.5">Respons cepat jam 09:00 - 18:00 WIB</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#15181F] border border-white/10 text-red-500 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block uppercase font-mono">Email Resmi Support</span>
                    <a href="mailto:support@ics.id" className="font-bold text-white hover:text-red-400 transition-colors">
                      support@ics.id
                    </a>
                    <p className="text-[11px] text-gray-500 mt-0.5">Untuk pertanyaan kemitraan & bulk submission</p>
                  </div>
                </div>

                {/* Main Lab Address */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#15181F] border border-white/10 text-red-500 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block uppercase font-mono">Markas & Lab Forensik ICS</span>
                    <p className="font-bold text-white leading-snug">
                      Bogor & Jakarta, Indonesia
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Menerima kiriman ekspedisi & drop-off terjadwal.</p>
                  </div>
                </div>

                {/* Lab Operational Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#15181F] border border-white/10 text-red-500 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block uppercase font-mono">Jam Operasional Laboratorium</span>
                    <p className="font-bold text-white">Senin – Jumat: 09:00 – 17:00 WIB</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Sabtu, Minggu & Hari Libur Nasional: Tutup</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct WhatsApp CS Banner */}
            <div className="bg-gradient-to-r from-emerald-950/40 to-[#12151C] border border-emerald-500/30 rounded-2xl p-6 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CUSTOMER SERVICE FAST RESPONSE
              </div>
              <h4 className="text-base font-extrabold text-white">
                Butuh Bantuan Konsultasi Cepat?
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Langsung terhubung dengan Tim Support ICS via WhatsApp untuk estimasi grade awal atau status pengiriman kartu.
              </p>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-xl inline-flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/50"
              >
                Chat Via WhatsApp CS
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-7">
            <div className="bg-[#12151C] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-3xl rounded-full pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Kirim Pesan ke Tim ICS</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Isi formulir di bawah ini dan kami akan membalas via email dalam waktu 1x24 jam kerja.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">Pesan Anda Terkirim!</h4>
                    <p className="text-xs text-gray-300">
                      Terima kasih telah menghubungi ICS. Tim konsultan kami akan segera meninjau pesan Anda.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-300">Nama Lengkap *</label>
                        <input
                          type="text"
                          required
                          placeholder="Masukkan nama Anda"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#15181F] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/60 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-300">Alamat Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="nama@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#15181F] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/60 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone & Subject Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-300">Nomor WhatsApp / HP</label>
                        <input
                          type="tel"
                          placeholder="0812xxxxxxx"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#15181F] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/60 transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-300">Kategori Pertanyaan *</label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-[#15181F] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500/60 transition-colors"
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
                      <label className="text-xs font-bold text-gray-300">Pesan / Detail Pertanyaan *</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tuliskan detail pertanyaan atau daftar koleksi yang ingin Anda koordinasikan..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-[#15181F] border border-white/10 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500/60 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      Kirim Pesan Sekarang <Send className="w-4 h-4" />
                    </button>

                    <p className="text-[11px] text-gray-500 text-center pt-1">
                      Data Anda aman bersama ICS. Kami tidak pernah membagikan email Anda ke pihak ketiga.
                    </p>

                  </form>
                )}

              </div>

            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. DROP POINTS & LOCATION HINT                                            */}
        {/* ========================================================================= */}
        <div className="bg-[#12151C] border border-white/10 rounded-3xl p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                OFFICIAL DROP POINTS & HUB
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-0.5">
                Drop Point Resmi ICS
              </h2>
            </div>
            <span className="text-xs text-gray-400">
              Penyerahan fisik barang koleksi secara langsung
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            {/* Hub 1 */}
            <div className="bg-[#15181F] border border-white/5 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-red-500 font-bold">
                <Building2 className="w-4 h-4" /> Hub Utama Jakarta
              </div>
              <p className="text-gray-300 font-semibold">Gedung Pusat Koleksi Indonesia</p>
              <p className="text-gray-500 leading-relaxed">
                Jakarta Selatan, DKI Jakarta. Menerima pengiriman ekspedisi paket kilat.
              </p>
            </div>

            {/* Hub 2 */}
            <div className="bg-[#15181F] border border-white/5 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-red-500 font-bold">
                <Building2 className="w-4 h-4" /> Hub Regional Bandung
              </div>
              <p className="text-gray-300 font-semibold">Drop Point Komunitas TCG Bandung</p>
              <p className="text-gray-500 leading-relaxed">
                Kota Bandung, Jawa Barat. Penyerahan kartu langsung setiap akhir pekan.
              </p>
            </div>

            {/* Hub 3 */}
            <div className="bg-[#15181F] border border-white/5 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-red-500 font-bold">
                <Building2 className="w-4 h-4" /> Hub Regional Surabaya
              </div>
              <p className="text-gray-300 font-semibold">Drop Point Jawa Timur</p>
              <p className="text-gray-500 leading-relaxed">
                Surabaya, Jawa Timur. Layanan penerimaan barang koleksi regional timur.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}