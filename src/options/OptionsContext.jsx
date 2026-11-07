import { createContext, useContext, useEffect, useState } from 'react';
import { fetchOptions } from '../api.js';

const OptionsContext = createContext(null);

export function OptionsProvider({ children }) {
  const [options, setOptions] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOptions()
      .then(setOptions)
      .catch((failure) => setError(failure.message));
  }, []);

  if (error) {
    return (
      <p className="app-message" role="alert">
        {error}
      </p>
    );
  }
  if (!options) return <p className="app-message">Carregando…</p>;

  return <OptionsContext.Provider value={options}>{children}</OptionsContext.Provider>;
}

export const useOptions = () => useContext(OptionsContext);
