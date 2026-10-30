import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { 
  Tournament, 
  UserProfile, 
  Wallet, 
  Transaction, 
  Registration, 
  TeammateInfo 
} from '../types/tournament';
import { 
  INITIAL_TOURNAMENTS, 
  INITIAL_USER, 
  INITIAL_WALLET, 
  INITIAL_TRANSACTIONS, 
  INITIAL_REGISTRATIONS 
} from '../data/mockData';
import { soundFx } from '../utils/audio';

interface DepositPayload {
  amount: number;
  paymentMethod: string;
  utrNumber?: string;
}

interface WithdrawalPayload {
  amount: number;
  method: 'OPAY' | 'JAZZCASH' | 'EASYPAISA' | 'RAAST' | 'BANK';
  destinationDetail: string;
  holderName?: string;
  bankName?: string;
}

interface JoinTournamentPayload {
  tournamentId: string;
  teamName?: string;
  players: TeammateInfo[];
}

interface TournamentContextType {
  tournaments: Tournament[];
  user: UserProfile;
  wallet: Wallet;
  transactions: Transaction[];
  registrations: Record<string, Registration>;
  soundEnabled: boolean;
  toggleSound: () => void;
  depositFunds: (payload: DepositPayload) => Promise<boolean>;
  withdrawFunds: (payload: WithdrawalPayload) => Promise<{ success: boolean; message: string }>;
  joinTournament: (payload: JoinTournamentPayload) => { success: boolean; message: string };
  updateProfile: (profile: Partial<UserProfile>) => void;
  resetAllData: () => void;
  // Modal helpers
  openDepositModal: (prefillAmount?: number) => void;
  closeDepositModal: () => void;
  depositModalOpen: boolean;
  depositPrefillAmount: number;
  openWithdrawalModal: () => void;
  closeWithdrawalModal: () => void;
  withdrawalModalOpen: boolean;
  selectedTournamentForJoin: Tournament | null;
  openJoinModal: (tournament: Tournament) => void;
  closeJoinModal: () => void;
  selectedTournamentForRoom: Tournament | null;
  openRoomModal: (tournament: Tournament) => void;
  closeRoomModal: () => void;
  selectedReceiptTx: Transaction | null;
  openReceiptModal: (tx: Transaction) => void;
  closeReceiptModal: () => void;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TOURNAMENTS: 'sp_cbz_pk_tournaments_v4',
  USER: 'sp_cbz_pk_user_v4',
  WALLET: 'sp_cbz_pk_wallet_v4',
  TRANSACTIONS: 'sp_cbz_pk_txs_v4',
  REGISTRATIONS: 'sp_cbz_pk_regs_v4',
  SOUND: 'sp_cbz_pk_sound_v4',
};

