import React from 'react';
import { 
  Trophy, 
  KeyRound, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ExternalLink,
  Crosshair,
  ArrowRight
} from 'lucide-react';
import { useTournament } from '../context/TournamentContext';

interface MyMatchesProps {
  onExploreClick: () => void;
}

export const MyMatches: React.FC<MyMatchesProps> = ({ onExploreClick }) => {
  const { user, tournaments, registrations, openRoomModal } = useTournament();

  const registeredTournaments = tournaments.filter(t => 
    user.registeredTournamentIds.includes(t.id)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
            My Registered Matches
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span>Official Match Passes</span>
            <span aria-hidden="true">·</span>
            <span>Live Custom Room Credentials</span>
            <span aria-hidden="true">·</span>
            <span>Slot Allocations</span>
          </div>
        </div>

        <button
          onClick={onExploreClick}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm self-start sm:self-auto"
        >
          <Crosshair className="w-4 h-4" />
          <span>Join More Matches</span>
        </button>
      </div>

      {registeredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registeredTournaments.map(tournament => {
            const reg = registrations[tournament.id];
            const startTime = new Date(tournament.startTime);
            const isCompleted = tournament.status === 'COMPLETED';
            const roomDetails = tournament.roomDetails;

            return (
              <div 
                key={tournament.id}
                className="rounded-2xl bg-slate-900 border border-emerald-500/40 overflow-hidden shadow-xl flex flex-col justify-between"
              >
                {/* Header Banner */}
                <div className="relative h-28 w-full overflow-hidden bg-slate-950">
                  <img
                    src={tournament.bannerImage}
                    alt={tournament.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-bold text-white bg-slate-950/80 px-2.5 py-1 rounded backdrop-blur-sm border border-slate-700">
                    <span className="text-emerald-400">{tournament.gameMode}</span>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span>{tournament.map}</span>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span className="text-amber-400 font-mono text-[10px]">PK SERVER</span>
                  </div>

                  {reg && (
                    <div className="absolute top-3 right-3 font-mono text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded backdrop-blur-sm border border-emerald-500/30">
                      Slot #{reg.slotNumber}
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{startTime.toLocaleDateString('en-PK')} at {startTime.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })} (PKT)</span>
                      <span aria-hidden="true">·</span>
                      <span className={isCompleted ? 'text-slate-400' : 'text-emerald-400 font-semibold'}>
                        {isCompleted ? 'Finished' : 'Ready'}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white tracking-wide uppercase mb-3">
                      {tournament.title}
                    </h3>

                    {/* Registration details box */}
                    {reg && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mb-4 text-xs font-mono">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Match Pass:</span>
                          <span className="font-bold text-emerald-400">{reg.matchPassId}</span>
                        </div>
                        {reg.teamName && (
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400">Team:</span>
                            <span className="text-white font-sans font-semibold">{reg.teamName}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-slate-900 space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase block">Registered Roster (PK Server):</span>
                          {reg.players.map((p, idx) => (
                            <div key={idx} className="flex justify-between text-[11px] text-slate-300">
                              <span>{idx + 1}. {p.ign}</span>
                              <span className="text-slate-500">{p.ffUid}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Room ID Action */}
                  <div className="space-y-2">
                    <button
                      onClick={() => openRoomModal(tournament)}
                      className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>
                        {roomDetails?.isRevealed ? 'View Room ID & Password' : 'Check Room Credentials'}
                      </span>
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-mono">
                      Join Free Fire Custom Lobby &gt; Enter credentials
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <Trophy className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="font-display text-xl font-bold text-white uppercase">
            No Active Tournament Registrations
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            You haven't joined any upcoming tournaments yet. Choose from Solo, Duo, Squad, or Clash Squad 4v4 battles!
          </p>
          <button
            onClick={onExploreClick}
            className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 rounded-xl transition-all inline-flex items-center gap-2"
          >
            <span>Explore Tournaments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
