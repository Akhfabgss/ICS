'use client';

import { useState, useEffect, useMemo, useRef, use, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import CollectorAvatar from '@/components/CollectorAvatar';
import {
  UserCheck,
  ShieldCheck,
  Layers,
  Star,
  ArrowLeft,
  ExternalLink,
  Crown,
  Share2,
  Calendar,
  MapPin,
  CheckCircle2,
  CreditCard,
  Loader2,
  Database,
  UserX,
  Pencil,
  X,
  Camera,
  User,
  Phone,
  FileText,
  Save,
  AlertCircle,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ username: string }>;
}

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
  sub_centering: number;
  sub_corners: number;
  sub_edges: number;
  sub_surface: number;
  front_image_url: string;
  nfc_uid: string | null;
  is_encapsulated: boolean | null;
  is_frozen: boolean | null;
  collector_id: string | null;
  points: number;
}

interface UserSetProgress {
  slug: string;
  title: string;
  ownedUnique: number;
  totalKnownInSet: number;
  progressPercent: number;
  progressText: string;
  completed: boolean;
  points: number;
}

const AVATAR_GRADIENTS = [
  { label: 'Indigo Purple', value: 'from-indigo-500 to-purple-600' },
  { label: 'Crimson Red', value: 'from-red-600 to-rose-700' },
  { label: 'Amber Gold', value: 'from-amber-500 to-orange-600' },
  { label: 'Emerald Jade', value: 'from-emerald-500 to-teal-700' },
  { label: 'Cyber Blue', value: 'from-sky-500 to-blue-700' },
];

// =========================================================================
// HELPER GAMBAR & FORMATTER
// =========================================================================
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

function slugifySetName(setName: string): string {
  return encodeURIComponent(setName.trim().toLowerCase().replace(/[\s_]+/g, '-'));
}

function formatJoinDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '2026';
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

