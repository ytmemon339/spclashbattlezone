import React, { useState, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  ArrowRight,
  Smartphone,
  CreditCard,
  Building2,
  ExternalLink
} from 'lucide-react';
import { useTournament } from '../context/TournamentContext';

export const DepositModal: React.FC = () => {
  const { 
    depositModalOpen, 
    closeDepositModal, 
    depositFunds, 
    depositPrefillAmount 
  } = useTournament();

  const [amount, setAmount] = useState<number>(depositPrefillAmount || 250);
  const [selectedMethod, setSelectedMethod] = useState<'OPAY_QR' | 'JAZZCASH_EASYPAISA' | 'RAAST_BANK'>('OPAY_QR');
  const [trxId, setTrxId] = useState('');
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const accountTitle = 'Muhammad Shabbir Hussain';
  const opayAccount = 'Muhammad Shabbir Hussain (OPay)';

  useEffect(() => {
    if (depositPrefillAmount) {
      setAmount(depositPrefillAmount);
    }
  }, [depositPrefillAmount]);

  if (!depositModalOpen) return null;

  const quickAmounts = [100, 250, 500, 1000, 2000, 5000];

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(accountTitle);
    setCopiedTitle(true);
    setTimeout(() => setCopiedTitle(false), 2000);
  };

  const handleTrxSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId || trxId.trim().length < 6) {
      setErrorMsg('Please enter a valid Transaction / TRX ID from your OPay, JazzCash, or Easypaisa app.');
      return;
    }
    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(async () => {
      await depositFunds({
        amount: Number(amount),
        paymentMethod: `OPay QR - ${accountTitle}`,
        utrNumber: trxId.trim(),
      });
      setIsVerifying(false);
      closeDepositModal();
    }, 1200);
  };

  const handleSandboxInstantPay = async () => {
    setIsVerifying(true);
    setTimeout(async () => {
      await depositFunds({
        amount: Number(amount),
        paymentMethod: selectedMethod === 'OPAY_QR' 
          ? 'OPay QR Instant Verified' 
          : selectedMethod === 'JAZZCASH_EASYPAISA'
          ? 'JazzCash / Easypaisa Instant'
          : 'Raast Fast Pay',
        utrNumber: `PK-TRX-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      });
      setIsVerifying(false);
      closeDepositModal();
    }, 800);
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
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                  Deposit Funds
                </h3>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30 uppercase font-mono">
                  Pakistan PK
                </span>
              </div>
              <p className="text-xs text-slate-400">Official OPay, JazzCash & Easypaisa Gateway</p>
            </div>
          </div>

          <button
            onClick={closeDepositModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Amount Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
              Select or Enter Amount (PKR Rs.)
            </label>
            <div className="relative mb-3">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-base font-bold text-emerald-400">
                Rs.
              </span>
              <input
                type="number"
                min="50"
                max="100000"
                value={amount}
                onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                className="w-full pl-12 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-lg font-bold text-white focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>

            {/* Quick Amount Chips */}
            <div className="grid grid-cols-6 gap-1.5">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className={`py-1.5 text-xs font-mono font-bold rounded-lg border transition-all ${
                    amount === amt
                      ? 'bg-emerald-400 text-slate-950 border-emerald-400 shadow-sm'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  +{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => setSelectedMethod('OPAY_QR')}
              className={`py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                selectedMethod === 'OPAY_QR'
                  ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>OPay QR</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('JAZZCASH_EASYPAISA')}
              className={`py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                selectedMethod === 'JAZZCASH_EASYPAISA'
                  ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>JazzCash / EP</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('RAAST_BANK')}
              className={`py-2 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                selectedMethod === 'RAAST_BANK'
                  ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Raast / Bank</span>
            </button>
          </div>

          {/* Tab 1: User's Official OPay QR Code Display */}
          {selectedMethod === 'OPAY_QR' && (
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4 text-center">
              <div className="flex flex-col items-center">
                {/* Official User Uploaded OPay QR Code Image */}
                <div className="relative p-2 bg-emerald-500 rounded-2xl shadow-xl inline-block max-w-[220px]">
                  <img
                    src="/public/assets/aistudio/OPayMyCode_0.0_1793372303867_78da8e53.jpg"
                    alt="OPay QR Code - Muhammad Shabbir Hussain"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto rounded-xl object-contain shadow-md"
                    onError={(e) => {
                      // Fallback path if public prefix differs in Vite
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('opay_qr_code.jpg')) {
                        target.src = '/src/assets/images/opay_qr_code.jpg';
                      }
                    }}
                  />
                </div>

                <div className="mt-3">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-mono">
                    Official OPay Account Holder
                  </span>
                  <div className="font-display text-lg font-bold text-white tracking-wide">
                    {accountTitle}
                  </div>
                  <div className="text-xs text-emerald-400 font-mono font-semibold mt-0.5">
                    Pay: Rs. {amount.toLocaleString()} PKR
                  </div>
                </div>
              </div>

              {/* Copy Account Title */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                <span className="font-mono text-slate-300 truncate mr-2">{accountTitle} (OPay)</span>
                <button
                  type="button"
                  onClick={handleCopyTitle}
                  className="flex items-center gap-1 px-2.5 py-1 text-slate-950 font-bold bg-emerald-400 hover:bg-emerald-300 rounded text-[11px] transition-colors shrink-0"
                >
                  {copiedTitle ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTitle ? 'Copied' : 'Copy Title'}</span>
                </button>
              </div>

              {/* TRX ID Verification Form */}
              <form onSubmit={handleTrxSubmit} className="pt-2 border-t border-slate-800/80 text-left">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Enter OPay / Bank Transaction (TRX) ID:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={20}
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value.replace(/[^0-9a-zA-Z]/g, ''))}
                    placeholder="e.g. 928394810239"
                    className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
                  >
                    {isVerifying ? 'Verifying...' : 'Submit TRX'}
                  </button>
                </div>
                {errorMsg && <p className="text-red-400 text-[11px] mt-1.5">{errorMsg}</p>}
                <p className="text-[10px] text-slate-500 mt-1">
                  Scan the OPay QR with your OPay App, Easypaisa, or JazzCash scanner and paste the TID.
                </p>
              </form>
            </div>
          )}

          {/* Tab 2: JazzCash & Easypaisa */}
          {selectedMethod === 'JAZZCASH_EASYPAISA' && (
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <span className="text-xs text-slate-300 block font-medium">
                Direct Mobile Wallet Transfer (Pakistan):
              </span>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-orange-400 uppercase font-mono block">JazzCash</span>
                    <span className="text-xs font-bold text-white font-mono">0300-1234567</span>
                    <span className="text-[11px] text-slate-400 block font-sans">Title: {accountTitle}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyTitle}
                    className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium"
                  >
                    Copy
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-mono block">Easypaisa</span>
                    <span className="text-xs font-bold text-white font-mono">0300-1234567</span>
                    <span className="text-[11px] text-slate-400 block font-sans">Title: {accountTitle}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyTitle}
                    className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Raast / Bank Transfer */}
          {selectedMethod === 'RAAST_BANK' && (
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs">
                <span className="text-[10px] text-blue-400 uppercase font-mono block">Raast Instant P2P</span>
                <div className="text-slate-200 font-mono font-bold">Raast ID: 03001234567</div>
                <div className="text-slate-400 text-[11px]">Title: {accountTitle}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                  Bank: OPay Microfinance Bank / Meezan Bank Pakistan
                </div>
              </div>
            </div>
          )}

          {/* Instant Sandbox Pay Button (One-click simulator for quick testing) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSandboxInstantPay}
              disabled={isVerifying}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 rounded-xl transition-all shadow-md active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{isVerifying ? 'Processing Payment...' : `Simulate Instant Pay Rs. ${amount} (Demo)`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[10px] text-slate-500 mt-2">
              Instant sandbox mode: Adds funds immediately without needing real bank transfer.
            </p>
          </div>

          {/* Security guarantee */}
          <div className="flex items-center justify-center gap-2 text-slate-500 text-[11px] pt-2 border-t border-slate-800/80">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-Bit SSL Encrypted · 100% Secure Pakistan Free Fire Wallet</span>
          </div>
        </div>
      </div>
    </div>
  );
};
