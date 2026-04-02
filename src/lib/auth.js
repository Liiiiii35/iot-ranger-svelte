import { apiFetch } from './api';

export async function loginUser(email, password) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('token_type', data.token_type || 'bearer');
  localStorage.setItem('expires_in', String(data.expires_in || ''));
  return data;
}

export async function registerUser(username, email, password) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password })
  });
}

export function logoutUser() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('token_type');
  localStorage.removeItem('expires_in');
}

export function getToken() {
  return localStorage.getItem('access_token');
}

export function isLoggedIn() {
  return !!localStorage.getItem('access_token');
}