import { useState } from 'react';
import { login } from '../api.js';
import { TEACHER_NAME } from '../teacher.js';
import { Logo } from '../ui/Logo.jsx';

export function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setError('');
    try {
      onLogin(await login(password));
    } catch (failure) {
      setError(failure.message);
      setSending(false);
    }
  };

  return (
    <main className="login">
      <Logo className="logo--login" />
      <h1 className="login__title">{TEACHER_NAME}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field" data-invalid={error ? 'true' : undefined}>
          <label className="field__label" htmlFor="password">
            Senha
          </label>
          <input
            className="text-input"
            id="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && (
            <p className="field__error" role="alert">
              {error}
            </p>
          )}
        </div>
        <button className="button button--primary button--wide" type="submit" disabled={sending}>
          {sending ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}
