import { Icon } from './Icon';
import type { IconName } from './Icon';
export function StatCard({ icon, label, value, detail }: { icon: IconName; label: string; value: string; detail: string }) {
  return <article className="stat-card"><span className="stat-icon"><Icon name={icon} /></span><div><span className="stat-label">{label}</span><strong>{value}</strong><small>{detail}</small></div></article>;
}
