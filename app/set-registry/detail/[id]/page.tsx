'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Trophy,
    ArrowLeft,
    Search,
    Sparkles,
    Layers,
    CheckCircle2,
    ShieldCheck,
    Medal,
    ExternalLink,
    ChevronRight,
    Filter,
    BarChart3,
    UserCheck,
} from 'lucide-react';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function SetDetailPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const setId = resolvedParams.id;

    const [activeTab, setActiveTab] = useState<'checklist' | 'leaderboard'>('checklist');
    const [searchQuery, setSearchQuery] = useState('');
    const [gradeFilter, setGradeFilter] = useState<'all' | 'gem10' | 'mint95'>('all');

    // Mock Data Detail Set
    const setData = {
        id: setId,
        title: '2023 Pokémon Japanese SV3 Ruler of the Black Flame',
        category: 'Pokémon TCG',
        releaseYear: '2023',
        totalCardsInSet: 185,
        registeredSlabs: 1420,
        completionAvg: '68.4%',
        gemMintRatio: '42.1%',
        topCollector: '@KyotoCollector_ID',
        bannerImage: '/images/home/card1.webp',
    };

    // Mock Data Checklist Kartu dalam Set
    const cardChecklist = [
        { certId: 'ICS-TR-026184', cardNo: '#134/185', name: 'Charizard ex (Secret Rare)', rarity: 'RR', popGem10: 48, popMint95: 82, topGrade: '10 (Perfect)', image: '/images/home/card1.webp' },
        { certId: 'ICS-TR-026185', cardNo: '#135/185', name: 'Tyranitar ex', rarity: 'SR', popGem10: 32, popMint95: 64, topGrade: '9.5 (Mint+)', image: '/images/home/card1.webp' },
        { certId: 'ICS-TR-026186', cardNo: '#136/185', name: 'Pidgeot ex', rarity: 'SR', popGem10: 25, popMint95: 50, topGrade: '10 (Perfect)', image: '/images/home/card1.webp' },
        { certId: 'ICS-TR-026187', cardNo: '#137/185', name: 'Vespiquen ex', rarity: 'RR', popGem10: 19, popMint95: 41, topGrade: '9.5 (Mint+)', image: '/images/home/card1.webp' },
        { certId: 'ICS-TR-026188', cardNo: '#138/185', name: 'Houndoom ex', rarity: 'RR', popGem10: 14, popMint95: 38, topGrade: '9.0 (Mint)', image: '/images/home/card1.webp' },
    ];

    // Mock Data Leaderboard Khusus Set Ini
    const setLeaders = [
        { rank: 1, collector: '@KyotoCollector_ID', completion: '100% (185/185)', avgGrade: '9.88', totalPoints: '18,500 PTS', badge: 'SET MASTER' },
        { rank: 2, collector: '@IndoTCG_Vault', completion: '94.5% (175/185)', avgGrade: '9.74', totalPoints: '17,120 PTS', badge: 'HIGH TIER' },
        { rank: 3, collector: '@JakartaSlabKing', completion: '88.1% (163/185)', avgGrade: '9.65', totalPoints: '15,840 PTS', badge: 'HIGH TIER' },
        { rank: 4, collector: '@RedHair_Master', completion: '76.2% (141/185)', avgGrade: '9.52', totalPoints: '13,200 PTS', badge: 'COLLECTOR' },
        { rank: 5, collector: '@BogorCardGuild', completion: '65.4% (121/185)', avgGrade: '9.40', totalPoints: '11,100 PTS', badge: 'COLLECTOR' },
    ];

    const filteredChecklist = cardChecklist.filter((card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.cardNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-[#0A0C10] text-white min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-10">

                {/* ========================================================================= */}
                {/* 1. BACK NAVIGATION & BREADCRUMB                                           */}
                {/* ========================================================================= */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/set-registry"
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-400 transition-colors bg-[#12151C] border border-white/10 px-4 py-2 rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Set Registry
                    </Link>

                    <span className="text-xs font-mono text-gray-500 uppercase">
                        SET ID: #{setData.id}
                    </span>
                </div>

                {/* ========================================================================= */}
                {/* 2. SET HEADER HERO BANNER                                                 */}
                {/* ========================================================================= */}
                <div className="bg-[#12151C] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                        {/* Left Card Preview */}
                        <div className="lg:col-span-3 flex justify-center">
                            <div className="w-36 h-48 bg-[#0A0C10] rounded-2xl border border-white/10 p-2 relative flex items-center justify-center shadow-xl group">
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
                                <span className="text-xs font-mono text-gray-400">
                                    Rilis Tahun {setData.releaseYear}
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                                {setData.title}
                            </h1>

                            {/* Set Stats Bar */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                                <div className="bg-[#15181F] border border-white/5 rounded-xl p-3">
                                    <span className="text-gray-500 text-[10px] block uppercase font-mono">TOTAL KARTU SET</span>
                                    <span className="font-extrabold text-white text-base mt-0.5 block">{setData.totalCardsInSet} Kartu</span>
                                </div>

                                <div className="bg-[#15181F] border border-white/5 rounded-xl p-3">
                                    <span className="text-gray-500 text-[10px] block uppercase font-mono">SLAB TERDAFTAR</span>
                                    <span className="font-extrabold text-red-500 text-base mt-0.5 block">{setData.registeredSlabs} Slabs</span>
                                </div>

                                <div className="bg-[#15181F] border border-white/5 rounded-xl p-3">
                                    <span className="text-gray-500 text-[10px] block uppercase font-mono">RATIO GEM MINT 10</span>
                                    <span className="font-extrabold text-emerald-400 text-base mt-0.5 block">{setData.gemMintRatio}</span>
                                </div>

                                <div className="bg-[#15181F] border border-white/5 rounded-xl p-3">
                                    <span className="text-gray-500 text-[10px] block uppercase font-mono">PEMIMPIN SET #1</span>
                                    <span className="font-bold text-amber-400 text-xs mt-1 block truncate">{setData.topCollector}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* 3. TAB SWITCHER (CHECKLIST VS LEADERBOARD)                                */}
                {/* ========================================================================= */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 bg-[#12151C] border border-white/10 p-1.5 rounded-2xl w-full sm:w-auto">
                        <button
                            onClick={() => setActiveTab('checklist')}
                            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'checklist'
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <Layers className="w-4 h-4" /> Checklist Kartu ({setData.totalCardsInSet})
                        </button>

                        <button
                            onClick={() => setActiveTab('leaderboard')}
                            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'leaderboard'
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <Trophy className="w-4 h-4 text-amber-400" /> Klasemen Set Ini
                        </button>
                    </div>

                    {/* Search Card inside Checklist */}
                    {activeTab === 'checklist' && (
                        <div className="relative w-full sm:w-72">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Cari nama atau nomor kartu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#12151C] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/60 transition-colors"
                            />
                        </div>
                    )}
                </div>

                {/* ========================================================================= */}
                {/* 4A. TAB 1: CARD CHECKLIST TABLE                                           */}
                {/* ========================================================================= */}
                {activeTab === 'checklist' && (
                    <div className="bg-[#12151C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-fadeIn">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-[#15181F]">
                                        <th className="py-4 px-6">NO KARTU</th>
                                        <th className="py-4 px-6">NAMA KARTU</th>
                                        <th className="py-4 px-6 text-center">RARITY</th>
                                        <th className="py-4 px-6 text-center">POP GEM MINT 10</th>
                                        <th className="py-4 px-6 text-center">POP MINT 9.5</th>
                                        <th className="py-4 px-6 text-right">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 font-mono">
                                    {filteredChecklist.map((card, idx) => (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-6 font-bold text-red-400">{card.cardNo}</td>
                                            <td className="py-4 px-6 font-sans font-bold text-white flex items-center gap-3">
                                                <div className="w-8 h-10 bg-[#0A0C10] rounded border border-white/10 p-0.5 shrink-0 flex items-center justify-center">
                                                    <Image src={card.image} alt={card.name} width={28} height={36} className="object-contain" />
                                                </div>
                                                <span>{card.name}</span>
                                            </td>
                                            <td className="py-4 px-6 text-center font-bold text-amber-400">{card.rarity}</td>
                                            <td className="py-4 px-6 text-center font-bold text-emerald-400">{card.popGem10} Slabs</td>
                                            <td className="py-4 px-6 text-center text-gray-300">{card.popMint95} Slabs</td>
                                            <td className="py-4 px-6 text-right">
                                                <Link
                                                    href={`/check-ics?cert=${card.certId}`}
                                                    className="text-xs font-sans font-bold text-red-400 hover:text-red-300 inline-flex items-center gap-1 bg-[#15181F] border border-white/10 px-3 py-1.5 rounded-lg transition-all"
                                                >
                                                    Cek Pop Report <ExternalLink className="w-3.5 h-3.5" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ========================================================================= */}
                {/* 4B. TAB 2: SET LEADERBOARD TABLE                                          */}
                {/* ========================================================================= */}
                {activeTab === 'leaderboard' && (
                    <div className="bg-[#12151C] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div>
                                <h3 className="text-xl font-extrabold text-white">Klasemen Kelengkapan Set</h3>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Peringkat kolektor berdasarkan persentase kelengkapan dan total poin skor kartu di set ini.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-[#15181F]">
                                        <th className="py-4 px-6 text-center">RANK</th>
                                        <th className="py-4 px-6">KOLEKTOR</th>
                                        <th className="py-4 px-6 text-center">PROGRESS KELENGKAPAN</th>
                                        <th className="py-4 px-6 text-center">AVG GRADE</th>
                                        <th className="py-4 px-6 text-right">TOTAL POIN</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 font-mono">
                                    {setLeaders.map((leader) => (
                                        <tr key={leader.rank} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 px-6 text-center">
                                                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-black text-xs border ${leader.rank === 1 ? 'text-amber-400 bg-amber-500/10 border-amber-500/30' : 'text-gray-300 bg-white/5 border-white/10'
                                                    }`}>
                                                    {leader.rank}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 font-sans font-bold text-white flex items-center gap-2">
                                                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span>{leader.collector}</span>
                                            </td>
                                            <td className="py-4 px-6 text-center text-gray-300 font-bold">{leader.completion}</td>
                                            <td className="py-4 px-6 text-center text-amber-400 font-bold">{leader.avgGrade}</td>
                                            <td className="py-4 px-6 text-right font-black text-red-400">{leader.totalPoints}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}