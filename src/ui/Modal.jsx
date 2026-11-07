import { useEffect, useRef } from 'react';

export function Modal({ labelledBy, busy = false, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  const close = () => {
    if (!busy) onClose();
  };

  const handleEscape = (event) => {
    event.preventDefault();
    close();
  };

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      aria-labelledby={labelledBy}
      onCancel={handleEscape}
      onClick={handleBackdropClick}
    >
      <div className="dialog__body">{children}</div>
    </dialog>
  );
}
