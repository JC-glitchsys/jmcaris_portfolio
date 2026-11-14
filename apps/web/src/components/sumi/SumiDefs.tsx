/** Shared SVG filters: dry-brush gaps + hand-drawn rough edges. Rendered once. */
export default function SumiDefs() {
  return (
    <svg width="0" height="0" className="pointer-events-none absolute" aria-hidden="true" focusable="false">
      <defs>
        {/* Horizontal dry brush (gaps inside the stroke) */}
        <filter id="sumi-dry" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.5" numOctaves="2" seed="11" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  4 0 0 0 -1.35" result="gaps" />
          <feComposite in="rough" in2="gaps" operator="in" />
        </filter>
        {/* Vertical dry brush (bamboo) */}
        <filter id="sumi-dry-v" x="-30%" y="-3%" width="160%" height="106%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="4" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="0.5 0.012" numOctaves="2" seed="5" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  4 0 0 0 -1.3" result="gaps" />
          <feComposite in="rough" in2="gaps" operator="in" />
        </filter>
        {/* Imperfect hand-drawn edge (sun) */}
        <filter id="sumi-rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
        </filter>
        {/* Crow: slightly ragged edges + a few dry-brush flecks in the feathers (units = crow viewBox) */}
        <filter id="sumi-crow" x="-8%" y="-12%" width="116%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="2.2" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="0.14 0.7" numOctaves="2" seed="9" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  3.2 0 0 0 -0.78" result="gaps" />
          <feComposite in="rough" in2="gaps" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
