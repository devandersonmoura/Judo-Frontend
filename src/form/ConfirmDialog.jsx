import { useOptions } from '../options/OptionsContext.jsx';
import { BeltStrip } from '../ui/BeltStrip.jsx';
import { Modal } from '../ui/Modal.jsx';

const findOption = (options, value) => options.find((option) => option.value === value);

export function ConfirmDialog({ entry, sending, onCancel, onConfirm }) {
  const { belts, categories, sizes } = useOptions();
  const belt = findOption(belts, entry.belt);
  const size = findOption(sizes, entry.size);
  const category = findOption(categories, entry.category);

  return (
    <Modal labelledBy="confirm-title" busy={sending} onClose={onCancel}>
      <h2 className="dialog__title" id="confirm-title">
        Tem certeza que quer enviar?
      </h2>
      <p className="dialog__text">Confira os dados antes de enviar.</p>

      <dl className="summary">
        <div className="summary__row">
          <dt>Nome</dt>
          <dd>{entry.name.trim()}</dd>
        </div>
        <div className="summary__row">
          <dt>Categoria</dt>
          <dd>{category.label}</dd>
        </div>
        <div className="summary__row">
          <dt>Faixa</dt>
          <dd className="belt-label">
            <BeltStrip color={belt.color} className="belt-strip--small" />
            {belt.label}
          </dd>
        </div>
        <div className="summary__row">
          <dt>Tamanho</dt>
          <dd>
            {size.label} · {size.length}
          </dd>
        </div>
      </dl>

      <div className="dialog__actions">
        <button className="button" type="button" disabled={sending} onClick={onCancel}>
          Voltar
        </button>
        <button
          className="button button--primary"
          type="button"
          disabled={sending}
          onClick={onConfirm}
          autoFocus
        >
          {sending ? 'Enviando…' : 'Sim, enviar'}
        </button>
      </div>
    </Modal>
  );
}
