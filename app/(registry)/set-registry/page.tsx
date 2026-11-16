'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import {
  Trophy,
  Search,
  Layers,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  ArrowRight,
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
  manual_points: number;
  sets_completed: number;
  badge: string;
  avatar_bg: string;
}

interface CardRegistryRow {
  id: string;
  cert_number: string;
  card_name: string;
  set_name: string;
  card_number: string | null;
  language: string | null;
  tcg_type: string | null;
  final_grade: number;
  grade_label: string;
  front_image_url: string;
  nfc_uid: string | null;
  is_encapsulated: boolean | null;
  is_frozen: boolean | null;
  collector_id: string | null;
  points: number;
}

interface CollectorLeaderboardItem {
  id: string;
  rank: number;
  username: string;
  displayName: string;
  totalPoints: number;
  completedSets: number;
  gemMintCount: number;
  badgeColor: string;
}

interface AggregatedSetItem {
  slug: string;
  category: 'pokemon' | 'onepiece' | 'yugioh' | 'other';
  tcgLabel: string;
  title: string;
  registeredSlabs: number;
  uniqueCardsCount: number;
  completionLeader: string;
  avgGrade: string;
  image: string;
  badge: string;
}

// =========================================================================
// KONFIGURASI HERO PROMO BANNERS (TINGGAL GANTI PATH GAMBAR)
// =========================================================================
const HERO_BANNERS = [
  {
    id: 1,
    image: '/images/registry/banner-1.webp',
    tag: 'ICS SET REGISTRY • SEASON 2026',
    title: 'Bangun Koleksi & Raih Peringkat Nasional',
    description:
      'Daftarkan kartu bersertifikat ICS ke dalam katalog set resmi dan bersaing di papan peringkat kolektor Indonesia.',
    ctaText: 'Jelajahi Katalog Set',
    ctaLink: '/set-registry/katalog',
  },
  {
    id: 2,
    image: '/images/registry/banner-2.webp',
    tag: 'POKÉMON & ONE PIECE MASTER SETS',
    title: 'Lengkapi Checklist Set Favoritmu',
    description:
      'Pantau progres kelengkapan kartu per ekspansi secara real-time dan pamerkan vault pribadimu ke komunitas.',
    ctaText: 'Klaim Sertifikat Sekarang',
    ctaLink: '/login',
  },
];

// Helper pemetaan tcg_type database ke tab filter UI
function normalizeTcgCategory(tcgType: string | null): 'pokemon' | 'onepiece' | 'yugioh' | 'other' {
  const val = (tcgType || '').toUpperCase();
  if (val.includes('POKEMON') || val.includes('POKÉMON')) return 'pokemon';
  if (val.includes('ONE PIECE') || val.includes('ONEPIECE') || val === 'OP') return 'onepiece';
  if (val.includes('YU-GI-OH') || val.includes('YUGIOH') || val === 'YGO') return 'yugioh';
  return 'other';
}

// Helper slug URL aman dari nama set
function slugifySetName(setName: string): string {
  return encodeURIComponent(setName.trim().toLowerCase().replace(/\s+/g, '-'));
}

const FALLBACK_CARD_IMAGE = '/images/home/card1.webp';

