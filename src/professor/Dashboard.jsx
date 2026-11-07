import { downloadCsv } from '../api.js';
import { useOptions } from '../options/OptionsContext.jsx';
import { FormLink } from './FormLink.jsx';
import { OrderSummary } from './OrderSummary.jsx';
import { RegistrationTable } from './RegistrationTable.jsx';
import { useRegistrations } from './useRegistrations.js';

function countLabel(total) {
  return total === 1 ? '1 pessoa preencheu' : `${total} pessoas preencheram`;
}

export function Dashboard({ token, onLogout }) {
  const { categories } = useOptions();
  const { registrations, error, remove, handleFailure } = useRegistrations(token, onLogout);
  const hasEntries = registrations?.length > 0;

  return (
    <div className="panel">
      <header className="panel__header">
        <div>
          <h1 className="panel__title">Cadastro de faixas</h1>
          {registrations && <p className="panel__count">{countLabel(registrations.length)}</p>}
        </div>
        <div className="panel__actions">
          {hasEntries && (
            <button
              className="button button--primary"
              type="button"
              onClick={() => downloadCsv(token).catch(handleFailure)}
            >
              Baixar planilha
            </button>
          )}
          <button className="button" type="button" onClick={onLogout}>
            Sair
          </button>
        </div>
      </header>

      {error && (
        <p className="form__error" role="alert">
          {error}
        </p>
      )}
      {!registrations && !error && <p className="panel__empty">Carregando…</p>}
      {registrations?.length === 0 && (
        <p className="panel__empty">
          Ninguém preencheu ainda. Envie o link abaixo para a turma; cada cadastro aparece aqui.
        </p>
      )}

      <FormLink />

      {hasEntries && (
        <>
          <OrderSummary registrations={registrations} />
          <div className="panel__tables">
            {categories.map(({ value, label }) => (
              <RegistrationTable
                key={value}
                title={label === 'Adulto' ? 'Adultos' : label}
                registrations={registrations.filter((item) => item.category === value)}
                onRemove={remove}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
