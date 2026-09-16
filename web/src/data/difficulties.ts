import type { AIDifficulty } from '../game/types';
export const difficulties: { id: AIDifficulty; name: string; description: string; level: string }[] = [
  { id: 'easy', name: 'Casual', description: 'A little room to learn. Orbit keeps a larger cash reserve.', level: '01' },
  { id: 'hard', name: 'Strategic', description: 'A balanced opponent who spots an opportunity.', level: '02' },
  { id: 'boss', name: 'Competitive', description: 'An ambitious buyer. Bring your best strategy.', level: '03' },
];
