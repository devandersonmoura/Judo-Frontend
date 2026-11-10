import { useId, useState } from 'react';
import { useOptions } from '../options/OptionsContext.jsx';
import { BeltStrip } from '../ui/BeltStrip.jsx';
import { Modal } from '../ui/Modal.jsx';
import { Select } from '../ui/Select.jsx';
import { formatDateTime } from './formatDateTime.js';

const noIcon = () => null;
const renderBelt = ({ color }) => <BeltStrip color={color} className="belt-strip--small" />;
const renderStatus = ({ value }) => <span className="status-dot" data-status={value} />;

function SelectField({ label, error, ...selectProps }) {
  return (
    <div className="field" data-invalid={error ? 'true' : undefined}>
      <span className="field__label">{label}</span>
      <Select label={label} {...selectProps} />
      {error && <p className="field__error">{error}</p>}
    </div>
  );
}

export function EditDialog({ registration, onCancel, onSave }) {
  const { belts, categories, sizes, statuses } = useOptions();
  const titleId = useId();
  const nameId = useId();
  const { name, category, size, belt, status } = registration;
  const [draft, setDraft] = useState({ name, category, size, belt, status });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const sizeOptions = sizes.map((option) => ({
    value: option.value,
    label: `${option.label} · ${option.length}`,
  }));

  const change = (field) => (value) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFormError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSave(draft);
    } catch (failure) {
      setErrors(failure.errors ?? {});
      if (!failure.errors) setFormError(failure.message);
      setSaving(false);
    }
  };

  return (
    <Modal labelledBy={titleId} busy={saving} onClose={onCancel}>
      <h2 className="dialog__title" id={titleId}>
        Editar pedido
      </h2>
      <p className="dialog__text">Enviado em {formatDateTime(registration.createdAt)}</p>

      <form className="edit-form" onSubmit={handleSubmit} noValidate>
        <div className="field" data-invalid={errors.name ? 'true' : undefined}>
          <label className="field__label" htmlFor={nameId}>
            Nome completo
          </label>
          <input
            className="text-input"
            id={nameId}
            maxLength={80}
            autoComplete="off"
            value={draft.name}
            onChange={(event) => change('name')(event.target.value)}
          />
          {errors.name && <p className="field__error">{errors.name}</p>}
        </div>

        <div className="edit-form__row">
          <SelectField
            label="Categoria"
            options={categories}
            value={draft.category}
            renderIcon={noIcon}
            error={errors.category}
            onChange={change('category')}
          />
          <SelectField
            label="Tamanho"
            options={sizeOptions}
            value={draft.size}
            renderIcon={noIcon}
            error={errors.size}
            onChange={change('size')}
          />
          <SelectField
            label="Faixa"
            options={belts}
            value={draft.belt}
            renderIcon={renderBelt}
            error={errors.belt}
            onChange={change('belt')}
          />
          <SelectField
            label="Status"
            options={statuses}
            value={draft.status}
            renderIcon={renderStatus}
            error={errors.status}
            onChange={change('status')}
          />
        </div>

        {formError && (
          <p className="form__error" role="alert">
            {formError}
          </p>
        )}

        <div className="dialog__actions">
          <button className="button" type="button" disabled={saving} onClick={onCancel}>
            Cancelar
          </button>
          <button className="button button--primary" type="submit" disabled={saving}>
            {saving ? 'Salvando…' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
