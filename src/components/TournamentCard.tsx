import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  MapPin, 
  Clock, 
  Crosshair, 
  ChevronDown, 
  ChevronUp, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle,
  ShieldAlert,
  Globe
} from 'lucide-react';
import { Tournament } from '../types/tournament';
import { useTournament } from '../context/TournamentContext';

interface TournamentCardProps {
  tournament: Tournament;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  const { user, registrations, openJoinModal, openRoomModal } = useTournament();
  const [showDetails, setShowDetails] = useState(false);

  const isRegistered = user.registeredTournamentIds.includes(tournament.id);
  const registration = registrations[tournament.id];
  const isFull = tournament.filledSlots >= tournament.totalSlots;
  const isCompleted = tournament.status === 'COMPLETED';

  // Format date
  const matchDate = new Date(tournament.startTime);
  const formattedTime = matchDate.toLocaleTimeString('en-PK', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const formattedDate = matchDate.toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
  });

  const percentFilled = Math.min(100, Math.round((tournament.filledSlots / tournament.totalSlots) * 100));

  return (
    <div className={`relative flex flex-col justify-between bg-slate-900/90 rounded-xl border transition-all duration-200 overflow-hidden ${
      isRegistered 
        ? 'border-emerald-500/60 shadow-lg shadow-emerald-500/10' 
        : 'border-slate-800 hover:border-slate-700 hover:shadow-md'
    }`}>
      {/* Top Banner image strip */}
      <div className="relative h-32 w-full overflow-hidden bg-slate-950">
        <img
          src={tournament.bannerImage}
          alt={tournament.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        {/* Game Mode, Map & Server region overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-bold text-white bg-slate-950/80 px-2.5 py-1 rounded backdrop-blur-sm border border-slate-700">
          <span className="text-emerald-400">{tournament.gameMode}</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>{tournament.map}</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span className="text-amber-400 font-mono text-[10px]">PK SERVER</span>
        </div>

        {/* Registered Indicator */}
        {isRegistered && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded backdrop-blur-sm border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Registered</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Schedule metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{formattedDate} at {formattedTime} (PKT)</span>
            <span aria-hidden="true">·</span>
            <span className={isCompleted ? 'text-slate-400' : 'text-emerald-400 font-semibold'}>
              {isCompleted ? 'Finished' : 'Upcoming'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold text-white tracking-wide uppercase line-clamp-1 mb-4">
            {tournament.title}
          </h3>

          {/* Metric Quad Grid: Prize Pool, Per Kill, Entry Fee, Slots */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 mb-4">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">Prize Pool</span>
              <span className="font-mono text-base font-bold text-amber-400 tabular-nums">
                Rs. {tournament.prizePool.toLocaleString()}
              </span>
            </div>

            <div>
              <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">Per Kill</span>
              <span className="font-mono text-base font-bold text-emerald-400 tabular-nums">
                Rs. {tournament.perKill}
              </span>
            </div>

            <div>
              <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">Entry Fee</span>
              <span className="font-mono text-base font-bold text-white tabular-nums">
                {tournament.entryFee === 0 ? 'FREE' : `Rs. ${tournament.entryFee}`}
              </span>
            </div>
          </div>

          {/* Slots progress bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>Slots Filled</span>
              <span className="font-mono tabular-nums text-slate-200">
                {tournament.filledSlots} / {tournament.totalSlots}
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  percentFilled > 85 ? 'bg-red-500' : percentFilled > 60 ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          {isRegistered ? (
            <div className="space-y-2">
              <button
                onClick={() => openRoomModal(tournament)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-md shadow-emerald-400/10 active:scale-[0.99]"
              >
                <KeyRound className="w-4 h-4" />
                <span>Room ID & Password</span>
              </button>
              {registration && (
                <div className="text-center text-[11px] text-slate-400 font-mono">
                  Pass: {registration.matchPassId} · Slot #{registration.slotNumber}
                </div>
              )}
            </div>
          ) : isCompleted ? (
            <button
              onClick={() => setShowDetails(prev => !prev)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-center"
            >
              {showDetails ? 'Hide Match Summary' : 'View Winners & Rankings'}
            </button>
          ) : isFull ? (
            <button
              disabled
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-500 bg-slate-800/60 rounded-lg cursor-not-allowed text-center"
            >
              Tournament Full (0 Slots Left)
            </button>
          ) : (
            <button
              onClick={() => openJoinModal(tournament)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 rounded-lg transition-all shadow-md active:scale-[0.99]"
            >
              <Crosshair className="w-4 h-4" />
              <span>Join Now ({tournament.entryFee === 0 ? 'Free' : `Rs. ${tournament.entryFee}`})</span>
            </button>
          )}

          {/* Quick toggle for rules and prize breakdown */}
          <button
            onClick={() => setShowDetails(prev => !prev)}
            className="w-full flex items-center justify-center gap-1 mt-3 text-xs text-slate-400 hover:text-slate-200 transition-colors py-1"
          >
            <span>{showDetails ? 'Hide Prize Distribution & Rules' : 'Prize Pool Breakdown & Rules'}</span>
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Prize Breakdown & Rules Drawer */}
      {showDetails && (
        <div className="px-5 pb-5 pt-2 border-t border-slate-800 bg-slate-950/70 text-xs text-slate-300 space-y-4">
          {/* Winners table if completed */}
          {isCompleted && tournament.winners && tournament.winners.length > 0 && (
            <div>
              <h4 className="font-semibold text-emerald-400 mb-2 uppercase tracking-wider text-[11px]">
                Official Match Winners (Pakistan Server)
              </h4>
              <div className="space-y-1.5">
                {tournament.winners.map(w => (
                  <div key={w.rank} className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 flex items-center justify-center rounded font-bold ${
                        w.rank === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        #{w.rank}
                      </span>
                      <span className="font-sans font-medium text-white">{w.teamOrPlayerName}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold tabular-nums">Rs. {w.prizeWon.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 ml-2">({w.kills} Kills)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prize breakdown table */}
          <div>
            <h4 className="font-semibold text-emerald-400 mb-2 uppercase tracking-wider text-[11px]">
              Prize Distribution (PKR)
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {tournament.prizeBreakdown.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
                  <span className="text-slate-400">{p.rank}</span>
                  <span className="font-mono font-bold text-amber-400 tabular-nums">Rs. {p.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fair play rules */}
          <div>
            <h4 className="font-semibold text-emerald-400 mb-2 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pakistan Server Guidelines</span>
            </h4>
            <ul className="space-y-1 text-slate-400 list-disc list-inside">
              {tournament.rules.map((rule, idx) => (
                <li key={idx} className="text-[11px] leading-relaxed">{rule}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