export const TournamentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Tournaments
  const [tournaments, setTournaments] = useState<Tournament[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TOURNAMENTS);
      return saved ? JSON.parse(saved) : INITIAL_TOURNAMENTS;
    } catch {
      return INITIAL_TOURNAMENTS;
    }
  });

  // User
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Wallet
  const [wallet, setWallet] = useState<Wallet>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WALLET);
      return saved ? JSON.parse(saved) : INITIAL_WALLET;
    } catch {
      return INITIAL_WALLET;
    }
  });

  // Transactions
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  // Registrations
  const [registrations, setRegistrations] = useState<Record<string, Registration>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  // Sound
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOUND);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Modals state
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [depositPrefillAmount, setDepositPrefillAmount] = useState(250);
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [selectedTournamentForJoin, setSelectedTournamentForJoin] = useState<Tournament | null>(null);
  const [selectedTournamentForRoom, setSelectedTournamentForRoom] = useState<Tournament | null>(null);
  const [selectedReceiptTx, setSelectedReceiptTx] = useState<Transaction | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TOURNAMENTS, JSON.stringify(tournaments));
  }, [tournaments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    soundFx.enabled = soundEnabled;
    localStorage.setItem(STORAGE_KEYS.SOUND, JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = () => {
    soundFx.playClick();
    setSoundEnabled(prev => !prev);
  };

  // Deposit Funds
  const depositFunds = async (payload: DepositPayload): Promise<boolean> => {
    soundFx.playCoin();
    const amount = Number(payload.amount);
    if (isNaN(amount) || amount <= 0) return false;

    const newTx: Transaction = {
      id: `tx_dep_${Date.now()}`,
      type: 'DEPOSIT',
      amount: amount,
      currency: 'PKR',
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      referenceId: `OPAY-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      paymentMethod: payload.paymentMethod || 'OPay QR (Muhammad Shabbir Hussain)',
      utrNumber: payload.utrNumber || `${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      note: 'Wallet top-up via Pakistan OPay Gateway',
    };

    setWallet(prev => ({
      ...prev,
      depositBalance: prev.depositBalance + amount,
      totalBalance: prev.totalBalance + amount,
    }));

    setTransactions(prev => [newTx, ...prev]);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00c795', '#f59e0b', '#10b981', '#3b82f6'],
      });
    } catch {
      // safe fallback
    }

    return true;
  };

  // Withdraw Funds
  const withdrawFunds = async (payload: WithdrawalPayload): Promise<{ success: boolean; message: string }> => {
    soundFx.playClick();
    const amount = Number(payload.amount);
    if (isNaN(amount) || amount < 50) {
      return { success: false, message: 'Minimum withdrawal amount is Rs. 50' };
    }

    if (amount > wallet.winningsBalance) {
      return { 
        success: false, 
        message: `Insufficient Winnings balance! Available: Rs. ${wallet.winningsBalance}. Only match winnings can be withdrawn.` 
      };
    }

    let methodDisplay = '';
    if (payload.method === 'OPAY') {
      methodDisplay = `OPay (${payload.destinationDetail})`;
    } else if (payload.method === 'JAZZCASH') {
      methodDisplay = `JazzCash (${payload.destinationDetail})`;
    } else if (payload.method === 'EASYPAISA') {
      methodDisplay = `Easypaisa (${payload.destinationDetail})`;
    } else if (payload.method === 'RAAST') {
      methodDisplay = `Raast ID (${payload.destinationDetail})`;
    } else {
      methodDisplay = `Bank Transfer (${payload.bankName || 'Bank'}: ${payload.destinationDetail.slice(-4)})`;
    }

    const newTx: Transaction = {
      id: `tx_with_${Date.now()}`,
      type: 'WITHDRAWAL',
      amount: amount,
      currency: 'PKR',
      status: 'COMPLETED',
      timestamp: new Date().toISOString(),
      referenceId: `WTH-PK-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentMethod: methodDisplay,
      note: `Instant payout sent to ${payload.destinationDetail}`,
    };

    setWallet(prev => ({
      ...prev,
      winningsBalance: prev.winningsBalance - amount,
      totalBalance: prev.totalBalance - amount,
    }));

    setTransactions(prev => [newTx, ...prev]);
    soundFx.playSuccess();

    return { 
      success: true, 
      message: `Rs. ${amount} withdrawn successfully! Reference: ${newTx.referenceId}` 
    };
  };

  // Join Tournament
  const joinTournament = (payload: JoinTournamentPayload): { success: boolean; message: string } => {
    const tourney = tournaments.find(t => t.id === payload.tournamentId);
    if (!tourney) {
      return { success: false, message: 'Tournament not found' };
    }

    if (tourney.filledSlots >= tourney.totalSlots) {
      return { success: false, message: 'This tournament is already full!' };
    }

    if (user.registeredTournamentIds.includes(tourney.id)) {
      return { success: false, message: 'You have already registered for this tournament.' };
    }

    const fee = tourney.entryFee;

    // Free tournament
    if (fee === 0) {
      executeJoin(tourney, payload, 0);
      return { success: true, message: 'Free registration successful! Good luck on PK Server!' };
    }

    // Check balance
    if (wallet.totalBalance < fee) {
      return { 
        success: false, 
        message: `Insufficient balance! Entry fee is Rs. ${fee}, but your wallet has Rs. ${wallet.totalBalance}. Please deposit to join.` 
      };
    }

    executeJoin(tourney, payload, fee);
    return { success: true, message: `Successfully registered for ${tourney.title}!` };
  };

  const executeJoin = (tourney: Tournament, payload: JoinTournamentPayload, fee: number) => {
    soundFx.playSuccess();

    if (fee > 0) {
      setWallet(prev => {
        let remFee = fee;
        let newDep = prev.depositBalance;
        let newWin = prev.winningsBalance;

        if (newDep >= remFee) {
          newDep -= remFee;
          remFee = 0;
        } else {
          remFee -= newDep;
          newDep = 0;
          newWin = Math.max(0, newWin - remFee);
        }

        return {
          ...prev,
          depositBalance: newDep,
          winningsBalance: newWin,
          totalBalance: prev.totalBalance - fee,
        };
      });

      const newTx: Transaction = {
        id: `tx_entry_${Date.now()}`,
        type: 'MATCH_ENTRY',
        amount: fee,
        currency: 'PKR',
        status: 'COMPLETED',
        timestamp: new Date().toISOString(),
        referenceId: `ENTRY-PK-${Math.floor(10000 + Math.random() * 90000)}`,
        paymentMethod: 'Wallet Balance',
        tournamentTitle: tourney.title,
        note: `Registration for ${tourney.gameMode} match on Pakistan Server`,
      };
      setTransactions(prev => [newTx, ...prev]);
    }

    const nextSlot = tourney.filledSlots + 1;
    setTournaments(prev =>
      prev.map(t =>
        t.id === tourney.id ? { ...t, filledSlots: t.filledSlots + 1 } : t
      )
    );

    const matchPassId = `SP-PK-${tourney.gameMode.slice(0, 2)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReg: Registration = {
      tournamentId: tourney.id,
      matchPassId: matchPassId,
      teamName: payload.teamName || `${user.ffIgn}'s Team`,
      registeredAt: new Date().toISOString(),
      slotNumber: nextSlot,
      players: payload.players,
    };

    setRegistrations(prev => ({
      ...prev,
      [tourney.id]: newReg,
    }));

    setUser(prev => ({
      ...prev,
      matchesPlayed: prev.matchesPlayed + 1,
      registeredTournamentIds: [...prev.registeredTournamentIds, tourney.id],
    }));

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch {
      // safe
    }
  };

  const updateProfile = (profileData: Partial<UserProfile>) => {
    soundFx.playClick();
    setUser(prev => ({
      ...prev,
      ...profileData,
    }));
  };

  const resetAllData = () => {
    soundFx.playClick();
    localStorage.removeItem(STORAGE_KEYS.TOURNAMENTS);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.WALLET);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
    setTournaments(INITIAL_TOURNAMENTS);
    setUser(INITIAL_USER);
    setWallet(INITIAL_WALLET);
    setTransactions(INITIAL_TRANSACTIONS);
    setRegistrations(INITIAL_REGISTRATIONS);
  };

  const openDepositModal = (prefill: number = 250) => {
    soundFx.playClick();
    setDepositPrefillAmount(prefill);
    setDepositModalOpen(true);
  };
  const closeDepositModal = () => setDepositModalOpen(false);

  const openWithdrawalModal = () => {
    soundFx.playClick();
    setWithdrawalModalOpen(true);
  };
  const closeWithdrawalModal = () => setWithdrawalModalOpen(false);

  const openJoinModal = (t: Tournament) => {
    soundFx.playClick();
    setSelectedTournamentForJoin(t);
  };
  const closeJoinModal = () => setSelectedTournamentForJoin(null);

  const openRoomModal = (t: Tournament) => {
    soundFx.playClick();
    setSelectedTournamentForRoom(t);
  };
  const closeRoomModal = () => setSelectedTournamentForRoom(null);

  const openReceiptModal = (tx: Transaction) => {
    soundFx.playClick();
    setSelectedReceiptTx(tx);
  };
  const closeReceiptModal = () => setSelectedReceiptTx(null);

  return (
    <TournamentContext.Provider
      value={{
        tournaments,
        user,
        wallet,
        transactions,
        registrations,
        soundEnabled,
        toggleSound,
        depositFunds,
        withdrawFunds,
        joinTournament,
        updateProfile,
        resetAllData,
        openDepositModal,
        closeDepositModal,
        depositModalOpen,
        depositPrefillAmount,
        openWithdrawalModal,
        closeWithdrawalModal,
        withdrawalModalOpen,
        selectedTournamentForJoin,
        openJoinModal,
        closeJoinModal,
        selectedTournamentForRoom,
        openRoomModal,
        closeRoomModal,
        selectedReceiptTx,
        openReceiptModal,
        closeReceiptModal,
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = (): TournamentContextType => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};
