export function Brand({ compact = false }: { compact?: boolean }) {
  return <span className="brand"><span className="brand-symbol" aria-hidden="true">✳</span>{!compact && <span>Lumen<span className="brand-light">Poly</span><span className="brand-dot">.</span></span>}</span>;
}
