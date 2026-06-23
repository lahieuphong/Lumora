import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Endpoints that must NOT send an Authorization header
const PUBLIC_ENDPOINTS = [
  '/auth/login/',
  '/auth/register/',
  '/auth/forgot-password/',
  '/auth/verify-otp/',
  '/auth/reset-password/',
]

// Attach access token (skip only for public auth endpoints)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lumora_access')
  if (token && !PUBLIC_ENDPOINTS.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// On 401 from a protected endpoint: clear tokens and go to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isPublic = PUBLIC_ENDPOINTS.includes(err?.config?.url)
    if (err?.response?.status === 401 && !isPublic) {
      localStorage.removeItem('lumora_access')
      localStorage.removeItem('lumora_refresh')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
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
