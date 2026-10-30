import React, { useState } from 'react';
import { TournamentProvider, useTournament } from './context/TournamentContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { TournamentList } from './components/TournamentList';
import { MyMatches } from './components/MyMatches';
import { WalletView } from './components/WalletView';
import { RulesSection } from './components/RulesSection';
import { SupportSection } from './components/SupportSection';
import { Footer } from './components/Footer';
import { DepositModal } from './components/DepositModal';
import { WithdrawalModal } from './components/WithdrawalModal';
import { JoinModal } from './components/JoinModal';
import { RoomModal } from './components/RoomModal';
import { ReceiptModal } from './components/ReceiptModal';
import { ProfileModal } from './components/ProfileModal';
import { 
  Crosshair, 
  Trophy, 
  Wallet as WalletIcon, 
  HelpCircle,
  Plus
} from 'lucide-react';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('tournaments');
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const { openDepositModal, openWithdrawalModal } = useTournament();

  const handleExplore = () => {
    setActiveTab('tournaments');
    const el = document.getElementById('tournaments-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black pb-16 md:pb-0">
      {/* Top Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openProfile={() => setProfileOpen(true)} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'tournaments' && (
          <div>
            <HeroBanner onExploreClick={handleExplore} />
            <TournamentList />
          </div>
        )}

        {activeTab === 'my-matches' && (
          <MyMatches onExploreClick={handleExplore} />
        )}

        {activeTab === 'wallet' && (
          <WalletView />
        )}

        {activeTab === 'rules' && (
          <RulesSection />
        )}

        {activeTab === 'support' && (
          <SupportSection />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        openDeposit={() => openDepositModal(100)} 
        openWithdraw={openWithdrawalModal} 
      />

      {/* Floating Bottom Nav for Mobile Screens (Under 15% sticky height limit) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex items-center justify-around text-[10px] font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('tournaments')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'tournaments' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <Crosshair className="w-4 h-4" />
          <span>Matches</span>
        </button>

        <button
          onClick={() => setActiveTab('my-matches')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'my-matches' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>My Passes</span>
        </button>

        <button
          onClick={() => openDepositModal(100)}
          className="flex flex-col items-center gap-0.5 -mt-3 py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span className="text-[9px] uppercase tracking-wider">Deposit</span>
        </button>

        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'wallet' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <WalletIcon className="w-4 h-4" />
          <span>Wallet</span>
        </button>

        <button
          onClick={() => setActiveTab('rules')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            activeTab === 'rules' ? 'text-amber-400 font-bold' : 'hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Rules</span>
        </button>
      </nav>

      {/* Global Interactive Modals */}
      <DepositModal />
      <WithdrawalModal />
      <JoinModal />
      <RoomModal />
      <ReceiptModal />
      <ProfileModal 
        isOpen={profileOpen} 
        onClose={() => setProfileOpen(false)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <TournamentProvider>
      <MainApp />
    </TournamentProvider>
  );
}
