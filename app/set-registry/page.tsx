'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Trophy,
    Search,
    Layers,
    Sparkles,
    ChevronRight,
    ChevronLeft,
    UserCheck,
    ArrowRight,
    Crown,
    Flame,
    ShieldCheck,
} from 'lucide-react';

export default function SetRegistryHomePage() {
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'pokemon' | 'onepiece' | 'yugioh'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    // Data Banner Slider (Bisa ditambah sesuai promo/event ICS)
    const slides = [
        {
            id: 1,
            tag: 'NATIONAL COLLECTIBLE LEADERBOARD & VAULT',
            tagIcon: Crown,
            tagColor: 'text-amber-400',
            title: 'ICS Set Registry & Klasemen Kolektor',
            description: 'Daftarkan kartu koleksimu yang telah di-grade ICS, bangun set impian, dan bersaing memperebutkan posisi puncak di Hall of Fame Kolektor Indonesia.',
            leaderName: '@KyotoCollector_ID',
            leaderScore: '142,850 PTS • 12 SETS',
            leaderRank: '#1 NASIONAL',
            cardImage: '/images/home/card1.webp',
            ctaText: 'Klaim Vault & Masuk Registry',
            ctaLink: '/login',
            bannerBg: 'from-[#17080A] via-[#12151C] to-[#0D1017]',
        },
        {
            id: 2,
            tag: 'FEATURED TCG RELEASE EVENT',
            tagIcon: Flame,
            tagColor: 'text-red-400',
            title: 'Pokémon 151 & Ruler of Black Flame',
            description: 'Lebih dari 3,000+ slab terverifikasi dalam ledger digital. Cek populasi grade 10 dan persentase kelengkapan set milikmu sekarang.',
            leaderName: '@IndoTCG_Vault',
            leaderScore: '128,400 PTS • 9 SETS',
            leaderRank: '#2 NASIONAL',
            cardImage: '/images/home/card1.webp',
            ctaText: 'Jelajahi Set Populer',
            ctaLink: '/set-registry/detail/set-pokemon-151',
            bannerBg: 'from-[#1C0F0A] via-[#12151C] to-[#0A0D17]',
        },
        {
            id: 3,
            tag: 'DUAL NFC ENCRYPTED REGISTRY',
            tagIcon: ShieldCheck,
            tagColor: 'text-emerald-400',
            title: 'Otentikasi Kriptografi 100% Sah',
            description: 'Setiap slab berstempel ICS tersambung langsung ke ledger fisik. Cukup tap NFC smartphone untuk mengklaim kepemilikan di profil kamu.',
            leaderName: '@RedHair_Master',
            leaderScore: '98,200 PTS • 7 SETS',
            leaderRank: '#3 NASIONAL',
            cardImage: '/images/home/card1.webp',
            ctaText: 'Cek Cara Tap NFC',
            ctaLink: '/check-ics',
            bannerBg: 'from-[#0A1A14] via-[#12151C] to-[#120D17]',
        },
    ];

    // Auto-slide timer (Ganti slide setiap 5 detik)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    // Data Mock Popular Sets
    const popularSets = [
        {
            id: 'set-pokemon-sv3',
            category: 'pokemon',
            title: '2023 Pokémon Japanese SV3 Ruler of the Black Flame',
            totalCards: 185,
            registeredSlabs: 1420,
            completionLeader: '@KyotoCollector_ID',
            topGrade: '9.82 Avg Grade',
            image: '/images/home/card1.webp',
            badge: 'HOT SET',
        },
        {
            id: 'set-op-op05',
            category: 'onepiece',
            title: '2023 One Piece OP-05 Awakening of the New Era',
            totalCards: 127,
            registeredSlabs: 980,
            completionLeader: '@RedHair_Master',
            topGrade: '9.75 Avg Grade',
            image: '/images/home/card1.webp',
            badge: 'POPULAR',
        },
        {
            id: 'set-pokemon-151',
            category: 'pokemon',
            title: '2023 Pokémon Japanese SV2a Pokémon Card 151',
            totalCards: 205,
            registeredSlabs: 2310,
            completionLeader: '@IndoTCG_Vault',
            topGrade: '9.91 Avg Grade',
            image: '/images/home/card1.webp',
            badge: 'TOP VOLUME',
        },
        {
            id: 'set-ygo-ra01',
            category: 'yugioh',
            title: '2023 Yu-Gi-Oh! Rarity Collection 25th Anniversary',
            totalCards: 100,
            registeredSlabs: 640,
            completionLeader: '@DuelistKing_JKT',
            topGrade: '9.68 Avg Grade',
            image: '/images/home/card1.webp',
            badge: 'FEATURED',
        },
    ];

    // Data Mock Leaderboard Kolektor
    const topCollectors = [
        { rank: 1, name: '@KyotoCollector_ID', points: '142,850 PTS', completedSets: 12, gemMintCount: 148, badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
        { rank: 2, name: '@IndoTCG_Vault', points: '128,400 PTS', completedSets: 9, gemMintCount: 122, badgeColor: 'text-gray-300 bg-gray-500/10 border-gray-500/30' },
        { rank: 3, name: '@RedHair_Master', points: '98,200 PTS', completedSets: 7, gemMintCount: 95, badgeColor: 'text-amber-700 bg-amber-900/20 border-amber-800/40' },
        { rank: 4, name: '@JakartaSlabKing', points: '84,150 PTS', completedSets: 6, gemMintCount: 78, badgeColor: 'text-gray-400 bg-white/5 border-white/10' },
        { rank: 5, name: '@BogorCardGuild', points: '76,900 PTS', completedSets: 5, gemMintCount: 64, badgeColor: 'text-gray-400 bg-white/5 border-white/10' },
    ];

    const filteredSets = popularSets.filter((set) => {
        const matchesCategory = selectedCategory === 'all' || set.category === selectedCategory;
        const matchesSearch = set.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const activeSlideData = slides[currentSlide];
    const IconTagComp = activeSlideData.tagIcon;

    return (
        <div className="bg-[#0A0C10] text-white min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-12">

                {/* ========================================================================= */}
                {/* 1. HERO BANNER SLIDER (SHOPEE / E-COMMERCE STYLE)                         */}
                {/* ========================================================================= */}
                <div className="relative group">
                    <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${activeSlideData.bannerBg} border border-red-500/20 p-6 sm:p-10 shadow-2xl transition-all duration-700`}>

                        {/* Background Ambient Glow */}
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/15 blur-[120px] pointer-events-none rounded-full" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

                            {/* Left Content Column */}
                            <div className="lg:col-span-7 space-y-5 animate-fadeIn">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-[11px] font-extrabold text-red-400 uppercase tracking-wider">
                                    <IconTagComp className={`w-3.5 h-3.5 ${activeSlideData.tagColor}`} />
                                    {activeSlideData.tag}
                                </div>

                                <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
                                    {activeSlideData.title}
                                </h1>

                                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                                    {activeSlideData.description}
                                </p>

                                {/* Search Box Inside Banner */}
                                <div className="bg-[#15181F]/90 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 shadow-xl max-w-xl pt-2">
                                    <div className="relative flex items-center">
                                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
                                        <input
                                            type="text"
                                            placeholder="Cari nama set, nomor rilis, atau nama kolektor..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-[#0A0C10] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/60 transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Graphic Card Preview */}
                            <div className="lg:col-span-5 flex justify-center">
                                <div className="relative w-full max-w-sm bg-[#15181F] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
                                    <div className="flex items-center justify-between text-xs border-b border-white/5 pb-3">
                                        <span className="flex items-center gap-1.5 font-bold text-amber-400">
                                            <Trophy className="w-4 h-4" /> HALL OF FAME LEADER
                                        </span>
                                        <span className="text-[10px] font-mono text-gray-400">SEASON 2026</span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-18 bg-[#0A0C10] rounded-lg border border-white/10 p-1 flex items-center justify-center shrink-0">
                                            <Image
                                                src={activeSlideData.cardImage}
                                                alt="Top Collection Card"
                                                width={56}
                                                height={76}
                                                className="object-contain"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <span className="text-[10px] text-gray-500 uppercase font-mono block">PERINGKAT {activeSlideData.leaderRank}</span>
                                            <strong className="text-sm font-bold text-white block">{activeSlideData.leaderName}</strong>
                                            <span className="text-xs text-red-400 font-mono font-bold block">{activeSlideData.leaderScore}</span>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <Link
                                            href={activeSlideData.ctaLink}
                                            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
                                        >
                                            {activeSlideData.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Slider Navigation Buttons (Panah Kiri & Kanan) */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#15181F]/80 hover:bg-red-600 border border-white/10 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#15181F]/80 hover:bg-red-600 border border-white/10 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                        aria-label="Next Slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Slider Dots Indicator */}
                    <div className="flex items-center justify-center gap-2 pt-3">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-2 rounded-full transition-all ${currentSlide === idx ? 'w-8 bg-red-500' : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* 2. STATS OVERVIEW BANNER                                                  */}
                {/* ========================================================================= */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#12151C] border border-white/10 rounded-2xl p-5 text-center space-y-1">
                        <span className="text-2xl sm:text-3xl font-black text-white">12,480+</span>
                        <span className="text-[11px] text-gray-400 block font-mono">TOTAL SLAB TERDAFTAR</span>
                    </div>

                    <div className="bg-[#12151C] border border-white/10 rounded-2xl p-5 text-center space-y-1">
                        <span className="text-2xl sm:text-3xl font-black text-red-500">450+</span>
                        <span className="text-[11px] text-gray-400 block font-mono">OFFICIAL REGISTERED SETS</span>
                    </div>

                    <div className="bg-[#12151C] border border-white/10 rounded-2xl p-5 text-center space-y-1">
                        <span className="text-2xl sm:text-3xl font-black text-emerald-400">1,890</span>
                        <span className="text-[11px] text-gray-400 block font-mono">KOLEKTOR TERDAFTAR</span>
                    </div>

                    <div className="bg-[#12151C] border border-white/10 rounded-2xl p-5 text-center space-y-1">
                        <span className="text-2xl sm:text-3xl font-black text-amber-400">98.4%</span>
                        <span className="text-[11px] text-gray-400 block font-mono">VERIFIED ENCRYPTION</span>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* 3. TOP 5 KOLEKTOR KLASEMEN (BERADA DI ATAS KATALOG)                       */}
                {/* ========================================================================= */}
                <div className="bg-[#12151C] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                        <div>
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                                KLASEMEN KOLEKTOR NASIONAL
                            </span>
                            <h2 className="text-2xl font-extrabold text-white mt-0.5 flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-amber-400" /> Top 5 Kolektor Teratas ICS
                            </h2>
                        </div>

                        <Link
                            href="/set-registry/klasemen"
                            className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 bg-[#15181F] border border-white/10 px-4 py-2 rounded-xl transition-all self-start sm:self-auto"
                        >
                            Lihat Klasemen Lengkap <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-[#15181F]">
                                    <th className="py-3.5 px-4 text-center">RANK</th>
                                    <th className="py-3.5 px-4">NAMA KOLEKTOR</th>
                                    <th className="py-3.5 px-4 text-center">SET SELESAI</th>
                                    <th className="py-3.5 px-4 text-center">GEM MINT 10 SLAB</th>
                                    <th className="py-3.5 px-4 text-right">TOTAL SKOR REGISTRY</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 font-mono">
                                {topCollectors.map((row) => (
                                    <tr key={row.rank} className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-4 text-center">
                                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-extrabold text-xs border ${row.badgeColor}`}>
                                                {row.rank}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 font-sans font-bold text-white flex items-center gap-2">
                                            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                            <span>{row.name}</span>
                                        </td>
                                        <td className="py-4 px-4 text-center text-gray-300">{row.completedSets} Set</td>
                                        <td className="py-4 px-4 text-center text-amber-400 font-bold">{row.gemMintCount} Kartu</td>
                                        <td className="py-4 px-4 text-right font-black text-red-400 text-sm">{row.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* 4. FEATURED SETS CATALOG & FILTER                                         */}
                {/* ========================================================================= */}
                <div className="space-y-8">

                    {/* Filter Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                        <div>
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
                                KATALOG RELEASES
                            </span>
                            <h2 className="text-2xl font-extrabold text-white mt-0.5 flex items-center gap-2">
                                <Layers className="w-6 h-6 text-red-500" /> Set TCG Populer
                            </h2>
                        </div>

                        {/* Category Switcher */}
                        <div className="flex items-center gap-1.5 bg-[#12151C] border border-white/10 p-1 rounded-xl overflow-x-auto">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${selectedCategory === 'all' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Semua TCG
                            </button>
                            <button
                                onClick={() => setSelectedCategory('pokemon')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${selectedCategory === 'pokemon' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Pokémon Card
                            </button>
                            <button
                                onClick={() => setSelectedCategory('onepiece')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${selectedCategory === 'onepiece' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                One Piece Card
                            </button>
                            <button
                                onClick={() => setSelectedCategory('yugioh')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${selectedCategory === 'yugioh' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Yu-Gi-Oh!
                            </button>
                        </div>
                    </div>

                    {/* Grid Set Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredSets.map((set) => (
                            <div
                                key={set.id}
                                className="bg-[#12151C] border border-white/10 hover:border-red-500/40 rounded-2xl p-5 space-y-4 transition-all duration-300 hover:translate-y-[-2px] group"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Thumbnail Preview */}
                                    <div className="w-20 h-28 bg-[#0A0C10] rounded-xl border border-white/10 p-1.5 shrink-0 relative overflow-hidden flex items-center justify-center">
                                        <Image
                                            src={set.image}
                                            alt={set.title}
                                            width={80}
                                            height={110}
                                            className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Content Details */}
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[10px] font-bold text-red-400 bg-red-950/50 border border-red-500/30 px-2 py-0.5 rounded">
                                                {set.badge}
                                            </span>
                                            <span className="text-xs font-mono text-gray-500">{set.totalCards} Total Cards</span>
                                        </div>

                                        <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                                            {set.title}
                                        </h3>

                                        <div className="text-xs text-gray-400 space-y-1 pt-1 font-mono">
                                            <div className="flex justify-between">
                                                <span>Slab Terdaftar:</span>
                                                <strong className="text-white">{set.registeredSlabs} Kartu</strong>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Peringkat 1 Set:</span>
                                                <strong className="text-emerald-400">{set.completionLeader}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                                    <span className="text-gray-400 flex items-center gap-1">
                                        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {set.topGrade}
                                    </span>

                                    <Link
                                        href={`/set-registry/detail/${set.id}`}
                                        className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                                    >
                                        Buka Detail Set <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* ========================================================================= */}
                {/* 5. CALL TO ACTION BANNER                                                  */}
                {/* ========================================================================= */}
                <div className="bg-gradient-to-r from-[#15181F] via-[#12151C] to-[#15181F] border border-white/10 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                            Punya Kartu Ber-grade ICS? Masukkan ke Set Registry!
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
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