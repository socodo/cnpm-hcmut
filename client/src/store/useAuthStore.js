import { authService } from '@/service/auth.service'
import { create } from 'zustand'

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  user: null,
  loading: null,
  error: null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',


  signin: async (credentials) => {
    try {
      set({ loading: true })
      const response = await authService.signin(credentials)
      localStorage.setItem('isAuthenticated', 'true')
      set({
        accessToken: response.data.accessToken,
        user: response.data.user,
        loading: false,
        isAuthenticated: true
      })

      console.log('dang nhap thanh cong', get().user)
      return response
    }

    catch (error) {
      console.error('dang nhap k thanh cong')
      set({ loading: false, error: error.message || 'Login failed' })
      throw error
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true })
      const response = await authService.fetchMe()
      set({
        user: response.data.user,
        accessToken: response.data.accessToken,
        loading: false
      })
      return response
    }

    catch (error) {
      set({ loading: false, error: error.message || 'Fetch me failed' })
      throw error
    }
  },
  setAccessToken: (token) => {
    set({ accessToken: token })
  },
  logout: async () => {
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false
    })
    const response = await authService.logout()
    localStorage.setItem('isAuthenticated', 'false')

  }
}))