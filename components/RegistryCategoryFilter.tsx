'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, ChevronDown, Filter } from 'lucide-react';

export interface ProductCategoryItem {
  id: string;
  name: string;
  slug: string;
  status?: string | null;
  sub_types: string[];
}

export interface RegistryCategoryFilterProps {
  /** Slug kategori utama yang aktif (misal: 'all' atau 'tcg') */
  selectedCategory: string;
  /** Callback saat kategori utama berubah */
  onCategoryChange: (categorySlug: string) => void;

  /** Sub-kategori / sub_type yang aktif (misal: 'all' atau 'POKEMON') */
  selectedSubType: string;
  /** Callback saat sub-kategori berubah */
  onSubTypeChange: (subType: string) => void;

  /** Kategori produk yang sudah di-fetch sebelumnya (opsional, jika tidak ada akan otomatis fetch dari Supabase) */
  categories?: ProductCategoryItem[];
  /** Callback opsional saat kategori selesai di-fetch */
  onCategoriesLoaded?: (categories: ProductCategoryItem[]) => void;

  /** Query pencarian opsional jika search box ingin ditampilkan menyatu di filter */
  searchQuery?: string;
  /** Callback perubahan query pencarian */
  onSearchChange?: (query: string) => void;
  /** Placeholder untuk input pencarian */
  searchPlaceholder?: string;

  /** Apakah baris tombol pill sub-kategori ditampilkan (default: true) */
  showSubTypes?: boolean;

  /** Custom className untuk container utama */
  className?: string;

  /** Label opsi reset untuk kategori utama (default: 'Semua Kategori') */
  allCategoriesLabel?: string;
  /** Label opsi reset untuk sub-kategori (default: 'Semua Sub') */
  allSubTypesLabel?: string;
}

/**
 * Helper format teks sub_types dari database (misal: "ONE_PIECE" -> "One Piece")
 */
