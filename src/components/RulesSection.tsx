import React from 'react';
import { 
  ShieldCheck, 
  Trophy, 
  Crosshair, 
  Smartphone, 
  AlertTriangle, 
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const RulesSection: React.FC = () => {
  const pointsSystem = [
    { rank: '1st (Booyah)', points: 12 },
    { rank: '2nd Place', points: 9 },
    { rank: '3rd Place', points: 8 },
    { rank: '4th Place', points: 7 },
    { rank: '5th Place', points: 6 },
    { rank: '6th Place', points: 5 },
    { rank: '7th Place', points: 4 },
    { rank: '8th Place', points: 3 },
    { rank: '9th Place', points: 2 },
    { rank: '10th Place', points: 1 },
    { rank: '11th - 12th', points: 0 },
    { rank: 'Kill Bounty', points: '+1 pt / kill' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
          Official Tournament Rules & Point System
        </h2>
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
          <span>Free Fire Esports Standard</span>
          <span aria-hidden="true">·</span>
          <span>Competitive Fair Play</span>
          <span aria-hidden="true">·</span>
          <span>Strict Anti-Cheat</span>
        </div>
      </div>

      {/* Point Table Grid */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <h3 className="font-display text-lg font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Battle Royale Standard Point System</span>
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {pointsSystem.map((item, idx) => (
            <div 
              key={idx}
              className={`p-3 rounded-xl border text-center font-mono ${
                idx === 0 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' 
                  : idx === 11 
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              <span className="block text-[11px] text-slate-400 font-sans mb-1">{item.rank}</span>
              <span className="text-sm font-bold">{item.points}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fair Play & Anti-Cheat Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device & Hardware Rules */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <span>Device & Emulator Policies</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed list-disc list-inside">
            <li><strong className="text-white">Mobile Only:</strong> Android and iOS mobile smartphones are strictly allowed.</li>
            <li><strong className="text-red-400">Emulators Banned:</strong> Any use of PC emulators (BlueStacks, LDPlayer, Nox, Gameloop) will result in immediate disqualification and permanent ban.</li>
            <li><strong className="text-white">No Triggers or External Macros:</strong> Physical trigger attachments or auto-clicker scripts are not permitted.</li>
            <li><strong className="text-white">Network Stability:</strong> Players are responsible for their own ping and connectivity. Rematches will not be hosted for individual disconnects.</li>
          </ul>
        </div>

        {/* Custom Match Joining & In-Game Rules */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-amber-400" />
            <span>Match & Room Guidelines</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed list-disc list-inside">
            <li><strong className="text-white">Slot Discipline:</strong> Players must strictly sit in their allocated slot number as listed on their match pass. Sitting in other players' slots will cause the referee to kick you without refund.</li>
            <li><strong className="text-white">Gun Properties:</strong> Set to <strong className="text-amber-400">OFF</strong> in competitive Battle Royale lobbies to preserve skill-based gunplay.</li>
            <li><strong className="text-white">Character Skills:</strong> Character skills are allowed unless stated otherwise in the specific match title.</li>
            <li><strong className="text-red-400">Zero Teaming:</strong> Cross-team collaboration or truce in Solo/Duo lobbies will lead to instant wallet lock.</li>
          </ul>
        </div>
      </div>

      {/* Dispute & Payout Verification */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileCheck className="w-6 h-6 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block mb-0.5">Dispute Verification Window</span>
            <span className="text-slate-400">Always take a screenshot of your post-match end screen (kills + rank). Disputes can be submitted to support within 15 minutes of match conclusion.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
