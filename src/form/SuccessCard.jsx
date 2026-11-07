import { useEffect, useRef } from 'react';
import { useOptions } from '../options/OptionsContext.jsx';
import { TEACHER_SHORT_NAME } from '../teacher.js';
import { BeltStrip } from '../ui/BeltStrip.jsx';

export function SuccessCard({ registration, onReset }) {
  const headingRef = useRef(null);
  const { belts, sizes } = useOptions();
  const belt = belts.find(({ value }) => value === registration.belt);
  const size = sizes.find(({ value }) => value === registration.size);

  useEffect(() => headingRef.current?.focus(), []);

  return (
    <section className="success">
      <h2 className="success__title" ref={headingRef} tabIndex={-1}>
        Recebido!
      </h2>
      <p className="success__text">
        O {TEACHER_SHORT_NAME} já pode ver o pedido de {registration.name}.
      </p>
      <BeltStrip color={belt.color} className="belt-strip--wide" />
      <p className="success__detail">
        Faixa {belt.label.toLowerCase()} · {size.label} · {size.length}
      </p>
      <button className="button" type="button" onClick={onReset}>
        Preencher para outra pessoa
      </button>
    </section>
  );
}
