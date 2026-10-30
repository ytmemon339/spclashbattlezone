import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  AlertCircle,
  FileQuestion,
  ChevronDown,
  ChevronUp,
  Globe
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export const SupportSection: React.FC = () => {
  const [matchId, setMatchId] = useState('');
  const [issueType, setIssueType] = useState('Payment / Deposit');
  const [description, setDescription] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I deposit money into my SP Clash Battle Zone wallet using OPay QR?',
      a: 'Click on the "Deposit" button in the top bar. Scan Muhammad Shabbir Hussain\'s OPay QR code using your OPay app, JazzCash, or Easypaisa app, pay the desired PKR amount, and paste the Transaction/TRX ID. Your wallet will be credited instantly.',
    },
    {
      q: 'Is this exclusively for the Free Fire Pakistan Server (PK)?',
      a: 'Yes, all our custom rooms and scrims are hosted on the Free Fire Pakistan Server with low ping optimized for players in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, and across Pakistan.',
    },
    {
      q: 'How fast do I get my withdrawal to JazzCash, Easypaisa, or OPay?',
      a: 'Winnings are sent via automated instant payout within 60 seconds directly to your OPay, JazzCash, Easypaisa, or Raast account. Minimum withdrawal is Rs. 50 with 0% platform charges.',
    },
    {
      q: 'When and where do I get the Free Fire Room ID and Password?',
      a: 'Room credentials unlock exactly 15 minutes before match start time (Pakistan Standard Time). Go to "My Matches" or click "Room ID & Password" on the tournament card to copy the credentials.',
    },
    {
      q: 'What happens if I sit in the wrong slot in the custom room?',
      a: 'You must strictly sit in the slot number assigned on your Match Pass (e.g. Slot #7). Players who sit in other slots will be kicked by the tournament room host referee.',
    },
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    soundFx.playSuccess();
    const ticketId = `PK-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketSubmitted(ticketId);
    setDescription('');
    setMatchId('');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
            Pakistan Player Support & Help Desk
          </h2>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
            PK SERVER
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>24/7 Pakistan Esports Desk</span>
          <span aria-hidden="true">·</span>
          <span>Instant WhatsApp Help</span>
          <span aria-hidden="true">·</span>
          <span>OPay & JazzCash Assistance</span>
        </div>
      </div>

      {/* Quick Community Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a 
          href="https://whatsapp.com" 
          target="_blank" 
          rel="noreferrer"
          className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500 transition-colors flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-bold text-emerald-400 block mb-0.5">Pakistan WhatsApp Support</span>
            <span className="text-[11px] text-slate-400">Direct referee chat & room alerts</span>
          </div>
          <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
        </a>

        <a 
          href="https://telegram.org" 
          target="_blank" 
          rel="noreferrer"
          className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 hover:border-sky-500 transition-colors flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-bold text-sky-400 block mb-0.5">PK Free Fire Telegram</span>
            <span className="text-[11px] text-slate-400">Instant match notifications & IDs</span>
          </div>
          <ExternalLink className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
        </a>

        <a 
          href="https://discord.com" 
          target="_blank" 
          rel="noreferrer"
          className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 hover:border-teal-500 transition-colors flex items-center justify-between group"
        >
          <div>
            <span className="text-xs font-bold text-teal-400 block mb-0.5">Pakistan Scrims Discord</span>
            <span className="text-[11px] text-slate-400">Clash squad recruitment & 4v4 duels</span>
          </div>
          <ExternalLink className="w-4 h-4 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FAQs Accordion */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-3 shadow-xl">
          <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <FileQuestion className="w-5 h-5 text-emerald-400" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-950/50 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-3.5 text-left text-xs font-bold text-white flex items-center justify-between gap-3 hover:text-emerald-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ticket Submission Form */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>Submit a Dispute or Query (PK)</span>
          </h3>

          {ticketSubmitted ? (
            <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-display text-lg font-bold text-white uppercase">
                Ticket Created Successfully
              </h4>
              <p className="text-xs text-slate-300">
                Your Pakistan ticket ID is <strong className="text-emerald-400 font-mono">{ticketSubmitted}</strong>. Our referee admin team will investigate and credit your wallet if a score revision is verified.
              </p>
              <button
                onClick={() => setTicketSubmitted(null)}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                Submit Another Query
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Issue Category</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="OPay / Deposit">OPay / JazzCash / Easypaisa Deposit Issue</option>
                  <option value="Withdrawal Status">Withdrawal Payout Delay</option>
                  <option value="Match Score Dispute">Match Result / Kill Bounty Dispute</option>
                  <option value="Room Issue">Room ID or Password Not Working</option>
                  <option value="Cheater Report">Report Hacker / Teaming on PK Server</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Tournament Title / Match (Optional)</label>
                <input
                  type="text"
                  value={matchId}
                  onChange={(e) => setMatchId(e.target.value)}
                  placeholder="e.g. Clash Squad 4v4 High Noon Blitz (PK)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Describe your query / details</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Include your Free Fire UID, OPay/JazzCash TRX ID, or score screenshot details..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-400 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Support Ticket</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
