'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
  Trophy,
  Crown,
  Search,
  UserCheck,
  ArrowLeft,
  ExternalLink,
  HelpCircle,
  Loader2,
  Database,
} from 'lucide-react';

// =========================================================================
// TIPE DATA SESUAI SCHEMA SUPABASE (collectors & card_registry)
// =========================================================================
interface CollectorRow {
  id: string;
  username: string;
  display_name: string;
  location: string | null;
  avatar_bg: string;
  manual_points: number;
  sets_completed: number;
  badge: string;
  join_date: string;
}

interface CardRegistryRow {
  id: string;
  tcg_type: string | null;
  final_grade: number;
  is_frozen: boolean | null;
  created_at: string | null;
  collector_id: string | null;
  points: number;
}

interface RankedCollector {
  id: string;
  rank: number;
  username: string;
  rawUsername: string;
  name: string;
  primaryCategory: 'pokemon' | 'onepiece' | 'yugioh' | 'other';
  primaryCategoryLabel: string;
  completedSets: number;
  gem10Count: number;
  totalPoints: number;
  pointsFormatted: string;
  badge: string;
  avatarBg: string;
}

type CategoryFilter = 'all' | 'pokemon' | 'onepiece' | 'yugioh';
type TimeframeFilter = 'alltime' | 'season2026' | 'monthly';

function normalizeCategory(tcgType: string | null): 'pokemon' | 'onepiece' | 'yugioh' | 'other' {
  const val = (tcgType || '').toUpperCase();
  if (val.includes('POKEMON') || val.includes('POKÉMON')) return 'pokemon';
  if (val.includes('ONE_PIECE') || val.includes('ONE PIECE') || val === 'OP') return 'onepiece';
  if (val.includes('YUGIOH') || val.includes('YU-GI-OH') || val === 'YGO') return 'yugioh';
  return 'other';
}

