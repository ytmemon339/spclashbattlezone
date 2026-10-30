import React, { useState } from 'react';
import { 
  X, 
  ArrowUpRight, 
  Building2, 
  Smartphone, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  Clock,
  QrCode,
  Zap
} from 'lucide-react';
import { useTournament } from '../context/TournamentContext';

export const WithdrawalModal: React.FC = () => {
  const { 
    withdrawalModalOpen, 
    closeWithdrawalModal, 
    wallet, 
    withdrawFunds 
  } = useTournament();

  const [method, setMethod] = useState<'OPAY' | 'JAZZCASH' | 'EASYPAISA' | 'RAAST' | 'BANK'>('OPAY');
  const [amount, setAmount] = useState<number>(Math.min(250, wallet.winningsBalance > 50 ? wallet.winningsBalance : 50));
  
  // OPay fields
  const [opayNumber, setOpayNumber] = useState('03001234567');
  
  // JazzCash fields
  const [jazzcashNumber, setJazzcashNumber] = useState('03001234567');
  
  // Easypaisa fields
  const [easypaisaNumber, setEasypaisaNumber] = useState('03001234567');

  // Raast fields
  const [raastId, setRaastId] = useState('03001234567');

  // Bank fields
  const [bankName, setBankName] = useState('Meezan Bank');
  const [accountNumber, setAccountNumber] = useState('');
  const [holderName, setHolderName] = useState('Muhammad Shabbir Hussain');

  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  if (!withdrawalModalOpen) return null;

  const handleMaxAmount = () => {
    setAmount(wallet.winningsBalance);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (amount < 50) {
      setStatusMsg({ type: 'error', text: 'Minimum withdrawal is Rs. 50' });
      return;
    }

    if (amount > wallet.winningsBalance) {
      setStatusMsg({ 
        type: 'error', 
        text: `Cannot withdraw more than available Winnings balance (Rs. ${wallet.winningsBalance})` 
      });
      return;
    }

    let destinationDetail = '';
    if (method === 'OPAY') {
      if (!opayNumber || opayNumber.length < 10) {
        setStatusMsg({ type: 'error', text: 'Please enter a valid 11-digit OPay account/mobile number' });
        return;
      }
      destinationDetail = opayNumber.trim();
    } else if (method === 'JAZZCASH') {
      if (!jazzcashNumber || jazzcashNumber.length < 10) {
        setStatusMsg({ type: 'error', text: 'Please enter a valid JazzCash mobile number (03xx-xxxxxxx)' });
        return;
      }
      destinationDetail = jazzcashNumber.trim();
    } else if (method === 'EASYPAISA') {
      if (!easypaisaNumber || easypaisaNumber.length < 10) {
        setStatusMsg({ type: 'error', text: 'Please enter a valid Easypaisa mobile number (03xx-xxxxxxx)' });
        return;
      }
      destinationDetail = easypaisaNumber.trim();
    } else if (method === 'RAAST') {
      if (!raastId || raastId.length < 10) {
        setStatusMsg({ type: 'error', text: 'Please enter a valid Raast ID or IBAN' });
        return;
      }
      destinationDetail = raastId.trim();
    } else {
      if (!accountNumber || accountNumber.length < 8) {
        setStatusMsg({ type: 'error', text: 'Please provide valid Pakistani Bank Account Number / IBAN' });
        return;
      }
      destinationDetail = `${bankName}: ${accountNumber}`;
    }

    setIsLoading(true);

    const res = await withdrawFunds({
      amount,
      method,
      destinationDetail,
      holderName,
      bankName,
    });

    setIsLoading(false);

    if (res.success) {
      setStatusMsg({ type: 'success', text: res.message });
      setTimeout(() => {
        closeWithdrawalModal();
      }, 1500);
    } else {
      setStatusMsg({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                  Withdraw Winnings
                </h3>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30 uppercase font-mono">
                  Pakistan (PK)
                </span>
              </div>
              <p className="text-xs text-slate-400">Instant OPay, JazzCash, Easypaisa & Raast Payout</p>
            </div>
          </div>

          <button
            onClick={closeWithdrawalModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5">
          {/* Winnings balance banner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block mb-0.5">Available Winnings Balance</span>
              <span className="font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                Rs. {wallet.winningsBalance.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              onClick={handleMaxAmount}
              disabled={wallet.winningsBalance <= 0}
              className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-lg transition-colors"
            >
              Withdraw Max
            </button>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
              Withdrawal Amount (Min Rs. 50)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-base font-bold text-emerald-400">
                Rs.
              </span>
              <input
                type="number"
                min="50"
                max={wallet.winningsBalance}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-12 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-lg font-bold text-white focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
          </div>

          {/* Method tabs */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
              Select Pakistan Payout Method
            </label>
            <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-3 sm:grid-cols-5 gap-1 text-[11px]">
              <button
                type="button"
                onClick={() => setMethod('OPAY')}
                className={`py-2 px-1 font-medium rounded-lg flex items-center justify-center gap-1 transition-colors ${
                  method === 'OPAY'
                    ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>OPay</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('JAZZCASH')}
                className={`py-2 px-1 font-medium rounded-lg flex items-center justify-center gap-1 transition-colors ${
                  method === 'JAZZCASH'
                    ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>JazzCash</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('EASYPAISA')}
                className={`py-2 px-1 font-medium rounded-lg flex items-center justify-center gap-1 transition-colors ${
                  method === 'EASYPAISA'
                    ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Easypaisa</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('RAAST')}
                className={`py-2 px-1 font-medium rounded-lg flex items-center justify-center gap-1 transition-colors ${
                  method === 'RAAST'
                    ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Raast</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('BANK')}
                className={`py-2 px-1 font-medium rounded-lg flex items-center justify-center gap-1 transition-colors ${
                  method === 'BANK'
                    ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Bank</span>
              </button>
            </div>
          </div>

          {/* Inputs based on method */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            {method === 'OPAY' && (
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  OPay Wallet / Mobile Account Number
                </label>
                <input
                  type="text"
                  value={opayNumber}
                  onChange={(e) => setOpayNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 03001234567"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-400"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Direct instant transfer to your OPay Pakistan account.
                </span>
              </div>
            )}

            {method === 'JAZZCASH' && (
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  JazzCash Mobile Account Number
                </label>
                <input
                  type="text"
                  maxLength={11}
                  value={jazzcashNumber}
                  onChange={(e) => setJazzcashNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="03001234567"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-400"
                />
              </div>
            )}

            {method === 'EASYPAISA' && (
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  Easypaisa Mobile Account Number
                </label>
                <input
                  type="text"
                  maxLength={11}
                  value={easypaisaNumber}
                  onChange={(e) => setEasypaisaNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="03001234567"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-400"
                />
              </div>
            )}

            {method === 'RAAST' && (
              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">
                  Raast ID (Phone Number or IBAN)
                </label>
                <input
                  type="text"
                  value={raastId}
                  onChange={(e) => setRaastId(e.target.value)}
                  placeholder="e.g. 03001234567 or PK00MEZN..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-400"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  State Bank of Pakistan Raast Instant Free P2P Network.
                </span>
              </div>
            )}

            {method === 'BANK' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Bank Name
                    </label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="Meezan Bank">Meezan Bank</option>
                      <option value="HBL">Habib Bank Limited (HBL)</option>
                      <option value="Bank Alfalah">Bank Alfalah</option>
                      <option value="UBL">United Bank Limited (UBL)</option>
                      <option value="Allied Bank">Allied Bank (ABL)</option>
                      <option value="MCB">MCB Bank</option>
                      <option value="Faysal Bank">Faysal Bank</option>
                      <option value="OPay Microfinance">OPay Microfinance Bank</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Account Title
                    </label>
                    <input
                      type="text"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value)}
                      placeholder="Account Title"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">
                    Account Number / IBAN
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="e.g. 01020304050607 or PK36MEZN..."
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Fee & Net Payout Summary */}
          <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Withdrawal Amount</span>
              <span className="font-mono tabular-nums text-slate-200">Rs. {amount || 0}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Transfer Fee / Taxes</span>
              <span className="font-mono tabular-nums text-emerald-400">Rs. 0 (Free Promo)</span>
            </div>
            <div className="flex justify-between text-white font-bold pt-1.5 border-t border-slate-800">
              <span>Net Credit to Account</span>
              <span className="font-mono text-emerald-400 tabular-nums font-bold">Rs. {amount || 0} PKR</span>
            </div>
          </div>

          {/* Status Message */}
          {statusMsg && (
            <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              statusMsg.type === 'error'
                ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
            }`}>
              {statusMsg.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading || wallet.winningsBalance < 50}
            className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Clock className="w-4 h-4 animate-spin text-slate-950" />
                <span>Processing Instant Payout...</span>
              </>
            ) : (
              <>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                <span>Confirm Withdrawal of Rs. {amount}</span>
              </>
            )}
          </button>

          {/* Guarantee */}
          <div className="flex items-center justify-center gap-2 text-slate-500 text-[11px] pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Instant Pakistan Automated Payout · 24x7 Settlement</span>
          </div>
        </form>
      </div>
    </div>
  );
};
