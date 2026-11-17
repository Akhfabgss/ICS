'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';

export default function RegistryLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        if (authError.message.toLowerCase().includes('invalid login credentials')) {
          setErrorMsg('Email atau kata sandi salah. Silakan periksa kembali.');
        } else if (authError.message.toLowerCase().includes('email not confirmed')) {
          setErrorMsg('Email belum diverifikasi. Silakan cek kotak masuk email kamu terlebih dahulu.');
        } else {
          setErrorMsg(authError.message);
        }
        setLoading(false);
        return;
      }

      const user = authData.user;
      if (!user) {
        setErrorMsg('Sesi pengguna tidak ditemukan.');
        setLoading(false);
        return;
      }

      // Cari profil kolektor berdasarkan user_id di tabel public.collectors
      const { data: collectorData } = await supabase
        .from('collectors')
        .select('username')
        .eq('user_id', user.id)
        .maybeSingle();

      if (collectorData?.username) {
        const cleanUsername = collectorData.username.replace(/^@/, '');
        router.push(`/set-registry/user/${cleanUsername}`);
      } else {
        // Fallback jika user_id belum terhubung (mis. dari metadata saat register)
        const metaUsername = (user.user_metadata?.username as string) || '';
        if (metaUsername) {
          router.push(`/set-registry/user/${metaUsername.replace(/^@/, '')}`);
        } else {
          router.push('/set-registry');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Terjadi gangguan koneksi saat masuk. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 pb-20 flex items-center justify-center px-6 transition-colors duration-300">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link
          href="/set-registry"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-hitam hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Set Registry
        </Link>

        {/* Auth Card */}
        <div className="bg-card-putih border border-line-putih rounded-3xl p-7 sm:p-9 shadow-xl space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-accent-soft border border-accent-border text-accent flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground-hitam tracking-tight">
              Masuk ke ICS Vault
            </h1>
            <p className="text-xs text-muted-hitam leading-relaxed">
              Kelola koleksi slab bersertifikat, klaim nomor seri baru, dan pantau peringkat nasionalmu.
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground-hitam block">
                Alamat Email
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
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground-hitam">Kata Sandi</label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-10 py-3 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-subtle-hitam hover:text-foreground-hitam cursor-pointer"
                  aria-label="Toggle Password"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Memverifikasi Akun...
                </>
              ) : (
                <>
                  Masuk Sekarang <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Register Link */}
          <div className="pt-4 border-t border-line-putih-soft text-center">
            <p className="text-xs text-muted-hitam">
              Belum punya akun kolektor ICS?{' '}
              <Link href="/register" className="font-bold text-accent hover:underline">
                Daftar Gratis di Sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}