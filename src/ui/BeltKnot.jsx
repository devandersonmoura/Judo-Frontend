const LEFT_TAIL = '79.4,38 104.6,50 58.6,146 33.4,134';
const RIGHT_TAIL = '120.6,38 95.4,50 141.4,146 166.6,134';

const TAIL_STITCHES = [
  'M87 42 41 138',
  'M92 44 46 140',
  'M97 46 51 142',
  'M113 42 159 138',
  'M108 44 154 140',
  'M103 46 149 142',
];

// Traços com claro e escuro juntos para a dobra aparecer em qualquer cor de faixa.
const FOLDS = ['M74 27C92 30 108 50 126 53', 'M74 53C84 51 90 46 94 42', 'M106 38C110 34 116 29 126 27'];

export function BeltKnot() {
  return (
    <svg className="belt-knot" viewBox="0 0 200 150" aria-hidden="true">
      <polygon className="belt-knot__fabric" points={LEFT_TAIL} />
      <polygon className="belt-knot__fabric" points={RIGHT_TAIL} />
      {TAIL_STITCHES.map((path) => (
        <path key={path} className="belt-knot__stitch" d={path} />
      ))}
      <rect className="belt-knot__fabric" x="70" y="17" width="60" height="46" rx="10" />
      {FOLDS.map((path) => (
        <g key={path}>
          <path className="belt-knot__shine" d={path} transform="translate(0 1.5)" />
          <path className="belt-knot__fold" d={path} />
        </g>
      ))}
    </svg>
  );
}
