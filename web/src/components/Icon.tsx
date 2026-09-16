import type { CSSProperties } from 'react';
export type IconName = 'home' | 'board' | 'book' | 'wallet' | 'arrow' | 'chevron' | 'close' | 'check' | 'globe' | 'spark' | 'trophy' | 'chart' | 'external' | 'menu' | 'refresh';
const paths: Record<IconName, string> = {
  home: 'm3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',
  board: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  book: 'M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1Zm0 0v15',
  wallet: 'M3 6h17v15H3V6Zm0 0V3h14v3m-2 6h6v5h-6z',
  arrow: 'M4 12h16m-6-6 6 6-6 6', chevron: 'm9 5 7 7-7 7', close: 'm6 6 12 12M6 18 18 6',
  check: 'm5 12 4 4L19 6', globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z',
  spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z', trophy: 'M7 3h10v7a5 5 0 0 1-10 0V3Zm0 2H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4m-5 3v6m-4 0h8',
  chart: 'M4 20V10m8 10V4m8 16v-7', external: 'M14 3h7v7m0-7L10 14M10 3H3v18h18v-7',
  menu: 'M4 6h16M4 12h16M4 18h16', refresh: 'M20 7v5h-5m5 0a8 8 0 1 0-2 6',
};
export function Icon({ name, size = 20, style }: { name: IconName; size?: number; style?: CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}><path d={paths[name]} /></svg>;
}
