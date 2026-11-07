import { useState } from 'react';
import { submitRegistration } from '../api.js';
import { useOptions } from '../options/OptionsContext.jsx';
import { TEACHER_NAME } from '../teacher.js';
import { BeltKnot } from '../ui/BeltKnot.jsx';
import { Logo } from '../ui/Logo.jsx';
import { ConfirmDialog } from './ConfirmDialog.jsx';
import { RegistrationForm } from './RegistrationForm.jsx';
import { SuccessCard } from './SuccessCard.jsx';
import { validateEntry } from './validateEntry.js';

const EMPTY_ENTRY = { category: '', name: '', belt: '', size: '' };

function withoutKeys(object, keys) {
  return Object.fromEntries(Object.entries(object).filter(([key]) => !keys.includes(key)));
}

export function RegistrationPage() {
  const { belts } = useOptions();
  const [entry, setEntry] = useState(EMPTY_ENTRY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [saved, setSaved] = useState(null);
  const [rejectedCount, setRejectedCount] = useState(0);

  const beltColor = belts.find(({ value }) => value === (saved?.belt ?? entry.belt))?.color;

  const handleChange = (patch) => {
    setEntry((current) => ({ ...current, ...patch }));
    setErrors((current) => withoutKeys(current, Object.keys(patch)));
    setFormError('');
  };

  const handleSubmit = () => {
    const problems = validateEntry(entry);
    setErrors(problems);
    if (Object.keys(problems).length > 0) setRejectedCount((count) => count + 1);
    else setConfirming(true);
  };

  const handleConfirm = async () => {
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
      setConfirming(false);
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <Logo className="logo--hero" />
        <p className="hero__eyebrow">{TEACHER_NAME}</p>
        <h1 className="hero__title">Troca de faixa</h1>
        <div
          className="hero__belt"
          style={beltColor ? { '--belt': beltColor } : undefined}
          aria-hidden="true"
        >
          <BeltKnot />
        </div>
      </header>

      <main className="page__content">
        {saved ? (
          <SuccessCard registration={saved} onReset={() => setSaved(null)} />
        ) : (
          <RegistrationForm
            entry={entry}
            errors={errors}
            formError={formError}
            rejectedCount={rejectedCount}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
      </main>

      {confirming && (
        <ConfirmDialog
          entry={entry}
          sending={sending}
          onCancel={() => setConfirming(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
