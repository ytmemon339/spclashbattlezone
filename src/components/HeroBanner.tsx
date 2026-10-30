import React from 'react';
import { Trophy, Shield, Zap, ArrowRight, Crosshair, QrCode } from 'lucide-react';
import { useTournament } from '../context/TournamentContext';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  const { openDepositModal } = useTournament();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 mb-10 shadow-2xl">
      {/* Background Image with contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_esports_ff_arena_1793371567181.jpg"
          alt="SP Clash Battle Zone Free Fire Arena"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl p-6 sm:p-10 lg:p-12">
        {/* Subtle, unboxed metadata indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-3">
          <span>Free Fire Pakistan Server (PK)</span>
          <span aria-hidden="true">·</span>
          <span>OPay & JazzCash Instant Gateways</span>
          <span aria-hidden="true">·</span>
          <span>Daily Tournaments</span>
        </div>

        {/* Refined Headline with text-wrap balance */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-wide uppercase leading-tight mb-4 [text-wrap:balance]">
          Pakistan's #1 Free Fire Battles. <br className="hidden sm:inline"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">
            Real Cash Rewards in PKR.
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
          Compete in daily Battle Royale (Bermuda, Purgatory, Kalahari) and Clash Squad 4v4 on Pakistan Server. 
          Instant automated deposits with <strong className="text-emerald-400">OPay QR</strong>, JazzCash, Easypaisa, and 60-second withdrawals to any Pakistani account.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl hover:from-emerald-300 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] whitespace-nowrap"
          >
            <Crosshair className="w-4 h-4 stroke-[2.5]" />
            <span>Join PK Tournament</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => openDepositModal(500)}
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl transition-colors whitespace-nowrap backdrop-blur-sm"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span>Deposit via OPay QR / JazzCash</span>
          </button>
        </div>

        {/* 4-column KPI Strip adhering to spatial guidelines */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
          <div>
            <span className="block text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
              Rs. 1,500,000+
            </span>
            <span className="text-xs text-slate-400 font-medium">PKR Disbursed</span>
          </div>

          <div>
            <span className="block text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
              15,000+
            </span>
            <span className="text-xs text-slate-400 font-medium">Pakistani Warriors</span>
          </div>

          <div>
            <span className="block text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              60 Seconds
            </span>
            <span className="text-xs text-slate-400 font-medium">OPay / JazzCash Payouts</span>
          </div>

          <div>
            <span className="block text-xl sm:text-2xl font-bold font-mono text-teal-400 tabular-nums">
              PK Server
            </span>
            <span className="text-xs text-slate-400 font-medium">Low Ping Custom Lobbies</span>
          </div>
        </div>
      </div>
    </div>
  );
};
