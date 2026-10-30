import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Crosshair, 
  Trophy, 
  Save, 
  RotateCcw,
  Check,
  Globe
} from 'lucide-react';
import { useTournament } from '../context/TournamentContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile, resetAllData } = useTournament();

  const [name, setName] = useState(user.name);
  const [ffIgn, setFfIgn] = useState(user.ffIgn);
  const [ffUid, setFfUid] = useState(user.ffUid);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [serverRegion, setServerRegion] = useState(user.serverRegion || 'Pakistan (PK Server)');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      ffIgn,
      ffUid,
      phone,
      email,
      serverRegion,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo data (wallet balance, tournaments, transactions) back to initial factory state?')) {
      resetAllData();
      onClose();
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
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                  Gamer Profile & Credentials
                </h3>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  PK SERVER
                </span>
              </div>
              <p className="text-xs text-slate-400">SP Clash Battle Zone Pakistan Identity</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5">
          {/* Career Stats Grid */}
          <div className="grid grid-cols-4 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
            <div>
              <span className="block text-[10px] text-slate-400 uppercase">Matches</span>
              <span className="text-base font-bold text-white tabular-nums">{user.matchesPlayed}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase">Total Kills</span>
              <span className="text-base font-bold text-emerald-400 tabular-nums">{user.totalKills}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase">Win Rate</span>
              <span className="text-base font-bold text-amber-400 tabular-nums">{user.winRate}%</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase">Winnings</span>
              <span className="text-base font-bold text-white tabular-nums">Rs. {user.totalWinnings.toLocaleString()}</span>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Free Fire In-Game Name (IGN)
              </label>
              <input
                type="text"
                value={ffIgn}
                onChange={(e) => setFfIgn(e.target.value)}
                placeholder="Exact In-Game Name with special symbols"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Free Fire Player UID
                </label>
                <input
                  type="text"
                  value={ffUid}
                  onChange={(e) => setFfUid(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="10-digit Free Fire UID"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Server Region
                </label>
                <input
                  type="text"
                  value={serverRegion}
                  onChange={(e) => setServerRegion(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-mono focus:outline-none focus:border-emerald-400"
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Full Name / Account Title
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                  Pakistan Mobile (Jazz / Telenor / Zong)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              {savedSuccess ? <Check className="w-4 h-4 stroke-[3]" /> : <Save className="w-4 h-4" />}
              <span>{savedSuccess ? 'Profile Saved!' : 'Save Credentials'}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="py-2.5 px-3 text-xs text-slate-400 hover:text-red-400 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl transition-colors flex items-center gap-1"
              title="Reset demo data to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