function formatCategoryBadge(cat: 'pokemon' | 'onepiece' | 'yugioh' | 'other'): string {
  switch (cat) {
    case 'pokemon':
      return 'Pokémon';
    case 'onepiece':
      return 'One Piece';
    case 'yugioh':
      return 'Yu-Gi-Oh!';
    default:
      return 'Multi-TCG';
  }
}

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tcgCategory, setTcgCategory] = useState<CategoryFilter>('all');
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('alltime');

  // State Data Database
  const [loading, setLoading] = useState(true);
  const [collectors, setCollectors] = useState<CollectorRow[]>([]);
  const [cards, setCards] = useState<CardRegistryRow[]>([]);

  const [nowTimestamp, setNowTimestamp] = useState<number | null>(null);

  useEffect(() => {
    setNowTimestamp(Date.now());
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchLeaderboardData() {
      setLoading(true);
      try {
        const [collectorsRes, cardsRes] = await Promise.all([
          supabase
            .from('collectors')
            .select(
              'id, username, display_name, location, avatar_bg, manual_points, sets_completed, badge, join_date'
            ),
          supabase
            .from('card_registry')
            .select('id, tcg_type, final_grade, is_frozen, created_at, collector_id, points')
            .eq('is_frozen', false),
        ]);

        if (!isMounted) return;

        if (collectorsRes.error) {
          console.error('Error fetching collectors:', collectorsRes.error.message);
        } else {
          setCollectors((collectorsRes.data as CollectorRow[]) || []);
        }

        if (cardsRes.error) {
          console.error('Error fetching card_registry:', cardsRes.error.message);
        } else {
          setCards((cardsRes.data as CardRegistryRow[]) || []);
        }
      } catch (err) {
        console.error('Unexpected error loading Leaderboard:', err);
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
  // KALKULASI KLASEMEN REAL-TIME (collectors + card_registry)
  // =========================================================================
  const rankedCollectors: RankedCollector[] = useMemo(() => {
    const currentYear = nowTimestamp ? new Date(nowTimestamp).getFullYear() : 2026;
    const thirtyDaysAgo = nowTimestamp
      ? new Date(nowTimestamp - 30 * 24 * 60 * 60 * 1000)
      : null;

    // Filter kartu berdasarkan Timeframe & Kategori jika dipilih
    const eligibleCards = cards.filter((card) => {
      if (!card.collector_id) return false;

      if (timeframe !== 'alltime' && card.created_at) {
        const created = new Date(card.created_at);
        if (timeframe === 'season2026' && created.getFullYear() !== currentYear) {
          return false;
        }
        if (timeframe === 'monthly' && thirtyDaysAgo && created < thirtyDaysAgo) {
          return false;
        }
      }

      if (tcgCategory !== 'all') {
        const normalized = normalizeCategory(card.tcg_type);
        if (normalized !== tcgCategory) return false;
      }

      return true;
    });

    // Hitung agregasi kartu per collector_id
    const statsByCollector = new Map<
      string,
      {
        cardPoints: number;
        gem10Count: number;
        categoryCount: Record<'pokemon' | 'onepiece' | 'yugioh' | 'other', number>;
      }
    >();

    // Hitung kategori dominan dari seluruh kartu milik kolektor (terlepas dari timeframe)
    const allTimeCatCountByCollector = new Map<
      string,
      Record<'pokemon' | 'onepiece' | 'yugioh' | 'other', number>
    >();

    cards.forEach((card) => {
      if (!card.collector_id) return;
      const cat = normalizeCategory(card.tcg_type);
      const mapEntry = allTimeCatCountByCollector.get(card.collector_id) || {
        pokemon: 0,
        onepiece: 0,
        yugioh: 0,
        other: 0,
      };
      mapEntry[cat] += 1;
      allTimeCatCountByCollector.set(card.collector_id, mapEntry);
    });

    eligibleCards.forEach((card) => {
      const colId = card.collector_id!;
      const entry = statsByCollector.get(colId) || {
        cardPoints: 0,
        gem10Count: 0,
        categoryCount: { pokemon: 0, onepiece: 0, yugioh: 0, other: 0 },
      };

      entry.cardPoints += Number(card.points || 0);
      if (Number(card.final_grade) >= 10) {
        entry.gem10Count += 1;
      }
      const cat = normalizeCategory(card.tcg_type);
      entry.categoryCount[cat] += 1;

      statsByCollector.set(colId, entry);
    });

    const computed = collectors
      .map((col) => {
        const cStats = statsByCollector.get(col.id) || {
          cardPoints: 0,
          gem10Count: 0,
          categoryCount: { pokemon: 0, onepiece: 0, yugioh: 0, other: 0 },
        };

        // Manual points hanya ditambahkan pada mode 'alltime' & 'all' kategori
        const baseManualPoints =
          timeframe === 'alltime' && tcgCategory === 'all' ? Number(col.manual_points || 0) : 0;

        const totalPoints = baseManualPoints + cStats.cardPoints;

        // Tentukan kategori utama kolektor berdasarkan kartu terbanyak
        const catDist = allTimeCatCountByCollector.get(col.id) || {
          pokemon: 0,
          onepiece: 0,
          yugioh: 0,
          other: 0,
        };

        let primaryCategory: 'pokemon' | 'onepiece' | 'yugioh' | 'other' = 'other';
        let maxCatCards = 0;
        (['pokemon', 'onepiece', 'yugioh', 'other'] as const).forEach((key) => {
          if (catDist[key] > maxCatCards) {
            maxCatCards = catDist[key];
            primaryCategory = key;
          }
        });

        const rawUsername = col.username.replace(/^@/, '');

        return {
          id: col.id,
          username: `@${rawUsername}`,
          rawUsername,
          name: col.display_name || rawUsername,
          primaryCategory,
          primaryCategoryLabel: formatCategoryBadge(primaryCategory),
          completedSets: Number(col.sets_completed || 0),
          gem10Count: cStats.gem10Count,
          totalPoints,
          pointsFormatted: `${totalPoints.toLocaleString('id-ID')} PTS`,
          badge: col.badge || 'Collector',
          avatarBg: col.avatar_bg || 'from-indigo-500 to-purple-600',
          hasActivityInFilter:
            tcgCategory === 'all' ? true : cStats.categoryCount[tcgCategory] > 0,
        };
      })
      .filter((item) => item.hasActivityInFilter)
      .sort((a, b) => b.totalPoints - a.totalPoints || b.gem10Count - a.gem10Count);

    return computed.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  }, [collectors, cards, tcgCategory, timeframe]);

  // Susun Top 3 Podium dengan urutan visual [Rank 2, Rank 1, Rank 3]
  const podiumCollectors = useMemo(() => {
    const top3 = rankedCollectors.slice(0, 3);
    if (top3.length === 0) return [];

    const ordered = [top3[1], top3[0], top3[2]].filter(Boolean);

    return ordered.map((item) => {
      const styleMap =
        item.rank === 1
          ? {
              avatarStyle: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
              podiumBg: 'border-amber-500/50 bg-card-hitam',
            }
          : item.rank === 2
          ? {
              avatarStyle: 'bg-gray-400/20 border-gray-400/40 text-gray-200',
              podiumBg: 'border-gray-500/40 bg-card-hitam',
            }
          : {
              avatarStyle: 'bg-amber-800/30 border-amber-700/50 text-amber-500',
              podiumBg: 'border-amber-800/40 bg-card-hitam',
            };

      return {
        ...item,
        ...styleMap,
      };
    });
  }, [rankedCollectors]);

  // Filter Pencarian pada Tabel Klasemen
  const filteredLeaderboard = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return rankedCollectors;

    return rankedCollectors.filter(
      (collector) =>
        collector.username.toLowerCase().includes(query) ||
        collector.name.toLowerCase().includes(query) ||
        collector.badge.toLowerCase().includes(query)
    );
  }, [rankedCollectors, searchQuery]);

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 pb-20 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. BREADCRUMB & HEADER                                                    */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/set-registry"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-hitam hover:text-accent transition-colors bg-card-putih border border-line-putih px-4 py-2 rounded-xl w-fit shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Set Registry
          </Link>

          <span className="text-xs font-mono text-muted-hitam bg-elevated-putih border border-line-putih px-3 py-1.5 rounded-lg w-fit">
            SEASON 2026 • OFFICIAL AUDITED RANKINGS
          </span>
        </div>

        {/* HERO TITLE */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-soft border border-accent-border text-[11px] font-extrabold text-accent uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            NATIONAL HALL OF FAME
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground-hitam tracking-tight leading-tight">
            Klasemen Kolektor <span className="text-accent">Nasional ICS</span>
          </h1>

          <p className="text-muted-hitam text-xs sm:text-sm leading-relaxed">
            Papan peringkat resmi kolektor kartu bersertifikasi ICS di Indonesia berdasarkan akumulasi skor registry, kelengkapan set, dan jumlah koleksi Gem Mint 10.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. TOP 3 PODIUM DISPLAY (LIVE DARI SUPABASE)                              */}
        {/* ========================================================================= */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-muted-hitam gap-2">
            <Loader2 className="w-7 h-7 animate-spin text-accent" />
            <span className="text-xs">Menghitung peringkat podium kolektor nasional...</span>
          </div>
        ) : podiumCollectors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-end max-w-5xl mx-auto">
            {podiumCollectors.map((item) => (
              <div
                key={item.id}
                className={`rounded-3xl border p-6 text-center space-y-4 shadow-2xl backdrop-blur-md relative transition-transform hover:scale-[1.02] duration-300 ${item.podiumBg} ${
                  item.rank === 1 ? 'order-first md:order-2 py-8' : item.rank === 2 ? 'order-2 md:order-1' : 'order-3'
                }`}
              >
                {/* Ambient Glow untuk Juara 1 */}
                {item.rank === 1 && (
                  <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-3xl pointer-events-none" />
                )}

                {/* Crown / Rank Icon */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  {item.rank === 1 ? (
                    <span className="w-9 h-9 rounded-full bg-amber-500 text-black font-black flex items-center justify-center shadow-lg shadow-amber-500/40 border-2 border-amber-300">
                      <Crown className="w-5 h-5" />
                    </span>
                  ) : item.rank === 2 ? (
                    <span className="w-8 h-8 rounded-full bg-gray-300 text-black font-bold flex items-center justify-center shadow-md">
                      2
                    </span>
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-amber-800 text-white font-bold flex items-center justify-center shadow-md">
                      3
                    </span>
                  )}
                </div>

                {/* Collector Info */}
                <div className="space-y-1.5 pt-2 relative z-10">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center font-black text-xl shadow-xl ${item.avatarStyle}`}
                  >
                    {item.rawUsername.charAt(0).toUpperCase()}
                  </div>

                  <div className="pt-2">
                    <h3 className="text-base font-bold text-foreground-putih flex items-center justify-center gap-1">
                      {item.username}
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </h3>
                    <span className="text-[11px] text-muted-putih">{item.name}</span>
                  </div>

                  <span className="inline-block text-[10px] font-mono font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>

                {/* Score Highlight */}
                <div className="bg-elevated-hitam border border-line-hitam-soft rounded-2xl p-3 space-y-1 relative z-10">
                  <span className="text-[10px] text-subtle-putih uppercase font-mono block">
                    TOTAL REGISTRY POINTS
                  </span>
                  <span className="text-lg font-black text-red-400 font-mono">
                    {item.pointsFormatted}
                  </span>
                  <div className="flex justify-between text-[11px] text-muted-putih font-mono pt-1 border-t border-line-hitam-soft">
                    <span>{item.completedSets} Set Selesai</span>
                    <span className="text-amber-400 font-bold">{item.gem10Count} Gem Mint 10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* ========================================================================= */}
        {/* 3. SEARCH & FILTER CONTROLS (CARD PUTIH)                                  */}
        {/* ========================================================================= */}
        <div className="bg-card-putih border border-line-putih rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari username atau nama kolektor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            
            {/* TCG Category Switcher */}
            <div className="flex items-center gap-1 bg-elevated-putih p-1 rounded-xl border border-line-putih-soft">
              <button
                type="button"
                onClick={() => setTcgCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  tcgCategory === 'all' ? 'bg-red-600 text-white' : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                Semua TCG
              </button>
              <button
                type="button"
                onClick={() => setTcgCategory('pokemon')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  tcgCategory === 'pokemon' ? 'bg-red-600 text-white' : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                Pokémon
              </button>
              <button
                type="button"
                onClick={() => setTcgCategory('onepiece')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  tcgCategory === 'onepiece' ? 'bg-red-600 text-white' : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                One Piece
              </button>
              <button
                type="button"
                onClick={() => setTcgCategory('yugioh')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  tcgCategory === 'yugioh' ? 'bg-red-600 text-white' : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                Yu-Gi-Oh!
              </button>
            </div>

            {/* Timeframe Switcher */}
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as TimeframeFilter)}
              className="bg-elevated-putih border border-line-putih text-foreground-hitam text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-red-500/60 cursor-pointer"
            >
              <option value="alltime">All Time (Sepanjang Masa)</option>
              <option value="season2026">Season 2026</option>
              <option value="monthly">Bulan Ini (30 Hari)</option>
            </select>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. FULL LEADERBOARD TABLE (LIVE DARI SUPABASE)                            */}
        {/* ========================================================================= */}
        <div className="bg-card-putih border border-line-putih rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center text-muted-hitam gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
              <span className="text-xs">Memuat daftar peringkat kolektor...</span>
            </div>
          ) : filteredLeaderboard.length === 0 ? (
            <div className="py-16 text-center space-y-2 px-4">
              <Database className="w-8 h-8 text-subtle-hitam mx-auto" />
              <p className="text-sm font-bold text-foreground-hitam">Data kolektor tidak ditemukan</p>
              <p className="text-xs text-muted-hitam">
                Coba ubah filter kategori, rentang waktu, atau kata kunci pencarian.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-line-putih text-[10px] font-bold uppercase tracking-wider text-muted-hitam bg-elevated-putih">
                    <th className="py-4 px-6 text-center">RANK</th>
                    <th className="py-4 px-6">KOLEKTOR</th>
                    <th className="py-4 px-6 text-center">KATEGORI UTAMA</th>
                    <th className="py-4 px-6 text-center">SET SELESAI</th>
                    <th className="py-4 px-6 text-center">GEM MINT 10 SLAB</th>
                    <th className="py-4 px-6 text-right">TOTAL REGISTRY POINTS</th>
                    <th className="py-4 px-6 text-right">PROFIL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-putih-soft font-mono">
                  {filteredLeaderboard.map((row) => (
                    <tr key={row.id} className="hover:bg-elevated-putih/70 transition-colors">
                      
                      {/* Rank Number */}
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-xl font-black text-xs border ${
                            row.rank === 1
                              ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/40'
                              : row.rank === 2
                              ? 'text-muted-hitam bg-elevated-putih border-line-putih'
                              : row.rank === 3
                              ? 'text-amber-700 dark:text-amber-600 bg-amber-600/10 border-amber-600/30'
                              : 'text-subtle-hitam bg-elevated-putih border-line-putih-soft'
                          }`}
                        >
                          {row.rank}
                        </span>
                      </td>

                      {/* Collector Name & Username */}
                      <td className="py-4 px-6 font-sans">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full bg-gradient-to-br ${row.avatarBg} text-white font-bold flex items-center justify-center shrink-0 shadow-xs`}
                          >
                            {row.rawUsername.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <strong className="text-foreground-hitam font-bold flex items-center gap-1.5">
                              {row.username}
                              <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            </strong>
                            <span className="text-[11px] text-subtle-hitam block font-normal">
                              {row.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category Tag */}
                      <td className="py-4 px-6 text-center font-sans font-semibold">
                        <span className="text-[10px] uppercase tracking-wider text-muted-hitam bg-elevated-putih px-2.5 py-1 rounded-md border border-line-putih-soft">
                          {row.primaryCategoryLabel}
                        </span>
                      </td>

                      {/* Completed Sets */}
                      <td className="py-4 px-6 text-center text-muted-hitam font-bold">
                        {row.completedSets} Set
                      </td>

                      {/* Gem Mint 10 Slabs */}
                      <td className="py-4 px-6 text-center text-amber-600 dark:text-amber-400 font-bold">
                        {row.gem10Count} Slabs
                      </td>

                      {/* Total Points */}
                      <td className="py-4 px-6 text-right font-black text-accent text-sm">
                        {row.pointsFormatted}
                      </td>

                      {/* Action Link */}
                      <td className="py-4 px-6 text-right font-sans">
                        <Link
                          href={`/set-registry/user/${row.rawUsername}`}
                          className="text-xs font-bold text-muted-hitam hover:text-foreground-hitam inline-flex items-center gap-1 bg-elevated-putih hover:bg-gray-200/70 dark:hover:bg-white/10 border border-line-putih px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Vault <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 5. SCORING METHODOLOGY EXPLANATION CARD (CARD HITAM KONTRAS)              */}
        {/* ========================================================================= */}
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