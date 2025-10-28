import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// Base configuration
const base = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8787'

// Auth token management
class AuthManager {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  getToken(): string | null {
    if (this.token) return this.token

    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }

    return this.token
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

export const authManager = new AuthManager()

// Custom error types
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'APIError'
  }
}

// Axios instance with interceptors
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: base,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor for auth
  client.interceptors.request.use(
    (config) => {
      const token = authManager.getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        authManager.clearToken()
        // Redirect to login or emit auth error event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-error'))
        }
      }

      const apiError = new APIError(
        error.response?.data?.message || error.message,
        error.response?.status || 500,
        error.response?.data
      )

      return Promise.reject(apiError)
    }
  )

  return client
}

export const apiClient = createApiClient()

// Generic API methods
export const api = {
  // GET request
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.get(url, config)
    return response.data
  },

  // POST request
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config)
    return response.data
  },

  // PUT request
  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config)
    return response.data
  },

  // PATCH request
  patch: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.patch(url, data, config)
    return response.data
  },

  // DELETE request
  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.delete(url, config)
    return response.data
  },
}

// Health check endpoint
export async function health() {
  return api.get<{ ok: boolean; service: string }>('/health')
}

// Auth endpoints
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post<{ token: string; user: any }>('/auth/login', credentials)
    authManager.setToken(response.token)
    return response
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      authManager.clearToken()
    }
  },

  me: async () => {
    return api.get<{ user: any }>('/auth/me')
  },

  refresh: async () => {
    const response = await api.post<{ token: string }>('/auth/refresh')
    authManager.setToken(response.token)
    return response
  },
}

// Wallet endpoints
export const walletApi = {
  scan: async (address: string) => {
    return api.post<{
      address: string
      balance: string
      transactions: number
      assets: any[]
      profitLoss: { total: number; percentage: number }
    }>('/wallet/scan', { address })
  },

  getHistory: async (address: string, limit = 50) => {
    return api.get<{ transactions: any[] }>(`/wallet/${address}/history`, {
      params: { limit }
    })
  },

  getTopPerformers: async (timeframe = '24h') => {
    return api.get<{ wallets: any[] }>('/wallet/top-performers', {
      params: { timeframe }
    })
  },

  getSignals: async (address: string) => {
    return api.get<{ signals: any[] }>(`/wallet/${address}/signals`)
  },
}

// Export everything
export * from '@tanstack/react-query'