import { create } from "zustand"
import { persist } from "zustand/middleware"
import { authService } from "@/lib/api-services"

interface User {
  id: string
  username: string
  name: string
  role: string
  department: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: { username: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true })
        try {
          const response = await authService.login(credentials)
          const { user, accessToken, refreshToken } = response

          localStorage.setItem("access_token", accessToken)
          localStorage.setItem("refresh_token", refreshToken)

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        try {
          await authService.logout()
        } catch (error) {
          console.error("Logout error:", error)
        } finally {
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          set({
            user: null,
            isAuthenticated: false,
          })
        }
      },

      checkAuth: async () => {
        const token = localStorage.getItem("access_token")
        if (!token) {
          set({ isAuthenticated: false })
          return
        }

        try {
          const user = await authService.getProfile()
          set({
            user,
            isAuthenticated: true,
          })
        } catch (error) {
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          set({
            user: null,
            isAuthenticated: false,
          })
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
