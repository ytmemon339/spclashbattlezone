import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  Copy, 
  Check, 
  Clock, 
  ShieldAlert, 
  ExternalLink,
  Users,
  CheckCircle2
} from 'lucide-react';
import { useTournament } from '../context/TournamentContext';
import { soundFx } from '../utils/audio';

export const RoomModal: React.FC = () => {
  const { selectedTournamentForRoom, closeRoomModal, registrations } = useTournament();
  const [copiedId, setCopiedId] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!selectedTournamentForRoom) return null;

  const tournament = selectedTournamentForRoom;
  const registration = registrations[tournament.id];
  const roomDetails = tournament.roomDetails;

  // Free Fire tournament logic:
  // Is it revealed or is it less than 15 mins before match?
  const startTime = new Date(tournament.startTime).getTime();
  const now = Date.now();
  const diffMinutes = Math.round((startTime - now) / 60000);
  const isUnlocked = roomDetails?.isRevealed || diffMinutes <= 15;

  const handleCopyId = () => {
    if (!roomDetails?.roomId) return;
    navigator.clipboard.writeText(roomDetails.roomId);
    soundFx.playClick();
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyPass = () => {
    if (!roomDetails?.password) return;
    navigator.clipboard.writeText(roomDetails.password);
    soundFx.playClick();
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  const handleCopyAll = () => {
    if (!roomDetails) return;
    const text = `SP Clash Battle Zone (PK Server) - ${tournament.title}\nRoom ID: ${roomDetails.roomId}\nPassword: ${roomDetails.password}\nSlot Number: #${registration?.slotNumber || 1}\nServer: Pakistan (PK)`;
    navigator.clipboard.writeText(text);
    soundFx.playClick();
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
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
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                Room ID & Credentials
              </h3>
              <p className="text-xs text-slate-400">{tournament.title}</p>
            </div>
          </div>

          <button
            onClick={closeRoomModal}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Match pass & slot badge */}
          {registration && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Match Pass ID</span>
                <span className="text-amber-400 font-bold">{registration.matchPassId}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase">Assigned Slot</span>
                <span className="text-white font-bold text-sm">Slot #{registration.slotNumber}</span>
              </div>
            </div>
          )}

          {isUnlocked && roomDetails ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-slate-950 to-orange-500/10 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Room is Ready & Active</span>
                  </div>
                  <button
                    onClick={handleCopyAll}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 underline underline-offset-2"
                  >
                    {copiedAll ? 'All Copied!' : 'Copy All'}
                  </button>
                </div>

                {/* Room ID box */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">Room ID</span>
                    <span className="font-mono text-xl font-black text-white tracking-widest">
                      {roomDetails.roomId}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyId}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Password box */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">Room Password</span>
                    <span className="font-mono text-xl font-black text-amber-400 tracking-widest">
                      {roomDetails.password}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyPass}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                  >
                    {copiedPass ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPass ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Instructions on joining Free Fire Custom Room */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
                  How to Join in Free Fire:
                </h4>
                <ol className="space-y-1.5 text-slate-300 list-decimal list-inside leading-relaxed text-[11px]">
                  <li>Open Free Fire on your mobile device.</li>
                  <li>Go to Mode Selector &gt; Select <strong className="text-white">Custom</strong>.</li>
                  <li>Click the search icon and paste <strong className="text-amber-400">Room ID: {roomDetails.roomId}</strong>.</li>
                  <li>Click Join and enter password: <strong className="text-amber-400">{roomDetails.password}</strong>.</li>
                  <li>Sit strictly on your assigned <strong className="text-white">Slot #{registration?.slotNumber || 1}</strong>. Unauthorized slots will be kicked by the admin referee.</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
              <Clock className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
              <h4 className="font-display text-lg font-bold text-white uppercase">
                Room Credentials Locked
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Room ID and Password will be unlocked automatically <strong className="text-white">15 minutes</strong> prior to match start.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-400 inline-block">
                Match Start: {new Date(tournament.startTime).toLocaleTimeString()}
              </div>
            </div>
          )}

          {/* Fair play reminder */}
          <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 flex items-start gap-2 text-[11px] text-red-300">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span>Do not share room credentials with non-registered players. Sharing credentials causes permanent forfeiture and wallet freeze.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
