import { useId } from 'react';
import { Modal } from '../ui/Modal.jsx';

export function DeleteDialog({ name, deleting, onCancel, onConfirm }) {
  const titleId = useId();

  return (
    <Modal labelledBy={titleId} busy={deleting} onClose={onCancel}>
      <h2 className="dialog__title" id={titleId}>
        Apagar este pedido?
      </h2>
      <p className="dialog__text">
        O pedido de <strong>{name}</strong> será apagado. Isso não pode ser desfeito.
      </p>

      <div className="dialog__actions">
        <button className="button" type="button" disabled={deleting} onClick={onCancel} autoFocus>
          Voltar
        </button>
        <button
          className="button button--danger-solid"
          type="button"
          disabled={deleting}
          onClick={onConfirm}
        >
          {deleting ? 'Apagando…' : 'Sim, apagar'}
        </button>
      </div>
    </Modal>
  );
}
