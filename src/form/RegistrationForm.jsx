import { useEffect, useRef } from 'react';
import { useOptions } from '../options/OptionsContext.jsx';
import { TEACHER_SHORT_NAME } from '../teacher.js';
import { BeltStrip } from '../ui/BeltStrip.jsx';
import { Choice, ChoiceGroup } from '../ui/ChoiceGroup.jsx';

export function RegistrationForm({
  entry,
  errors,
  formError,
  rejectedCount,
  onChange,
  onSubmit,
}) {
  const { belts, categories, sizes } = useOptions();
  const formRef = useRef(null);
  const isChild = entry.category === 'infantil';

  useEffect(() => {
    formRef.current?.querySelector('[data-invalid] input')?.focus();
  }, [rejectedCount]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
      <p className="form__intro">
        Preencha uma vez por pessoa. Para crianças, o responsável preenche com o nome delas.
      </p>

      <ChoiceGroup legend="Quem vai usar a faixa?" error={errors.category} className="choices--two">
        {categories.map(({ value, label }) => (
          <Choice
            key={value}
            name="category"
            value={value}
            checked={entry.category === value}
            onChange={(category) => onChange({ category })}
          >
            <span className="choice__title">{label}</span>
          </Choice>
        ))}
      </ChoiceGroup>

      <div className="field" data-invalid={errors.name ? 'true' : undefined}>
        <label className="field__label" htmlFor="name">
          {isChild ? 'Nome completo da criança' : 'Nome completo'}
        </label>
        <input
          className="text-input"
          id="name"
          name="name"
          autoComplete={isChild ? 'off' : 'name'}
          maxLength={80}
          value={entry.name}
          onChange={(event) => onChange({ name: event.target.value })}
        />
        {errors.name && <p className="field__error">{errors.name}</p>}
      </div>

      <ChoiceGroup legend="Cor da faixa nova" error={errors.belt} className="choices--three">
        {belts.map(({ value, label, color }) => (
          <Choice
            key={value}
            name="belt"
            value={value}
            checked={entry.belt === value}
            onChange={(belt) => onChange({ belt })}
          >
            <BeltStrip color={color} />
            <span className="choice__caption">{label}</span>
          </Choice>
        ))}
      </ChoiceGroup>

      <ChoiceGroup
        legend="Tamanho da faixa"
        hint={`Não sabe o seu? Pergunte ao ${TEACHER_SHORT_NAME} antes de enviar.`}
        error={errors.size}
        className="choices--three"
      >
        {sizes.map(({ value, label, length }) => (
          <Choice
            key={value}
            name="size"
            value={value}
            checked={entry.size === value}
            onChange={(size) => onChange({ size })}
          >
            <span className="choice__title">{label}</span>
            <span className="choice__caption">{length}</span>
          </Choice>
        ))}
      </ChoiceGroup>

      {formError && (
        <p className="form__error" role="alert">
          {formError}
        </p>
      )}

      <button className="button button--primary button--wide" type="submit">
        Enviar
      </button>
    </form>
  );
}
