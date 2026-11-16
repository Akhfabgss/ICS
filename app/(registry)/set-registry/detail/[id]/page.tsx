'use client';

import { useState, useEffect, useMemo, use, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import {
  Trophy,
  ArrowLeft,
  Search,
  Layers,
  ExternalLink,
  UserCheck,
  Loader2,
  Database,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

// =========================================================================
// TIPE DATA SESUAI SCHEMA SUPABASE (card_registry & collectors)
// =========================================================================
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
  is_frozen: boolean | null;
  created_at: string | null;
  collector_id: string | null;
  points: number;
}

interface CollectorRow {
  id: string;
  username: string;
  display_name: string;
  badge: string;
}

interface ChecklistRow {
  key: string;
  certId: string;
  cardNo: string;
  name: string;
  language: string;
  popGem10: number;
  popMint95: number;
  totalPop: number;
  image: string;
}

interface SetLeaderRow {
  collectorId: string;
  rank: number;
  collector: string;
  rawUsername: string;
  displayName: string;
  ownedUnique: number;
  completion: string;
  avgGrade: string;
  totalPoints: string;
  rawPoints: number;
  badge: string;
}

// =========================================================================
// HELPER GAMBAR & SLUG MATCHING
// =========================================================================
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
    // Fallback jika bukan URL valid
  }

  return FALLBACK_CARD_IMAGE;
}

function normalizeSlug(text: string): string {
  return decodeURIComponent(text).trim().toLowerCase().replace(/[\s_]+/g, '-');
}

function formatTcgDisplay(raw: string | null): string {
  const upper = (raw || 'OTHER').trim().toUpperCase();
  const labels: Record<string, string> = {
    POKEMON: 'Pokémon TCG',
    ONE_PIECE: 'One Piece Card Game',
    YUGIOH: 'Yu-Gi-Oh! OCG / TCG',
    MTG: 'Magic: The Gathering',
    BANDAI_TCG: 'Bandai Card Games',
    SPORTS: 'Sports Cards',
    NARUTO: 'Naruto Kayou & CCG',
    FUNKO_POP: 'Funko Pop! Vinyl',
    DIECAST: 'Diecast & Scale Models',
    ANIME_FIGURE: 'Anime Scale & Prize Figure',
    MODEL_KIT: 'Model Kit',
    VINTAGE_FIGURE: 'Vintage Action Figure',
  };
  if (labels[upper]) return labels[upper];
  return upper
    .split('_')
    .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
    .join(' ');
}

