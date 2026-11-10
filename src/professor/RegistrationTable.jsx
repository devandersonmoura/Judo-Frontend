import { useState } from 'react';
import { useOptions } from '../options/OptionsContext.jsx';
import { BeltStrip } from '../ui/BeltStrip.jsx';
import { Pagination } from '../ui/Pagination.jsx';
import { formatDateTime } from './formatDateTime.js';
import { RowActions } from './RowActions.jsx';

const PAGE_SIZE = 10;

const findOption = (options, value) => options.find((option) => option.value === value);

function Row({ registration, onRemove, onSave }) {
  const { belts, sizes, statuses } = useOptions();
  const { id, name } = registration;
  const size = findOption(sizes, registration.size);
  const belt = findOption(belts, registration.belt);
  const status = findOption(statuses, registration.status);

  return (
    <tr>
      <td className="table__name">{name}</td>
      <td className="table__nowrap" data-label="Tamanho">
        <span>
          {size.label} <span className="table__muted">{size.length}</span>
        </span>
      </td>
      <td data-label="Faixa">
        <span className="belt-label">
          <BeltStrip color={belt.color} className="belt-strip--small" />
          {belt.label}
        </span>
      </td>
      <td className="table__nowrap" data-label="Enviado em">
        {formatDateTime(registration.createdAt)}
      </td>
      <td data-label="Status">
        <span className="status-badge" data-status={status.value}>
          <span className="status-dot" data-status={status.value} />
          {status.label}
        </span>
      </td>
      <td className="table__actions">
        <RowActions
          registration={registration}
          onRemove={() => onRemove(id)}
          onSave={(data) => onSave(id, data)}
        />
      </td>
    </tr>
  );
}

export function RegistrationTable({ title, registrations, onRemove, onSave }) {
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
                  onSave={onSave}
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
