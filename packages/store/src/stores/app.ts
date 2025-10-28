import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface AppState {
  // UI State
  theme: 'light' | 'dark' | 'system'
  sidebarCollapsed: boolean
  activeTab: string
  notifications: Notification[]

  // App State
  isLoading: boolean
  error: string | null

  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleSidebar: () => void
  setActiveTab: (tab: string) => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

export const useAppStore = create<AppState>()(
  immer((set) => ({
    // Initial state
    theme: 'system',
    sidebarCollapsed: false,
    activeTab: 'dashboard',
    notifications: [],
    isLoading: false,
    error: null,

    // Actions
    setTheme: (theme) => {
      set((state) => {
        state.theme = theme
      })
    },

    toggleSidebar: () => {
      set((state) => {
        state.sidebarCollapsed = !state.sidebarCollapsed
      })
    },

    setActiveTab: (tab) => {
      set((state) => {
        state.activeTab = tab
      })
    },

    addNotification: (notification) => {
      set((state) => {
        const id = Math.random().toString(36).substring(2)
        state.notifications.push({
          ...notification,
          id,
        })
      })
    },

    removeNotification: (id) => {
      set((state) => {
        state.notifications = state.notifications.filter(n => n.id !== id)
      })
    },

    setLoading: (loading) => {
      set((state) => {
        state.isLoading = loading
      })
    },

    setError: (error) => {
      set((state) => {
        state.error = error
      })
    },

    clearError: () => {
      set((state) => {
        state.error = null
      })
    },
  }))
)

export type { Notification }