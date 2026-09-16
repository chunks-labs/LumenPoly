export type PlayerId = 'you' | 'bot';
export type PlayerToken = 'rocket' | 'node' | 'astronaut';
export type AIDifficulty = 'easy' | 'hard' | 'boss';
export type TurnPhase = 'roll' | 'resolve' | 'bot' | 'finished';
export interface Player { id: PlayerId; name: string; position: number; balance: number; jailed: boolean }
export interface GameEvent { id: number; round: number; text: string; kind: 'move' | 'money' | 'property' | 'system' }
export interface Match {
  players: Record<PlayerId, Player>;
  owners: Record<number, PlayerId>;
  phase: TurnPhase;
  round: number;
  dice: [number, number];
  events: GameEvent[];
  nextEventId: number;
  winner: PlayerId | 'draw' | null;
  difficulty: AIDifficulty;
  token: PlayerToken;
  pendingProperty: number | null;
}
