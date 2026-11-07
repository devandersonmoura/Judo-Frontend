import { useState } from 'react';
import { useOptions } from '../options/OptionsContext.jsx';
import { BeltStrip } from '../ui/BeltStrip.jsx';

function RemoveButton({ name, onConfirm }) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        className="button button--small"
        type="button"
        aria-label={`Apagar ${name}`}
        onClick={() => setConfirming(true)}
      >
        Apagar
      </button>
    );
  }

  return (
    <button
      className="button button--small button--danger"
      type="button"
      aria-label={`Confirmar: apagar ${name}`}
      onBlur={() => setConfirming(false)}
      onClick={onConfirm}
      autoFocus
    >
      Confirmar
    </button>
  );
}

function Row({ registration, onRemove }) {
  const { belts, sizes } = useOptions();
  const { id, name } = registration;
  const belt = belts.find(({ value }) => value === registration.belt);
  const size = sizes.find(({ value }) => value === registration.size);

  return (
    <tr>
      <td className="table__name">{name}</td>
      <td className="table__nowrap">
        {size.label} <span className="table__muted">{size.length}</span>
      </td>
      <td>
        <span className="belt-label">
          <BeltStrip color={belt.color} className="belt-strip--small" />
          {belt.label}
        </span>
      </td>
      <td>
        <RemoveButton name={name} onConfirm={() => onRemove(id)} />
      </td>
    </tr>
  );
}

export function RegistrationTable({ title, registrations, onRemove }) {
  const sorted = registrations.toSorted((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

  return (
    <section className="panel__section">
      <h2 className="panel__heading">
        {title} <span className="table__muted">{registrations.length}</span>
      </h2>
      {sorted.length === 0 ? (
        <p className="panel__empty">Ninguém nesta categoria ainda.</p>
      ) : (
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Tamanho</th>
                <th scope="col">Faixa</th>
                <th scope="col">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((registration) => (
                <Row key={registration.id} registration={registration} onRemove={onRemove} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
