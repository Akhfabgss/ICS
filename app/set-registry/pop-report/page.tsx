'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    BarChart3,
    Search,
    Filter,
    ArrowLeft,
    Sparkles,
    ShieldCheck,
    ChevronRight,
    TrendingUp,
    PieChart,
    Layers,
    Award,
} from 'lucide-react';

export default function PopReportPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTcg, setSelectedTcg] = useState<'all' | 'pokemon' | 'onepiece' | 'yugioh'>('all');

    // Mock Data Pop Report
    const popData = [
        {
            id: 'pop-1',
            tcg: 'pokemon',
            cardName: 'Charizard ex (Secret Rare) #134/185',
            setName: '2023 Pokémon SV3 Ruler of the Black Flame',
            totalPop: 184,
            grade10: 48,
            grade95: 82,
            grade90: 36,
            gradeBelow9: 18,
            gemMintRatio: '26.1%',
            image: '/images/home/card1.webp',
        },
        {
            id: 'pop-2',
            tcg: 'onepiece',
            cardName: 'Monkey D. Luffy (Manga Alt-Art) #OP05-119',
            setName: '2023 One Piece OP-05 Awakening of the New Era',
            totalPop: 92,
            grade10: 14,
            grade95: 42,
            grade90: 24,
            gradeBelow9: 12,
            gemMintRatio: '15.2%',
            image: '/images/home/card1.webp',
        },
        {
            id: 'pop-3',
            tcg: 'pokemon',
            cardName: 'Pikachu Special Illustration Rare #205/165',
            setName: '2023 Pokémon SV2a Pokémon Card 151',
            totalPop: 310,
            grade10: 95,
            grade95: 140,
            grade90: 55,
            gradeBelow9: 20,
            gemMintRatio: '30.6%',
            image: '/images/home/card1.webp',
        },
        {
            id: 'pop-4',
            tcg: 'yugioh',
            cardName: 'Blue-Eyes White Dragon 25th Secret Rare',
            setName: '2023 Yu-Gi-Oh! Rarity Collection',
            totalPop: 65,
            grade10: 8,
            grade95: 28,
            grade90: 20,
            gradeBelow9: 9,
            gemMintRatio: '12.3%',
            image: '/images/home/card1.webp',
        },
    ];

    const filteredPop = popData.filter((item) => {
        const matchesTcg = selectedTcg === 'all' || item.tcg === selectedTcg;
        const matchesSearch =
            item.cardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.setName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTcg && matchesSearch;
    });

    return (
        <div className="bg-[#0A0C10] text-white min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-12">

                {/* ========================================================================= */}
                {/* 1. BREADCRUMB & HERO HEADER                                               */}
                {/* ========================================================================= */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/set-registry"
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-400 transition-colors bg-[#12151C] border border-white/10 px-4 py-2 rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Set Registry
                    </Link>

                    <span className="text-xs font-mono text-gray-400 bg-[#15181F] border border-white/5 px-3 py-1.5 rounded-lg">
                        REAL-TIME FORENSIC CENSUS LEDGER
                    </span>
                </div>

                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[11px] font-extrabold text-red-400 uppercase tracking-widest">
                        <BarChart3 className="w-3.5 h-3.5 text-red-500" />
                        POPULATION REPORT & RARITY INDEX
                    </span>

                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                        ICS Population Report <span className="text-red-500">(Pop Report)</span>
                    </h1>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        Pantau sensus resmi distribusi grade dan tingkat kelangkaan setiap kartu yang telah lulus enkapsulasi forensik di laboratorium ICS.
                    </p>
                </div>

                {/* ========================================================================= */}
                {/* 2. STATS OVERVIEW CARDS                                                  */}
                {/* ========================================================================= */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#12151C] border border-white/10 rounded-2xl p-5 text-center space-y-1">
                        <span className="text-2xl sm:text-3xl font-black text-white">12,480</span>
                        <span className="text-[11px] text-gray-400 block font-mono">TOTAL KARTU DI-GRADE</span>
                    </div>

                    <div className="bg-[#12151C] border border-white/10 rounded-2xl p-5 text-center space-y-1">
                        <span className="text-2xl sm:text-3xl font-black text-amber-400">3,140</span>
                        <span className="text-[11px] text-gray-400 block font-mono">TOTAL GEM MINT 10</span>
                    </div>

                    <div className="bg-[#12151C] border border-white/10 rounded-2xl p-5 text-center space-y-1">
                        <span className="text-2xl sm:text-3xl font-black text-emerald-400">25.1%</span>
                        <span className="text-[11px] text-gray-400 block font-mono">RATIO POPULATION 10</span>
                    </div>

                    <div className="bg-[#12151C] border border-white/10 rounded-2xl p-5 text-center space-y-1">
                        <span className="text-2xl sm:text-3xl font-black text-red-500">450+</span>
                        <span className="text-[11px] text-gray-400 block font-mono">SET TCG TERDAFTAR</span>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* 3. SEARCH & FILTER TOOLBAR                                                */}
                {/* ========================================================================= */}
                <div className="bg-[#12151C] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">

                    <div className="relative w-full md:w-96">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Cari nama kartu atau nama set TCG..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#15181F] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/60 transition-colors"
                        />
                    </div>

                    {/* TCG Filter Category */}
                    <div className="flex items-center gap-1 bg-[#15181F] p-1 rounded-xl border border-white/5 overflow-x-auto w-full md:w-auto">
                        <button
                            onClick={() => setSelectedTcg('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${selectedTcg === 'all' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Semua TCG
                        </button>
                        <button
                            onClick={() => setSelectedTcg('pokemon')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${selectedTcg === 'pokemon' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Pokémon Card
                        </button>
                        <button
                            onClick={() => setSelectedTcg('onepiece')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${selectedTcg === 'onepiece' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            One Piece Card
                        </button>
                        <button
                            onClick={() => setSelectedTcg('yugioh')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${selectedTcg === 'yugioh' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Yu-Gi-Oh!
                        </button>
                    </div>

                </div>

                {/* ========================================================================= */}
                {/* 4. POPULATION REPORT TABLE                                                */}
                {/* ========================================================================= */}
                <div className="bg-[#12151C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-[#15181F]">
                                    <th className="py-4 px-6">DETAIL KARTU & SET</th>
                                    <th className="py-4 px-6 text-center">TOTAL POP</th>
                                    <th className="py-4 px-6 text-center text-amber-400">GRADE 10</th>
                                    <th className="py-4 px-6 text-center text-emerald-400">GRADE 9.5</th>
                                    <th className="py-4 px-6 text-center text-gray-300">GRADE 9.0</th>
                                    <th className="py-4 px-6 text-center text-gray-400">&lt; GRADE 9</th>
                                    <th className="py-4 px-6 text-right">GEM MINT RATIO</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 font-mono">
                                {filteredPop.map((item) => (
                                    <tr key={item.id} className="hover:bg-white/5 transition-colors">

                                        {/* Card Title & Set */}
                                        <td className="py-4 px-6 font-sans">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-14 bg-[#0A0C10] rounded border border-white/10 p-0.5 shrink-0 flex items-center justify-center">
                                                    <Image src={item.image} alt={item.cardName} width={34} height={46} className="object-contain" />
                                                </div>
                                                <div>
                                                    <strong className="text-white font-bold block">{item.cardName}</strong>
                                                    <span className="text-[11px] text-gray-400 block font-normal">{item.setName}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Total Population */}
                                        <td className="py-4 px-6 text-center font-bold text-white text-sm">
                                            {item.totalPop}
                                        </td>

                                        {/* Grade 10 */}
                                        <td className="py-4 px-6 text-center font-black text-amber-400 bg-amber-500/5">
                                            {item.grade10}
                                        </td>

                                        {/* Grade 9.5 */}
                                        <td className="py-4 px-6 text-center font-bold text-emerald-400">
                                            {item.grade95}
                                        </td>

                                        {/* Grade 9.0 */}
                                        <td className="py-4 px-6 text-center text-gray-300">
                                            {item.grade90}
                                        </td>

                                        {/* < Grade 9 */}
                                        <td className="py-4 px-6 text-center text-gray-500">
                                            {item.gradeBelow9}
                                        </td>

                                        {/* Ratio */}
                                        <td className="py-4 px-6 text-right font-black text-red-400 font-sans">
                                            <span className="bg-red-950/40 border border-red-500/30 px-2.5 py-1 rounded-md text-xs">
                                                {item.gemMintRatio}
                                            </span>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}