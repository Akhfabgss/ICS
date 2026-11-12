'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    UserCheck,
    Trophy,
    ShieldCheck,
    Layers,
    Sparkles,
    ArrowLeft,
    ExternalLink,
    Crown,
    Lock,
    Share2,
    Calendar,
    MapPin,
    CheckCircle2,
    QrCode,
    CreditCard,
} from 'lucide-react';

interface PageProps {
    params: Promise<{ username: string }>;
}

export default function UserVaultPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const usernameParam = resolvedParams.username;
    const username = `@${usernameParam}`;

    const [activeTab, setActiveTab] = useState<'collection' | 'sets' | 'card'>('collection');

    // Mock User Profile Data
    const userData = {
        username: username,
        displayName: 'Kyoto Vault ID',
        joinDate: 'Januari 2025',
        location: 'Jakarta, Indonesia',
        badge: 'Grandmaster Collector',
        nationalRank: '#1 NASIONAL',
        totalPoints: '142,850 PTS',
        totalSlabs: 148,
        setsCompleted: 12,
        gemMintRatio: '94.5%',
        bio: 'Kolektor TCG sejak 2018. Fokus pada High-Grade Pokémon (Japanese Vintage & SV Era) serta One Piece Card Game (Alternate Art).',
    };

    // Mock User Vault Showcase Cards
    const showcaseCards = [
        { certId: 'ICS-TR-026184', name: 'Charizard ex #134/185 RR', set: '2023 Pokémon SV3 Ruler of the Black Flame', grade: '9.5 GEM MINT', subCentering: '9.5', subCorners: '10.0', subEdges: '9.5', subSurface: '9.0', image: '/images/home/card1.webp' },
        { certId: 'ICS-TR-026185', name: 'Monkey D. Luffy Manga Alt-Art', set: '2023 One Piece OP-05 Awakening of the New Era', grade: '10 PERFECT', subCentering: '10.0', subCorners: '10.0', subEdges: '10.0', subSurface: '10.0', image: '/images/home/card1.webp' },
        { certId: 'ICS-TR-026186', name: 'Pikachu Special Illustration Rare', set: '2023 Pokémon SV2a Card 151', grade: '9.5 MINT+', subCentering: '9.5', subCorners: '9.5', subEdges: '9.5', subSurface: '9.5', image: '/images/home/card1.webp' },
        { certId: 'ICS-TR-026187', name: 'Blue-Eyes White Dragon 25th Secret', set: '2023 Yu-Gi-Oh! Rarity Collection', grade: '10 PERFECT', subCentering: '10.0', subCorners: '10.0', subEdges: '9.5', subSurface: '10.0', image: '/images/home/card1.webp' },
    ];

    // Mock User Active Sets Building Progress
    const activeSets = [
        { id: 'set-pokemon-sv3', title: '2023 Pokémon Japanese SV3 Ruler of the Black Flame', progress: '100%', completed: true, totalCards: '185/185', points: '18,500 PTS' },
        { id: 'set-op-op05', title: '2023 One Piece OP-05 Awakening of the New Era', progress: '94.5%', completed: false, totalCards: '120/127', points: '15,200 PTS' },
        { id: 'set-pokemon-151', title: '2023 Pokémon Japanese SV2a Pokémon Card 151', progress: '88.0%', completed: false, totalCards: '180/205', points: '16,800 PTS' },
    ];

    return (
        <div className="bg-[#0A0C10] text-white min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-10">

                {/* ========================================================================= */}
                {/* 1. TOP BREADCRUMB                                                         */}
                {/* ========================================================================= */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/set-registry/klasemen"
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-400 transition-colors bg-[#12151C] border border-white/10 px-4 py-2 rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Klasemen
                    </Link>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Tautan Vault Kolektor berhasil disalin!');
                        }}
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white bg-[#12151C] border border-white/10 px-4 py-2 rounded-xl transition-colors"
                    >
                        <Share2 className="w-3.5 h-3.5 text-red-500" /> Bagikan Profil Vault
                    </button>
                </div>

                {/* ========================================================================= */}
                {/* 2. USER PROFILE HERO BANNER                                               */}
                {/* ========================================================================= */}
                <div className="bg-[#12151C] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />

                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">

                        {/* Avatar & User Details */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

                            {/* Profile Avatar Box */}
                            <div className="relative">
                                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-600/30 via-[#15181F] to-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center font-black text-3xl text-amber-400 shadow-2xl">
                                    {userData.username.charAt(1).toUpperCase()}
                                </div>
                                <span className="absolute -bottom-2 -right-2 bg-amber-500 text-black p-1.5 rounded-full border-2 border-[#12151C]" title="Top 1 Rank">
                                    <Crown className="w-4 h-4" />
                                </span>
                            </div>

                            {/* Identity Info */}
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                                        {userData.username}
                                        <UserCheck className="w-5 h-5 text-emerald-400" />
                                    </h1>
                                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full uppercase">
                                        {userData.badge}
                                    </span>
                                </div>

                                <p className="text-xs sm:text-sm text-gray-300 font-medium">
                                    {userData.displayName}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-mono">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-red-500" /> Bergabung {userData.joinDate}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-red-500" /> {userData.location}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-400 leading-relaxed max-w-xl pt-1">
                                    "{userData.bio}"
                                </p>
                            </div>

                        </div>

                        {/* Score & Rank Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
                            <div className="bg-[#15181F] border border-amber-500/30 rounded-2xl p-4 text-center space-y-1">
                                <span className="text-[10px] text-amber-400 uppercase font-mono font-bold block">PERINGKAT REGISTRY</span>
                                <span className="text-xl sm:text-2xl font-black text-amber-400">{userData.nationalRank}</span>
                            </div>

                            <div className="bg-[#15181F] border border-white/5 rounded-2xl p-4 text-center space-y-1">
                                <span className="text-[10px] text-gray-500 uppercase font-mono block">TOTAL SKOR REGISTRY</span>
                                <span className="text-xl sm:text-2xl font-black text-red-500 font-mono">{userData.totalPoints}</span>
                            </div>

                            <div className="bg-[#15181F] border border-white/5 rounded-2xl p-4 text-center space-y-1 col-span-2 sm:col-span-1">
                                <span className="text-[10px] text-gray-500 uppercase font-mono block">TOTAL SLAB KOLEKSI</span>
                                <span className="text-xl sm:text-2xl font-black text-white font-mono">{userData.totalSlabs} Kartu</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ========================================================================= */}
                {/* 3. VAULT NAVIGATION TABS                                                  */}
                {/* ========================================================================= */}
                <div className="flex items-center gap-2 bg-[#12151C] border border-white/10 p-1.5 rounded-2xl overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('collection')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'collection'
                                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Sparkles className="w-4 h-4" /> Vault Showcase Kartu ({showcaseCards.length})
                    </button>

                    <button
                        onClick={() => setActiveTab('sets')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'sets'
                                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Layers className="w-4 h-4" /> Set Yang Sedang Dibangun ({activeSets.length})
                    </button>

                    <button
                        onClick={() => setActiveTab('card')}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === 'card'
                                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <CreditCard className="w-4 h-4" /> Kartu Keanggotaan ICS COA Card
                    </button>
                </div>

                {/* ========================================================================= */}
                {/* 4A. TAB 1: SHOWCASE COLLECTION GRID                                      */}
                {/* ========================================================================= */}
                {activeTab === 'collection' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
                        {showcaseCards.map((card, idx) => (
                            <div
                                key={idx}
                                className="bg-[#12151C] border border-white/10 hover:border-red-500/40 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:translate-y-[-2px] shadow-xl group"
                            >
                                {/* Photo Slab Showcase */}
                                <div className="relative aspect-[3/4] bg-[#0A0C10] rounded-2xl border border-white/10 p-3 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={card.image}
                                        alt={card.name}
                                        width={180}
                                        height={250}
                                        className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                                        {card.grade}
                                    </div>
                                </div>

                                {/* Card Info */}
                                <div className="space-y-1.5">
                                    <span className="text-[10px] font-mono text-gray-500 uppercase block">CERT: {card.certId}</span>
                                    <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                                        {card.name}
                                    </h3>
                                    <p className="text-[11px] text-gray-400 line-clamp-1">{card.set}</p>
                                </div>

                                {/* Mini Sub-Grades Bar */}
                                <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono pt-2 border-t border-white/5">
                                    <span className="bg-[#15181F] p-1 rounded text-gray-400">Centering: <strong className="text-emerald-400">{card.subCentering}</strong></span>
                                    <span className="bg-[#15181F] p-1 rounded text-gray-400">Corners: <strong className="text-emerald-400">{card.subCorners}</strong></span>
                                    <span className="bg-[#15181F] p-1 rounded text-gray-400">Edges: <strong className="text-emerald-400">{card.subEdges}</strong></span>
                                    <span className="bg-[#15181F] p-1 rounded text-gray-400">Surface: <strong className="text-emerald-400">{card.subSurface}</strong></span>
                                </div>

                                {/* Action Link */}
                                <Link
                                    href={`/check-ics?cert=${card.certId}`}
                                    className="w-full bg-[#15181F] hover:bg-white/10 border border-white/10 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1 transition-all"
                                >
                                    Verifikasi Sertifikat <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* ========================================================================= */}
                {/* 4B. TAB 2: ACTIVE SETS BUILDING                                           */}
                {/* ========================================================================= */}
                {activeTab === 'sets' && (
                    <div className="space-y-4 animate-fadeIn">
                        {activeSets.map((set) => (
                            <div
                                key={set.id}
                                className="bg-[#12151C] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl"
                            >
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        {set.completed ? (
                                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> SET COMPLETE (100%)
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-md">
                                                IN PROGRESS ({set.progress})
                                            </span>
                                        )}
                                        <span className="text-xs font-mono text-gray-500">• {set.totalCards} Kartu</span>
                                    </div>

                                    <h3 className="text-base font-bold text-white">{set.title}</h3>

                                    {/* Progress Bar */}
                                    <div className="w-full max-w-xl bg-white/5 h-2 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${set.completed ? 'bg-emerald-500' : 'bg-red-500'}`}
                                            style={{ width: set.progress }}
                                        />
                                    </div>
                                </div>

                                <div className="text-right shrink-0 space-y-2 self-end md:self-auto">
                                    <span className="text-sm font-black text-red-400 font-mono block">{set.points}</span>
                                    <Link
                                        href={`/set-registry/detail/${set.id}`}
                                        className="text-xs font-bold text-gray-300 hover:text-white inline-flex items-center gap-1 bg-[#15181F] border border-white/10 px-4 py-2 rounded-xl transition-all"
                                    >
                                        Buka Detail Set <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ========================================================================= */}
                {/* 4C. TAB 3: PHYSICAL AUTHENTICITY CARD PREVIEW                             */}
                {/* ========================================================================= */}
                {activeTab === 'card' && (
                    <div className="bg-[#12151C] border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto space-y-6 shadow-2xl animate-fadeIn">
                        <div className="text-center space-y-2">
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                                ICS PHYSICAL AUTHENTICITY & REGISTRY CARD
                            </span>
                            <h3 className="text-xl font-extrabold text-white">Kartu Keanggotaan Kolektor Resmi</h3>
                            <p className="text-xs text-gray-400">
                                Kartu fisik premium bertinta emas yang diterbitkan khusus untuk pemegang akun terverifikasi ICS.
                            </p>
                        </div>

                        {/* Front & Back Card Design Visual */}
                        <div className="relative aspect-[1.58/1] bg-gradient-to-br from-[#171A21] via-[#12151C] to-[#0A0C10] border border-amber-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

                            {/* Card Header */}
                            <div className="flex justify-between items-start relative z-10">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-6 h-6 text-amber-400" />
                                    <span className="font-extrabold text-white tracking-widest text-sm">ICS VAULT PASS</span>
                                </div>
                                <span className="text-[10px] font-mono text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded bg-amber-500/10">
                                    GRANDMASTER
                                </span>
                            </div>

                            {/* Card Middle */}
                            <div className="space-y-1 relative z-10">
                                <span className="text-[10px] text-gray-500 font-mono block">MEMBER ID & HANDLE</span>
                                <p className="text-lg sm:text-xl font-bold font-mono text-white tracking-wider">
                                    {userData.username}
                                </p>
                                <p className="text-xs text-gray-400 font-sans">{userData.displayName}</p>
                            </div>

                            {/* Card Footer */}
                            <div className="flex justify-between items-end relative z-10 border-t border-white/10 pt-4 text-[10px] font-mono text-gray-400">
                                <span>ENCRYPTED DUAL-NFC ACTIVE</span>
                                <span className="text-amber-400 font-bold">VERIFIED MEMBER</span>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}