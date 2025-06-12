import { create } from "zustand"
import { monitoringService } from "@/lib/api-services"

interface DashboardData {
  production: {
    daily: number
    trend: number
  }
  equipment: {
    operationRate: number
    trend: number
  }
  personnel: {
    online: number
    change: number
  }
  safety: {
    days: number
    trend: number
  }
}

interface Alert {
  id: string
  time: string
  type: string
  level: string
  location: string
  description: string
  status: string
  source: string
}

interface MonitoringState {
  dashboardData: DashboardData | null
  alerts: Alert[]
  isLoading: boolean
  error: string | null
  fetchDashboardData: () => Promise<void>
  fetchAlerts: (params?: any) => Promise<void>
  processAlert: (alertId: string, processData: any) => Promise<void>
}

export const useMonitoringStore = create<MonitoringState>((set, get) => ({
  dashboardData: null,
  alerts: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await monitoringService.getDashboardData()
      set({ dashboardData: data, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch dashboard data",
        isLoading: false,
      })
    }
  },

  fetchAlerts: async (params) => {
    set({ isLoading: true, error: null })
    try {
      const data = await monitoringService.getAlerts(params)
      set({ alerts: data.items || data, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch alerts",
        isLoading: false,
      })
    }
  },

  processAlert: async (alertId, processData) => {
    try {
      await monitoringService.processAlert(alertId, processData)
      // 重新获取告警列表
      await get().fetchAlerts()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to process alert",
      })
      throw error
    }
  },
}))
