export class ApiError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

const OFFLINE_MESSAGE = 'Não foi possível conectar. Verifique a internet e tente de novo.';

async function send(path, { token, body, method = 'GET' } = {}) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    return await fetch(`${API_URL}/api${path}`, {
      method,
      headers,
      body: body && JSON.stringify(body),
    });
  } catch {
    throw new ApiError(OFFLINE_MESSAGE);
  }
}

async function ensureOk(response) {
  if (response.ok) return response;
  const data = await response.json().catch(() => ({}));
  const fallback = data.errors ? 'Confira os campos marcados.' : OFFLINE_MESSAGE;
  throw new ApiError(data.error ?? fallback, {
    status: response.status,
    errors: data.errors,
  });
}

const request = async (path, options) => ensureOk(await send(path, options));

export async function fetchOptions() {
  const response = await request('/options');
  return response.json();
}

export async function submitRegistration(entry) {
  const response = await request('/registrations', { method: 'POST', body: entry });
  return response.json();
}

export async function login(password) {
  const response = await request('/login', { method: 'POST', body: { password } });
  return (await response.json()).token;
}

export async function fetchRegistrations(token) {
  const response = await request('/registrations', { token });
  return response.json();
}

export async function updateRegistration(id, field, value, token) {
  const response = await request(`/registrations/${id}/${field}`, {
    method: 'PATCH',
    body: { [field]: value },
    token,
  });
  return response.json();
}

export async function deleteRegistration(id, token) {
  await request(`/registrations/${id}`, { method: 'DELETE', token });
}

export async function downloadCsv(token) {
  const response = await request('/registrations/export.csv', { token });
  const url = URL.createObjectURL(await response.blob());
  const link = document.createElement('a');
  link.href = url;
  link.download = 'faixas-judo.csv';
  link.click();
  // Alguns navegadores ainda estão lendo o arquivo logo depois do clique.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
