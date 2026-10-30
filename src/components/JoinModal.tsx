import React, { useState } from 'react';
import { 
  X, 
  Crosshair, 
  ShieldCheck, 
  AlertCircle, 
  Wallet as WalletIcon, 
  Plus, 
  Users, 
  UserPlus,
  Trash2
} from 'lucide-react';
import { useTournament } from '../context/TournamentContext';
import { TeammateInfo } from '../types/tournament';

export const JoinModal: React.FC = () => {
  const { 
    selectedTournamentForJoin, 
    closeJoinModal, 
    user, 
    wallet, 
    joinTournament, 
    openDepositModal 
  } = useTournament();

  if (!selectedTournamentForJoin) return null;
  const tourney = selectedTournamentForJoin;

  const requiredTeammatesCount = 
    tourney.gameMode === 'SOLO' ? 0 : 
    tourney.gameMode === 'DUO' ? 1 : 3;

  const [teamName, setTeamName] = useState(`${user.ffIgn}'s PK Team`);
  const [captainIgn, setCaptainIgn] = useState(user.ffIgn);
  const [captainUid, setCaptainUid] = useState(user.ffUid);

  const [teammates, setTeammates] = useState<TeammateInfo[]>(() => {
    if (requiredTeammatesCount === 0) return [];
    const initial: TeammateInfo[] = [];
    for (let i = 0; i < requiredTeammatesCount; i++) {
      initial.push({
        name: `Player ${i + 2}`,
        ign: `PK_WARRIOR_${i + 2}`,
        ffUid: `${Math.floor(2000000000 + Math.random() * 8000000000)}`,
      });
    }
    return initial;
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasEnoughBalance = tourney.entryFee === 0 || wallet.totalBalance >= tourney.entryFee;
  const balanceShortfall = tourney.entryFee - wallet.totalBalance;

  const handleUpdateTeammate = (index: number, field: keyof TeammateInfo, value: string) => {
    setTeammates(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!captainIgn.trim() || !captainUid.trim()) {
      setErrorMsg('Please enter your Free Fire In-Game Name (IGN) and Player UID.');
      return;
    }

    if (captainUid.length < 6) {
      setErrorMsg('Free Fire UID must be at least 6 digits long.');
      return;
    }

    for (let i = 0; i < teammates.length; i++) {
      const tm = teammates[i];
      if (!tm.ign.trim() || !tm.ffUid.trim()) {
        setErrorMsg(`Please fill in Free Fire IGN and UID for Teammate #${i + 2}.`);
        return;
      }
    }

    if (!hasEnoughBalance) {
      setErrorMsg(`Insufficient balance! Please add Rs. ${balanceShortfall} to your wallet.`);
      return;
    }

    setIsSubmitting(true);

    const allPlayers: TeammateInfo[] = [
      { name: user.name, ign: captainIgn.trim(), ffUid: captainUid.trim() },
      ...teammates,
    ];

    const result = joinTournament({
      tournamentId: tourney.id,
      teamName: tourney.gameMode !== 'SOLO' ? teamName : undefined,
      players: allPlayers,
    });

    setIsSubmitting(false);

    if (result.success) {
      closeJoinModal();
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Crosshair className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                  Tournament Entry Pass
                </h3>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  PK SERVER
                </span>
              </div>
              <p className="text-xs text-slate-400">{tourney.title}</p>
            </div>
          </div>

          <button
            onClick={closeJoinModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5">
          {/* Match Snapshot */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-[10px] uppercase text-slate-400 block font-mono">Format</span>
              <span className="font-bold text-white">{tourney.gameMode} · {tourney.map}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 block font-mono">Prize Pool</span>
              <span className="font-bold text-amber-400 font-mono">Rs. {tourney.prizePool.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 block font-mono">Entry Fee</span>
              <span className="font-bold text-emerald-400 font-mono">
                {tourney.entryFee === 0 ? 'FREE' : `Rs. ${tourney.entryFee}`}
              </span>
            </div>
          </div>

          {/* Wallet Balance Status */}
          <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
            hasEnoughBalance 
              ? 'bg-slate-950 border-slate-800' 
              : 'bg-red-950/20 border-red-500/30'
          }`}>
            <div className="flex items-center gap-2.5">
              <WalletIcon className={`w-4 h-4 ${hasEnoughBalance ? 'text-emerald-400' : 'text-red-400'}`} />
              <div>
                <span className="text-[11px] text-slate-400 block">Current Wallet Balance</span>
                <span className="font-mono font-bold text-sm text-white">
                  Rs. {wallet.totalBalance.toLocaleString()} PKR
                </span>
              </div>
            </div>

            {!hasEnoughBalance && (
              <button
                type="button"
                onClick={() => {
                  closeJoinModal();
                  openDepositModal(balanceShortfall);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Add Rs. {balanceShortfall}</span>
              </button>
            )}
          </div>

          {/* Captain / Solo Player Info */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>{tourney.gameMode === 'SOLO' ? 'Solo Player Details' : 'Team Captain Details'}</span>
            </h4>

            {tourney.gameMode !== 'SOLO' && (
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. SP LAHORE WARRIORS"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-emerald-400"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">
                  Free Fire In-Game Name (IGN)
                </label>
                <input
                  type="text"
                  value={captainIgn}
                  onChange={(e) => setCaptainIgn(e.target.value)}
                  placeholder="e.g. SP๛SHABBIR࿐"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1">
                  Free Fire Player UID (PK Server)
                </label>
                <input
                  type="text"
                  value={captainUid}
                  onChange={(e) => setCaptainUid(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 1849204910"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Teammates section if Duo or Squad */}
          {requiredTeammatesCount > 0 && (
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                <span>Roster Teammates ({teammates.length} required)</span>
                <span className="text-[10px] text-slate-400 lowercase font-normal">must be on Pakistan Server</span>
              </h4>

              {teammates.map((tm, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 space-y-2">
                  <span className="text-[11px] font-bold text-slate-300">Teammate #{idx + 2}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={tm.ign}
                      onChange={(e) => handleUpdateTeammate(idx, 'ign', e.target.value)}
                      placeholder={`Player ${idx + 2} Free Fire IGN`}
                      className="px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-white font-mono"
                    />
                    <input
                      type="text"
                      value={tm.ffUid}
                      onChange={(e) => handleUpdateTeammate(idx, 'ffUid', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder={`Player ${idx + 2} Free Fire UID`}
                      className="px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded text-white font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit action */}
          <button
            type="submit"
            disabled={isSubmitting || !hasEnoughBalance}
            className="w-full py-3 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Crosshair className="w-4 h-4 stroke-[2.5]" />
            <span>
              {isSubmitting 
                ? 'Securing Slot...' 
                : tourney.entryFee === 0 
                ? 'Register for Free (PK Server)' 
                : `Pay Rs. ${tourney.entryFee} & Confirm Slot`}
            </span>
          </button>

          {/* Guarantee */}
          <div className="flex items-center justify-center gap-2 text-slate-500 text-[11px] pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Official SP Clash Battle Zone Entry · Instant Pass Issued</span>
          </div>
        </form>
      </div>
    </div>
  );
};
