'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Medal,
  Crown,
  Search,
  Sparkles,
  UserCheck,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Flame,
  Award,
  Layers,
  HelpCircle,
} from 'lucide-react';

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tcgCategory, setTcgCategory] = useState<'all' | 'pokemon' | 'onepiece' | 'yugioh'>('all');
  const [timeframe, setTimeframe] = useState<'alltime' | 'season2026' | 'monthly'>('season2026');

  // Mock Top 3 Podium
  const podiumCollectors = [
    {
      rank: 2,
      username: '@IndoTCG_Vault',
      name: 'Budi Santoso',
      points: '128,400 PTS',
      setsCompleted: 9,
      gemMint10Count: 122,
      avatarBg: 'bg-gray-400/20 border-gray-400/40 text-gray-300',
      badge: 'Silver Collector',
      podiumBg: 'border-gray-500/30 bg-[#12151C]',
    },
    {
      rank: 1,
      username: '@KyotoCollector_ID',
      name: 'Kyoto Vault ID',
      points: '142,850 PTS',
      setsCompleted: 12,
      gemMint10Count: 148,
      avatarBg: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
      badge: 'Grandmaster Collector',
      podiumBg: 'border-amber-500/40 bg-gradient-to-b from-amber-950/20 to-[#12151C]',
    },
    {
      rank: 3,
      username: '@RedHair_Master',
      name: 'Rian Pratama',
      points: '98,200 PTS',
      setsCompleted: 7,
      gemMint10Count: 95,
      avatarBg: 'bg-amber-800/20 border-amber-800/40 text-amber-600',
      badge: 'Bronze Collector',
      podiumBg: 'border-amber-900/30 bg-[#12151C]',
    },
  ];

  // Mock Full Leaderboard Table Data
  const leaderboardData = [
    { rank: 1, username: '@KyotoCollector_ID', name: 'Kyoto Vault ID', category: 'pokemon', completedSets: 12, gem10Count: 148, points: '142,850 PTS', badge: 'Verified Master' },
    { rank: 2, username: '@IndoTCG_Vault', name: 'Budi Santoso', category: 'pokemon', completedSets: 9, gem10Count: 122, points: '128,400 PTS', badge: 'Verified Master' },
    { rank: 3, username: '@RedHair_Master', name: 'Rian Pratama', category: 'onepiece', completedSets: 7, gem10Count: 95, points: '98,200 PTS', badge: 'Verified Master' },
    { rank: 4, username: '@JakartaSlabKing', name: 'Kevin Wijaya', category: 'pokemon', completedSets: 6, gem10Count: 78, points: '84,150 PTS', badge: 'Senior Collector' },
    { rank: 5, username: '@BogorCardGuild', name: 'Akhfa Bagas', category: 'pokemon', completedSets: 5, gem10Count: 64, points: '76,900 PTS', badge: 'Senior Collector' },
    { rank: 6, username: '@DuelistKing_JKT', name: 'Dimas Seto', category: 'yugioh', completedSets: 5, gem10Count: 59, points: '71,300 PTS', badge: 'Senior Collector' },
    { rank: 7, username: '@SurabayaCollector', name: 'Denny K.', category: 'onepiece', completedSets: 4, gem10Count: 51, points: '62,800 PTS', badge: 'Collector' },
    { rank: 8, username: '@BandungTCG_Corner', name: 'Giga Putra', category: 'pokemon', completedSets: 4, gem10Count: 44, points: '58,100 PTS', badge: 'Collector' },
    { rank: 9, username: '@NakamaVault', name: 'Reza Fahlevi', category: 'onepiece', completedSets: 3, gem10Count: 39, points: '49,600 PTS', badge: 'Collector' },
    { rank: 10, username: '@KolektorGarisKeras', name: 'Taufik H.', category: 'yugioh', completedSets: 3, gem10Count: 32, points: '41,200 PTS', badge: 'Collector' },
  ];

  const filteredLeaderboard = leaderboardData.filter((collector) => {
    const matchesCategory = tcgCategory === 'all' || collector.category === tcgCategory;
    const matchesSearch =
      collector.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collector.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0A0C10] text-white min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. BREADCRUMB & HEADER                                                    */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/set-registry"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-400 transition-colors bg-[#12151C] border border-white/10 px-4 py-2 rounded-xl w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Set Registry
          </Link>

          <span className="text-xs font-mono text-gray-400 bg-[#15181F] border border-white/5 px-3 py-1.5 rounded-lg w-fit">
            SEASON 2026 • OFFICIAL AUDITED RANKINGS
          </span>
        </div>

        {/* HERO TITLE */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-[11px] font-extrabold text-red-400 uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            NATIONAL HALL OF FAME
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Klasemen Kolektor <span className="text-red-500">Nasional ICS</span>
          </h1>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Papan peringkat resmi kolektor kartu bersertifikasi ICS di Indonesia berdasarkan akumulasi skor registry, kelengkapan set, dan jumlah koleksi Gem Mint 10.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. TOP 3 PODIUM DISPLAY                                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-end max-w-5xl mx-auto">
          {podiumCollectors.map((item) => (
            <div
              key={item.rank}
              className={`rounded-3xl border p-6 text-center space-y-4 shadow-2xl relative transition-transform hover:scale-[1.02] duration-300 ${item.podiumBg} ${
                item.rank === 1 ? 'order-first md:order-2 border-amber-500/50 py-8' : item.rank === 2 ? 'order-2 md:order-1' : 'order-3'
              }`}
            >
              {/* Crown / Rank Icon */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                {item.rank === 1 ? (
                  <span className="w-9 h-9 rounded-full bg-amber-500 text-black font-black flex items-center justify-center shadow-lg shadow-amber-500/40 border-2 border-amber-300">
                    <Crown className="w-5 h-5" />
                  </span>
                ) : item.rank === 2 ? (
                  <span className="w-8 h-8 rounded-full bg-gray-300 text-black font-bold flex items-center justify-center shadow-md">
                    2
                  </span>
                ) : (
                  <span className="w-8 h-8 rounded-full bg-amber-800 text-white font-bold flex items-center justify-center shadow-md">
                    3
                  </span>
                )}
              </div>

              {/* Collector Info */}
              <div className="space-y-1.5 pt-2">
                <div className={`w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center font-black text-xl shadow-xl ${item.avatarBg}`}>
                  {item.username.charAt(1).toUpperCase()}
                </div>

                <div className="pt-2">
                  <h3 className="text-base font-bold text-white flex items-center justify-center gap-1">
                    {item.username}
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </h3>
                  <span className="text-[11px] text-gray-400">{item.name}</span>
                </div>

                <span className="inline-block text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              </div>

              {/* Score Highlight */}
              <div className="bg-[#15181F] border border-white/5 rounded-2xl p-3 space-y-1">
                <span className="text-[10px] text-gray-500 uppercase font-mono block">TOTAL REGISTRY POINTS</span>
                <span className="text-lg font-black text-red-500 font-mono">{item.points}</span>
                <div className="flex justify-between text-[11px] text-gray-400 font-mono pt-1 border-t border-white/5">
                  <span>{item.setsCompleted} Set Selesai</span>
                  <span className="text-amber-400 font-bold">{item.gemMint10Count} Gem Mint 10</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 3. SEARCH & FILTER CONTROLS                                               */}
        {/* ========================================================================= */}
        <div className="bg-[#12151C] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari username atau nama kolektor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#15181F] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500/60 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            
            {/* TCG Category Switcher */}
            <div className="flex items-center gap-1 bg-[#15181F] p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setTcgCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  tcgCategory === 'all' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Semua TCG
              </button>
              <button
                onClick={() => setTcgCategory('pokemon')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  tcgCategory === 'pokemon' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Pokémon
              </button>
              <button
                onClick={() => setTcgCategory('onepiece')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  tcgCategory === 'onepiece' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                One Piece
              </button>
              <button
                onClick={() => setTcgCategory('yugioh')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  tcgCategory === 'yugioh' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Yu-Gi-Oh!
              </button>
            </div>

            {/* Timeframe Switcher */}
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
              className="bg-[#15181F] border border-white/10 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-red-500/60"
            >
              <option value="season2026">Season 2026</option>
              <option value="alltime">All Time (Sepanjang Masa)</option>
              <option value="monthly">Bulan Ini</option>
            </select>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. FULL LEADERBOARD TABLE                                                 */}
        {/* ========================================================================= */}
        <div className="bg-[#12151C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-[#15181F]">
                  <th className="py-4 px-6 text-center">RANK</th>
                  <th className="py-4 px-6">KOLEKTOR</th>
                  <th className="py-4 px-6 text-center">KATEGORI UTAMA</th>
                  <th className="py-4 px-6 text-center">SET SELESAI</th>
                  <th className="py-4 px-6 text-center">GEM MINT 10 SLAB</th>
                  <th className="py-4 px-6 text-right">TOTAL REGISTRY POINTS</th>
                  <th className="py-4 px-6 text-right">PROFIL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredLeaderboard.map((row) => (
                  <tr key={row.rank} className="hover:bg-white/5 transition-colors">
                    
                    {/* Rank Number */}
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-xl font-black text-xs border ${
                          row.rank === 1
                            ? 'text-amber-400 bg-amber-500/10 border-amber-500/40'
                            : row.rank === 2
                            ? 'text-gray-300 bg-gray-500/10 border-gray-500/30'
                            : row.rank === 3
                            ? 'text-amber-700 bg-amber-900/20 border-amber-800/40'
                            : 'text-gray-400 bg-white/5 border-white/10'
                        }`}
                      >
                        {row.rank}
                      </span>
                    </td>

                    {/* Collector Name & Username */}
                    <td className="py-4 px-6 font-sans">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-red-600/20 text-red-500 border border-red-500/30 font-bold flex items-center justify-center shrink-0">
                          {row.username.charAt(1).toUpperCase()}
                        </div>
                        <div>
                          <strong className="text-white font-bold flex items-center gap-1.5">
                            {row.username}
                            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                          </strong>
                          <span className="text-[11px] text-gray-500 block font-normal">{row.name}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category Tag */}
                    <td className="py-4 px-6 text-center font-sans font-semibold">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 bg-[#15181F] px-2.5 py-1 rounded-md border border-white/5">
                        {row.category}
                      </span>
                    </td>

                    {/* Completed Sets */}
                    <td className="py-4 px-6 text-center text-gray-300 font-bold">
                      {row.completedSets} Set
                    </td>

                    {/* Gem Mint 10 Slabs */}
                    <td className="py-4 px-6 text-center text-amber-400 font-bold">
                      {row.gem10Count} Slabs
                    </td>

                    {/* Total Points */}
                    <td className="py-4 px-6 text-right font-black text-red-400 text-sm">
                      {row.points}
                    </td>

                    {/* Action Link */}
                    <td className="py-4 px-6 text-right font-sans">
                      <Link
                        href={`/set-registry/user/${row.username.replace('@', '')}`}
                        className="text-xs font-bold text-gray-400 hover:text-white inline-flex items-center gap-1 bg-[#15181F] hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Vault <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. SCORING METHODOLOGY EXPLANATION CARD                                   */}
        {/* ========================================================================= */}
        <div className="bg-[#12151C] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" /> METODOLOGI SKOR REGISTRY ICS
          </div>

          <h3 className="text-xl font-extrabold text-white">Bagaimana Poin Klasemen Dihitung?</h3>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-4xl">
            Skor total kolektor dihitung secara komputasional berdasarkan 3 variabel utama:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
            <div className="bg-[#15181F] border border-white/5 rounded-2xl p-4 space-y-1">
              <span className="font-bold text-white block">1. Weighted Grade Value</span>
              <p className="text-gray-400">
                Nilai grade kartu (ICS 10 mendapat bobot poin tertinggi dibanding Grade 9.5 atau 9.0).
              </p>
            </div>

            <div className="bg-[#15181F] border border-white/5 rounded-2xl p-4 space-y-1">
              <span className="font-bold text-white block">2. Set Completion Bonus</span>
              <p className="text-gray-400">
                Bonus multiplicator poin jika kolektor berhasil melengkapi 100% kartu dalam satu set rilis resmi.
              </p>
            </div>

            <div className="bg-[#15181F] border border-white/5 rounded-2xl p-4 space-y-1">
              <span className="font-bold text-white block">3. Card Rarity Weight</span>
              <p className="text-gray-400">
                Kartu ber-rarity Secret Rare (SR), Alternate Art (SAR), atau Promo Event memiliki multiplier poin lebih besar.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}