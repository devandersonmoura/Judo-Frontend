import { downloadCsv } from '../api.js';
import { TEACHER_NAME } from '../teacher.js';
import { Logo } from '../ui/Logo.jsx';
import { FormLink } from './FormLink.jsx';
import { Orders } from './Orders.jsx';
import { useRegistrations } from './useRegistrations.js';

function countLabel(total) {
  return total === 1 ? '1 pedido' : `${total} pedidos`;
}

export function Dashboard({ token, onLogout }) {
  const { registrations, error, remove, save, handleFailure } = useRegistrations(
    token,
    onLogout,
  );
  const hasEntries = registrations?.length > 0;

  return (
    <div className="panel">
      <header className="panel__header">
        <div className="panel__brand">
          <Logo className="logo--panel" />
          <div>
            <p className="panel__teacher">{TEACHER_NAME}</p>
            <h1 className="panel__title">Troca de faixa</h1>
            {registrations && <p className="panel__count">{countLabel(registrations.length)}</p>}
          </div>
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
          Ninguém preencheu ainda. Envie o link abaixo para a turma; cada pedido aparece aqui.
        </p>
      )}

      <FormLink />

      {hasEntries && (
        <Orders registrations={registrations} onRemove={remove} onSave={save} />
      )}
    </div>
  );
}
