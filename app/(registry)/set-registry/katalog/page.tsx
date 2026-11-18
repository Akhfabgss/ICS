'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import {
  Layers,
  Search,
  ArrowRight,
  Trophy,
  ShieldCheck,
  Grid,
  Loader2,
  Database,
} from 'lucide-react';

// =========================================================================
// TIPE DATA SESUAI SCHEMA SUPABASE (product_categories & card_registry)
// =========================================================================
interface ProductCategoryRow {
  id: string;
  name: string;
  slug: string;
  status: string | null;
  sub_types: string[];
}

interface CardRegistryRow {
  id: string;
  set_name: string;
  tcg_type: string | null;
  final_grade: number;
  front_image_url: string;
  is_frozen: boolean | null;
}

interface SubCategoryItem {
  id: string;
  slug: string;
  code: string;
  rawCode: string;
  name: string;
  totalSets: number;
  registeredSlabs: number;
  gemMint10: number;
  image: string;
  badge?: string;
}

interface MainCategory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  accentColor: string;
  badgeBg: string;
  subCategories: SubCategoryItem[];
}

// =========================================================================
// HELPER GAMBAR & FORMATTER LABEL DATABASE
// =========================================================================
const FALLBACK_CARD_IMAGE = '/images/home/card1.jpg';

// Mapping label rapi untuk kode sub_types di database (POKEMON, ONE_PIECE, dll.)
const SUB_TYPE_LABELS: Record<string, string> = {
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
  MODEL_KIT: 'Model Kit (Gunpla / Plamo)',
  VINTAGE_FIGURE: 'Vintage Action Figure',
};

