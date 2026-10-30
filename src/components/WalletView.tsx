import React, { useState } from 'react';
import { 
  Wallet as WalletIcon, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  Zap,
  HelpCircle,
  Building2,
  QrCode
} from 'lucide-react';
import { useTournament } from '../context/TournamentContext';
import { Transaction, TransactionType } from '../types/tournament';

export const WalletView: React.FC = () => {
  const { 
    wallet, 
    transactions, 
    openDepositModal, 
    openWithdrawalModal, 
    openReceiptModal 
  } = useTournament();

  const [filterType, setFilterType] = useState<string>('ALL');

  const filterTabs = [
    { id: 'ALL', label: 'All Transactions' },
    { id: 'DEPOSIT', label: 'Deposits (OPay/JC)' },
    { id: 'WITHDRAWAL', label: 'Withdrawals' },
    { id: 'MATCH_ENTRY', label: 'Match Entries' },
    { id: 'PRIZE_WIN', label: 'Prizes & Rewards' },
  ];

  const filteredTransactions = transactions.filter(tx => {
    if (filterType === 'ALL') return true;
    if (filterType === 'DEPOSIT') return tx.type === 'DEPOSIT';
    if (filterType === 'WITHDRAWAL') return tx.type === 'WITHDRAWAL';
    if (filterType === 'MATCH_ENTRY') return tx.type === 'MATCH_ENTRY';
    if (filterType === 'PRIZE_WIN') return tx.type === 'PRIZE_WIN' || tx.type === 'KILL_BONUS';
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Wallet Balance Quad Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Balance */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Total Balance (PKR)</span>
            <WalletIcon className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-white tabular-nums mb-3">
            Rs. {wallet.totalBalance.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => openDepositModal(250)}
              className="flex-1 py-1.5 px-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Deposit</span>
            </button>
            <button
              onClick={openWithdrawalModal}
              className="flex-1 py-1.5 px-3 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>

        {/* Card 2: Winnings Balance */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider text-emerald-400">Winnings Cash</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-emerald-400 tabular-nums mb-1">
            Rs. {wallet.winningsBalance.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            Withdrawable to OPay, JazzCash, Easypaisa, Raast
          </p>
          <button
            onClick={openWithdrawalModal}
            disabled={wallet.winningsBalance < 50}
            className="w-full py-1.5 px-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Instant Payout (Min Rs. 50)</span>
          </button>
        </div>

        {/* Card 3: Deposit Balance */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Deposit Cash</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-white tabular-nums mb-1">
            Rs. {wallet.depositBalance.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            Use for tournament entry passes on PK Server
          </p>
          <button
            onClick={() => openDepositModal(500)}
            className="w-full py-1.5 px-3 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            + Quick Deposit Rs. 500
          </button>
        </div>

        {/* Card 4: Quick Topup */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 relative overflow-hidden shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <QrCode className="w-4 h-4" />
              <span>OPay QR Top-Up</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
              Scan Muhammad Shabbir Hussain's OPay QR code or pay with JazzCash / Easypaisa.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[250, 500, 1000].map(amt => (
              <button
                key={amt}
                onClick={() => openDepositModal(amt)}
                className="py-1.5 text-xs font-mono font-bold bg-slate-950/80 hover:bg-emerald-400 hover:text-slate-950 text-white rounded-lg border border-slate-800 transition-colors"
              >
                +Rs. {amt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-white uppercase tracking-wider">
              Payment & Pass History (Pakistan)
            </h3>
            <p className="text-xs text-slate-400">All deposits, withdrawals, and tournament payouts</p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  filterType === tab.id
                    ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          {filteredTransactions.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                <tr>
                  <th className="py-3 px-4 font-semibold">Transaction Details</th>
                  <th className="py-3 px-4 font-semibold">Type</th>
                  <th className="py-3 px-4 font-semibold">Method / Gateway</th>
                  <th className="py-3 px-4 font-semibold text-right">Amount (PKR)</th>
                  <th className="py-3 px-4 font-semibold text-center">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredTransactions.map(tx => {
                  const isCredit = tx.type === 'DEPOSIT' || tx.type === 'PRIZE_WIN' || tx.type === 'KILL_BONUS';
                  return (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Details & Timestamp */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-xs">{tx.note || tx.tournamentTitle || 'Payment'}</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {new Date(tx.timestamp).toLocaleString('en-PK', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })} · {tx.referenceId}
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4 font-mono text-[11px] uppercase text-slate-300">
                        {tx.type.replace('_', ' ')}
                      </td>

                      {/* Payment Method */}
                      <td className="py-3.5 px-4 text-slate-300">
                        <span>{tx.paymentMethod}</span>
                        {tx.utrNumber && (
                          <span className="block text-[10px] text-emerald-400/80 font-mono">TRX: {tx.utrNumber}</span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-4 text-right">
                        <span className={`font-mono text-sm font-bold tabular-nums ${
                          isCredit ? 'text-emerald-400' : 'text-slate-100'
                        }`}>
                          {isCredit ? '+' : '-'}Rs. {tx.amount.toLocaleString()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded ${
                          tx.status === 'COMPLETED' 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                        }`}>
                          {tx.status}
                        </span>
                      </td>

                      {/* Receipt Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => openReceiptModal(tx)}
                          className="px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors inline-flex items-center gap-1 font-mono"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Receipt</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              No transactions found in this category.
            </div>
          )}
        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">Instant 60-Sec Payouts in Pakistan</span>
            <span className="text-slate-400">Direct transfer to OPay, JazzCash, Easypaisa, Raast</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">Official OPay QR Gateway</span>
            <span className="text-slate-400">Zero deposit fees via verified OPay account</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-teal-400 shrink-0" />
          <div>
            <span className="font-bold text-white block">24x7 WhatsApp Pakistan Support</span>
            <span className="text-slate-400">Direct referee chat and room ID assistance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
