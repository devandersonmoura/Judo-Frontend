import { useRef } from 'react';

export function Tabs({ label, tabs, value, onChange }) {
  const listRef = useRef(null);

  const handleKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;

    event.preventDefault();
    const index = tabs.findIndex((tab) => tab.value === value);
    const next = (index + step + tabs.length) % tabs.length;
    onChange(tabs[next].value);
    listRef.current.querySelectorAll('[role="tab"]')[next].focus();
  };

  return (
    <div ref={listRef} className="tabs" role="tablist" aria-label={label} onKeyDown={handleKeyDown}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className="tabs__tab"
          id={`tab-${tab.value}`}
          type="button"
          role="tab"
          aria-selected={tab.value === value}
          aria-controls={`panel-${tab.value}`}
          tabIndex={tab.value === value ? 0 : -1}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function TabPanel({ value, children }) {
  return (
    <div
      className="tabs__panel"
      id={`panel-${value}`}
      role="tabpanel"
      aria-labelledby={`tab-${value}`}
    >
      {children}
    </div>
  );
}
