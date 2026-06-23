import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach access token (skip for auth endpoints — they don't need it)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lumora_access')
  if (token && !config.url.startsWith('/auth/')) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On 401: clear stale tokens and redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401 && !err.config.url.startsWith('/auth/')) {
      localStorage.removeItem('lumora_access')
      localStorage.removeItem('lumora_refresh')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const tokens = {
  set({ access, refresh }) {
    if (access) localStorage.setItem('lumora_access', access)
    if (refresh) localStorage.setItem('lumora_refresh', refresh)
  },
  clear() {
    localStorage.removeItem('lumora_access')
    localStorage.removeItem('lumora_refresh')
  },
  get access() {
    return localStorage.getItem('lumora_access')
  },
}

export const isAuthed = () => Boolean(tokens.access)

// ---- Auth endpoints (match lumora-BE) ----
export const authApi = {
  login: (identifier, password) => {
    localStorage.removeItem('lumora_access')
    localStorage.removeItem('lumora_refresh')
    return api.post('/auth/login/', { identifier, password })
  },

  register: (payload) => api.post('/auth/register/', payload),

  forgotPassword: (identifier) =>
    api.post('/auth/forgot-password/', { identifier }),

  verifyOtp: (identifier, code) =>
    api.post('/auth/verify-otp/', { identifier, code }),

  resetPassword: (reset_token, password) =>
    api.post('/auth/reset-password/', { reset_token, password }),

  me: () => api.get('/auth/me/'),
}

export default api
