'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import CollectorAvatar from '@/components/CollectorAvatar';
import RegistryCategoryFilter, {
  type ProductCategoryItem,
  matchItemCategory,
} from '@/components/RegistryCategoryFilter';
import {
  Trophy,
  Search,
  Layers,
  Star,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Loader2,
  Database,
  Sparkles,
} from 'lucide-react';

// =========================================================================
// TIPE DATA SESUAI SCHEMA SUPABASE (collectors & card_registry)
// =========================================================================
interface CollectorRow {
  id: string;
  user_id: string | null;
  username: string;
  display_name: string;
  whatsapp_no?: string | null;
  location: string | null;
  bio: string | null;
  avatar_bg: string;
  manual_points: number;
  sets_completed: number;
  badge: string;
  join_date: string;
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
  rawUsername: string;
  displayName: string;
  totalPoints: number;
  completedSets: number;
  gemMintCount: number;
  badgeColor: string;
  avatarBg: string;
}

interface AggregatedSetItem {
  slug: string;
  categoryRaw: string;
  title: string;
  registeredSlabs: number;
  uniqueCardsCount: number;
  completionLeader: string;
  avgGrade: string;
  image: string;
  badge: string;
}

// =========================================================================
// KONFIGURASI HERO PROMO BANNERS
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

// Helper slug URL aman dari nama set
function slugifySetName(setName: string): string {
  return encodeURIComponent(setName.trim().toLowerCase().replace(/\s+/g, '-'));
}

const FALLBACK_CARD_IMAGE = '/images/home/card1.jpg';

function resolveValidImageUrl(url: string | null | undefined): string {
  if (!url) return FALLBACK_CARD_IMAGE;
  const trimmed = url.trim();
  if (trimmed.startsWith('/')) return trimmed;

  try {
    const parsed = new URL(trimmed);

    if (parsed.hostname === 'drive.google.com') {
      const match = parsed.pathname.match(/\/file\/d\/([^/]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
      }
    }

    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return trimmed;
    }
  } catch { }

  return FALLBACK_CARD_IMAGE;
}

