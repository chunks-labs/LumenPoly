export function boardPosition(id: number): { gridColumn: number; gridRow: number } {
  if (id < 10) return { gridColumn: 11 - id, gridRow: 11 };
  if (id < 20) return { gridColumn: 1, gridRow: 21 - id };
  if (id < 30) return { gridColumn: id - 19, gridRow: 1 };
  return { gridColumn: 11, gridRow: id - 29 };
}
export const groupColors: Record<string, string> = {
  brown: '#bb8666', lightblue: '#66c5d2', pink: '#d18aac', orange: '#e5a565',
  red: '#d87570', yellow: '#d6c777', green: '#85b88d', blue: '#809bdd', gray: '#a0a9b7', white: '#b3a5d4',
};
