'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import CollectorAvatar from '@/components/CollectorAvatar';
import RegistryCategoryFilter, {
  type ProductCategoryItem,
  matchItemCategory,
  formatSubTypeLabel,
} from '@/components/RegistryCategoryFilter';
import {
  Trophy,
  ArrowLeft,
  Loader2,
  Database,
  Award,
  HelpCircle,
  Crown,
  Medal,
  ArrowRight,
  Info,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

// =========================================================================
// TIPE DATA SESUAI SCHEMA SUPABASE
// =========================================================================
interface CollectorRow {
  id: string;
  user_id: string | null;
  username: string;
  display_name: string;
  avatar_bg: string;
  manual_points: number;
  sets_completed: number;
  badge: string;
}

interface CardRegistryRow {
  id: string;
  final_grade: number;
  collector_id: string | null;
  points: number;
  tcg_type: string | null;
}

interface LeaderboardItem {
  id: string;
  user_id: string | null;
  rank: number;
  username: string;
  rawUsername: string;
  displayName: string;
  totalPoints: number;
  completedSets: number;
  gemMintCount: number;
  badgeColor: string;
  avatarBg: string;
}

export default function KlasemenPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // State Filter Terpusat (Kategori Utama & Sub-Kategori)
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  // State Data Database
  const [loading, setLoading] = useState(true);
  const [collectors, setCollectors] = useState<CollectorRow[]>([]);
  const [cards, setCards] = useState<CardRegistryRow[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategoryItem[]>([]);

  // State Autentikasi Pengguna
  const [authUserId, setAuthUserId] = useState<string | null>(null);

  // 1. Fetch Session Pengguna
  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      setAuthUserId(data?.user?.id || null);
    }
    checkAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUserId(session?.user?.id || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // 2. Fetch Data Klasemen & Kategori
  useEffect(() => {
    let isMounted = true;

    async function fetchLeaderboardData() {
      setLoading(true);
      try {
        const [colRes, cardsRes, catRes] = await Promise.all([
          supabase
            .from('collectors')
            .select('id, user_id, username, display_name, manual_points, sets_completed, badge, avatar_bg'),
          supabase
            .from('card_registry')
            .select('id, final_grade, collector_id, points, tcg_type')
            .eq('is_frozen', false),
          supabase
            .from('product_categories')
            .select('id, name, slug, status, sub_types')
            .eq('status', 'Active')
            .order('name', { ascending: true }),
        ]);

        if (!isMounted) return;

        if (colRes.error) console.error('Error collectors:', colRes.error.message);
        else setCollectors((colRes.data as CollectorRow[]) || []);

        if (cardsRes.error) console.error('Error cards:', cardsRes.error.message);
        else setCards((cardsRes.data as CardRegistryRow[]) || []);

        if (catRes.error) console.error('Error categories:', catRes.error.message);
        else setProductCategories((catRes.data as ProductCategoryItem[]) || []);
      } catch (err) {
        console.error('Unexpected error loading leaderboard:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchLeaderboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Label filter aktif untuk ditampilkan di badge kartu
  const activeFilterLabel = useMemo(() => {
    let catLabel = 'Semua Kategori';
    if (selectedMainCategory !== 'all') {
      const found = productCategories.find((c) => c.slug === selectedMainCategory);
      catLabel = found?.name || selectedMainCategory;
    }

    let subLabel = 'Semua Sub';
    if (selectedSubCategory !== 'all') {
      subLabel = formatSubTypeLabel(selectedSubCategory);
    }

    if (selectedMainCategory === 'all' && selectedSubCategory === 'all') {
      return 'Semua Kategori & Sub';
    }
    if (selectedMainCategory !== 'all' && selectedSubCategory === 'all') {
      return `Kategori: ${catLabel}`;
    }
    if (selectedMainCategory === 'all' && selectedSubCategory !== 'all') {
      return `Sub: ${subLabel}`;
    }
    return `${catLabel} • ${subLabel}`;
  }, [selectedMainCategory, selectedSubCategory, productCategories]);

  // =========================================================================
  // 3. KALKULASI KLASEMEN BERDASARKAN FILTER KATEGORI & SUB-KATEGORI AKTIF
  // =========================================================================
  const fullLeaderboard: LeaderboardItem[] = useMemo(() => {
    const cardStatsByCollector = new Map<string, { cardPoints: number; gemMintCount: number }>();

    cards.forEach((card) => {
      if (!card.collector_id) return;

      // Filter terpusat: kategori utama & sub-kategori
      const isMatch = matchItemCategory(
        card.tcg_type,
        selectedMainCategory,
        selectedSubCategory,
        productCategories
      );
      if (!isMatch) return;

      const current = cardStatsByCollector.get(card.collector_id) || {
        cardPoints: 0,
        gemMintCount: 0,
      };
      current.cardPoints += Number(card.points || 0);
      if (Number(card.final_grade) >= 10) {
        current.gemMintCount += 1;
      }
      cardStatsByCollector.set(card.collector_id, current);
    });

    const ranked = collectors
      .map((c) => {
        const cStats = cardStatsByCollector.get(c.id) || { cardPoints: 0, gemMintCount: 0 };
        const totalPoints = Number(c.manual_points || 0) + cStats.cardPoints;
        const rawUsername = c.username.replace(/^@/, '');

        return {
          id: c.id,
          user_id: c.user_id,
          username: c.username.startsWith('@') ? c.username : `@${c.username}`,
          rawUsername,
          displayName: c.display_name,
          totalPoints,
          completedSets: Number(c.sets_completed || 0),
          gemMintCount: cStats.gemMintCount,
          avatarBg: c.avatar_bg || 'from-indigo-500 to-purple-600',
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints);

    return ranked.map((item, idx) => {
      const rank = idx + 1;
      const badgeColor =
        rank === 1
          ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30'
          : rank === 2
            ? 'text-muted-hitam bg-elevated-putih border-line-putih'
            : rank === 3
              ? 'text-amber-700 dark:text-amber-600 bg-amber-600/10 border-amber-600/30'
              : 'text-subtle-hitam bg-elevated-putih border-line-putih-soft';

      return {
        ...item,
        rank,
        badgeColor,
      };
    });
  }, [collectors, cards, selectedMainCategory, selectedSubCategory, productCategories]);

  // Top 3 Kolektor untuk Highlight Cards
  const topThree = useMemo(() => {
    return fullLeaderboard.slice(0, 3);
  }, [fullLeaderboard]);

  // Filter pencarian username / display name
  const filteredLeaderboard = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return fullLeaderboard;
    return fullLeaderboard.filter(
      (item) =>
        item.username.toLowerCase().includes(q) ||
        item.displayName.toLowerCase().includes(q)
    );
  }, [fullLeaderboard, searchQuery]);

  const displayedLeaderboard = useMemo(() => {
    return filteredLeaderboard.slice(0, 10);
  }, [filteredLeaderboard]);

  // Row Peringkat Saya: HANYA jika authUserId terautentikasi / user sudah login!
  const currentUserRankData = useMemo(() => {
    if (!authUserId || fullLeaderboard.length === 0) return null;
    const found = fullLeaderboard.find(
      (item) => item.user_id === authUserId || item.id === authUserId
    );
    return found || null;
  }, [fullLeaderboard, authUserId]);

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* BREADCRUMB & HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/set-registry"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-hitam hover:text-accent transition-colors bg-card-putih border border-line-putih px-4 py-2 rounded-xl w-fit shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Set Registry
          </Link>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-soft border border-accent-border text-[11px] font-extrabold text-accent uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            KLASEMEN KOLEKTOR TERBAIK
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground-hitam tracking-tight leading-tight">
            Papan Peringkat <span className="text-accent">Kolektor Nasional</span>
          </h1>

          <p className="text-muted-hitam text-xs sm:text-sm leading-relaxed">
            Akumulasi skor portofolio set registry, jumlah kelengkapan master set, dan slab Gem Mint 10 terbanyak di Indonesia.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* KONTROL FILTER KATEGORI & SUB-KATEGORI TERPUSAT (RegistryCategoryFilter)  */}
        {/* Dapat diaktifkan / dihapus pada halaman manapun dengan modular & aman      */}
        {/* ========================================================================= */}
        <RegistryCategoryFilter
          selectedCategory={selectedMainCategory}
          onCategoryChange={setSelectedMainCategory}
          selectedSubType={selectedSubCategory}
          onSubTypeChange={setSelectedSubCategory}
          categories={productCategories}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Cari username kolektor..."
        />

        {/* ========================================================================= */}
        {/* TOP 3 CARDS DI BAGIAN PALING ATAS (PODIUM JUARA 1, 2, DAN 3)              */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line-putih-soft pb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              <h2 className="text-base sm:text-lg font-extrabold text-foreground-hitam">
                Podium 3 Teratas Nasional
              </h2>
            </div>
            <span className="text-[11px] font-bold text-accent bg-accent-soft border border-accent-border px-3 py-1 rounded-full w-fit">
              Filter Aktif: {activeFilterLabel}
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card-putih border border-line-putih rounded-3xl p-6 text-center space-y-4 animate-pulse shadow-xs"
                >
                  <div className="w-16 h-16 rounded-full bg-elevated-putih mx-auto" />
                  <div className="h-4 bg-elevated-putih rounded w-1/2 mx-auto" />
                  <div className="h-8 bg-elevated-putih rounded w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          ) : topThree.length === 0 ? (
            <div className="bg-card-putih border border-line-putih rounded-3xl p-8 text-center text-xs text-muted-hitam">
              Belum ada data kolektor untuk kategori ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* KARTU JUARA 2 (PERAK - POSISI KIRI DI DESKTOP) */}
              {topThree[1] && (
                <div className="order-2 md:order-1 bg-gradient-to-b from-slate-200/50 via-card-putih to-card-putih dark:from-slate-800/40 dark:via-card-hitam dark:to-card-hitam border-2 border-slate-300 dark:border-slate-700 rounded-3xl p-6 flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                      <Medal className="w-3.5 h-3.5" /> #2 JUARA 2
                    </span>
                    <span className="text-[10px] font-bold text-muted-hitam uppercase">PERAK</span>
                  </div>

                  <Link
                    href={`/set-registry/user/${encodeURIComponent(topThree[1].rawUsername)}`}
                    className="flex flex-col items-center text-center space-y-3 group-hover:scale-[1.02] transition-transform"
                    title={`Lihat Profil ${topThree[1].username}`}
                  >
                    <div className="relative">
                      <CollectorAvatar
                        avatarBg={topThree[1].avatarBg}
                        username={topThree[1].rawUsername}
                        sizeClass="w-16 h-16"
                        textSizeClass="text-lg"
                        shapeClass="rounded-full"
                        borderClass="ring-4 ring-slate-300 dark:ring-slate-700 shadow-md"
                      />
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] font-black flex items-center justify-center border border-white dark:border-black">
                        2
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-foreground-hitam group-hover:text-accent transition-colors flex items-center justify-center gap-1">
                        {topThree[1].username}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      {topThree[1].displayName && (
                        <p className="text-xs text-subtle-hitam">{topThree[1].displayName}</p>
                      )}
                    </div>
                  </Link>

                  <div className="bg-elevated-putih border border-line-putih rounded-2xl p-4 text-center space-y-2">
                    <div className="text-2xl font-black text-foreground-hitam font-mono">
                      {topThree[1].totalPoints.toLocaleString('id-ID')} <span className="text-xs font-bold text-accent">PTS</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-xs text-muted-hitam pt-1 border-t border-line-putih-soft font-mono">
                      <span>{topThree[1].completedSets} Set Selesai</span>
                      <span>•</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">{topThree[1].gemMintCount} Gem 10</span>
                    </div>
                  </div>

                  <Link
                    href={`/set-registry/user/${encodeURIComponent(topThree[1].rawUsername)}`}
                    className="w-full bg-elevated-putih hover:bg-card-putih border border-line-putih text-foreground-hitam font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    Buka Profil & Vault <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              {/* KARTU JUARA 1 (EMAS - TENGAH DI DESKTOP DENGAN ELEVASI LEBIH TINGGI) */}
              {topThree[0] && (
                <div className="order-1 md:order-2 bg-gradient-to-b from-amber-500/15 via-card-putih to-card-putih dark:from-amber-500/20 dark:via-card-hitam dark:to-card-hitam border-2 border-amber-500/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group md:-translate-y-2">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-500 text-white shadow-sm">
                      <Crown className="w-4 h-4" /> #1 JUARA 1 NASIONAL
                    </span>
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                      EMAS UTAMA
                    </span>
                  </div>

                  <Link
                    href={`/set-registry/user/${encodeURIComponent(topThree[0].rawUsername)}`}
                    className="flex flex-col items-center text-center space-y-3 group-hover:scale-[1.02] transition-transform"
                    title={`Lihat Profil ${topThree[0].username}`}
                  >
                    <div className="relative">
                      <CollectorAvatar
                        avatarBg={topThree[0].avatarBg}
                        username={topThree[0].rawUsername}
                        sizeClass="w-20 h-20"
                        textSizeClass="text-2xl"
                        shapeClass="rounded-full"
                        borderClass="ring-4 ring-amber-500 shadow-xl"
                      />
                      <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-white text-xs font-black flex items-center justify-center border-2 border-white dark:border-black shadow-md">
                        1
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-foreground-hitam group-hover:text-accent transition-colors flex items-center justify-center gap-1">
                        {topThree[0].username}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      {topThree[0].displayName && (
                        <p className="text-xs text-subtle-hitam font-medium">{topThree[0].displayName}</p>
                      )}
                    </div>
                  </Link>

                  <div className="bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 rounded-2xl p-4 text-center space-y-2">
                    <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                      {topThree[0].totalPoints.toLocaleString('id-ID')} <span className="text-xs font-extrabold text-foreground-hitam">PTS</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-xs text-muted-hitam pt-1 border-t border-amber-500/20 font-mono">
                      <span className="font-semibold">{topThree[0].completedSets} Set Selesai</span>
                      <span>•</span>
                      <span className="text-amber-600 dark:text-amber-400 font-extrabold">
                        {topThree[0].gemMintCount} Gem Mint 10
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/set-registry/user/${encodeURIComponent(topThree[0].rawUsername)}`}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-red-600/30 hover:scale-[1.01]"
                  >
                    Buka Profil & Vault Juara <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* KARTU JUARA 3 (PERUNGGU - POSISI KANAN DI DESKTOP) */}
              {topThree[2] && (
                <div className="order-3 bg-gradient-to-b from-amber-700/15 via-card-putih to-card-putih dark:from-amber-700/20 dark:via-card-hitam dark:to-card-hitam border-2 border-amber-700/40 dark:border-amber-700/50 rounded-3xl p-6 flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-700/20 text-amber-700 dark:text-amber-400 border border-amber-700/40">
                      <Award className="w-3.5 h-3.5" /> #3 JUARA 3
                    </span>
                    <span className="text-[10px] font-bold text-muted-hitam uppercase">PERUNGGU</span>
                  </div>

                  <Link
                    href={`/set-registry/user/${encodeURIComponent(topThree[2].rawUsername)}`}
                    className="flex flex-col items-center text-center space-y-3 group-hover:scale-[1.02] transition-transform"
                    title={`Lihat Profil ${topThree[2].username}`}
                  >
                    <div className="relative">
                      <CollectorAvatar
                        avatarBg={topThree[2].avatarBg}
                        username={topThree[2].rawUsername}
                        sizeClass="w-16 h-16"
                        textSizeClass="text-lg"
                        shapeClass="rounded-full"
                        borderClass="ring-4 ring-amber-700/40 shadow-md"
                      />
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-700 text-white text-[10px] font-black flex items-center justify-center border border-white dark:border-black">
                        3
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-foreground-hitam group-hover:text-accent transition-colors flex items-center justify-center gap-1">
                        {topThree[2].username}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      {topThree[2].displayName && (
                        <p className="text-xs text-subtle-hitam">{topThree[2].displayName}</p>
                      )}
                    </div>
                  </Link>

                  <div className="bg-elevated-putih border border-line-putih rounded-2xl p-4 text-center space-y-2">
                    <div className="text-2xl font-black text-foreground-hitam font-mono">
                      {topThree[2].totalPoints.toLocaleString('id-ID')} <span className="text-xs font-bold text-accent">PTS</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-xs text-muted-hitam pt-1 border-t border-line-putih-soft font-mono">
                      <span>{topThree[2].completedSets} Set Selesai</span>
                      <span>•</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">{topThree[2].gemMintCount} Gem 10</span>
                    </div>
                  </div>

                  <Link
                    href={`/set-registry/user/${encodeURIComponent(topThree[2].rawUsername)}`}
                    className="w-full bg-elevated-putih hover:bg-card-putih border border-line-putih text-foreground-hitam font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    Buka Profil & Vault <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* TABEL UTAMA (TOP 10 + ROW PERINGKAT SAYA HANYA JIKA SUDAH LOGIN)          */}
        {/* ========================================================================= */}
        <div className="bg-card-putih border border-line-putih rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-line-putih flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-elevated-putih">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <h2 className="text-base font-extrabold text-foreground-hitam">Top 10 Peringkat Utama</h2>
            </div>
            <span className="text-xs text-muted-hitam font-mono">
              Menampilkan {displayedLeaderboard.length} dari {filteredLeaderboard.length} Kolektor
            </span>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-muted-hitam gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
              <span className="text-xs">Memuat papan klasemen nasional...</span>
            </div>
          ) : displayedLeaderboard.length === 0 ? (
            <div className="py-20 text-center space-y-2 px-4">
              <Database className="w-8 h-8 text-subtle-hitam mx-auto" />
              <p className="text-sm font-bold text-foreground-hitam">Tidak ada kolektor yang ditemukan</p>
              <p className="text-xs text-muted-hitam">Coba ubah filter kategori atau kata kunci pencarian.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-line-putih text-[10px] font-bold uppercase tracking-wider text-muted-hitam bg-elevated-putih/50">
                    <th className="py-4 px-6 text-center w-20">RANK</th>
                    <th className="py-4 px-6">NAMA KOLEKTOR</th>
                    <th className="py-4 px-6 text-center">SET SELESAI</th>
                    <th className="py-4 px-6 text-center">GEM MINT 10 SLAB</th>
                    <th className="py-4 px-6 text-right">TOTAL SKOR REGISTRY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-putih-soft">
                  {displayedLeaderboard.map((row) => (
                    <tr key={row.id} className="hover:bg-elevated-putih/70 transition-colors">
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-xl font-extrabold text-xs border font-mono ${row.badgeColor}`}
                        >
                          {row.rank}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-sans font-bold text-foreground-hitam">
                        {/* Navigasi Klik Profil ke Halaman Detail Kolektor */}
                        <Link
                          href={`/set-registry/user/${encodeURIComponent(row.rawUsername)}`}
                          className="flex items-center gap-3 group/link hover:text-accent transition-colors"
                          title={`Lihat profil ${row.username}`}
                        >
                          <CollectorAvatar
                            avatarBg={row.avatarBg}
                            username={row.rawUsername}
                            sizeClass="w-10 h-10"
                            textSizeClass="text-sm"
                            shapeClass="rounded-full"
                            borderClass="shadow-xs group-hover/link:ring-2 group-hover/link:ring-accent transition-all"
                          />
                          <div>
                            <span className="block text-sm group-hover/link:underline">{row.username}</span>
                            {row.displayName && (
                              <span className="text-[11px] font-normal text-subtle-hitam block">
                                {row.displayName}
                              </span>
                            )}
                          </div>
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-center text-muted-hitam font-mono">{row.completedSets} Set</td>
                      <td className="py-4 px-6 text-center text-amber-600 dark:text-amber-400 font-bold font-mono">
                        {row.gemMintCount} Kartu
                      </td>
                      <td className="py-4 px-6 text-right font-black text-accent text-sm font-mono">
                        {row.totalPoints.toLocaleString('id-ID')} PTS
                      </td>
                    </tr>
                  ))}

                  {/* ========================================================================= */}
                  {/* ROW KHUSUS: PERINGKAT SAYA                                                */}
                  {/* HANYA MUNCUL KETIKA PENGGUNA SUDAH LOGIN (authUserId terautentikasi)      */}
                  {/* JIKA BELUM LOGIN: ROW INI OTOMATIS TIDAK DITAMPILKAN SAMA SEKALI          */}
                  {/* ========================================================================= */}
                  {authUserId && currentUserRankData && (
                    <tr className="bg-red-500/5 dark:bg-red-500/10 border-t-2 border-red-500/30">
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-xl font-extrabold text-xs bg-red-600 text-white font-mono shadow-sm">
                          #{currentUserRankData.rank}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-sans font-bold text-foreground-hitam">
                        <Link
                          href={`/set-registry/user/${encodeURIComponent(currentUserRankData.rawUsername)}`}
                          className="flex items-center gap-3 group/self hover:text-accent transition-colors"
                          title="Lihat Profil Saya"
                        >
                          <CollectorAvatar
                            avatarBg={currentUserRankData.avatarBg}
                            username={currentUserRankData.rawUsername}
                            sizeClass="w-10 h-10"
                            textSizeClass="text-sm"
                            shapeClass="rounded-full"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="block text-sm group-hover/self:underline">{currentUserRankData.username}</span>
                              <span className="text-[10px] font-extrabold bg-red-600/20 text-red-500 border border-red-500/30 px-2 py-0.5 rounded-md">
                                Peringkat Anda
                              </span>
                            </div>
                            <span className="text-[11px] font-normal text-subtle-hitam block">
                              {currentUserRankData.displayName}
                            </span>
                          </div>
                        </Link>
                      </td>
                      <td className="py-4 px-6 text-center text-muted-hitam font-mono">{currentUserRankData.completedSets} Set</td>
                      <td className="py-4 px-6 text-center text-amber-600 dark:text-amber-400 font-bold font-mono">
                        {currentUserRankData.gemMintCount} Kartu
                      </td>
                      <td className="py-4 px-6 text-right font-black text-accent text-sm font-mono">
                        {currentUserRankData.totalPoints.toLocaleString('id-ID')} PTS
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </div>
          )}

          {/* Banner Ajakan Login untuk User yang Belum Terautentikasi */}
          {!authUserId && !loading && (
            <div className="p-4 bg-elevated-putih border-t border-line-putih flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-hitam">
              <span className="flex items-center gap-2 text-center sm:text-left">
                <Info className="w-4 h-4 text-accent shrink-0" />
                Ingin melihat posisi peringkat portofolio Anda di klasemen nasional?
              </span>
              <Link
                href="/login"
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 shrink-0"
              >
                Masuk ke Akun ICS <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* SCORING METHODOLOGY EXPLANATION CARD (TETAP UTUH DI BAGIAN BAWAH) */}
        <div className="bg-card-hitam border border-line-hitam rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" /> METODOLOGI SKOR REGISTRY ICS
          </div>

          <h3 className="text-xl font-extrabold text-foreground-putih">Bagaimana Poin Klasemen Dihitung?</h3>

          <p className="text-xs sm:text-sm text-muted-putih leading-relaxed max-w-4xl">
            Skor total kolektor dihitung secara komputasional berdasarkan 3 variabel utama:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div className="bg-elevated-hitam border border-line-hitam-soft rounded-2xl p-4 space-y-1">
              <span className="font-bold text-foreground-putih block">1. Weighted Grade Value</span>
              <p className="text-muted-putih">
                Nilai grade kartu (ICS 10 mendapat bobot poin tertinggi dibanding Grade 9.5 atau 9.0).
              </p>
            </div>

            <div className="bg-elevated-hitam border border-line-hitam-soft rounded-2xl p-4 space-y-1">
              <span className="font-bold text-foreground-putih block">2. Set Completion Bonus</span>
              <p className="text-muted-putih">
                Bonus multiplicator poin jika kolektor berhasil melengkapi 100% kartu dalam satu set rilis resmi.
              </p>
            </div>

            <div className="bg-elevated-hitam border border-line-hitam-soft rounded-2xl p-4 space-y-1">
              <span className="font-bold text-foreground-putih block">3. Card Rarity Weight</span>
              <p className="text-muted-putih">
                Kartu ber-rarity Secret Rare (SR), Alternate Art (SAR), atau Promo Event memiliki multiplier poin lebih besar.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
