import { useCallback, useEffect, useState } from 'react';
import { deleteRegistration, fetchRegistrations, updateRegistration } from '../api.js';

export function useRegistrations(token, onExpired) {
  const [registrations, setRegistrations] = useState(null);
  const [error, setError] = useState('');

  const handleFailure = useCallback(
    (failure) => {
      if (failure.status === 401) onExpired();
      else setError(failure.message);
    },
    [onExpired],
  );

  const reload = useCallback(async () => {
    try {
      setRegistrations(await fetchRegistrations(token));
      setError('');
    } catch (failure) {
      handleFailure(failure);
    }
  }, [token, handleFailure]);

  // Quem preencheu agora aparece quando o professor volta para a aba.
  useEffect(() => {
    reload();
    window.addEventListener('focus', reload);
    return () => window.removeEventListener('focus', reload);
  }, [reload]);

  const remove = async (id) => {
    try {
      await deleteRegistration(id, token);
      setRegistrations((current) => current.filter((item) => item.id !== id));
    } catch (failure) {
      handleFailure(failure);
    }
  };

  // Os erros seguem para o modal, que mostra o que corrigir sem fechar.
  const save = async (id, data) => {
    try {
      const updated = await updateRegistration(id, data, token);
      setRegistrations((current) => current.map((item) => (item.id === id ? updated : item)));
    } catch (failure) {
      if (failure.status === 401) onExpired();
      throw failure;
    }
  };

  return { registrations, error, remove, save, handleFailure };
}
