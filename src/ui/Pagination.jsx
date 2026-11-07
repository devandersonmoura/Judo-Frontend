export function Pagination({ label, page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  return (
    <nav className="pagination" aria-label={label}>
      <button
        className="button button--small"
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Anterior
      </button>
      <span className="pagination__status">
        Página {page} de {pageCount}
      </span>
      <button
        className="button button--small"
        type="button"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
      >
        Próxima
      </button>
    </nav>
  );
}
