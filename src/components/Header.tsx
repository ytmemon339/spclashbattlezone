import React, { useState } from 'react';
import { 
  Flame, 
  Wallet as WalletIcon, 
  Plus, 
  Volume2, 
  VolumeX, 
  User, 
  Menu, 
  X,
  ShieldCheck,
  Trophy,
  Globe
} from 'lucide-react';
import { useTournament } from '../context/TournamentContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, openProfile }) => {
  const { wallet, soundEnabled, toggleSound, openDepositModal, openWithdrawalModal } = useTournament();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'tournaments', label: 'PK Tournaments' },
    { id: 'my-matches', label: 'My Matches' },
    { id: 'wallet', label: 'Wallet & Payouts' },
    { id: 'rules', label: 'Point System & Rules' },
    { id: 'support', label: 'Support & FAQs' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Strict 3-zone Header Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => { setActiveTab('tournaments'); }}
          className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20">
            <Flame className="w-5 h-5 fill-slate-950 stroke-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">
              SP Clash Battle Zone
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                  isActive 
                    ? 'text-emerald-400 border-emerald-400 font-semibold' 
                    : 'border-transparent hover:text-slate-100 hover:border-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Wallet Quick Info, Server Badge & Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Server Badge (Pakistan) */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PK SERVER</span>
          </div>

          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors"
            aria-label="Toggle sound effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Wallet summary button */}
          <button
            onClick={() => setActiveTab('wallet')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <WalletIcon className="w-4 h-4 text-emerald-400" />
            <div className="text-left text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Balance</span>
              <span className="font-mono font-bold text-slate-100 tabular-nums">
                Rs. {wallet.totalBalance.toLocaleString()}
              </span>
            </div>
          </button>

          {/* Primary Action Button: Deposit */}
          <button
            onClick={() => openDepositModal(250)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg hover:from-emerald-300 hover:to-teal-300 transition-all shadow-md shadow-emerald-500/10 active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Deposit</span>
          </button>

          {/* Profile button */}
          <button
            onClick={openProfile}
            title="My Gaming Profile"
            className="p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-4 space-y-2">
          {/* Wallet summary mobile */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <WalletIcon className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-slate-400 text-xs block">Wallet (PK Server)</span>
                <span className="text-white font-mono font-bold text-sm">Rs. {wallet.totalBalance}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); openDepositModal(250); }}
                className="px-3 py-1 bg-emerald-400 text-slate-950 font-bold text-xs rounded-md"
              >
                Deposit
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); openWithdrawalModal(); }}
                className="px-3 py-1 bg-slate-800 text-slate-200 font-semibold text-xs rounded-md border border-slate-700"
              >
                Withdraw
              </button>
            </div>
          </div>

          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === item.id 
                  ? 'bg-emerald-500/10 text-emerald-400 font-semibold' 
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
