'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  ShieldCheck,
  Mail,
  Lock,
  User,
  AtSign,
  Phone,
  MapPin,
  FileText,
  Camera,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

const AVATAR_GRADIENTS = [
  { label: 'Indigo Purple', value: 'from-indigo-500 to-purple-600' },
  { label: 'Crimson Red', value: 'from-red-600 to-rose-700' },
  { label: 'Amber Gold', value: 'from-amber-500 to-orange-600' },
  { label: 'Emerald Jade', value: 'from-emerald-500 to-teal-700' },
  { label: 'Cyber Blue', value: 'from-sky-500 to-blue-700' },
];

export default function RegistryRegisterPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsappNo, setWhatsappNo] = useState('');
  const [location, setLocation] = useState('Indonesia');
  const [bio, setBio] = useState('');

  const [selectedGradient, setSelectedGradient] = useState(AVATAR_GRADIENTS[0].value);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Format file harus berupa gambar (JPG, PNG, atau WEBP).');
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setErrorMsg('Ukuran maksimal foto profil adalah 3MB.');
      return;
    }

    setErrorMsg(null);
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanUsername = username.replace(/^@/, '').trim().toLowerCase();
    if (!/^[a-z0-9_]{3,24}$/.test(cleanUsername)) {
      setErrorMsg('Username harus 3–24 karakter (huruf kecil, angka, atau garis bawah _ tanpa spasi).');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.');
      return;
    }

    setLoading(true);

    try {
      // 1. Cek ketersediaan username di tabel public.collectors
      const { data: existingUser } = await supabase
        .from('collectors')
        .select('id')
        .ilike('username', cleanUsername)
        .maybeSingle();

      if (existingUser) {
        setErrorMsg(`Username @${cleanUsername} sudah digunakan kolektor lain. Silakan pilih username lain.`);
        setLoading(false);
        return;
      }

      // 2. Upload foto profil jika ada
      let finalAvatarBg = selectedGradient;
      if (avatarFile) {
        const uploadForm = new FormData();
        uploadForm.append('file', avatarFile);
        uploadForm.append('username', cleanUsername);

        const uploadRes = await fetch('/api/upload-avatar', {
          method: 'POST',
          body: uploadForm,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          setErrorMsg(uploadData.error || 'Gagal mengunggah foto profil ke Google Drive.');
          setLoading(false);
          return;
        }
        if (uploadData.url) {
          finalAvatarBg = uploadData.url;
        }
      }

      // 3. Daftarkan akun ke Supabase Authentication
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            username: cleanUsername,
            display_name: displayName.trim(),
          },
        },
      });

      if (signUpError) {
        setErrorMsg(signUpError.message);
        setLoading(false);
        return;
      }

      const authUserId = signUpData.user?.id || null;

      // 4. Simpan data murni ke tabel public.collectors (Tidak menyentuh profiles)
      const { error: insertError } = await supabase.from('collectors').insert({
        user_id: authUserId,
        username: cleanUsername,
        display_name: displayName.trim(),
        whatsapp_no: whatsappNo.trim() || null,
        location: location.trim() || 'Indonesia',
        bio: bio.trim() || null,
        avatar_bg: finalAvatarBg,
      });

      if (insertError) {
        console.error('Insert collectors error:', insertError);
        setErrorMsg(`Akun berhasil dibuat, namun gagal menyimpan profil kolektor: ${insertError.message}`);
        setLoading(false);
        return;
      }

      if (signUpData.session) {
        router.push(`/set-registry/user/${cleanUsername}`);
      } else {
        setSuccessMsg(
          'Pendaftaran berhasil! Silakan cek kotak masuk email kamu untuk verifikasi akun sebelum login.'
        );
      }
    } catch (err) {
      console.error('Register error:', err);
      setErrorMsg('Terjadi kesalahan sistem saat mendaftar. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 pb-20 flex items-center justify-center px-6 transition-colors duration-300">
      <div className="w-full max-w-2xl space-y-6">
        <Link
          href="/set-registry"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-hitam hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Set Registry
        </Link>

        <div className="bg-card-putih border border-line-putih rounded-3xl p-7 sm:p-10 shadow-xl space-y-7">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-accent-soft border border-accent-border text-accent flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground-hitam tracking-tight">
              Daftar Akun Kolektor ICS
            </h1>
            <p className="text-xs text-muted-hitam max-w-md mx-auto leading-relaxed">
              Buat identitas kolektor nasionalmu, hubungkan kartu ber-grade ICS ke brankas digital, dan mulai kumpulkan poin peringkat.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-2.5 text-xs text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-semibold">{successMsg}</p>
                <Link href="/login" className="inline-flex items-center gap-1 font-bold underline">
                  Ke Halaman Login <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="bg-elevated-putih border border-line-putih-soft rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-5">
              <div className="relative shrink-0">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Preview Avatar"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-red-500/50 shadow-md"
                  />
                ) : (
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedGradient} flex items-center justify-center font-black text-2xl text-white shadow-md`}
                  >
                    {(username.replace(/^@/, '').charAt(0) || 'I').toUpperCase()}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-red-600 hover:bg-red-500 text-white p-2 rounded-xl shadow-lg transition-colors cursor-pointer"
                  title="Upload Foto Profil"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="space-y-2 flex-1 text-center sm:text-left">
                <span className="text-xs font-bold text-foreground-hitam block">
                  Foto Profil / Tema Avatar
                </span>
                <p className="text-[11px] text-muted-hitam">
                  Unggah foto profil (maks. 3MB) atau pilih warna gradien avatar:
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  {AVATAR_GRADIENTS.map((grad) => (
                    <button
                      key={grad.value}
                      type="button"
                      onClick={() => {
                        setAvatarFile(null);
                        setAvatarPreview(null);
                        setSelectedGradient(grad.value);
                      }}
                      className={`w-6 h-6 rounded-full bg-gradient-to-br ${grad.value} cursor-pointer transition-transform ${
                        !avatarPreview && selectedGradient === grad.value
                          ? 'ring-2 ring-offset-2 ring-red-600 scale-110'
                          : 'opacity-75 hover:opacity-100'
                      }`}
                      title={grad.label}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-accent hover:underline ml-1 cursor-pointer"
                  >
                    {avatarFile ? 'Ganti Foto' : '+ Upload Foto'}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground-hitam block">
                  Username Handle <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <AtSign className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="kyotocollector_id"
                    className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-3 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground-hitam block">
                  Nama Tampilan / Vault <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Kyoto Vault ID"
                    className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-3 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground-hitam block">
                  Alamat Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kolektor@email.com"
                    className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-3 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground-hitam block">
                  Kata Sandi <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-10 py-3 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-subtle-hitam hover:text-foreground-hitam cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground-hitam block">Nomor WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={whatsappNo}
                    onChange={(e) => setWhatsappNo(e.target.value)}
                    placeholder="0812xxxxxxxx"
                    className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-3 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground-hitam block">Kota / Lokasi</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Jakarta, Indonesia"
                    className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-3 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground-hitam block">Bio Kolektor (Opsional)</label>
              <div className="relative">
                <FileText className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-3.5" />
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Ceritakan fokus koleksi kartu atau figure favoritmu..."
                  className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Mendaftarkan Akun & Profil...
                </>
              ) : (
                <>
                  Buat Akun Kolektor <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-line-putih-soft text-center">
            <p className="text-xs text-muted-hitam">
              Sudah memiliki akun kolektor ICS?{' '}
              <Link href="/login" className="font-bold text-accent hover:underline">
                Masuk ke Vault
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}