// =========================================================================
// INTERNAL CLIENT COMPONENT (DIBUNGKUS SUSPENSE DI EXPORT DEFAULT)
// =========================================================================
function UserVaultContent({ params }: PageProps) {
  const resolvedParams = use(params);
  const usernameParam = decodeURIComponent(resolvedParams.username).replace(/^@/, '').trim();

  const [activeTab, setActiveTab] = useState<'collection' | 'sets' | 'card'>('collection');
  const [copied, setCopied] = useState(false);

  // State Auth User yang Sedang Login
  const [currentAuthUserId, setCurrentAuthUserId] = useState<string | null>(null);

  // State Data Database
  const [loading, setLoading] = useState(true);
  const [collector, setCollector] = useState<CollectorRow | null>(null);
  const [allCollectors, setAllCollectors] = useState<CollectorRow[]>([]);
  const [allCards, setAllCards] = useState<CardRegistryRow[]>([]);

  // State Modal Edit Profile
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editWhatsappNo, setEditWhatsappNo] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editAvatarBg, setEditAvatarBg] = useState(AVATAR_GRADIENTS[0].value);
  const [editAvatarFile, setEditAvatarFile] = useState<File | null>(null);
  const [editAvatarPreview, setEditAvatarPreview] = useState<string | null>(null);

  const [savingProfile, setSavingProfile] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchUserVaultData() {
      setLoading(true);
      try {
        const [authRes, collectorsRes, cardsRes] = await Promise.all([
          supabase.auth.getUser(),
          supabase
            .from('collectors')
            .select(
              'id, user_id, username, display_name, whatsapp_no, location, bio, avatar_bg, manual_points, sets_completed, badge, join_date'
            ),
          supabase
            .from('card_registry')
            .select(
              'id, cert_number, card_name, set_name, card_number, language, tcg_type, final_grade, grade_label, sub_centering, sub_corners, sub_edges, sub_surface, front_image_url, nfc_uid, is_encapsulated, is_frozen, collector_id, points'
            )
            .eq('is_frozen', false),
        ]);

        if (!isMounted) return;

        setCurrentAuthUserId(authRes.data?.user?.id || null);

        const cols = (collectorsRes.data as CollectorRow[]) || [];
        const crds = (cardsRes.data as CardRegistryRow[]) || [];

        if (collectorsRes.error) {
          console.error('Error fetching collectors:', collectorsRes.error.message);
        }
        if (cardsRes.error) {
          console.error('Error fetching card_registry:', cardsRes.error.message);
        }

        const targetLower = usernameParam.toLowerCase();
        const found =
          cols.find(
            (c) =>
              c.username.replace(/^@/, '').trim().toLowerCase() === targetLower ||
              c.id.toLowerCase() === targetLower ||
              (c.user_id && c.user_id.toLowerCase() === targetLower)
          ) || null;

        setCollector(found);
        setAllCollectors(cols);
        setAllCards(crds);
      } catch (err) {
        console.error('Unexpected error loading User Vault:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchUserVaultData();
    return () => {
      isMounted = false;
    };
  }, [usernameParam]);

  // Cek apakah visitor adalah pemilik akun profil ini
  const isOwner = Boolean(
    collector && currentAuthUserId && collector.user_id === currentAuthUserId
  );

  // Buka modal & isi nilai awal dari data collector
  const openEditModal = () => {
    if (!collector) return;
    setEditError(null);
    setEditSuccess(null);
    setEditDisplayName(collector.display_name || '');
    setEditWhatsappNo(collector.whatsapp_no || '');
    setEditLocation(collector.location || 'Indonesia');
    setEditBio(collector.bio || '');
    setEditAvatarBg(collector.avatar_bg || AVATAR_GRADIENTS[0].value);
    setEditAvatarFile(null);
    setEditAvatarPreview(null);
    setIsEditOpen(true);
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setEditError('Format file harus berupa gambar (JPG, PNG, atau WEBP).');
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setEditError('Ukuran maksimal foto profil adalah 3MB.');
      return;
    }

    setEditError(null);
    setEditAvatarFile(file);
    setEditAvatarPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collector || !isOwner) return;

    if (!editDisplayName.trim()) {
      setEditError('Nama tampilan tidak boleh kosong.');
      return;
    }

    setSavingProfile(true);
    setEditError(null);
    setEditSuccess(null);

    try {
      let finalAvatarBg = editAvatarBg;

      // 1. Jika user memilih foto baru, unggah ke Google Drive ICS
      if (editAvatarFile) {
        const cleanUsername = collector.username.replace(/^@/, '').trim().toLowerCase();
        const uploadForm = new FormData();
        uploadForm.append('file', editAvatarFile);
        uploadForm.append('username', cleanUsername);

        const uploadRes = await fetch('/api/upload-avatar', {
          method: 'POST',
          body: uploadForm,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          setEditError(uploadData.error || 'Gagal mengunggah foto profil baru ke Google Drive.');
          setSavingProfile(false);
          return;
        }
        if (uploadData.url) {
          finalAvatarBg = uploadData.url;
        }
      }

      // 2. Update baris kolektor di tabel public.collectors
      const updatedPayload = {
        display_name: editDisplayName.trim(),
        whatsapp_no: editWhatsappNo.trim() || null,
        location: editLocation.trim() || 'Indonesia',
        bio: editBio.trim() || null,
        avatar_bg: finalAvatarBg,
      };

      const { error: updateError } = await supabase
        .from('collectors')
        .update(updatedPayload)
        .eq('id', collector.id)
        .eq('user_id', currentAuthUserId!);

      if (updateError) {
        setEditError(`Gagal menyimpan perubahan profil: ${updateError.message}`);
        setSavingProfile(false);
        return;
      }

      // 3. Sinkronkan state lokal secara instan
      setCollector((prev) => (prev ? { ...prev, ...updatedPayload } : prev));
      setAllCollectors((prev) =>
        prev.map((item) => (item.id === collector.id ? { ...item, ...updatedPayload } : item))
      );

      setEditSuccess('Profil kolektor berhasil diperbarui!');
      setTimeout(() => {
        setIsEditOpen(false);
        setEditSuccess(null);
      }, 900);
    } catch (err) {
      console.error('Update profile error:', err);
      setEditError('Terjadi kesalahan sistem saat menyimpan profil.');
    } finally {
      setSavingProfile(false);
    }
  };

  // Kartu milik kolektor ini di card_registry
  const userCards = useMemo(() => {
    if (!collector) return [];
    return allCards
      .filter((c) => c.collector_id === collector.id)
      .sort((a, b) => Number(b.final_grade || 0) - Number(a.final_grade || 0));
  }, [collector, allCards]);

  // Hitung Peringkat Nasional kolektor ini
  const nationalRankInfo = useMemo(() => {
    if (!collector) return { rank: null as number | null, totalPoints: 0 };

    const cardPtsByCollector = new Map<string, number>();
    allCards.forEach((c) => {
      if (!c.collector_id) return;
      cardPtsByCollector.set(
        c.collector_id,
        (cardPtsByCollector.get(c.collector_id) || 0) + Number(c.points || 0)
      );
    });

    const leaderboard = allCollectors
      .map((col) => ({
        id: col.id,
        totalPoints: Number(col.manual_points || 0) + (cardPtsByCollector.get(col.id) || 0),
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);

    const idx = leaderboard.findIndex((item) => item.id === collector.id);
    return {
      rank: idx >= 0 ? idx + 1 : null,
      totalPoints: idx >= 0 ? leaderboard[idx].totalPoints : Number(collector.manual_points || 0),
    };
  }, [collector, allCollectors, allCards]);

  // Hitung Set yang sedang dibangun kolektor ini
  const activeSets: UserSetProgress[] = useMemo(() => {
    if (!collector || userCards.length === 0) return [];

    const totalVariantsPerSet = new Map<string, Set<string>>();
    allCards.forEach((c) => {
      const sName = c.set_name.trim();
      if (!sName) return;
      if (!totalVariantsPerSet.has(sName)) {
        totalVariantsPerSet.set(sName, new Set());
      }
      totalVariantsPerSet
        .get(sName)!
        .add(`${(c.card_number || '').trim().toLowerCase()}::${c.card_name.trim().toLowerCase()}`);
    });

    const userBySet = new Map<
      string,
      {
        ownedKeys: Set<string>;
        points: number;
      }
    >();

    userCards.forEach((c) => {
      const sName = c.set_name.trim();
      if (!sName) return;
      if (!userBySet.has(sName)) {
        userBySet.set(sName, { ownedKeys: new Set(), points: 0 });
      }
      const entry = userBySet.get(sName)!;
      entry.ownedKeys.add(
        `${(c.card_number || '').trim().toLowerCase()}::${c.card_name.trim().toLowerCase()}`
      );
      entry.points += Number(c.points || 0);
    });

    return Array.from(userBySet.entries())
      .map(([setName, stats]) => {
        const totalKnown = Math.max(1, totalVariantsPerSet.get(setName)?.size || stats.ownedKeys.size);
        const ownedCount = stats.ownedKeys.size;
        const pct = Math.min(100, Math.round((ownedCount / totalKnown) * 1000) / 10);

        return {
          slug: slugifySetName(setName),
          title: setName,
          ownedUnique: ownedCount,
          totalKnownInSet: totalKnown,
          progressPercent: pct,
          progressText: `${pct}%`,
          completed: ownedCount >= totalKnown && totalKnown > 0,
          points: stats.points,
        };
      })
      .sort((a, b) => b.points - a.points || b.progressPercent - a.progressPercent);
  }, [collector, userCards, allCards]);

  // Gabungan Data Profil untuk UI
  const userData = useMemo(() => {
    const cleanHandle = collector
      ? `@${collector.username.replace(/^@/, '')}`
      : `@${usernameParam}`;

    const hasActiveNfc = userCards.some((c) => Boolean(c.nfc_uid) || Boolean(c.is_encapsulated));

    return {
      username: cleanHandle,
      rawUsername: cleanHandle.replace(/^@/, ''),
      displayName: collector?.display_name || usernameParam,
      joinDate: formatJoinDate(collector?.join_date),
      location: collector?.location || 'Indonesia',
      badge: collector?.badge || 'Rookie Collector',
      avatarBg: collector?.avatar_bg || 'from-indigo-500 to-purple-600',
      nationalRank: nationalRankInfo.rank ? `#${nationalRankInfo.rank} NASIONAL` : 'UNRANKED',
      isTop1: nationalRankInfo.rank === 1,
      totalPoints: `${nationalRankInfo.totalPoints.toLocaleString('id-ID')} PTS`,
      totalSlabs: userCards.length,
      setsCompleted: collector?.sets_completed || 0,
      bio:
        collector?.bio ||
        'Kolektor resmi terdaftar di database sertifikasi ICS Set Registry.',
      memberCode: collector ? `ICS-${collector.id.slice(0, 8).toUpperCase()}` : 'UNVERIFIED',
      hasActiveNfc,
    };
  }, [collector, usernameParam, userCards, nationalRankInfo]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-surface text-foreground-hitam min-h-screen pt-28 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* ========================================================================= */}
        {/* 1. TOP BREADCRUMB & ACTION BUTTONS                                        */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/set-registry/klasemen"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-hitam hover:text-accent transition-colors bg-card-putih border border-line-putih px-4 py-2 rounded-xl shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Klasemen
          </Link>

          <div className="flex items-center gap-2.5">
            {isOwner && (
              <button
                type="button"
                onClick={openEditModal}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl transition-colors shadow-md shadow-red-600/20 cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit Profil
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 text-xs font-bold text-foreground-hitam hover:text-accent bg-card-putih border border-line-putih px-4 py-2 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Tautan Tersalin!
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-accent" /> Bagikan Profil Vault
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LOADING & NOT FOUND STATE                                                 */}
        {/* ========================================================================= */}
        {loading ? (
          <div className="bg-card-putih border border-line-putih rounded-3xl p-20 flex flex-col items-center justify-center text-muted-hitam gap-3 shadow-xs">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <span className="text-xs font-medium">Memuat profil dan brankas koleksi dari database...</span>
          </div>
        ) : !collector ? (
          <div className="bg-card-putih border border-line-putih rounded-3xl p-16 text-center space-y-4 shadow-sm">
            <UserX className="w-12 h-12 text-subtle-hitam mx-auto" />
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-foreground-hitam">
                Kolektor @{usernameParam} Tidak Ditemukan
              </h2>
              <p className="text-xs text-muted-hitam max-w-md mx-auto">
                Akun kolektor dengan username tersebut belum terdaftar di database ICS Set Registry.
              </p>
            </div>
            <Link
              href="/set-registry/klasemen"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
              Lihat Daftar Kolektor Aktif
            </Link>
          </div>
        ) : (
          <>
            {/* ========================================================================= */}
            {/* 2. USER PROFILE HERO BANNER (LIVE DARI collectors & card_registry)        */}
            {/* ========================================================================= */}
            <div className="bg-card-hitam border border-line-hitam rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 blur-[120px] pointer-events-none rounded-full" />

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">

                {/* Avatar & User Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

                  {/* Profile Avatar Box */}
                  <div className="relative">
                    <CollectorAvatar
                      avatarBg={userData.avatarBg}
                      username={userData.rawUsername}
                      sizeClass="w-24 h-24"
                      textSizeClass="text-3xl"
                      shapeClass="rounded-3xl"
                      borderClass="border-2 border-amber-500/50 shadow-2xl"
                    />
                    {userData.isTop1 && (
                      <span
                        className="absolute -bottom-2 -right-2 bg-amber-500 text-black p-1.5 rounded-full border-2 border-[#12151C]"
                        title="Top 1 Rank"
                      >
                        <Crown className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  {/* Identity Info */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground-putih flex items-center gap-2">
                        {userData.username}
                        <UserCheck className="w-5 h-5 text-emerald-400" />
                      </h1>
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full uppercase">
                        {userData.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-foreground-putih/90 font-medium">
                      {userData.displayName}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-putih font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-red-500" /> Bergabung {userData.joinDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500" /> {userData.location}
                      </span>
                    </div>

                    <p className="text-xs text-muted-putih leading-relaxed max-w-xl pt-1">
                      &ldquo;{userData.bio}&rdquo;
                    </p>
                  </div>

                </div>

                {/* Score & Rank Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
                  <div className="bg-elevated-hitam border border-amber-500/40 rounded-2xl p-4 text-center space-y-1">
                    <span className="text-[10px] text-amber-400 uppercase font-mono font-bold block">
                      PERINGKAT REGISTRY
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-amber-400">
                      {userData.nationalRank}
                    </span>
                  </div>

                  <div className="bg-elevated-hitam border border-line-hitam-soft rounded-2xl p-4 text-center space-y-1">
                    <span className="text-[10px] text-subtle-putih uppercase font-mono block">
                      TOTAL SKOR REGISTRY
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-red-400 font-mono">
                      {userData.totalPoints}
                    </span>
                  </div>

                  <div className="bg-elevated-hitam border border-line-hitam-soft rounded-2xl p-4 text-center space-y-1 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-subtle-putih uppercase font-mono block">
                      TOTAL SLAB KOLEKSI
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-foreground-putih font-mono">
                      {userData.totalSlabs.toLocaleString('id-ID')} Kartu
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* ========================================================================= */}
            {/* 3. VAULT NAVIGATION TABS (CARD PUTIH)                                     */}
            {/* ========================================================================= */}
            <div className="flex items-center gap-2 bg-card-putih border border-line-putih p-1.5 rounded-2xl overflow-x-auto shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab('collection')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'collection'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                <Star className="w-4 h-4" /> Vault Showcase Kartu ({userCards.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('sets')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'sets'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                <Layers className="w-4 h-4" /> Set Yang Sedang Dibangun ({activeSets.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'card'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'text-muted-hitam hover:text-foreground-hitam'
                }`}
              >
                <CreditCard className="w-4 h-4" /> Kartu Keanggotaan ICS COA Card
              </button>
            </div>

            {/* ========================================================================= */}
            {/* 4A. TAB 1: SHOWCASE COLLECTION GRID (LIVE DARI card_registry)             */}
            {/* ========================================================================= */}
            {activeTab === 'collection' && (
              userCards.length === 0 ? (
                <div className="bg-card-putih border border-line-putih rounded-3xl p-14 text-center space-y-2 animate-fadeIn">
                  <Database className="w-8 h-8 text-subtle-hitam mx-auto" />
                  <p className="text-sm font-bold text-foreground-hitam">
                    Belum ada slab di Vault kolektor ini
                  </p>
                  <p className="text-xs text-muted-hitam">
                    Kartu yang sudah diklaim ke akun {userData.username} akan tampil otomatis di sini.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
                  {userCards.map((card) => {
                    const cardTitle = card.card_number
                      ? `${card.card_name} ${
                          card.card_number.startsWith('#') ? card.card_number : `#${card.card_number}`
                        }`
                      : card.card_name;

                    return (
                      <div
                        key={card.id}
                        className="bg-card-putih border border-line-putih hover:border-red-500/40 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-0.5 shadow-sm group"
                      >
                        <div className="relative aspect-[3/4] bg-elevated-putih rounded-2xl border border-line-putih-soft p-3 flex items-center justify-center overflow-hidden">
                          <Image
                            src={resolveValidImageUrl(card.front_image_url)}
                            alt={cardTitle}
                            width={180}
                            height={250}
                            className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3 bg-red-600/95 text-white text-[10px] font-black px-2 py-0.5 rounded shadow uppercase">
                            {Number(card.final_grade).toFixed(1)} {card.grade_label}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono text-subtle-hitam uppercase block">
                            CERT: {card.cert_number}
                          </span>
                          <h3 className="text-sm font-bold text-foreground-hitam group-hover:text-accent transition-colors line-clamp-1">
                            {cardTitle}
                          </h3>
                          <p className="text-[11px] text-muted-hitam line-clamp-1">{card.set_name}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono pt-2 border-t border-line-putih-soft">
                          <span className="bg-elevated-putih p-1.5 rounded text-muted-hitam">
                            Centering:{' '}
                            <strong className="text-emerald-600 dark:text-emerald-400">
                              {Number(card.sub_centering).toFixed(1)}
                            </strong>
                          </span>
                          <span className="bg-elevated-putih p-1.5 rounded text-muted-hitam">
                            Corners:{' '}
                            <strong className="text-emerald-600 dark:text-emerald-400">
                              {Number(card.sub_corners).toFixed(1)}
                            </strong>
                          </span>
                          <span className="bg-elevated-putih p-1.5 rounded text-muted-hitam">
                            Edges:{' '}
                            <strong className="text-emerald-600 dark:text-emerald-400">
                              {Number(card.sub_edges).toFixed(1)}
                            </strong>
                          </span>
                          <span className="bg-elevated-putih p-1.5 rounded text-muted-hitam">
                            Surface:{' '}
                            <strong className="text-emerald-600 dark:text-emerald-400">
                              {Number(card.sub_surface).toFixed(1)}
                            </strong>
                          </span>
                        </div>

                        <Link
                          href={`/check-ics?cert=${encodeURIComponent(card.cert_number)}`}
                          className="w-full bg-elevated-putih hover:bg-gray-200/70 dark:hover:bg-white/10 border border-line-putih text-foreground-hitam font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                        >
                          Verifikasi Sertifikat <ExternalLink className="w-3.5 h-3.5 text-accent" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )
            )}

            {/* ========================================================================= */}
            {/* 4B. TAB 2: ACTIVE SETS BUILDING (LIVE DARI card_registry)                 */}
            {/* ========================================================================= */}
            {activeTab === 'sets' && (
              activeSets.length === 0 ? (
                <div className="bg-card-putih border border-line-putih rounded-3xl p-14 text-center space-y-2 animate-fadeIn">
                  <Layers className="w-8 h-8 text-subtle-hitam mx-auto" />
                  <p className="text-sm font-bold text-foreground-hitam">
                    Belum ada progres set yang tercatat
                  </p>
                  <p className="text-xs text-muted-hitam">
                    Progres kelengkapan set akan dihitung otomatis dari kartu yang terdaftar di akun ini.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  {activeSets.map((set) => (
                    <div
                      key={set.slug}
                      className="bg-card-putih border border-line-putih rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm"
                    >
                      <div className="space-y-2 flex-1 w-full">
                        <div className="flex items-center gap-2">
                          {set.completed ? (
                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> SET COMPLETE (100%)
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-md">
                              IN PROGRESS ({set.progressText})
                            </span>
                          )}
                          <span className="text-xs font-mono text-subtle-hitam">
                            • {set.ownedUnique}/{set.totalKnownInSet} Varian Terdata
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-foreground-hitam">{set.title}</h3>

                        <div className="w-full max-w-xl bg-elevated-putih border border-line-putih-soft h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${set.completed ? 'bg-emerald-500' : 'bg-red-600'}`}
                            style={{ width: `${set.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-right shrink-0 space-y-2 self-end md:self-auto">
                        <span className="text-sm font-black text-accent font-mono block">
                          {set.points.toLocaleString('id-ID')} PTS
                        </span>
                        <Link
                          href={`/set-registry/detail/${set.slug}`}
                          className="text-xs font-bold text-foreground-hitam hover:text-accent inline-flex items-center gap-1.5 bg-elevated-putih border border-line-putih px-4 py-2 rounded-xl transition-all"
                        >
                          Buka Detail Set <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* ========================================================================= */}
            {/* 4C. TAB 3: PHYSICAL AUTHENTICITY CARD PREVIEW (LIVE DARI collectors)      */}
            {/* ========================================================================= */}
            {activeTab === 'card' && (
              <div className="bg-card-putih border border-line-putih rounded-3xl p-8 max-w-3xl mx-auto space-y-6 shadow-sm animate-fadeIn">
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                    ICS PHYSICAL AUTHENTICITY & REGISTRY CARD
                  </span>
                  <h3 className="text-xl font-extrabold text-foreground-hitam">
                    Kartu Keanggotaan Kolektor Resmi
                  </h3>
                  <p className="text-xs text-muted-hitam">
                    Kartu fisik premium bertinta emas yang diterbitkan khusus untuk pemegang akun terverifikasi ICS.
                  </p>
                </div>

                <div className="relative aspect-[1.58/1] bg-gradient-to-br from-[#171A21] via-[#12151C] to-[#0A0C10] border border-amber-500/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 blur-3xl pointer-events-none rounded-full" />

                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-6 h-6 text-amber-400" />
                      <span className="font-extrabold text-white tracking-widest text-sm">
                        ICS VAULT PASS
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded bg-amber-500/15 uppercase">
                      {userData.badge}
                    </span>
                  </div>

                  <div className="space-y-1 relative z-10">
                    <span className="text-[10px] text-gray-400 font-mono block">
                      MEMBER ID: {userData.memberCode}
                    </span>
                    <p className="text-lg sm:text-xl font-bold font-mono text-white tracking-wider">
                      {userData.username}
                    </p>
                    <p className="text-xs text-gray-300 font-sans">{userData.displayName}</p>
                  </div>

                  <div className="flex justify-between items-end relative z-10 border-t border-white/10 pt-4 text-[10px] font-mono text-gray-400">
                    <span>
                      {userData.hasActiveNfc ? 'DUAL-NFC ACTIVE' : 'STANDARD REGISTRY MEMBER'}
                    </span>
                    <span className="text-amber-400 font-bold">VERIFIED MEMBER</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL EDIT PROFIL KOLEKTOR (KHUSUS PEMILIK AKUN)                          */}
      {/* ========================================================================= */}
      {isEditOpen && isOwner && collector && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card-putih border border-line-putih rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-5 relative my-8 animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-line-putih-soft pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-foreground-hitam">
                  Edit Profil Kolektor
                </h2>
                <p className="text-[11px] font-mono text-muted-hitam">
                  Handle: {userData.username}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                disabled={savingProfile}
                className="p-2 rounded-xl bg-elevated-putih hover:bg-red-500/10 text-muted-hitam hover:text-red-600 transition-colors cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Alerts */}
            {editError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{editError}</span>
              </div>
            )}

            {editSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{editSuccess}</span>
              </div>
            )}

            {/* Form Edit */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Avatar Upload / Gradient Picker */}
              <div className="bg-elevated-putih border border-line-putih-soft rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative shrink-0">
                  {editAvatarPreview ? (
                    <img
                      src={editAvatarPreview}
                      alt="Preview Foto Baru"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-red-500/50 shadow-md"
                    />
                  ) : (
                    <CollectorAvatar
                      avatarBg={editAvatarBg}
                      username={userData.rawUsername}
                      sizeClass="w-20 h-20"
                      textSizeClass="text-2xl"
                      shapeClass="rounded-2xl"
                      borderClass="border-2 border-line-putih shadow-md"
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-red-600 hover:bg-red-500 text-white p-2 rounded-xl shadow-lg transition-colors cursor-pointer"
                    title="Ganti Foto Profil"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleEditFileChange}
                    className="hidden"
                  />
                </div>

                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-foreground-hitam block">
                    Foto Profil & Warna Avatar
                  </span>
                  <p className="text-[11px] text-muted-hitam">
                    Unggah foto baru (maks. 3MB) atau gunakan warna gradien default:
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    {AVATAR_GRADIENTS.map((grad) => (
                      <button
                        key={grad.value}
                        type="button"
                        onClick={() => {
                          setEditAvatarFile(null);
                          setEditAvatarPreview(null);
                          setEditAvatarBg(grad.value);
                        }}
                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${grad.value} cursor-pointer transition-transform ${
                          !editAvatarPreview && editAvatarBg === grad.value
                            ? 'ring-2 ring-offset-2 ring-red-600 scale-110'
                            : 'opacity-75 hover:opacity-100'
                        }`}
                        title={grad.label}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] font-bold text-accent hover:underline ml-1 cursor-pointer"
                    >
                      + Upload Foto
                    </button>
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground-hitam block">
                  Nama Tampilan / Vault <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={editDisplayName}
                    onChange={(e) => setEditDisplayName(e.target.value)}
                    placeholder="Nama Tampilan Kolektor"
                    className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground-hitam focus:outline-none focus:border-red-500/60"
                  />
                </div>
              </div>

              {/* WhatsApp & Lokasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground-hitam block">
                    Nomor WhatsApp (Privat)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={editWhatsappNo}
                      onChange={(e) => setEditWhatsappNo(e.target.value)}
                      placeholder="0812xxxxxxxx"
                      className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground-hitam focus:outline-none focus:border-red-500/60"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground-hitam block">
                    Kota / Domisili
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      placeholder="Jakarta, Indonesia"
                      className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground-hitam focus:outline-none focus:border-red-500/60"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground-hitam block">
                  Bio Kolektor
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-subtle-hitam absolute left-3.5 top-3" />
                  <textarea
                    rows={3}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Ceritakan fokus koleksi kartu atau figure favoritmu..."
                    className="w-full bg-elevated-putih border border-line-putih rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground-hitam focus:outline-none focus:border-red-500/60 resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-line-putih-soft">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  disabled={savingProfile}
                  className="px-4 py-2.5 rounded-xl bg-elevated-putih border border-line-putih text-xs font-bold text-muted-hitam hover:text-foreground-hitam cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white text-xs font-bold shadow-lg shadow-red-600/25 flex items-center gap-1.5 cursor-pointer"
                >
                  {savingProfile ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" /> Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// EXPORT DEFAULT DENGAN <Suspense> UNTUK NEXT.JS 16 PRERENDER
// =========================================================================
export default function UserVaultPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-surface text-foreground-hitam min-h-screen pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-card-putih border border-line-putih rounded-3xl p-20 flex flex-col items-center justify-center text-muted-hitam gap-3 shadow-xs">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
              <span className="text-xs font-medium">Memuat profil kolektor...</span>
            </div>
          </div>
        </div>
      }
    >
      <UserVaultContent params={params} />
    </Suspense>
  );
}