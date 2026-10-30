import React from 'react';
import { Flame, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openDeposit: () => void;
  openWithdraw: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openDeposit, openWithdraw }) => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Flame className="w-3.5 h-3.5 fill-emerald-400" />
              </div>
              <span className="font-display font-bold text-base text-white tracking-wider uppercase">
                SP Clash Battle Zone
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/30">
                PK SERVER
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Pakistan's premier competitive Free Fire esports platform. Play daily Battle Royale & Clash Squad matches with instant automated OPay, JazzCash & Easypaisa payments in PKR.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs font-medium">
            <div>
              <span className="text-slate-300 font-semibold block mb-2 font-mono uppercase text-[10px] tracking-wider">
                PK Platform
              </span>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={() => setActiveTab('tournaments')} className="hover:text-emerald-400 transition-colors">
                    PK Tournaments
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('my-matches')} className="hover:text-emerald-400 transition-colors">
                    My Passes & Slots
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('wallet')} className="hover:text-emerald-400 transition-colors">
                    Wallet (PKR)
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-slate-300 font-semibold block mb-2 font-mono uppercase text-[10px] tracking-wider">
                Payments
              </span>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={openDeposit} className="hover:text-emerald-400 transition-colors">
                    OPay QR Deposit
                  </button>
                </li>
                <li>
                  <button onClick={openWithdraw} className="hover:text-emerald-400 transition-colors">
                    JazzCash & Easypaisa Payout
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('wallet')} className="hover:text-emerald-400 transition-colors">
                    PKR Receipts
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-slate-300 font-semibold block mb-2 font-mono uppercase text-[10px] tracking-wider">
                Rules & Help
              </span>
              <ul className="space-y-1.5">
                <li>
                  <button onClick={() => setActiveTab('rules')} className="hover:text-emerald-400 transition-colors">
                    Esports Point System
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('rules')} className="hover:text-emerald-400 transition-colors">
                    Anti-Cheat Protocol
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('support')} className="hover:text-emerald-400 transition-colors">
                    Pakistan WhatsApp Desk
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Skill-Based Esports Tournament Platform in Pakistan. 18+ Players Only.</span>
          </div>
          <div>
            © 2026 SP Clash Battle Zone Pakistan. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
