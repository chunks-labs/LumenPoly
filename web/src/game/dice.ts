export function rollDie(random = Math.random): number {
  return Math.min(6, Math.max(1, Math.floor(random() * 6) + 1));
}
export function rollDice(random = Math.random): [number, number] {
  return [rollDie(random), rollDie(random)];
}
export function validDice(dice: readonly number[]): dice is [number, number] {
  return (
    dice.length === 2 && dice.every((value) => Number.isInteger(value) && value >= 1 && value <= 6)
  );
}
