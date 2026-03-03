export type Phase = "bidding" | "results";

export interface Round {
  cards: number;
  dir: string;
}

export interface RoundPlayerData {
  name: string;
  bid: number;
  got: number;
  points: number;
}

export interface HistoryRound {
  round: Round;
  data: RoundPlayerData[];
}

export interface Game {
  players: string[];
  scores: number[];
  rounds: Round[];
  history: HistoryRound[];
  roundIndex: number;
  dealerIndex: number;
  phase: Phase;
  order: number[];
  orderLocked: boolean;
}
