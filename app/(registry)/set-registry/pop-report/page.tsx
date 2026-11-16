'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import {
  BarChart3,
  Search,
  ArrowLeft,
  Loader2,
  Database,
} from 'lucide-react';

// =========================================================================
// TIPE DATA SESUAI SCHEMA SUPABASE (card_registry & product_categories)
// =========================================================================
interface CardRegistryRow {
  id: string;
  cert_number: string;
  card_name: string;
  set_name: string;
  card_number: string | null;
  tcg_type: string | null;
  final_grade: number;
  front_image_url: string;
  is_frozen: boolean | null;
}

interface ProductCategoryRow {
  id: string;
  name: string;
  slug: string;
  sub_types: string[];
}

interface PopReportItem {
  id: string;
  tcgCategory: 'pokemon' | 'onepiece' | 'yugioh' | 'other';
  rawTcgType: string;
  cardName: string;
  setName: string;
  totalPop: number;
  grade10: number;
  grade95: number;
  grade90: number;
  gradeBelow9: number;
  gemMintRatio: string;
  image: string;
}

// =========================================================================
// HELPER GAMBAR & NORMALISASI KATEGORI
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

function normalizeTcgCategory(tcgType: string | null): 'pokemon' | 'onepiece' | 'yugioh' | 'other' {
  const val = (tcgType || '').toUpperCase();
  if (val.includes('POKEMON') || val.includes('POKÉMON')) return 'pokemon';
  if (val.includes('ONE_PIECE') || val.includes('ONE PIECE') || val === 'OP') return 'onepiece';
  if (val.includes('YUGIOH') || val.includes('YU-GI-OH') || val === 'YGO') return 'yugioh';
  return 'other';
}

