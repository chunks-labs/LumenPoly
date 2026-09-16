import { useState } from 'react';
import { Modal } from './Modal';
import { Icon } from './Icon';
import { tokens } from '../data/tokens';
import { difficulties } from '../data/difficulties';
import type { AIDifficulty, PlayerToken } from '../game/types';
import { useGameStore } from '../store/store';
export function BattleSetup({ onClose }: { onClose: () => void }) {
  const match = useGameStore((state) => state.match);
  const startGame = useGameStore((state) => state.startGame);
  const [token, setToken] = useState<PlayerToken>(match?.token ?? 'rocket');
  const [difficulty, setDifficulty] = useState<AIDifficulty>(match?.difficulty ?? 'easy');
  return (
    <Modal title="Make your first move" onClose={onClose} wide>
      <p className="muted">Your piece. Your pace. One table full of possibilities.</p>
      <fieldset className="choice-fieldset">
        <legend>
          01 <span>Choose your piece</span>
        </legend>
        <div className="token-options">
          {tokens.map((item) => (
            <label key={item.id} className={`token-option ${token === item.id ? 'selected' : ''}`}>
              <input
                type="radio"
                name="token"
                value={item.id}
                checked={token === item.id}
                onChange={() => setToken(item.id)}
              />
              <span className="token-emoji" aria-hidden="true">
                {item.symbol}
              </span>
              <strong>{item.name}</strong>
              <small>{item.description}</small>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="choice-fieldset">
        <legend>
          02 <span>Meet your match</span>
        </legend>
        <div className="difficulty-options">
          {difficulties.map((item) => (
            <label
              key={item.id}
              className={`difficulty-option ${difficulty === item.id ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="difficulty"
                value={item.id}
                checked={difficulty === item.id}
                onChange={() => setDifficulty(item.id)}
              />
              <span>{item.level}</span>
              <div>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
      {match && match.phase !== 'finished' && (
        <p className="notice">Starting a new game replaces your saved practice match.</p>
      )}
      <button
        className="button primary full"
        onClick={() => {
          startGame(token, difficulty);
          onClose();
        }}
      >
        Start practice game <Icon name="arrow" />
      </button>
      <p className="fine-print">
        1,500 simulated XLM each · 30 rounds · No wallet or payment required
      </p>
    </Modal>
  );
}
