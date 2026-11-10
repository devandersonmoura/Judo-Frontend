import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DeleteDialog } from './DeleteDialog.jsx';
import { EditDialog } from './EditDialog.jsx';

export function RowActions({ registration, onRemove, onSave }) {
  const { name } = registration;
  const [dialog, setDialog] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const closeDialog = () => setDialog(null);

  const handleDelete = async () => {
    setDeleting(true);
    await onRemove();
    setDeleting(false);
    closeDialog();
  };

  const handleSave = async (data) => {
    await onSave(data);
    closeDialog();
  };

  return (
    <div className="row-actions">
      <button
        className="button button--small button--icon"
        type="button"
        aria-label={`Editar ${name}`}
        onClick={() => setDialog('edit')}
      >
        <Pencil size={14} aria-hidden="true" />
        Editar
      </button>
      <button
        className="button button--small button--icon button--danger"
        type="button"
        aria-label={`Apagar ${name}`}
        onClick={() => setDialog('delete')}
      >
        <Trash2 size={14} aria-hidden="true" />
        Apagar
      </button>

      {dialog === 'edit' && (
        <EditDialog registration={registration} onCancel={closeDialog} onSave={handleSave} />
      )}
      {dialog === 'delete' && (
        <DeleteDialog
          name={name}
          deleting={deleting}
          onCancel={closeDialog}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
