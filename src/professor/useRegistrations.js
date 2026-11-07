import { useCallback, useEffect, useState } from 'react';
import { deleteRegistration, fetchRegistrations, updateRegistrationStatus } from '../api.js';

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

  const changeStatus = async (id, status) => {
    try {
      const updated = await updateRegistrationStatus(id, status, token);
      setRegistrations((current) => current.map((item) => (item.id === id ? updated : item)));
    } catch (failure) {
      handleFailure(failure);
    }
  };

  return { registrations, error, remove, changeStatus, handleFailure };
}
