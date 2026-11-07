import { useState } from 'react';
import { Dashboard } from './Dashboard.jsx';
import { LoginForm } from './LoginForm.jsx';

const STORAGE_KEY = 'professor-token';

export function ProfessorPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem(STORAGE_KEY));

  const handleLogin = (newToken) => {
    sessionStorage.setItem(STORAGE_KEY, newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken(null);
  };

  if (!token) return <LoginForm onLogin={handleLogin} />;
  return <Dashboard token={token} onLogout={handleLogout} />;
}
