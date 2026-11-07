export function ChoiceGroup({ legend, hint, error, className, children }) {
  return (
    <fieldset className="field" data-invalid={error ? 'true' : undefined}>
      <legend className="field__label">{legend}</legend>
      {hint && <p className="field__hint">{hint}</p>}
      <div className={`choices ${className}`}>{children}</div>
      {error && <p className="field__error">{error}</p>}
    </fieldset>
  );
}

export function Choice({ name, value, checked, onChange, children }) {
  return (
    <label className="choice">
      <input
        className="choice__input"
        type="radio"
        id={`${name}-${value}`}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span className="choice__body">{children}</span>
    </label>
  );
}
