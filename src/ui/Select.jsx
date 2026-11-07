import { useId } from 'react';
import { useDropdown } from './useDropdown.js';

function Chevron() {
  return (
    <svg className="select__chevron" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

function Check() {
  return (
    <svg className="select-option__check" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2.5 6.5 5 9l4.5-5.5" />
    </svg>
  );
}

export function Select({ label, options, value, renderIcon, onChange }) {
  const listId = useId();
  const selectedIndex = options.findIndex((option) => option.value === value);

  const dropdown = useDropdown({
    count: options.length,
    selectedIndex,
    onPick: (index) => {
      if (index !== selectedIndex) onChange(options[index].value);
    },
  });

  const optionId = (index) => `${listId}-${index}`;
  const selected = options[selectedIndex];

  return (
    <>
      <button
        ref={dropdown.triggerRef}
        className="select"
        type="button"
        role="combobox"
        data-value={value}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={dropdown.isOpen}
        aria-controls={listId}
        aria-activedescendant={dropdown.isOpen ? optionId(dropdown.activeIndex) : undefined}
        onClick={dropdown.toggle}
        onKeyDown={dropdown.handleKeyDown}
      >
        {selected && renderIcon(selected)}
        {selected?.label ?? value}
        <Chevron />
      </button>

      {dropdown.isOpen && (
        <ul
          ref={dropdown.menuRef}
          className="select-menu"
          id={listId}
          role="listbox"
          aria-label={label}
          style={dropdown.position}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              className="select-option"
              id={optionId(index)}
              role="option"
              aria-selected={index === selectedIndex}
              data-active={index === dropdown.activeIndex ? 'true' : undefined}
              onPointerEnter={() => dropdown.setActiveIndex(index)}
              onClick={() => dropdown.pick(index)}
            >
              {renderIcon(option)}
              {option.label}
              {index === selectedIndex && <Check />}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
