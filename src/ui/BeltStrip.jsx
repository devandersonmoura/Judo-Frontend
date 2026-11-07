export function BeltStrip({ color, className = '' }) {
  return <span className={`belt-strip ${className}`} style={{ '--belt': color }} aria-hidden="true" />;
}
