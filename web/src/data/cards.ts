export interface EventCard {
  title: string;
  text: string;
  amount: number;
}
export const chanceCards: readonly EventCard[] = [
  { title: 'Builder grant', text: 'Your prototype earns a community grant.', amount: 100 },
  { title: 'Security review', text: 'Invest in an independent contract review.', amount: -50 },
  { title: 'Network contribution', text: 'Your open-source work gets recognized.', amount: 75 },
  { title: 'Unexpected maintenance', text: 'Your infrastructure needs an upgrade.', amount: -25 },
];
export const communityCards: readonly EventCard[] = [
  { title: 'Community reward', text: 'Your workshop helps new builders.', amount: 50 },
  { title: 'Hackathon prize', text: 'Your team ships something useful.', amount: 150 },
  { title: 'Public goods', text: 'Support a shared developer tool.', amount: -50 },
  { title: 'Bug bounty', text: 'You responsibly report a vulnerability.', amount: 100 },
];
