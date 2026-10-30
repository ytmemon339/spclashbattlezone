import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Printer, 
  Share2, 
  ShieldCheck, 
  Flame,
  ArrowDownLeft,
  ArrowUpRight
} from 'lucide-react';
import { useTournament } from '../context/TournamentContext';

export const ReceiptModal: React.FC = () => {
  const { selectedReceiptTx, closeReceiptModal } = useTournament();

  if (!selectedReceiptTx) return null;
  const tx = selectedReceiptTx;

  const isDeposit = tx.type === 'DEPOSIT' || tx.type === 'PRIZE_WIN' || tx.type === 'KILL_BONUS';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Receipt Top Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Flame className="w-4 h-4 fill-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-white uppercase tracking-wider text-sm">
                SP Clash Battle Zone
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Pakistan Server (PK)</span>
            </div>
          </div>

          <button
            onClick={closeReceiptModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Body */}
        <div className="p-6 space-y-6">
          {/* Status Icon & Amount */}
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
              {tx.type.replace('_', ' ')} (PKR)
            </span>
            <div className="font-mono text-3xl font-extrabold text-white tabular-nums">
              {isDeposit ? '+' : '-'}Rs. {tx.amount.toLocaleString()}
            </div>
            <span className="inline-block text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full mt-1">
              Transaction Successful · PK Server
            </span>
          </div>

          {/* Details Table */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5 text-xs font-mono">
            <div className="flex justify-between items-center text-slate-400">
              <span>Receipt Ref</span>
              <span className="text-slate-200 font-bold">{tx.referenceId}</span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <span>Timestamp</span>
              <span className="text-slate-200">
                {new Date(tx.timestamp).toLocaleString('en-PK', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })} (PKT)
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <span>Payment Mode</span>
              <span className="text-slate-200">{tx.paymentMethod}</span>
            </div>

            {tx.utrNumber && (
              <div className="flex justify-between items-center text-slate-400">
                <span>TRX / TID</span>
                <span className="text-emerald-400 font-bold">{tx.utrNumber}</span>
              </div>
            )}

            {tx.tournamentTitle && (
              <div className="flex justify-between items-center text-slate-400">
                <span>Tournament</span>
                <span className="text-slate-200 truncate max-w-[180px] font-sans">{tx.tournamentTitle}</span>
              </div>
            )}

            {tx.note && (
              <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-slate-900">
                <span>Remark</span>
                <span className="text-slate-300 font-sans text-[11px]">{tx.note}</span>
              </div>
            )}
          </div>

          {/* Bottom actions */}
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={closeReceiptModal}
              className="flex-1 py-2.5 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Digitally verified by SP Clash Battle Zone Pakistan Server</span>
          </div>
        </div>
      </div>
    </div>
  );
};