function formatSubTypeLabel(raw: string): string {
  const upper = raw.trim().toUpperCase();
  if (SUB_TYPE_LABELS[upper]) return SUB_TYPE_LABELS[upper];
  // Fallback: ubah "NAMA_SUB_TYPE" -> "Nama Sub Type"
  return upper
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

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

function slugify(text: string): string {
  return encodeURIComponent(text.trim().toLowerCase().replace(/[\s_]+/g, '-'));
}

function getCategoryTheme(slug: string, index: number) {
  const s = slug.toLowerCase();
  if (s.includes('tcg') || index === 0) {
    return {
      accentColor: 'text-red-500',
      badgeBg: 'bg-red-500/15 border-red-500/30 text-red-600 dark:text-red-400',
      subtitle: 'Kategori kartu permainan koleksi resmi yang telah melalui audit forensik dan enkapsulasi slab ICS.',
    };
  }
  if (s.includes('figure') || index === 1) {
    return {
      accentColor: 'text-amber-500',
      badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400',
      subtitle: 'Sertifikasi keaslian boks, segel pabrik, dan kondisi fisik action figure maupun art toys.',
    };
  }
  return {
    accentColor: 'text-emerald-500',
    badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    subtitle: 'Direktori item koleksi terstandarisasi dengan rekam jejak digital permanen di ICS Registry.',
  };
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<ProductCategoryRow[]>([]);
  const [cards, setCards] = useState<CardRegistryRow[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchCatalogData() {
      setLoading(true);
      setErrorMessage(null);
      try {
        const [catRes, cardsRes] = await Promise.all([
          supabase
            .from('product_categories')
            .select('id, name, slug, status, sub_types')
            .eq('status', 'Active')
            .order('name', { ascending: false }), // TCG dulu, lalu Action Figure
          supabase
            .from('card_registry')
            .select('id, set_name, tcg_type, final_grade, front_image_url, is_frozen')
            .eq('is_frozen', false),
        ]);

        if (!isMounted) return;

        if (catRes.error) {
          console.error('Error fetching product_categories:', catRes.error.message);
          setErrorMessage(`Gagal memuat product_categories: ${catRes.error.message}`);
        } else {
          setCategories((catRes.data as ProductCategoryRow[]) || []);
        }

        if (cardsRes.error) {
          console.error('Error fetching card_registry:', cardsRes.error.message);
        } else {
          setCards((cardsRes.data as CardRegistryRow[]) || []);
        }
      } catch (err) {
        console.error('Unexpected error loading Catalog:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCatalogData();
    return () => {
      isMounted = false;
    };
  }, []);

  // =========================================================================
  // AGREGASI MURNI DARI TABEL product_categories + STATISTIK card_registry
  // =========================================================================
  const catalogData: MainCategory[] = useMemo(() => {
    // Hitung statistik card_registry per tcg_type (POKEMON, ONE_PIECE, FUNKO_POP, dll.)
    const statsBySubType = new Map<
      string,
      {
        uniqueSets: Set<string>;
        slabsCount: number;
        gemMint10Count: number;
        sampleImage: string;
      }
    >();

    cards.forEach((card) => {
      const key = (card.tcg_type || 'OTHER').trim().toUpperCase();

      if (!statsBySubType.has(key)) {
        statsBySubType.set(key, {
          uniqueSets: new Set(),
          slabsCount: 0,
          gemMint10Count: 0,
          sampleImage: resolveValidImageUrl(card.front_image_url),
        });
      }

      const entry = statsBySubType.get(key)!;
      if (card.set_name?.trim()) {
        entry.uniqueSets.add(card.set_name.trim());
      }
      entry.slabsCount += 1;
      if (Number(card.final_grade) >= 10) {
        entry.gemMint10Count += 1;
      }

      const validImg = resolveValidImageUrl(card.front_image_url);
      if (entry.sampleImage === FALLBACK_CARD_IMAGE && validImg !== FALLBACK_CARD_IMAGE) {
        entry.sampleImage = validImg;
      }
    });

    // Hanya render kategori yang benar-benar ada di tabel public.product_categories
    return categories.map((cat, idx) => {
      const theme = getCategoryTheme(cat.slug, idx);
      const subTypesList = Array.isArray(cat.sub_types) ? cat.sub_types : [];

      const subCategories: SubCategoryItem[] = subTypesList.map((rawSub) => {
        const upperKey = rawSub.trim().toUpperCase();
        const metric = statsBySubType.get(upperKey);

        const registeredSlabs = metric ? metric.slabsCount : 0;
        const gemMint10 = metric ? metric.gemMint10Count : 0;
        const totalSets = metric ? metric.uniqueSets.size : 0;

        const badge =
          registeredSlabs >= 50
            ? 'HIGH VOLUME'
            : registeredSlabs >= 10
            ? 'POPULAR'
            : registeredSlabs > 0
            ? 'ACTIVE'
            : undefined;

        return {
          id: `${cat.slug}-${slugify(upperKey)}`,
          slug: slugify(upperKey),
          code: upperKey,
          rawCode: upperKey,
          name: formatSubTypeLabel(upperKey),
          totalSets,
          registeredSlabs,
          gemMint10,
          image: metric?.sampleImage || FALLBACK_CARD_IMAGE,
          badge,
        };
      });

      return {
        id: cat.id,
        slug: cat.slug,
        title: cat.name,
        subtitle: theme.subtitle,
        accentColor: theme.accentColor,
        badgeBg: theme.badgeBg,
        subCategories,
      };
    });
  }, [categories, cards]);

  // Filter berdasarkan tab kategori utama & kata kunci pencarian
  const filteredCatalog = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return catalogData
      .filter((cat) => selectedCategory === 'all' || cat.slug === selectedCategory)
      .map((cat) => ({
        ...cat,
        subCategories: cat.subCategories.filter(
          (sub) =>
            !query ||
            sub.name.toLowerCase().includes(query) ||
            sub.rawCode.toLowerCase().includes(query) ||
            cat.title.toLowerCase().includes(query)
        ),
      }))
      .filter((cat) => cat.subCategories.length > 0);
  }, [catalogData, selectedCategory, searchQuery]);

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 md:pt-52 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* ========================================================================= */}
        {/* 1. HERO HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent-soft border border-accent-border text-[11px] font-extrabold text-accent uppercase tracking-widest">
            <Grid className="w-3.5 h-3.5 text-accent" />
            KATALOG KATEGORI & SUB-KATEGORI
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground-hitam tracking-tight leading-tight">
            Direktori Katalog <span className="text-accent">Set Registry ICS</span>
          </h1>

          <p className="text-muted-hitam text-xs sm:text-sm leading-relaxed">
            Pilih kategori koleksi utama dan jelajahi sub-kategori franchise untuk melihat daftar set, populasi sertifikat, serta klasemen kolektor.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. SEARCH & MAIN CATEGORY FILTER BAR (DINAMIS DARI product_categories)    */}
        {/* ========================================================================= */}
        <div className="bg-card-putih border border-line-putih rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xs">
          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari sub-kategori (Pokemon, One Piece, Funko)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 bg-elevated-putih p-1 rounded-xl border border-line-putih-soft overflow-x-auto w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-muted-hitam hover:text-foreground-hitam'
              }`}
            >
              Semua Kategori
            </button>

            {catalogData.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CATEGORY SECTIONS + SUB-CATEGORY CARDS GRID                            */}
        {/* ========================================================================= */}
        {loading ? (
          <div className="bg-card-putih border border-line-putih rounded-3xl p-16 flex flex-col items-center justify-center text-muted-hitam gap-3 shadow-xs">
            <Loader2 className="w-7 h-7 animate-spin text-accent" />
            <span className="text-xs font-medium">Memuat direktori kategori dari database...</span>
          </div>
        ) : errorMessage ? (
          <div className="bg-card-putih border border-red-500/40 rounded-3xl p-10 text-center space-y-2">
            <p className="text-sm font-bold text-red-500">{errorMessage}</p>
            <p className="text-xs text-muted-hitam">
              Pastikan tabel <code>public.product_categories</code> memiliki RLS policy <code>SELECT</code> untuk publik (<code>anon</code>).
            </p>
          </div>
        ) : filteredCatalog.length === 0 ? (
          <div className="bg-card-putih border border-line-putih rounded-3xl p-12 text-center space-y-3">
            <Database className="w-8 h-8 text-subtle-hitam mx-auto" />
            <p className="text-sm font-bold text-foreground-hitam">Kategori atau sub-kategori tidak ditemukan</p>
            <p className="text-xs text-muted-hitam">
              {categories.length === 0
                ? 'Data product_categories kosong atau belum diizinkan oleh RLS policy SELECT di Supabase.'
                : 'Coba kata kunci lain atau ubah filter kategori utama di atas.'}
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {filteredCatalog.map((category) => (
              <section key={category.id} className="space-y-6">
                
                {/* Category Header Banner (Card Hitam Kontras) */}
                <div className="bg-card-hitam border border-line-hitam rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl backdrop-blur-md">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <Layers className={`w-5 h-5 ${category.accentColor}`} />
                      <h2 className="text-xl sm:text-2xl font-extrabold text-foreground-putih tracking-tight">
                        {category.title}
                      </h2>
                    </div>
                    <p className="text-xs text-muted-putih max-w-2xl leading-relaxed">
                      {category.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-foreground-putih bg-elevated-hitam border border-line-hitam-soft px-3.5 py-2 rounded-xl">
                      {category.subCategories.length} Sub-Kategori
                    </span>
                  </div>
                </div>

                {/* Sub-Category Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.subCategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/set-registry/detail/${sub.slug}`}
                      className="group bg-card-putih border border-line-putih hover:border-red-500/50 rounded-3xl p-4 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Top Visual Card Preview */}
                      <div className="space-y-3">
                        <div className="relative aspect-[4/3] w-full rounded-2xl bg-elevated-putih border border-line-putih-soft p-4 flex items-center justify-center overflow-hidden">
                          <Image
                            src={sub.image}
                            alt={sub.name}
                            width={140}
                            height={180}
                            className="object-contain max-h-full group-hover:scale-108 transition-transform duration-300 drop-shadow-md"
                          />

                          {/* Sub-Category Code Pill */}
                          <span className="absolute top-3 left-3 text-[10px] font-mono font-black bg-card-hitam text-foreground-putih border border-line-hitam px-2.5 py-1 rounded-lg shadow">
                            {sub.code}
                          </span>

                          {/* Highlight Badge */}
                          {sub.badge && (
                            <span className={`absolute top-3 right-3 text-[9px] font-extrabold px-2 py-0.5 rounded-md border ${category.badgeBg}`}>
                              {sub.badge}
                            </span>
                          )}
                        </div>

                        {/* Sub-Category Name & Set Count */}
                        <div className="space-y-1 px-1">
                          <div className="flex items-center justify-between text-[11px] font-mono text-subtle-hitam">
                            <span>{category.title}</span>
                            <span>{sub.totalSets} Seri / Set</span>
                          </div>
                          <h3 className="text-base font-extrabold text-foreground-hitam group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                            {sub.name}
                          </h3>
                        </div>
                      </div>

                      {/* Bottom Stats & CTA */}
                      <div className="space-y-3 pt-2 border-t border-line-putih-soft px-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-muted-hitam flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <strong className="text-foreground-hitam">
                              {sub.registeredSlabs.toLocaleString('id-ID')}
                            </strong>{' '}
                            Slabs
                          </span>
                          <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1 font-bold">
                            <Trophy className="w-3.5 h-3.5" />
                            {sub.gemMint10.toLocaleString('id-ID')} Gem 10
                          </span>
                        </div>

                        <div className="w-full py-2 px-3 rounded-xl bg-elevated-putih group-hover:bg-red-600 text-foreground-hitam group-hover:text-white text-xs font-bold flex items-center justify-between transition-colors">
                          <span>Jelajahi Sub-Kategori</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

              </section>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}