// =========================================================================
// INTERNAL CLIENT COMPONENT (DIBUNGKUS SUSPENSE DI EXPORT DEFAULT)
// =========================================================================
function SetDetailContent({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawParamId = resolvedParams.id;
  const targetSlug = normalizeSlug(rawParamId);

  const [activeTab, setActiveTab] = useState<'checklist' | 'leaderboard'>('checklist');
  const [searchQuery, setSearchQuery] = useState('');

  // State Data Database
  const [loading, setLoading] = useState(true);
  const [matchedCards, setMatchedCards] = useState<CardRegistryRow[]>([]);
  const [collectors, setCollectors] = useState<CollectorRow[]>([]);
  const [matchMode, setMatchMode] = useState<'set' | 'subtype'>('set');

  useEffect(() => {
    let isMounted = true;

    async function fetchDetailData() {
      setLoading(true);
      try {
        const [cardsRes, collectorsRes] = await Promise.all([
          supabase
            .from('card_registry')
            .select(
              'id, cert_number, card_name, set_name, card_number, language, tcg_type, final_grade, grade_label, front_image_url, is_frozen, created_at, collector_id, points'
            )
            .eq('is_frozen', false),
          supabase.from('collectors').select('id, username, display_name, badge'),
        ]);

        if (!isMounted) return;

        const allCards = (cardsRes.data as CardRegistryRow[]) || [];
        const allCollectors = (collectorsRes.data as CollectorRow[]) || [];

        if (cardsRes.error) {
          console.error('Error fetching card_registry:', cardsRes.error.message);
        }
        if (collectorsRes.error) {
          console.error('Error fetching collectors:', collectorsRes.error.message);
        }

        // 1. Coba cocokkan berdasarkan slug set_name (dari halaman utama Set Registry)
        const bySetName = allCards.filter((c) => normalizeSlug(c.set_name) === targetSlug);

        if (bySetName.length > 0) {
          setMatchedCards(bySetName);
          setMatchMode('set');
        } else {
          // 2. Fallback: cocokkan berdasarkan slug tcg_type (dari halaman Katalog Sub-Kategori)
          const bySubType = allCards.filter(
            (c) => normalizeSlug(c.tcg_type || 'other') === targetSlug
          );
          setMatchedCards(bySubType);
          setMatchMode('subtype');
        }

        setCollectors(allCollectors);
      } catch (err) {
        console.error('Unexpected error loading Set Detail:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDetailData();
    return () => {
      isMounted = false;
    };
  }, [targetSlug]);

  // Map collector_id -> CollectorRow
  const collectorMap = useMemo(() => {
    const map = new Map<string, CollectorRow>();
    collectors.forEach((c) => map.set(c.id, c));
    return map;
  }, [collectors]);

  // =========================================================================
  // 1. CHECKLIST KARTU & POP REPORT DARI card_registry
  // =========================================================================
  const cardChecklist: ChecklistRow[] = useMemo(() => {
    const grouped = new Map<
      string,
      {
        key: string;
        bestCertNumber: string;
        bestGrade: number;
        cardNo: string;
        name: string;
        language: string;
        popGem10: number;
        popMint95: number;
        totalPop: number;
        image: string;
      }
    >();

    matchedCards.forEach((card) => {
      const cleanNo = (card.card_number || '').trim();
      const cleanName = card.card_name.trim();
      const key = `${cleanNo.toLowerCase()}::${cleanName.toLowerCase()}`;

      if (!grouped.has(key)) {
        grouped.set(key, {
          key,
          bestCertNumber: card.cert_number,
          bestGrade: Number(card.final_grade || 0),
          cardNo: cleanNo ? (cleanNo.startsWith('#') ? cleanNo : `#${cleanNo}`) : '-',
          name: cleanName,
          language: card.language || 'Japanese',
          popGem10: 0,
          popMint95: 0,
          totalPop: 0,
          image: resolveValidImageUrl(card.front_image_url),
        });
      }

      const entry = grouped.get(key)!;
      const grade = Number(card.final_grade || 0);
      entry.totalPop += 1;

      if (grade >= 10) {
        entry.popGem10 += 1;
      } else if (grade >= 9.5) {
        entry.popMint95 += 1;
      }

      if (grade > entry.bestGrade) {
        entry.bestGrade = grade;
        entry.bestCertNumber = card.cert_number;
      }

      const validImg = resolveValidImageUrl(card.front_image_url);
      if (entry.image === FALLBACK_CARD_IMAGE && validImg !== FALLBACK_CARD_IMAGE) {
        entry.image = validImg;
      }
    });

    return Array.from(grouped.values())
      .sort((a, b) => a.cardNo.localeCompare(b.cardNo, undefined, { numeric: true }))
      .map((item) => ({
        key: item.key,
        certId: item.bestCertNumber,
        cardNo: item.cardNo,
        name: item.name,
        language: item.language,
        popGem10: item.popGem10,
        popMint95: item.popMint95,
        totalPop: item.totalPop,
        image: item.image,
      }));
  }, [matchedCards]);

  // =========================================================================
  // 2. KLASEMEN KOLEKTOR KHUSUS SET / SUB-KATEGORI INI
  // =========================================================================
  const setLeaders: SetLeaderRow[] = useMemo(() => {
    const totalUniqueInSet = Math.max(1, cardChecklist.length);

    const byCollector = new Map<
      string,
      {
        uniqueKeys: Set<string>;
        gradeSum: number;
        slabCount: number;
        pointsSum: number;
      }
    >();

    matchedCards.forEach((card) => {
      if (!card.collector_id) return;

      if (!byCollector.has(card.collector_id)) {
        byCollector.set(card.collector_id, {
          uniqueKeys: new Set(),
          gradeSum: 0,
          slabCount: 0,
          pointsSum: 0,
        });
      }

      const entry = byCollector.get(card.collector_id)!;
      const cardKey = `${(card.card_number || '').trim().toLowerCase()}::${card.card_name
        .trim()
        .toLowerCase()}`;

      entry.uniqueKeys.add(cardKey);
      entry.gradeSum += Number(card.final_grade || 0);
      entry.slabCount += 1;
      entry.pointsSum += Number(card.points || 0);
    });

    const sorted = Array.from(byCollector.entries())
      .map(([colId, stats]) => {
        const col = collectorMap.get(colId);
        const rawUsername = col ? col.username.replace(/^@/, '') : colId.slice(0, 8);
        const ownedUnique = stats.uniqueKeys.size;
        const pct = Math.min(100, (ownedUnique / totalUniqueInSet) * 100).toFixed(1);
        const avg = (stats.gradeSum / Math.max(1, stats.slabCount)).toFixed(2);

        return {
          collectorId: colId,
          collector: `@${rawUsername}`,
          rawUsername,
          displayName: col?.display_name || rawUsername,
          ownedUnique,
          completion: `${pct}% (${ownedUnique}/${cardChecklist.length})`,
          avgGrade: avg,
          rawPoints: stats.pointsSum,
          totalPoints: `${stats.pointsSum.toLocaleString('id-ID')} PTS`,
          badge: col?.badge || 'COLLECTOR',
        };
      })
      .sort((a, b) => b.rawPoints - a.rawPoints || b.ownedUnique - a.ownedUnique);

    return sorted.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  }, [matchedCards, cardChecklist.length, collectorMap]);

  // =========================================================================
  // 3. RINGKASAN HEADER SET (setData)
  // =========================================================================
  const setData = useMemo(() => {
    const firstCard = matchedCards[0];
    const fallbackTitle = decodeURIComponent(rawParamId)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());

    const title =
      matchMode === 'set' && firstCard?.set_name
        ? firstCard.set_name
        : firstCard?.tcg_type
        ? `${formatTcgDisplay(firstCard.tcg_type)} — Katalog Koleksi`
        : fallbackTitle;

    const category = firstCard ? formatTcgDisplay(firstCard.tcg_type) : 'ICS Registry';

    const years = matchedCards
      .map((c) => (c.created_at ? new Date(c.created_at).getFullYear() : null))
      .filter((y): y is number => y !== null);
    const releaseYear = years.length > 0 ? String(Math.min(...years)) : '2026';

    const registeredSlabs = matchedCards.length;
    const gemMintCount = matchedCards.filter((c) => Number(c.final_grade) >= 10).length;
    const gemMintRatio =
      registeredSlabs > 0 ? `${((gemMintCount / registeredSlabs) * 100).toFixed(1)}%` : '0.0%';

    const bannerImage =
      cardChecklist.find((c) => c.image !== FALLBACK_CARD_IMAGE)?.image || FALLBACK_CARD_IMAGE;

    return {
      id: targetSlug.toUpperCase(),
      title,
      category,
      releaseYear,
      totalCardsInSet: cardChecklist.length,
      registeredSlabs,
      gemMintRatio,
      topCollector: setLeaders[0]?.collector || 'Belum Ada Pemimpin',
      bannerImage,
    };
  }, [matchedCards, matchMode, rawParamId, targetSlug, cardChecklist, setLeaders]);

  const filteredChecklist = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return cardChecklist;
    return cardChecklist.filter(
      (card) =>
        card.name.toLowerCase().includes(query) ||
        card.cardNo.toLowerCase().includes(query) ||
        card.certId.toLowerCase().includes(query)
    );
  }, [cardChecklist, searchQuery]);

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* ========================================================================= */}
        {/* 1. BACK NAVIGATION & BREADCRUMB                                           */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/set-registry"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-hitam hover:text-accent transition-colors bg-card-putih border border-line-putih px-4 py-2 rounded-xl w-fit shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Set Registry
          </Link>

          <span className="text-xs font-mono text-subtle-hitam uppercase">
            SET ID: #{setData.id}
          </span>
        </div>

        {/* ========================================================================= */}
        {/* 2. SET HEADER HERO BANNER (LIVE DARI SUPABASE)                            */}
        {/* ========================================================================= */}
        <div className="bg-card-hitam border border-line-hitam rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 blur-[100px] pointer-events-none rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Card Preview */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="w-36 h-48 bg-[#0A0C10] rounded-2xl border border-line-hitam p-2 relative flex items-center justify-center shadow-xl group">
                <Image
                  src={setData.bannerImage}
                  alt={setData.title}
                  width={140}
                  height={190}
                  className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Right Set Info */}
            <div className="lg:col-span-9 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold text-red-400 bg-red-950/60 border border-red-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  {setData.category}
                </span>
                <span className="text-xs font-mono text-muted-putih">
                  Terdaftar Sejak {setData.releaseYear}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground-putih leading-tight">
                {loading ? 'Memuat Detail Set...' : setData.title}
              </h1>

              {/* Set Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3">
                  <span className="text-subtle-putih text-[10px] block uppercase font-mono">
                    VARIAN KARTU TERDATA
                  </span>
                  <span className="font-extrabold text-foreground-putih text-base mt-0.5 block">
                    {loading ? '...' : `${setData.totalCardsInSet} Kartu`}
                  </span>
                </div>

                <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3">
                  <span className="text-subtle-putih text-[10px] block uppercase font-mono">
                    SLAB TERDAFTAR
                  </span>
                  <span className="font-extrabold text-red-400 text-base mt-0.5 block">
                    {loading ? '...' : `${setData.registeredSlabs.toLocaleString('id-ID')} Slabs`}
                  </span>
                </div>

                <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3">
                  <span className="text-subtle-putih text-[10px] block uppercase font-mono">
                    RATIO GEM MINT 10
                  </span>
                  <span className="font-extrabold text-emerald-400 text-base mt-0.5 block">
                    {loading ? '...' : setData.gemMintRatio}
                  </span>
                </div>

                <div className="bg-elevated-hitam border border-line-hitam-soft rounded-xl p-3">
                  <span className="text-subtle-putih text-[10px] block uppercase font-mono">
                    PEMIMPIN SET #1
                  </span>
                  <span className="font-bold text-amber-400 text-xs mt-1 block truncate">
                    {loading ? '...' : setData.topCollector}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TAB SWITCHER (CHECKLIST VS LEADERBOARD)                                */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-line-putih pb-4">
          <div className="flex items-center gap-2 bg-card-putih border border-line-putih p-1.5 rounded-2xl w-full sm:w-auto shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('checklist')}
              className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'checklist'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-muted-hitam hover:text-foreground-hitam'
              }`}
            >
              <Layers className="w-4 h-4" /> Checklist Kartu ({setData.totalCardsInSet})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('leaderboard')}
              className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'text-muted-hitam hover:text-foreground-hitam'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" /> Klasemen Set Ini ({setLeaders.length})
            </button>
          </div>

          {activeTab === 'checklist' && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama, nomor kartu, atau cert..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card-putih border border-line-putih rounded-xl pl-10 pr-4 py-2 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors shadow-xs"
              />
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4A. TAB 1: CARD CHECKLIST TABLE (LIVE DARI card_registry)                 */}
        {/* ========================================================================= */}
        {activeTab === 'checklist' && (
          <div className="bg-card-putih border border-line-putih rounded-3xl overflow-hidden shadow-sm animate-fadeIn">
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center text-muted-hitam gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-accent" />
                <span className="text-xs">Memuat daftar populasi kartu dari database...</span>
              </div>
            ) : filteredChecklist.length === 0 ? (
              <div className="py-16 text-center space-y-2 px-4">
                <Database className="w-8 h-8 text-subtle-hitam mx-auto" />
                <p className="text-sm font-bold text-foreground-hitam">
                  Belum ada kartu terdaftar untuk set ini
                </p>
                <p className="text-xs text-muted-hitam">
                  Data populasi akan muncul otomatis setelah kartu pada set ini selesai di-grade dan masuk ke registry.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-line-putih text-[10px] font-bold uppercase tracking-wider text-muted-hitam bg-elevated-putih">
                      <th className="py-4 px-6">NO KARTU</th>
                      <th className="py-4 px-6">NAMA KARTU</th>
                      <th className="py-4 px-6 text-center">BAHASA / EDISI</th>
                      <th className="py-4 px-6 text-center">POP GEM MINT 10</th>
                      <th className="py-4 px-6 text-center">POP MINT 9.5</th>
                      <th className="py-4 px-6 text-right">AKSI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-putih-soft font-mono">
                    {filteredChecklist.map((card) => (
                      <tr key={card.key} className="hover:bg-elevated-putih/70 transition-colors">
                        <td className="py-4 px-6 font-bold text-accent">{card.cardNo}</td>
                        <td className="py-4 px-6 font-sans font-bold text-foreground-hitam">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-10 bg-elevated-putih rounded border border-line-putih p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                              <Image
                                src={card.image}
                                alt={card.name}
                                width={28}
                                height={36}
                                className="object-contain"
                              />
                            </div>
                            <span>{card.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-amber-600 dark:text-amber-400">
                          {card.language}
                        </td>
                        <td className="py-4 px-6 text-center font-bold text-emerald-600 dark:text-emerald-400">
                          {card.popGem10} Slabs
                        </td>
                        <td className="py-4 px-6 text-center text-muted-hitam">
                          {card.popMint95} Slabs
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Link
                            href={`/check-ics?cert=${encodeURIComponent(card.certId)}`}
                            className="text-xs font-sans font-bold text-accent hover:text-red-500 inline-flex items-center gap-1 bg-elevated-putih border border-line-putih px-3 py-1.5 rounded-lg transition-all"
                          >
                            Cek Pop Report <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4B. TAB 2: SET LEADERBOARD TABLE (LIVE DARI card_registry & collectors)   */}
        {/* ========================================================================= */}
        {activeTab === 'leaderboard' && (
          <div className="bg-card-putih border border-line-putih rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm animate-fadeIn">
            <div className="flex items-center justify-between border-b border-line-putih-soft pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-foreground-hitam">Klasemen Kelengkapan Set</h3>
                <p className="text-xs text-muted-hitam mt-0.5">
                  Peringkat kolektor berdasarkan persentase kelengkapan dan total poin skor kartu di set ini.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center text-muted-hitam gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-accent" />
                <span className="text-xs">Menghitung klasemen kolektor pada set ini...</span>
              </div>
            ) : setLeaders.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <Database className="w-8 h-8 text-subtle-hitam mx-auto" />
                <p className="text-sm font-bold text-foreground-hitam">
                  Belum ada kolektor yang mengklaim kartu di set ini
                </p>
                <p className="text-xs text-muted-hitam">
                  Jadilah kolektor pertama yang menghubungkan slab dari set ini ke akun ICS-mu!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-line-putih text-[10px] font-bold uppercase tracking-wider text-muted-hitam bg-elevated-putih">
                      <th className="py-4 px-6 text-center">RANK</th>
                      <th className="py-4 px-6">KOLEKTOR</th>
                      <th className="py-4 px-6 text-center">PROGRESS KELENGKAPAN</th>
                      <th className="py-4 px-6 text-center">AVG GRADE</th>
                      <th className="py-4 px-6 text-right">TOTAL POIN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-putih-soft font-mono">
                    {setLeaders.map((leader) => (
                      <tr key={leader.collectorId} className="hover:bg-elevated-putih/70 transition-colors">
                        <td className="py-4 px-6 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-black text-xs border ${
                              leader.rank === 1
                                ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/40'
                                : 'text-muted-hitam bg-elevated-putih border-line-putih'
                            }`}
                          >
                            {leader.rank}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-sans font-bold text-foreground-hitam">
                          <Link
                            href={`/set-registry/user/${leader.rawUsername}`}
                            className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                          >
                            <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>{leader.collector}</span>
                          </Link>
                        </td>
                        <td className="py-4 px-6 text-center text-muted-hitam font-bold">
                          {leader.completion}
                        </td>
                        <td className="py-4 px-6 text-center text-amber-600 dark:text-amber-400 font-bold">
                          {leader.avgGrade}
                        </td>
                        <td className="py-4 px-6 text-right font-black text-accent">
                          {leader.totalPoints}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// =========================================================================
// EXPORT DEFAULT DENGAN <Suspense> UNTUK NEXT.JS 16 BUILD / PRERENDER
// =========================================================================
export default function SetDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-surface text-foreground-hitam min-h-screen pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-card-putih border border-line-putih rounded-3xl p-20 flex flex-col items-center justify-center text-muted-hitam gap-3 shadow-xs">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="text-xs font-medium">Memuat detail set registry...</span>
            </div>
          </div>
        </div>
      }
    >
      <SetDetailContent params={params} />
    </Suspense>
  );
}