function resolveValidImageUrl(url: string | null | undefined): string {
  if (!url) return FALLBACK_CARD_IMAGE;
  const trimmed = url.trim();
  if (trimmed.startsWith('/')) return trimmed;

  try {
    const parsed = new URL(trimmed);

    if (parsed.hostname === 'drive.google.com') {
      const match = parsed.pathname.match(/\/file\/d\/([^/]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }

    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return trimmed;
    }
  } catch {
  }

  return FALLBACK_CARD_IMAGE;
}

export default function SetRegistryHomePage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pokemon' | 'onepiece' | 'yugioh'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // State Data Database
  const [loading, setLoading] = useState(true);
  const [collectors, setCollectors] = useState<CollectorRow[]>([]);
  const [cards, setCards] = useState<CardRegistryRow[]>([]);

  // Fetch data dari Supabase (public.collectors & public.card_registry)
  useEffect(() => {
    let isMounted = true;

    async function fetchRegistryData() {
      setLoading(true);
      try {
        const [collectorsRes, cardsRes] = await Promise.all([
          supabase
            .from('collectors')
            .select('id, username, display_name, manual_points, sets_completed, badge, avatar_bg'),
          supabase
            .from('card_registry')
            .select(
              'id, cert_number, card_name, set_name, card_number, language, tcg_type, final_grade, grade_label, front_image_url, nfc_uid, is_encapsulated, is_frozen, collector_id, points'
            )
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
        console.error('Unexpected error loading Set Registry:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchRegistryData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-slide timer (Ganti slide setiap 5 detik)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);

  // Map cepat collector_id -> CollectorRow
  const collectorMap = useMemo(() => {
    const map = new Map<string, CollectorRow>();
    collectors.forEach((c) => map.set(c.id, c));
    return map;
  }, [collectors]);

  // =========================================================================
  // 1. KALKULASI STATS OVERVIEW REAL-TIME
  // =========================================================================
  const stats = useMemo(() => {
    const totalSlabs = cards.length;
    const uniqueSets = new Set(cards.map((c) => c.set_name.trim()).filter(Boolean)).size;
    const totalCollectors = collectors.length;
    const verifiedCount = cards.filter((c) => c.is_encapsulated || Boolean(c.nfc_uid)).length;
    const verifiedPercentage =
      totalSlabs > 0 ? ((verifiedCount / totalSlabs) * 100).toFixed(1) : '100.0';

    return {
      totalSlabs,
      uniqueSets,
      totalCollectors,
      verifiedPercentage,
    };
  }, [cards, collectors]);

  // =========================================================================
  // 2. KALKULASI TOP 5 KOLEKTOR KLASEMEN (collectors + card_registry)
  // =========================================================================
  const topCollectors: CollectorLeaderboardItem[] = useMemo(() => {
    const cardStatsByCollector = new Map<string, { cardPoints: number; gemMintCount: number }>();

    cards.forEach((card) => {
      if (!card.collector_id) return;
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

        return {
          id: c.id,
          username: c.username.startsWith('@') ? c.username : `@${c.username}`,
          displayName: c.display_name,
          totalPoints,
          completedSets: Number(c.sets_completed || 0),
          gemMintCount: cStats.gemMintCount,
        };
      })
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 5);

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
  }, [collectors, cards]);

  // =========================================================================
  // 3. AGREGASI SET TCG POPULER DARI card_registry
  // =========================================================================
  const aggregatedSets: AggregatedSetItem[] = useMemo(() => {
    const grouped = new Map<
      string,
      {
        setName: string;
        tcgType: string;
        slabs: CardRegistryRow[];
        uniqueCardKeys: Set<string>;
        gradeSum: number;
        sampleImage: string;
        collectorPointsInSet: Map<string, number>;
      }
    >();

    cards.forEach((card) => {
      const key = card.set_name.trim();
      if (!key) return;

      if (!grouped.has(key)) {
        grouped.set(key, {
          setName: key,
          tcgType: card.tcg_type || 'OTHER',
          slabs: [],
          uniqueCardKeys: new Set(),
          gradeSum: 0,
          sampleImage: resolveValidImageUrl(card.front_image_url),
          collectorPointsInSet: new Map(),
        });
      }

      const entry = grouped.get(key)!;
      entry.slabs.push(card);
      entry.uniqueCardKeys.add(`${card.card_name}-${card.card_number || ''}`);
      entry.gradeSum += Number(card.final_grade || 0);

      // Jika sampleImage masih fallback dan kartu berikutnya punya gambar valid, pakai gambar yang valid
      const validUrl = resolveValidImageUrl(card.front_image_url);
      if (entry.sampleImage === FALLBACK_CARD_IMAGE && validUrl !== FALLBACK_CARD_IMAGE) {
        entry.sampleImage = validUrl;
      }

      if (card.collector_id) {
        const prevPts = entry.collectorPointsInSet.get(card.collector_id) || 0;
        entry.collectorPointsInSet.set(
          card.collector_id,
          prevPts + Math.max(1, Number(card.points || 0))
        );
      }
    });

    const result: AggregatedSetItem[] = Array.from(grouped.values())
      .sort((a, b) => b.slabs.length - a.slabs.length)
      .map((entry, idx) => {
        let topCollectorId: string | null = null;
        let maxPts = -1;
        entry.collectorPointsInSet.forEach((pts, colId) => {
          if (pts > maxPts) {
            maxPts = pts;
            topCollectorId = colId;
          }
        });

        const topCol = topCollectorId ? collectorMap.get(topCollectorId) : null;
        const leaderHandle = topCol
          ? topCol.username.startsWith('@')
            ? topCol.username
            : `@${topCol.username}`
          : 'Belum Diklaim';

        const avg = (entry.gradeSum / entry.slabs.length).toFixed(2);
        const badge =
          idx === 0
            ? 'TOP VOLUME'
            : entry.slabs.length >= 10
            ? 'HOT SET'
            : 'ACTIVE SET';

        return {
          slug: slugifySetName(entry.setName),
          category: normalizeTcgCategory(entry.tcgType),
          tcgLabel: entry.tcgType,
          title: entry.setName,
          registeredSlabs: entry.slabs.length,
          uniqueCardsCount: entry.uniqueCardKeys.size,
          completionLeader: leaderHandle,
          avgGrade: `${avg} Avg Grade`,
          image: entry.sampleImage,
          badge,
        };
      });

    return result;
  }, [cards, collectorMap]);

  // Filter Set berdasarkan tab & pencarian
  const filteredSets = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return aggregatedSets.filter((set) => {
      const matchesCategory = selectedCategory === 'all' || set.category === selectedCategory;
      const matchesSearch =
        !query ||
        set.title.toLowerCase().includes(query) ||
        set.completionLeader.toLowerCase().includes(query) ||
        set.tcgLabel.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [aggregatedSets, selectedCategory, searchQuery]);

  const activeSlideData = HERO_BANNERS[currentSlide];

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 md:pt-40 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* ========================================================================= */}
        {/* 1. HERO PROMO BANNER SLIDER                                               */}
        {/* ========================================================================= */}
        <div className="relative group">
          <div className="relative rounded-3xl overflow-hidden bg-card-hitam border border-red-500/25 min-h-[340px] sm:min-h-[400px] p-6 sm:p-12 flex items-center shadow-2xl transition-all duration-700">

            {/* Background Image Full Cover */}
            <Image
              src={activeSlideData.image}
              alt={activeSlideData.title}
              fill
              priority
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C10]/95 via-[#0A0C10]/70 to-transparent pointer-events-none" />

            {/* Promo Content */}
            <div className="relative z-10 max-w-2xl space-y-5 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 backdrop-blur-md border border-red-500/40 text-[11px] font-extrabold text-red-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {activeSlideData.tag}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                {activeSlideData.title}
              </h1>

              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed max-w-xl">
                {activeSlideData.description}
              </p>

              {/* Search Bar + CTA Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 max-w-xl">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama set, kode rilis, atau kolektor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0A0C10]/90 backdrop-blur-md border border-white/15 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-red-500/70 transition-colors"
                  />
                </div>

                <Link
                  href={activeSlideData.ctaLink}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 whitespace-nowrap transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {activeSlideData.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Slider Navigation Buttons */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-red-600 border border-white/15 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl cursor-pointer z-20"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-red-600 border border-white/15 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl cursor-pointer z-20"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slider Dots Indicator */}
          <div className="flex items-center justify-center gap-2 pt-3">
            {HERO_BANNERS.map((banner, idx) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx
                    ? 'w-8 bg-red-600'
                    : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. STATS OVERVIEW BANNER (LIVE DARI SUPABASE)                             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card-putih border border-line-putih rounded-2xl p-5 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-foreground-hitam">
              {loading ? '...' : stats.totalSlabs.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-muted-hitam block font-mono">TOTAL SLAB TERDAFTAR</span>
          </div>

          <div className="bg-card-putih border border-line-putih rounded-2xl p-5 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-accent">
              {loading ? '...' : stats.uniqueSets.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-muted-hitam block font-mono">OFFICIAL REGISTERED SETS</span>
          </div>

          <div className="bg-card-putih border border-line-putih rounded-2xl p-5 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {loading ? '...' : stats.totalCollectors.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-muted-hitam block font-mono">KOLEKTOR TERDAFTAR</span>
          </div>

          <div className="bg-card-putih border border-line-putih rounded-2xl p-5 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
              {loading ? '...' : `${stats.verifiedPercentage}%`}
            </span>
            <span className="text-[11px] text-muted-hitam block font-mono">VERIFIED ENCAPSULATION</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TOP 5 KOLEKTOR KLASEMEN (LIVE DARI collectors & card_registry)         */}
        {/* ========================================================================= */}
        <div className="bg-card-putih border border-line-putih rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line-putih-soft pb-4">
            <div>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                KLASEMEN KOLEKTOR NASIONAL
              </span>
              <h2 className="text-2xl font-extrabold text-foreground-hitam mt-0.5 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-500 dark:text-amber-400" /> Top 5 Kolektor Teratas ICS
              </h2>
            </div>

            <Link
              href="/set-registry/klasemen"
              className="text-xs font-bold text-accent hover:opacity-80 flex items-center gap-1.5 bg-elevated-putih border border-line-putih px-4 py-2 rounded-xl transition-all self-start sm:self-auto"
            >
              Lihat Klasemen Lengkap <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-muted-hitam gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
              <span className="text-xs">Memuat klasemen kolektor dari database...</span>
            </div>
          ) : topCollectors.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-hitam">
              Belum ada data kolektor terdaftar di leaderboard.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-line-putih text-[10px] font-bold uppercase tracking-wider text-muted-hitam bg-elevated-putih">
                    <th className="py-3.5 px-4 text-center">RANK</th>
                    <th className="py-3.5 px-4">NAMA KOLEKTOR</th>
                    <th className="py-3.5 px-4 text-center">SET SELESAI</th>
                    <th className="py-3.5 px-4 text-center">GEM MINT 10 SLAB</th>
                    <th className="py-3.5 px-4 text-right">TOTAL SKOR REGISTRY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-putih-soft font-mono">
                  {topCollectors.map((row) => (
                    <tr key={row.id} className="hover:bg-elevated-putih/70 transition-colors">
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-extrabold text-xs border ${row.badgeColor}`}
                        >
                          {row.rank}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-sans font-bold text-foreground-hitam">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <div>
                            <span className="block">{row.username}</span>
                            {row.displayName && (
                              <span className="text-[11px] font-normal text-subtle-hitam block">
                                {row.displayName}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center text-muted-hitam">{row.completedSets} Set</td>
                      <td className="py-4 px-4 text-center text-amber-600 dark:text-amber-400 font-bold">
                        {row.gemMintCount} Kartu
                      </td>
                      <td className="py-4 px-4 text-right font-black text-accent text-sm">
                        {row.totalPoints.toLocaleString('id-ID')} PTS
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. FEATURED SETS CATALOG & FILTER (LIVE DARI card_registry)               */}
        {/* ========================================================================= */}
        <div className="space-y-8">

          {/* Filter Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line-putih-soft pb-4">
            <div>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                KATALOG RELEASES
              </span>
              <h2 className="text-2xl font-extrabold text-foreground-hitam mt-0.5 flex items-center gap-2">
                <Layers className="w-6 h-6 text-accent" /> Set TCG Populer
              </h2>
            </div>

            {/* Category Switcher */}
            <div className="flex items-center gap-1.5 bg-card-putih border border-line-putih p-1 rounded-xl overflow-x-auto">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-red-600 text-white'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                Semua TCG
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('pokemon')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === 'pokemon'
                    ? 'bg-red-600 text-white'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                Pokémon Card
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('onepiece')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === 'onepiece'
                    ? 'bg-red-600 text-white'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                One Piece Card
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('yugioh')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === 'yugioh'
                    ? 'bg-red-600 text-white'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                Yu-Gi-Oh!
              </button>
            </div>
          </div>

          {/* Grid Set Cards */}
          {loading ? (
            <div className="bg-card-putih border border-line-putih rounded-2xl p-12 flex flex-col items-center justify-center text-muted-hitam gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
              <span className="text-xs">Mengambil katalog set terdaftar dari database...</span>
            </div>
          ) : filteredSets.length === 0 ? (
            <div className="bg-card-putih border border-line-putih rounded-2xl p-12 text-center space-y-2">
              <Database className="w-8 h-8 text-subtle-hitam mx-auto" />
              <p className="text-sm font-bold text-foreground-hitam">Belum ada set yang sesuai</p>
              <p className="text-xs text-muted-hitam">
                Coba ubah kata kunci pencarian atau filter kategori TCG di atas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSets.map((set) => (
                <div
                  key={set.slug}
                  className="bg-card-putih border border-line-putih hover:border-red-500/40 rounded-2xl p-5 space-y-4 transition-all duration-300 hover:translate-y-[-2px] group shadow-xs"
                >
                  <div className="flex items-start gap-4">
                    {/* Thumbnail Preview */}
                    <div className="w-20 h-28 bg-elevated-hitam rounded-xl border border-line-putih p-1.5 shrink-0 relative overflow-hidden flex items-center justify-center">
                      <Image
                        src={set.image}
                        alt={set.title}
                        width={80}
                        height={110}
                        className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content Details */}
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-accent bg-accent-soft border border-accent-border px-2 py-0.5 rounded">
                          {set.badge}
                        </span>
                        <span className="text-xs font-mono text-subtle-hitam">
                          {set.uniqueCardsCount} Varian Kartu
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-foreground-hitam group-hover:text-accent transition-colors leading-snug line-clamp-2">
                        {set.title}
                      </h3>

                      <div className="text-xs text-muted-hitam space-y-1 pt-1 font-mono">
                        <div className="flex justify-between">
                          <span>Slab Terdaftar:</span>
                          <strong className="text-foreground-hitam">
                            {set.registeredSlabs.toLocaleString('id-ID')} Kartu
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Peringkat 1 Set:</span>
                          <strong className="text-emerald-600 dark:text-emerald-400 truncate max-w-[160px]">
                            {set.completionLeader}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t border-line-putih-soft flex items-center justify-between text-xs">
                    <span className="text-muted-hitam flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> {set.avgGrade}
                    </span>

                    <Link
                      href={`/set-registry/detail/${set.slug}`}
                      className="text-accent hover:opacity-80 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Buka Detail Set <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* 5. CALL TO ACTION BANNER (CARD HITAM KONTRAS)                             */}
        {/* ========================================================================= */}
        <div className="bg-card-hitam border border-line-hitam rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground-putih leading-tight">
              Punya Kartu Ber-grade ICS? Masukkan ke Set Registry!
            </h2>

            <p className="text-xs sm:text-sm text-muted-putih leading-relaxed">
              Klaim kepemilikan kartu fisikmu ke vault digital, pantau estimasi portofolio koleksi, dan naikkan peringkat akunmu di papan skor nasional.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/login"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
              >
                Daftar & Hubungkan Kartumu <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}