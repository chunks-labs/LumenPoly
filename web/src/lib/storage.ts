import { STORAGE_KEY } from '../game/constants';
import { isMatch } from '../game/validate';
import type { Match } from '../game/types';
export function loadMatch(): Match | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw || raw.length > 100000) return null;
    const value: unknown = JSON.parse(raw);
    return isMatch(value) ? value : null;
  } catch {
    return null;
  }
}
export function saveMatch(match: Match | null): boolean {
  try {
    if (match) localStorage.setItem(STORAGE_KEY, JSON.stringify(match));
    else localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