export default function PopReportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTcg, setSelectedTcg] = useState<'all' | 'pokemon' | 'onepiece' | 'yugioh'>('all');

  // State Data Database
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<CardRegistryRow[]>([]);
  const [, setCategories] = useState<ProductCategoryRow[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchPopReportData() {
      setLoading(true);
      try {
        const [cardsRes, catRes] = await Promise.all([
          supabase
            .from('card_registry')
            .select(
              'id, cert_number, card_name, set_name, card_number, tcg_type, final_grade, front_image_url, is_frozen'
            )
            .eq('is_frozen', false),
          supabase
            .from('product_categories')
            .select('id, name, slug, sub_types')
            .eq('status', 'Active'),
        ]);

        if (!isMounted) return;

        if (cardsRes.error) {
          console.error('Error fetching card_registry:', cardsRes.error.message);
        } else {
          setCards((cardsRes.data as CardRegistryRow[]) || []);
        }

        if (catRes.error) {
          console.error('Error fetching product_categories:', catRes.error.message);
        } else {
          setCategories((catRes.data as ProductCategoryRow[]) || []);
        }
      } catch (err) {
        console.error('Unexpected error loading Pop Report:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPopReportData();
    return () => {
      isMounted = false;
    };
  }, []);

  // =========================================================================
  // 1. STATS OVERVIEW GLOBAL (REAL-TIME DARI card_registry)
  // =========================================================================
  const globalStats = useMemo(() => {
    const totalGraded = cards.length;
    const totalGemMint10 = cards.filter((c) => Number(c.final_grade) >= 10).length;
    const ratioGemMint10 =
      totalGraded > 0 ? `${((totalGemMint10 / totalGraded) * 100).toFixed(1)}%` : '0.0%';
    const totalSets = new Set(cards.map((c) => c.set_name.trim()).filter(Boolean)).size;

    return {
      totalGraded,
      totalGemMint10,
      ratioGemMint10,
      totalSets,
    };
  }, [cards]);

  // =========================================================================
  // 2. AGREGASI POP REPORT PER KARTU & SET
  // =========================================================================
  const popData: PopReportItem[] = useMemo(() => {
    const grouped = new Map<
      string,
      {
        id: string;
        tcgCategory: 'pokemon' | 'onepiece' | 'yugioh' | 'other';
        rawTcgType: string;
        cardName: string;
        setName: string;
        totalPop: number;
        grade10: number;
        grade95: number;
        grade90: number;
        gradeBelow9: number;
        image: string;
      }
    >();

    cards.forEach((card) => {
      const cleanSet = card.set_name.trim();
      const cleanName = card.card_name.trim();
      const cleanNo = (card.card_number || '').trim();
      const key = `${cleanSet.toLowerCase()}::${cleanNo.toLowerCase()}::${cleanName.toLowerCase()}`;

      const formattedCardTitle = cleanNo
        ? `${cleanName} ${cleanNo.startsWith('#') ? cleanNo : `#${cleanNo}`}`
        : cleanName;

      if (!grouped.has(key)) {
        grouped.set(key, {
          id: key,
          tcgCategory: normalizeTcgCategory(card.tcg_type),
          rawTcgType: card.tcg_type || 'OTHER',
          cardName: formattedCardTitle,
          setName: cleanSet,
          totalPop: 0,
          grade10: 0,
          grade95: 0,
          grade90: 0,
          gradeBelow9: 0,
          image: resolveValidImageUrl(card.front_image_url),
        });
      }

      const entry = grouped.get(key)!;
      const grade = Number(card.final_grade || 0);

      entry.totalPop += 1;
      if (grade >= 10) {
        entry.grade10 += 1;
      } else if (grade >= 9.5) {
        entry.grade95 += 1;
      } else if (grade >= 9.0) {
        entry.grade90 += 1;
      } else {
        entry.gradeBelow9 += 1;
      }

      const validImg = resolveValidImageUrl(card.front_image_url);
      if (entry.image === FALLBACK_CARD_IMAGE && validImg !== FALLBACK_CARD_IMAGE) {
        entry.image = validImg;
      }
    });

    return Array.from(grouped.values())
      .sort((a, b) => b.totalPop - a.totalPop || b.grade10 - a.grade10)
      .map((item) => {
        const ratio =
          item.totalPop > 0 ? `${((item.grade10 / item.totalPop) * 100).toFixed(1)}%` : '0.0%';
        return {
          ...item,
          gemMintRatio: ratio,
        };
      });
  }, [cards]);

  // Filter berdasarkan tab TCG & pencarian
  const filteredPop = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return popData.filter((item) => {
      const matchesTcg = selectedTcg === 'all' || item.tcgCategory === selectedTcg;
      const matchesSearch =
        !query ||
        item.cardName.toLowerCase().includes(query) ||
        item.setName.toLowerCase().includes(query) ||
        item.rawTcgType.toLowerCase().includes(query);
      return matchesTcg && matchesSearch;
    });
  }, [popData, selectedTcg, searchQuery]);

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* ========================================================================= */}
        {/* 1. BREADCRUMB & HERO HEADER                                               */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/set-registry"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-hitam hover:text-accent transition-colors bg-card-putih border border-line-putih px-4 py-2 rounded-xl w-fit shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Set Registry
          </Link>

          <span className="text-xs font-mono text-muted-hitam bg-elevated-putih border border-line-putih px-3 py-1.5 rounded-lg w-fit">
            REAL-TIME FORENSIC CENSUS LEDGER
          </span>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-soft border border-accent-border text-[11px] font-extrabold text-accent uppercase tracking-widest">
            <BarChart3 className="w-3.5 h-3.5 text-accent" />
            POPULATION REPORT & RARITY INDEX
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground-hitam tracking-tight leading-tight">
            ICS Population Report <span className="text-accent">(Pop Report)</span>
          </h1>

          <p className="text-muted-hitam text-xs sm:text-sm leading-relaxed">
            Pantau sensus resmi distribusi grade dan tingkat kelangkaan setiap kartu yang telah lulus enkapsulasi forensik di laboratorium ICS.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. STATS OVERVIEW CARDS (LIVE DARI SUPABASE)                              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card-hitam border border-line-hitam rounded-2xl p-5 text-center space-y-1 shadow-xl backdrop-blur-md">
            <span className="text-2xl sm:text-3xl font-black text-foreground-putih">
              {loading ? '...' : globalStats.totalGraded.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-muted-putih block font-mono">TOTAL KARTU DI-GRADE</span>
          </div>

          <div className="bg-card-hitam border border-line-hitam rounded-2xl p-5 text-center space-y-1 shadow-xl backdrop-blur-md">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">
              {loading ? '...' : globalStats.totalGemMint10.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-muted-putih block font-mono">TOTAL GEM MINT 10</span>
          </div>

          <div className="bg-card-hitam border border-line-hitam rounded-2xl p-5 text-center space-y-1 shadow-xl backdrop-blur-md">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">
              {loading ? '...' : globalStats.ratioGemMint10}
            </span>
            <span className="text-[11px] text-muted-putih block font-mono">RATIO POPULATION 10</span>
          </div>

          <div className="bg-card-hitam border border-line-hitam rounded-2xl p-5 text-center space-y-1 shadow-xl backdrop-blur-md">
            <span className="text-2xl sm:text-3xl font-black text-red-500">
              {loading ? '...' : globalStats.totalSets.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] text-muted-putih block font-mono">SET TCG TERDAFTAR</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SEARCH & FILTER TOOLBAR (CARD PUTIH)                                   */}
        {/* ========================================================================= */}
        <div className="bg-card-putih border border-line-putih rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">

          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama kartu atau nama set TCG..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
            />
          </div>

          {/* TCG Filter Category */}
          <div className="flex items-center gap-1 bg-elevated-putih p-1 rounded-xl border border-line-putih-soft overflow-x-auto w-full md:w-auto">
            <button
              type="button"
              onClick={() => setSelectedTcg('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTcg === 'all' ? 'bg-red-600 text-white' : 'text-muted-hitam hover:text-foreground-hitam'
              }`}
            >
              Semua TCG
            </button>
            <button
              type="button"
              onClick={() => setSelectedTcg('pokemon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTcg === 'pokemon' ? 'bg-red-600 text-white' : 'text-muted-hitam hover:text-foreground-hitam'
              }`}
            >
              Pokémon Card
            </button>
            <button
              type="button"
              onClick={() => setSelectedTcg('onepiece')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTcg === 'onepiece' ? 'bg-red-600 text-white' : 'text-muted-hitam hover:text-foreground-hitam'
              }`}
            >
              One Piece Card
            </button>
            <button
              type="button"
              onClick={() => setSelectedTcg('yugioh')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTcg === 'yugioh' ? 'bg-red-600 text-white' : 'text-muted-hitam hover:text-foreground-hitam'
              }`}
            >
              Yu-Gi-Oh!
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. POPULATION REPORT TABLE (LIVE DARI card_registry)                      */}
        {/* ========================================================================= */}
        <div className="bg-card-putih border border-line-putih rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center text-muted-hitam gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
              <span className="text-xs">Menghitung sensus populasi kartu dari database...</span>
            </div>
          ) : filteredPop.length === 0 ? (
            <div className="py-16 text-center space-y-2 px-4">
              <Database className="w-8 h-8 text-subtle-hitam mx-auto" />
              <p className="text-sm font-bold text-foreground-hitam">Data Population Report tidak ditemukan</p>
              <p className="text-xs text-muted-hitam">
                Coba ubah kata kunci pencarian atau pilih filter kategori lain di atas.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-line-putih text-[10px] font-bold uppercase tracking-wider text-muted-hitam bg-elevated-putih">
                    <th className="py-4 px-6">DETAIL KARTU & SET</th>
                    <th className="py-4 px-6 text-center">TOTAL POP</th>
                    <th className="py-4 px-6 text-center text-amber-600 dark:text-amber-400">GRADE 10</th>
                    <th className="py-4 px-6 text-center text-emerald-600 dark:text-emerald-400">GRADE 9.5</th>
                    <th className="py-4 px-6 text-center text-muted-hitam">GRADE 9.0</th>
                    <th className="py-4 px-6 text-center text-subtle-hitam">&lt; GRADE 9</th>
                    <th className="py-4 px-6 text-right">GEM MINT RATIO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-putih-soft font-mono">
                  {filteredPop.map((item) => (
                    <tr key={item.id} className="hover:bg-elevated-putih/70 transition-colors">

                      {/* Card Title & Set */}
                      <td className="py-4 px-6 font-sans">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-14 bg-elevated-putih rounded border border-line-putih p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                            <Image src={item.image} alt={item.cardName} width={34} height={46} className="object-contain" />
                          </div>
                          <div>
                            <strong className="text-foreground-hitam font-bold block">{item.cardName}</strong>
                            <span className="text-[11px] text-muted-hitam block font-normal">{item.setName}</span>
                          </div>
                        </div>
                      </td>

                      {/* Total Population */}
                      <td className="py-4 px-6 text-center font-bold text-foreground-hitam text-sm">
                        {item.totalPop.toLocaleString('id-ID')}
                      </td>

                      {/* Grade 10 */}
                      <td className="py-4 px-6 text-center font-black text-amber-600 dark:text-amber-400 bg-amber-500/10">
                        {item.grade10.toLocaleString('id-ID')}
                      </td>

                      {/* Grade 9.5 */}
                      <td className="py-4 px-6 text-center font-bold text-emerald-600 dark:text-emerald-400">
                        {item.grade95.toLocaleString('id-ID')}
                      </td>

                      {/* Grade 9.0 */}
                      <td className="py-4 px-6 text-center text-muted-hitam">
                        {item.grade90.toLocaleString('id-ID')}
                      </td>

                      {/* < Grade 9 */}
                      <td className="py-4 px-6 text-center text-subtle-hitam">
                        {item.gradeBelow9.toLocaleString('id-ID')}
                      </td>

                      {/* Ratio */}
                      <td className="py-4 px-6 text-right font-black text-accent font-sans">
                        <span className="bg-accent-soft border border-accent-border px-2.5 py-1 rounded-md text-xs">
                          {item.gemMintRatio}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}