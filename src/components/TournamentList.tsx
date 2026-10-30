import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, RefreshCw, Crosshair, ShieldAlert } from 'lucide-react';
import { TournamentCard } from './TournamentCard';
import { useTournament } from '../context/TournamentContext';
import { Tournament, GameMode, MapType, TournamentStatus } from '../types/tournament';

export const TournamentList: React.FC = () => {
  const { tournaments } = useTournament();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedMap, setSelectedMap] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { label: string; value: string; badge?: string }[] = [
    { label: 'All 48-Player Matches', value: 'ALL' },
    { label: 'Per-Kill BR (Rs. 50 Entry · Rs. 35/Kill)', value: 'PER_KILL', badge: '5 Matches' },
    { label: 'Survivor Matches (Rs. 20 Entry · Rs. 400 Pool)', value: 'SURVIVOR', badge: '5 Matches' },
  ];

  const maps: { label: string; value: string }[] = [
    { label: 'All Maps', value: 'ALL' },
    { label: 'Bermuda', value: 'Bermuda' },
    { label: 'Purgatory', value: 'Purgatory' },
    { label: 'Kalahari', value: 'Kalahari' },
    { label: 'Alpine', value: 'Alpine' },
    { label: 'NexTerra', value: 'NexTerra' },
  ];

  const filteredTournaments = useMemo(() => {
    return tournaments.filter((t: Tournament) => {
      // Category filter
      const matchesCategory = 
        selectedCategory === 'ALL' ||
        (selectedCategory === 'PER_KILL' && t.perKill === 35 && t.entryFee === 50) ||
        (selectedCategory === 'SURVIVOR' && t.entryFee === 20 && t.prizePool === 400);

      // Map filter
      const matchesMap = selectedMap === 'ALL' || t.map.toLowerCase() === selectedMap.toLowerCase();

      // Search filter
      const matchesSearch = 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.map.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesMap && matchesSearch;
    });
  }, [tournaments, selectedCategory, selectedMap, searchQuery]);

  return (
    <section id="tournaments-section" className="mb-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
              Pakistan 48-Player Free Fire Tournaments
            </h2>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
              PK SERVER
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span>5x Per-Kill (Rs. 50 Entry · Rs. 35/Kill)</span>
            <span aria-hidden="true">·</span>
            <span>5x Survivor (Rs. 20 Entry · Rs. 400 Pool)</span>
            <span aria-hidden="true">·</span>
            <span>OPay & JazzCash Instant Payouts</span>
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search map or match..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col gap-3 mb-8 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
        {/* Tournament Type / Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-medium mr-1">Format:</span>
          {categories.map(c => {
            const isActive = selectedCategory === c.value;
            return (
              <button
                key={c.value}
                onClick={() => setSelectedCategory(c.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{c.label}</span>
                {c.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {c.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Map Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/60">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono font-medium mr-2">Map:</span>
          {maps.map(mapItem => {
            const isActive = selectedMap === mapItem.value;
            return (
              <button
                key={mapItem.value}
                onClick={() => setSelectedMap(mapItem.value)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-700 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                {mapItem.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tournaments Grid */}
      {filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament: Tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-xl bg-slate-900/50 border border-slate-800">
          <p className="text-slate-400 text-sm mb-4">No tournaments found matching the selected filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedMap('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};
