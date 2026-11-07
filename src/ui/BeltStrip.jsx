export function BeltStrip({ color, className = '' }) {
  if (!color) return <span className={`belt-strip belt-strip--unknown ${className}`} aria-hidden="true" />;
  return <span className={`belt-strip ${className}`} style={{ '--belt': color }} aria-hidden="true" />;
}
