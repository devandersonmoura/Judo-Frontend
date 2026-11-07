import { useState } from 'react';
import { useOptions } from '../options/OptionsContext.jsx';
import { Pagination } from '../ui/Pagination.jsx';
import { BeltSelect } from './BeltSelect.jsx';
import { DeleteDialog } from './DeleteDialog.jsx';
import { formatDateTime } from './formatDateTime.js';
import { StatusSelect } from './StatusSelect.jsx';

const PAGE_SIZE = 10;

function RemoveButton({ name, onRemove }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    await onRemove();
    setDeleting(false);
    setConfirming(false);
  };

  return (
    <>
      <button
        className="button button--small button--danger"
        type="button"
        aria-label={`Apagar ${name}`}
        onClick={() => setConfirming(true)}
      >
        Apagar
      </button>
      {confirming && (
        <DeleteDialog
          name={name}
          deleting={deleting}
          onCancel={() => setConfirming(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

function Row({ registration, onRemove, onFieldChange }) {
  const { sizes } = useOptions();
  const { id, name } = registration;
  const size = sizes.find(({ value }) => value === registration.size);

  return (
    <tr>
      <td className="table__name">{name}</td>
      <td className="table__nowrap" data-label="Tamanho">
        <span>
          {size.label} <span className="table__muted">{size.length}</span>
        </span>
      </td>
      <td data-label="Faixa">
        <BeltSelect
          name={name}
          value={registration.belt}
          onChange={(belt) => onFieldChange(id, 'belt', belt)}
        />
      </td>
      <td className="table__nowrap" data-label="Enviado em">{formatDateTime(registration.createdAt)}</td>
      <td data-label="Status">
        <StatusSelect
          name={name}
          value={registration.status}
          onChange={(status) => onFieldChange(id, 'status', status)}
        />
      </td>
      <td className="table__actions">
        <RemoveButton name={name} onRemove={() => onRemove(id)} />
      </td>
    </tr>
  );
}

export function RegistrationTable({ title, registrations, onRemove, onFieldChange }) {
  const [requestedPage, setPage] = useState(1);
  const sorted = registrations.toSorted((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

  // Apagar o último pedido de uma página não pode deixar a tela em uma página vazia.
  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const page = Math.min(requestedPage, pageCount);
  const pageRows = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="panel__section">
      <h2 className="panel__heading">
        {title} <span className="table__muted">{registrations.length}</span>
      </h2>
      {sorted.length === 0 ? (
        <p className="panel__empty">Nenhum pedido aqui.</p>
      ) : (
        <div className="table-scroll">
          <table className="table table--orders">
            <thead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Tamanho</th>
                <th scope="col">Faixa</th>
                <th scope="col">Enviado em</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((registration) => (
                <Row
                  key={registration.id}
                  registration={registration}
                  onRemove={onRemove}
                  onFieldChange={onFieldChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        label={`Páginas de ${title}`}
        page={page}
        pageCount={pageCount}
        onChange={setPage}
      />
    </section>
  );
}
