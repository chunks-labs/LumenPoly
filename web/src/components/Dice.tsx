const dots: Record<number, number[]> = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
export function Dice({ value }: { value: number }) {
  return <span className="die" role="img" aria-label={`Die showing ${value}`}>{Array.from({ length: 9 }, (_, index) => <i key={index} className={dots[value]?.includes(index) ? 'pip visible' : 'pip'} />)}</span>;
}