export default function SetRegistryHomePage() {
  // State Filter Kategori & Sub-Kategori Terpusat
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubType, setSelectedSubType] = useState<string>('all');
  const [productCategories, setProductCategories] = useState<ProductCategoryItem[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // State Data Database
  const [loading, setLoading] = useState(true);
  const [collectors, setCollectors] = useState<CollectorRow[]>([]);
  const [cards, setCards] = useState<CardRegistryRow[]>([]);

  // Fetch data dari Supabase
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

  // Auto-slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);

  const collectorMap = useMemo(() => {
    const map = new Map<string, CollectorRow>();
    collectors.forEach((c) => map.set(c.id, c));
    return map;
  }, [collectors]);

  // =========================================================================
  // 1. KALKULASI STATS OVERVIEW (DENGAN MANIPULASI OFFSET AWAL & PANDUAN DINAMIS)
  // =========================================================================
  const stats = useMemo(() => {
    const realTotalSlabs = cards.length;
    const realUniqueSets = new Set(cards.map((c) => c.set_name.trim()).filter(Boolean)).size;
    const realTotalCollectors = collectors.length;

    // =========================================================================
    // PANDUAN KODE MANIPULASI AWAL / BOOTSTRAP STATISTIK:
    // Saat ini platform masih baru, kita beri nilai offset awal supaya terlihat ramai.
    // Nanti jika platform sudah berkembang dan data sudah organik, ubah semua nilai
    // di bawah ini menjadi 0 (atau hapus variabel offset-nya) agar kembali 100% murni dinamis.
    // =========================================================================
    const INITIAL_SLAB_OFFSET = 1200;      // Ubah jadi 0 jika ingin murni dari database
    const INITIAL_SET_OFFSET = 45;         // Ubah jadi 0 jika ingin murni dari database
    const INITIAL_COLLECTOR_OFFSET = 130;   // Ubah jadi 0 jika ingin murni dari database

    const totalSlabs = realTotalSlabs + INITIAL_SLAB_OFFSET;
    const uniqueSets = realUniqueSets + INITIAL_SET_OFFSET;
    const totalCollectors = realTotalCollectors + INITIAL_COLLECTOR_OFFSET;

    const verifiedCount = cards.filter((c) => c.is_encapsulated || Boolean(c.nfc_uid)).length;
    const verifiedPercentage =
      totalSlabs > 0 ? (((verifiedCount + INITIAL_SLAB_OFFSET) / totalSlabs) * 100).toFixed(1) : '100.0';

    return {
      totalSlabs,
      uniqueSets,
      totalCollectors,
      verifiedPercentage,
    };
  }, [cards, collectors]);

  // =========================================================================
  // 2. KALKULASI TOP 5 KOLEKTOR KLASEMEN
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

        const rawUsername = c.username.replace(/^@/, '');
        return {
          id: c.id,
          username: c.username.startsWith('@') ? c.username : `@${c.username}`,
          rawUsername,
          displayName: c.display_name,
          totalPoints,
          completedSets: Number(c.sets_completed || 0),
          gemMintCount: cStats.gemMintCount,
          avatarBg: c.avatar_bg || 'from-indigo-500 to-purple-600',
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
  // 3. AGREGASI SET TCG POPULER & DAFTAR KATEGORI DINAMIS DARI DATABASE
  // =========================================================================
  const { aggregatedSets, dynamicCategories } = useMemo(() => {
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

    const categorySet = new Set<string>();

    cards.forEach((card) => {
      const key = card.set_name.trim();
      if (!key) return;

      const rawCategory = (card.tcg_type || 'Other').trim();
      categorySet.add(rawCategory);

      if (!grouped.has(key)) {
        grouped.set(key, {
          setName: key,
          tcgType: rawCategory,
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

    const allSets: AggregatedSetItem[] = Array.from(grouped.values())
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
          categoryRaw: entry.tcgType,
          title: entry.setName,
          registeredSlabs: entry.slabs.length,
          uniqueCardsCount: entry.uniqueCardKeys.size,
          completionLeader: leaderHandle,
          avgGrade: `${avg} Avg Grade`,
          image: entry.sampleImage,
          badge,
        };
      });

    // Batasi set populer maksimal 6 kartu/set sesuai permintaan
    const limitedSets = allSets.slice(0, 6);

    return {
      aggregatedSets: limitedSets,
      dynamicCategories: Array.from(categorySet),
    };
  }, [cards, collectorMap]);

  // Filter Set berdasarkan kategori, sub-kategori terpusat & pencarian
  const filteredSets = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return aggregatedSets.filter((set) => {
      const matchesCategory = matchItemCategory(
        set.categoryRaw,
        selectedCategory,
        selectedSubType,
        productCategories
      );
      const matchesSearch =
        !query ||
        set.title.toLowerCase().includes(query) ||
        set.completionLeader.toLowerCase().includes(query) ||
        set.categoryRaw.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [aggregatedSets, selectedCategory, selectedSubType, productCategories, searchQuery]);

  const activeSlideData = HERO_BANNERS[currentSlide];

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 md:pt-40 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* ========================================================================= */}
        {/* 1. HERO PROMO BANNER SLIDER                                               */}
        {/* ========================================================================= */}
        <div className="relative group">
          <div className="relative rounded-3xl overflow-hidden bg-card-hitam border border-red-500/25 min-h-[340px] sm:min-h-[400px] p-6 sm:p-12 flex items-center shadow-2xl transition-all duration-700">

            <Image
              src={activeSlideData.image}
              alt={activeSlideData.title}
              fill
              priority
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C10]/95 via-[#0A0C10]/70 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-5 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 backdrop-blur-md border border-red-500/40 text-[11px] font-extrabold text-red-400 uppercase tracking-wider">
                {activeSlideData.tag}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                {activeSlideData.title}
              </h1>

              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed max-w-xl">
                {activeSlideData.description}
              </p>
            </div>

          </div>

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

          <div className="flex items-center justify-center gap-2 pt-3">
            {HERO_BANNERS.map((banner, idx) => (
              <button
                key={banner.id}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${currentSlide === idx
                  ? 'w-8 bg-red-600'
                  : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. STATS OVERVIEW BANNER (DENGAN OFFSET AWAL & PANDUAN KODE DINAMIS)      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card-putih border border-line-putih rounded-2xl p-5 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-foreground-hitam font-mono">
              {loading ? '...' : stats.totalSlabs.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-muted-hitam block uppercase font-medium">TOTAL SLAB TERDAFTAR</span>
          </div>

          <div className="bg-card-putih border border-line-putih rounded-2xl p-5 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-accent font-mono">
              {loading ? '...' : stats.uniqueSets.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-muted-hitam block uppercase font-medium">OFFICIAL REGISTERED SETS</span>
          </div>

          <div className="bg-card-putih border border-line-putih rounded-2xl p-5 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {loading ? '...' : stats.totalCollectors.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-muted-hitam block uppercase font-medium">KOLEKTOR TERDAFTAR</span>
          </div>

          <div className="bg-card-putih border border-line-putih rounded-2xl p-5 text-center space-y-1 shadow-xs">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
              {loading ? '...' : `${stats.verifiedPercentage}%`}
            </span>
            <span className="text-[11px] text-muted-hitam block uppercase font-medium">VERIFIED ENCAPSULATION</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TOP 5 KOLEKTOR KLASEMEN                                                */}
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
                <tbody className="divide-y divide-line-putih-soft">
                  {topCollectors.map((row) => (
                    <tr key={row.id} className="hover:bg-elevated-putih/70 transition-colors">
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-extrabold text-xs border font-mono ${row.badgeColor}`}
                        >
                          {row.rank}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-sans font-bold text-foreground-hitam">
                        <Link
                          href={`/set-registry/user/${encodeURIComponent(row.rawUsername)}`}
                          className="flex items-center gap-2 group/link hover:text-accent transition-colors"
                          title={`Lihat profil ${row.username}`}
                        >
                          <CollectorAvatar
                            avatarBg={row.avatarBg}
                            username={row.rawUsername}
                            sizeClass="w-9 h-9"
                            textSizeClass="text-sm"
                            shapeClass="rounded-full"
                            borderClass="shadow-xs group-hover/link:ring-2 group-hover/link:ring-accent transition-all"
                          />
                          <div>
                            <span className="block group-hover/link:underline">{row.username}</span>
                            {row.displayName && (
                              <span className="text-[11px] font-normal text-subtle-hitam block">
                                {row.displayName}
                              </span>
                            )}
                          </div>
                        </Link>
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
        {/* 4. FEATURED SETS CATALOG & REGISTRY CATEGORY FILTER TERPUSAT              */}
        {/* ========================================================================= */}
        <div className="space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line-putih-soft pb-4">
            <div>
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                KATALOG RELEASES
              </span>
              <h2 className="text-2xl font-extrabold text-foreground-hitam mt-0.5 flex items-center gap-2">
                <Layers className="w-6 h-6 text-accent" /> Set Populer (Maks. 6 Set)
              </h2>
            </div>
          </div>

          {/* Kontrol Filter Kategori & Sub-Kategori Terpusat */}
          <RegistryCategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSubType={selectedSubType}
            onSubTypeChange={setSelectedSubType}
            categories={productCategories}
            onCategoriesLoaded={setProductCategories}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Cari set rilis..."
          />

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
                    <div className="w-20 h-28 bg-elevated-hitam rounded-xl border border-line-putih p-1.5 shrink-0 relative overflow-hidden flex items-center justify-center">
                      <Image
                        src={set.image}
                        alt={set.title}
                        width={80}
                        height={110}
                        className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-accent bg-accent-soft border border-accent-border px-2 py-0.5 rounded">
                          {set.badge}
                        </span>
                        <span className="text-xs text-subtle-hitam">
                          {set.uniqueCardsCount} Varian Kartu
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-foreground-hitam group-hover:text-accent transition-colors leading-snug line-clamp-2">
                        {set.title}
                      </h3>

                      <div className="text-xs text-muted-hitam space-y-1 pt-1">
                        <div className="flex justify-between">
                          <span>Slab Terdaftar:</span>
                          <strong className="text-foreground-hitam font-mono">
                            {set.registeredSlabs.toLocaleString('id-ID')} Kartu
                          </strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Peringkat 1 Set:</span>
                          {set.completionLeader && set.completionLeader !== 'Belum Diklaim' && set.completionLeader !== 'Belum Ada' ? (
                            <Link
                              href={`/set-registry/user/${encodeURIComponent(set.completionLeader.replace(/^@/, ''))}`}
                              className="text-emerald-600 dark:text-emerald-400 font-bold truncate max-w-[160px] hover:underline"
                              title={`Lihat profil ${set.completionLeader}`}
                            >
                              {set.completionLeader}
                            </Link>
                          ) : (
                            <strong className="text-emerald-600 dark:text-emerald-400 truncate max-w-[160px]">
                              {set.completionLeader}
                            </strong>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-line-putih-soft flex items-center justify-between text-xs">
                    <span className="text-muted-hitam flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 dark:text-amber-400" /> {set.avgGrade}
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
        {/* 5. CALL TO ACTION BANNER                                                  */}
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