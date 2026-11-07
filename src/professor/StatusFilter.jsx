import { useOptions } from '../options/OptionsContext.jsx';

export const ALL_STATUSES = 'todos';

function FilterButton({ label, count, active, onClick }) {
  return (
    <button className="status-filter__button" type="button" aria-pressed={active} onClick={onClick}>
      {label} <span className="status-filter__count">{count}</span>
    </button>
  );
}

export function StatusFilter({ registrations, value, onChange }) {
  const { statuses } = useOptions();

  return (
    <div className="status-filter" role="group" aria-label="Filtrar pedidos por status">
      <FilterButton
        label="Todos"
        count={registrations.length}
        active={value === ALL_STATUSES}
        onClick={() => onChange(ALL_STATUSES)}
      />
      {statuses.map((status) => (
        <FilterButton
          key={status.value}
          label={status.label}
          count={registrations.filter((item) => item.status === status.value).length}
          active={value === status.value}
          onClick={() => onChange(status.value)}
        />
      ))}
    </div>
  );
}