export function formatSubTypeLabel(raw: string): string {
  if (!raw) return '';
  return raw
    .trim()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Helper matcher terpusat untuk memvalidasi apakah suatu item (kartu/set) sesuai
 * dengan kategori dan sub-kategori yang sedang dipilih.
 */
export function matchItemCategory(
  itemSubType: string | null | undefined,
  selectedCategory: string,
  selectedSubType: string,
  categories: ProductCategoryItem[]
): boolean {
  const normItem = (itemSubType || '').trim().toUpperCase();

  // 1. Jika sub-kategori spesifik dipilih
  if (selectedSubType !== 'all') {
    return normItem === selectedSubType.toUpperCase();
  }

  // 2. Jika kategori utama spesifik dipilih (namun sub-kategori = 'all')
  if (selectedCategory !== 'all') {
    const found = categories.find((c) => c.slug === selectedCategory);
    if (!found || !Array.isArray(found.sub_types)) return true;
    const allowed = found.sub_types.map((s) => s.trim().toUpperCase());
    return allowed.includes(normItem);
  }

  // 3. Jika kedua filter 'all', loloskan semua
  return true;
}

/**
 * Hook reusable untuk memuat daftar public.product_categories dengan status 'Active'.
 */
export function useProductCategories(preloaded?: ProductCategoryItem[]) {
  const [categories, setCategories] = useState<ProductCategoryItem[]>(preloaded || []);
  const [loading, setLoading] = useState(!preloaded || preloaded.length === 0);

  useEffect(() => {
    if (preloaded && preloaded.length > 0) {
      setCategories(preloaded);
      setLoading(false);
      return;
    }

    let isMounted = true;
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('product_categories')
          .select('id, name, slug, status, sub_types')
          .eq('status', 'Active')
          .order('name', { ascending: true });

        if (error) {
          console.error('Error fetching product_categories:', error.message);
        } else if (isMounted && data) {
          setCategories(data as ProductCategoryItem[]);
        }
      } catch (err) {
        console.error('Unexpected error loading product_categories:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, [preloaded]);

  return { categories, loading };
}

/**
 * Komponen Kontrol Filter Kategori & Sub-Kategori Terpusat untuk Seluruh Ekosistem Registry.
 * Menghubungkan public.product_categories (status='Active') dengan sub_types array.
 */
export default function RegistryCategoryFilter({
  selectedCategory,
  onCategoryChange,
  selectedSubType,
  onSubTypeChange,
  categories: propCategories,
  onCategoriesLoaded,
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Cari...',
  showSubTypes = true,
  className = '',
  allCategoriesLabel = 'Semua Kategori',
  allSubTypesLabel = 'Semua Sub',
}: RegistryCategoryFilterProps) {
  const { categories: fetchedCategories } = useProductCategories(propCategories);
  const categories = propCategories && propCategories.length > 0 ? propCategories : fetchedCategories;

  useEffect(() => {
    if (onCategoriesLoaded && categories.length > 0) {
      onCategoriesLoaded(categories);
    }
  }, [categories, onCategoriesLoaded]);

  // Hitung daftar sub-kategori yang tersedia berdasarkan kategori utama yang dipilih
  const availableSubCategories = useMemo(() => {
    if (selectedCategory === 'all') {
      const allSubs = new Set<string>();
      categories.forEach((cat) => {
        if (Array.isArray(cat.sub_types)) {
          cat.sub_types.forEach((sub) => {
            if (sub && sub.trim()) {
              allSubs.add(sub.trim().toUpperCase());
            }
          });
        }
      });
      return Array.from(allSubs);
    }

    const foundCat = categories.find((cat) => cat.slug === selectedCategory);
    if (!foundCat || !Array.isArray(foundCat.sub_types)) return [];
    return foundCat.sub_types.map((sub) => sub.trim().toUpperCase());
  }, [selectedCategory, categories]);

  const handleMainCategoryChange = (slug: string) => {
    onCategoryChange(slug);
    onSubTypeChange('all');
  };

  const hasSearch = typeof onSearchChange === 'function' && searchQuery !== undefined;

  return (
    <div
      className={`bg-card-putih border border-line-putih rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xs transition-colors duration-200 ${className}`}
    >
      {/* 1. Input Pencarian Opsional (Jika diaktifkan oleh halaman pemanggil) */}
      {hasSearch && (
        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground-hitam placeholder-subtle-hitam focus:outline-none focus:border-red-500/60 transition-colors"
          />
        </div>
      )}

      {/* 2. Kontrol Filter Kategori Utama & Tombol Sub-Kategori */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto overflow-hidden">
        {/* Dropdown Kategori Utama */}
        <div className="relative w-full sm:w-48 shrink-0">
          <select
            value={selectedCategory}
            onChange={(e) => handleMainCategoryChange(e.target.value)}
            className="w-full appearance-none bg-elevated-putih border border-line-putih rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-foreground-hitam focus:outline-none focus:border-red-500/60 transition-colors cursor-pointer"
            aria-label="Pilih Kategori Utama"
          >
            <option value="all">{allCategoriesLabel}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-subtle-hitam absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Tombol Sub-Kategori (Pills Horizontal dengan scroll halus) */}
        {showSubTypes && (
          <div className="flex items-center gap-1.5 bg-elevated-putih p-1 rounded-xl border border-line-putih-soft overflow-x-auto scrollbar-thin scrollbar-thumb-red-600/35 w-full sm:w-auto max-w-xl">
            <button
              type="button"
              onClick={() => onSubTypeChange('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSubType === 'all'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-muted-hitam hover:text-foreground-hitam'
              }`}
            >
              {allSubTypesLabel}
            </button>

            {availableSubCategories.map((subKey) => (
              <button
                key={subKey}
                type="button"
                onClick={() => onSubTypeChange(subKey)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSubType === subKey
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                {formatSubTypeLabel(subKey)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
