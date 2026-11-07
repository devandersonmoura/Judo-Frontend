import { useState } from 'react';

export function FormLink() {
  const [copied, setCopied] = useState(false);
  const link = window.location.origin;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="form-link">
      <span className="form-link__label">Link do formulário</span>
      <code className="form-link__url">{link}</code>
      <button className="button" type="button" onClick={handleCopy}>
        {copied ? 'Copiado' : 'Copiar'}
      </button>
    </section>
  );
}
