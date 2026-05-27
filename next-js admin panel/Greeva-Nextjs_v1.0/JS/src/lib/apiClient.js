/**
 * Simple fetch wrapper for Panzer IT Backend.
 * - Uses cookie-based auth (credentials: "include")
 * - Reads base URL from NEXT_PUBLIC_API_BASE_URL
 */
const DEFAULT_TIMEOUT_MS = 15000;
const baseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:3001';

class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

const withTimeout = async (promise, timeoutMs = DEFAULT_TIMEOUT_MS) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Request timed out')), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId);
  }
};

const safeJson = async (res) => {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const apiFetch = async (
  path,
  { method = 'GET', body, headers, timeoutMs, ...init } = {}
) => {
  const url = path.startsWith('http') ? path : `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const finalHeaders = {
    Accept: 'application/json',
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(headers || {})
  };

  const res = await withTimeout(
    fetch(url, {
      method,
      credentials: 'include',
      headers: finalHeaders,
      body: body == null ? undefined : isFormData ? body : JSON.stringify(body),
      ...init
    }),
    timeoutMs
  );

  const data = await safeJson(res);

  if (!res.ok) {
    const message =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      `Request failed (${res.status})`;
    throw new ApiError(message, { status: res.status, data });
  }

  return data;
};

export const api = {
  get: (path, init) => apiFetch(path, { ...init, method: 'GET' }),
  post: (path, body, init) => apiFetch(path, { ...init, method: 'POST', body }),
  put: (path, body, init) => apiFetch(path, { ...init, method: 'PUT', body }),
  patch: (path, body, init) => apiFetch(path, { ...init, method: 'PATCH', body }),
  del: (path, init) => apiFetch(path, { ...init, method: 'DELETE' })
};

export { ApiError, baseUrl };

