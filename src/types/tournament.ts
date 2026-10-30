export type GameMode = 'SOLO' | 'DUO' | 'SQUAD' | 'CLASH_SQUAD';

export type MapType = 'Bermuda' | 'Purgatory' | 'Kalahari' | 'Alpine' | 'NexTerra';

export type TournamentStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED';

export interface PrizeBreakdown {
  rank: string;
  amount: number;
}

export interface MatchWinner {
  rank: number;
  teamOrPlayerName: string;
  ffUid: string;
  kills: number;
  prizeWon: number;
}

export interface RoomDetails {
  roomId: string;
  password: string;
  releasedAt: string;
  isRevealed: boolean;
  assignedSlot?: number;
}

export interface Tournament {
  id: string;
  title: string;
  serverRegion: string; // e.g. "Pakistan (PK)"
  gameMode: GameMode;
  map: MapType;
  entryFee: number;
  prizePool: number;
  perKill: number;
  startTime: string;
  totalSlots: number;
  filledSlots: number;
  status: TournamentStatus;
  prizeBreakdown: PrizeBreakdown[];
  rules: string[];
  bannerImage: string;
  roomDetails?: RoomDetails;
  winners?: MatchWinner[];
}

export interface Wallet {
  totalBalance: number;
  depositBalance: number;
  winningsBalance: number;
  bonusBalance: number;
}

export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'MATCH_ENTRY' | 'PRIZE_WIN' | 'KILL_BONUS' | 'REFUND';

export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: string; // "PKR"
  status: TransactionStatus;
  timestamp: string;
  referenceId: string;
  paymentMethod: string;
  tournamentTitle?: string;
  utrNumber?: string;
  note?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  ffIgn: string;
  ffUid: string;
  email: string;
  phone: string;
  serverRegion: string; // "Pakistan (PK Server)"
  matchesPlayed: number;
  totalKills: number;
  totalWinnings: number;
  winRate: number;
  registeredTournamentIds: string[];
}

export interface TeammateInfo {
  name: string;
  ign: string;
  ffUid: string;
}

export interface Registration {
  tournamentId: string;
  matchPassId: string;
  teamName?: string;
  registeredAt: string;
  slotNumber: number;
  players: TeammateInfo[];
}
