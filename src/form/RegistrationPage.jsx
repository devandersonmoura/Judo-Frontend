import { useState } from 'react';
import { submitRegistration } from '../api.js';
import { useOptions } from '../options/OptionsContext.jsx';
import { RegistrationForm } from './RegistrationForm.jsx';
import { SuccessCard } from './SuccessCard.jsx';

const EMPTY_ENTRY = { category: '', name: '', belt: '', size: '' };

function withoutKeys(object, keys) {
  return Object.fromEntries(Object.entries(object).filter(([key]) => !keys.includes(key)));
}

export function RegistrationPage() {
  const { belts } = useOptions();
  const [entry, setEntry] = useState(EMPTY_ENTRY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [sending, setSending] = useState(false);
  const [saved, setSaved] = useState(null);
  const [rejectedCount, setRejectedCount] = useState(0);

  const beltColor = belts.find(({ value }) => value === (saved?.belt ?? entry.belt))?.color;

  const handleChange = (patch) => {
    setEntry((current) => ({ ...current, ...patch }));
    setErrors((current) => withoutKeys(current, Object.keys(patch)));
    setFormError('');
  };

  const handleSubmit = async () => {
    setSending(true);
    setFormError('');
    try {
      setSaved(await submitRegistration(entry));
      setEntry(EMPTY_ENTRY);
      window.scrollTo({ top: 0 });
    } catch (error) {
      setErrors(error.errors ?? {});
      if (error.errors) setRejectedCount((count) => count + 1);
      else setFormError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <p className="hero__eyebrow">Judô</p>
        <h1 className="hero__title">Cadastro de faixas</h1>
        <p className="hero__text">
          Preencha uma vez por pessoa. Para crianças, o responsável preenche com o nome delas.
        </p>
        <span
          className="hero__belt"
          style={beltColor ? { '--belt': beltColor } : undefined}
          aria-hidden="true"
        />
      </header>

      <main className="page__content">
        {saved ? (
          <SuccessCard registration={saved} onReset={() => setSaved(null)} />
        ) : (
          <RegistrationForm
            entry={entry}
            errors={errors}
            formError={formError}
            sending={sending}
            rejectedCount={rejectedCount}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
      </main>
    </div>
  );
}
