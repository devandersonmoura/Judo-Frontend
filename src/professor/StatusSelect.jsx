import { useId } from 'react';
import { useOptions } from '../options/OptionsContext.jsx';
import { useDropdown } from './useDropdown.js';

function Chevron() {
  return (
    <svg className="status-select__chevron" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

function Check() {
  return (
    <svg className="status-option__check" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 6.5 5 9l4.5-5.5" />
    </svg>
  );
}

export function StatusSelect({ name, value, onChange }) {
  const { statuses } = useOptions();
  const listId = useId();
  const selectedIndex = statuses.findIndex((status) => status.value === value);

  const dropdown = useDropdown({
    count: statuses.length,
    selectedIndex,
    onPick: (index) => {
      if (index !== selectedIndex) onChange(statuses[index].value);
    },
  });

  const optionId = (index) => `${listId}-${index}`;

  return (
    <>
      <button
        ref={dropdown.triggerRef}
        className="status-select"
        type="button"
        role="combobox"
        data-status={value}
        aria-label={`Status do pedido de ${name}`}
        aria-haspopup="listbox"
        aria-expanded={dropdown.isOpen}
        aria-controls={listId}
        aria-activedescendant={dropdown.isOpen ? optionId(dropdown.activeIndex) : undefined}
        onClick={dropdown.toggle}
        onKeyDown={dropdown.handleKeyDown}
      >
        <span className="status-dot" data-status={value} />
        {statuses[selectedIndex]?.label ?? value}
        <Chevron />
      </button>

      {dropdown.isOpen && (
        <ul
          ref={dropdown.menuRef}
          className="status-menu"
          id={listId}
          role="listbox"
          aria-label={`Status do pedido de ${name}`}
          style={dropdown.position}
        >
          {statuses.map((status, index) => (
            <li
              key={status.value}
              className="status-option"
              id={optionId(index)}
              role="option"
              aria-selected={index === selectedIndex}
              data-active={index === dropdown.activeIndex ? 'true' : undefined}
              onPointerEnter={() => dropdown.setActiveIndex(index)}
              onClick={() => dropdown.pick(index)}
            >
              <span className="status-dot" data-status={status.value} />
              {status.label}
              {index === selectedIndex && <Check />}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
