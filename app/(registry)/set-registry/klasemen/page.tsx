'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import CollectorAvatar from '@/components/CollectorAvatar';
import {
  Trophy,
  Search,
  ArrowLeft,
  Loader2,
  Database,
  Award,
  ChevronDown,
  HelpCircle,
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

interface ProductCategoryRow {
  id: string;
  name: string;
  slug: string;
  sub_types: string[];
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

  // State Filter Kategori Utama (Dropdown) & Sub-Kategori
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  // State Data Database
  const [loading, setLoading] = useState(true);
  const [collectors, setCollectors] = useState<CollectorRow[]>([]);
  const [cards, setCards] = useState<CardRegistryRow[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategoryRow[]>([]);

  const [currentUserId] = useState<string | null>(null);

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
            .select('id, name, slug, sub_types')
            .eq('status', 'Active'),
        ]);

        if (!isMounted) return;

        if (colRes.error) console.error('Error collectors:', colRes.error.message);
        else setCollectors((colRes.data as CollectorRow[]) || []);

        if (cardsRes.error) console.error('Error cards:', cardsRes.error.message);
        else setCards((cardsRes.data as CardRegistryRow[]) || []);

        if (catRes.error) console.error('Error categories:', catRes.error.message);
        else setProductCategories((catRes.data as ProductCategoryRow[]) || []);
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

  // =========================================================================
  // 1. AMBIL SUB-KATEGORI BERDASARKAN DROPDOWN KATEGORI UTAMA YANG DIPILIH
  // =========================================================================
  const availableSubCategories = useMemo(() => {
    if (selectedMainCategory === 'all') {
      const allSubs = new Set<string>();
      productCategories.forEach((cat) => {
        if (Array.isArray(cat.sub_types)) {
          cat.sub_types.forEach((sub) => allSubs.add(sub.trim().toUpperCase()));
        }
      });
      return Array.from(allSubs);
    }

    const foundCat = productCategories.find((cat) => cat.slug === selectedMainCategory);
    if (!foundCat || !Array.isArray(foundCat.sub_types)) return [];
    return foundCat.sub_types.map((sub) => sub.trim().toUpperCase());
  }, [selectedMainCategory, productCategories]);

  const handleMainCategoryChange = (slug: string) => {
    setSelectedMainCategory(slug);
    setSelectedSubCategory('all');
  };

  function formatLabel(raw: string): string {
    return raw
      .trim()
      .split('_')
      .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
      .join(' ');
  }

  // =========================================================================
  // 2. KALKULASI KLASEMEN BERDASARKAN FILTER SUB-KATEGORI AKTIF
  // =========================================================================
  const fullLeaderboard: LeaderboardItem[] = useMemo(() => {
    const cardStatsByCollector = new Map<string, { cardPoints: number; gemMintCount: number }>();

    cards.forEach((card) => {
      if (!card.collector_id) return;

      if (selectedSubCategory !== 'all') {
        const cardTcg = (card.tcg_type || '').trim().toUpperCase();
        if (cardTcg !== selectedSubCategory.toUpperCase()) return;
      }

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
  }, [collectors, cards, selectedSubCategory]);

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

  const currentUserRankData = useMemo(() => {
    if (fullLeaderboard.length === 0) return null;
    const found = fullLeaderboard.find((item) => item.id === currentUserId || item.user_id === currentUserId);
    return found || fullLeaderboard[11] || fullLeaderboard[0] || null;
  }, [fullLeaderboard, currentUserId]);

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

        {/* SEARCH, DROPDOWN KATEGORI UTAMA, & SUB-KATEGORI DI SAMPINGNYA */}
        <div className="bg-card-putih border border-line-putih rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xs">

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari username kolektor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">

            {/* Dropdown Kategori Utama */}
            <div className="relative w-full sm:w-48">
              <select
                value={selectedMainCategory}
                onChange={(e) => handleMainCategoryChange(e.target.value)}
                className="w-full appearance-none bg-elevated-putih border border-line-putih rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-foreground-hitam focus:outline-none focus:border-red-500/60 transition-colors cursor-pointer"
              >
                <option value="all">Semua Kategori</option>
                {productCategories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-subtle-hitam absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Tombol Sub-Kategori */}
            <div className="flex items-center gap-1.5 bg-elevated-putih p-1 rounded-xl border border-line-putih-soft overflow-x-auto scrollbar-thin scrollbar-thumb-red-600/35 w-full sm:w-auto max-w-xl">
              <button
                type="button"
                onClick={() => setSelectedSubCategory('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${selectedSubCategory === 'all' ? 'bg-red-600 text-white shadow-sm' : 'text-muted-hitam hover:text-foreground-hitam'
                  }`}
              >
                Semua Sub
              </button>

              {availableSubCategories.map((subKey) => (
                <button
                  key={subKey}
                  type="button"
                  onClick={() => setSelectedSubCategory(subKey)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${selectedSubCategory === subKey ? 'bg-red-600 text-white shadow-sm' : 'text-muted-hitam hover:text-foreground-hitam'
                    }`}
                >
                  {formatLabel(subKey)}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* TABEL UTAMA (TOP 10 + ROW PERINGKAT ANDA DI PALING BAWAH TABEL) */}
        <div className="bg-card-putih border border-line-putih rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-line-putih flex items-center justify-between bg-elevated-putih">
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
                        <div className="flex items-center gap-3">
                          <CollectorAvatar
                            avatarBg={row.avatarBg}
                            username={row.rawUsername}
                            sizeClass="w-10 h-10"
                            textSizeClass="text-sm"
                            shapeClass="rounded-full"
                            borderClass="shadow-xs"
                          />
                          <div>
                            <span className="block text-sm">{row.username}</span>
                            {row.displayName && (
                              <span className="text-[11px] font-normal text-subtle-hitam block">
                                {row.displayName}
                              </span>
                            )}
                          </div>
                        </div>
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

                  {/* ROW KHUSUS: PERINGKAT ANDA DI PALING BAWAH TABEL */}
                  {currentUserRankData && (
                    <tr className="bg-red-500/5 dark:bg-red-500/10 border-t-2 border-red-500/30">
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-xl font-extrabold text-xs bg-red-600 text-white font-mono shadow-sm">
                          #{currentUserRankData.rank}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-sans font-bold text-foreground-hitam">
                        <div className="flex items-center gap-3">
                          <CollectorAvatar
                            avatarBg={currentUserRankData.avatarBg}
                            username={currentUserRankData.rawUsername}
                            sizeClass="w-10 h-10"
                            textSizeClass="text-sm"
                            shapeClass="rounded-full"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="block text-sm">{currentUserRankData.username}</span>
                              <span className="text-[10px] font-extrabold bg-red-600/20 text-red-500 border border-red-500/30 px-2 py-0.5 rounded-md">
                                Peringkat Anda
                              </span>
                            </div>
                            <span className="text-[11px] font-normal text-subtle-hitam block">
                              {currentUserRankData.displayName}
                            </span>
                          </div>
                        </div>
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