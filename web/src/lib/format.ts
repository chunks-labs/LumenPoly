const numbers = new Intl.NumberFormat('en-US');
export const formatXlm = (value: number) => `${numbers.format(value)} XLM`;
export const shortAddress = (address: string) => `${address.slice(0, 5)}…${address.slice(-4)}`;
