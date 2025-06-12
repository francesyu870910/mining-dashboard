import { apiClient } from "./api-client"

// 认证服务
export const authService = {
  login: async (credentials: { username: string; password: string }) => {
    return apiClient.post("/api/auth/login", credentials)
  },

  logout: async () => {
    return apiClient.post("/api/auth/logout")
  },

  getProfile: async () => {
    return apiClient.get("/api/auth/profile")
  },
}

// 用户管理服务
export const userService = {
  getUsers: async (params?: { page?: number; pageSize?: number; search?: string }) => {
    return apiClient.get("/api/users", { params })
  },

  createUser: async (userData: any) => {
    return apiClient.post("/api/users", userData)
  },

  updateUser: async (id: string, userData: any) => {
    return apiClient.put(`/api/users/${id}`, userData)
  },

  deleteUser: async (id: string) => {
    return apiClient.delete(`/api/users/${id}`)
  },
}

// 监控数据服务
export const monitoringService = {
  getDashboardData: async () => {
    return apiClient.get("/api/monitoring/dashboard")
  },

  getAlerts: async (params?: {
    page?: number
    pageSize?: number
    level?: string
    type?: string
    status?: string
  }) => {
    return apiClient.get("/api/monitoring/alerts", { params })
  },

  processAlert: async (alertId: string, processData: any) => {
    return apiClient.post(`/api/monitoring/alerts/${alertId}/process`, processData)
  },

  getCameras: async () => {
    return apiClient.get("/api/monitoring/cameras")
  },
}

// 事件管理服务
export const eventService = {
  getEvents: async (params?: {
    page?: number
    pageSize?: number
    type?: string
    level?: string
    startTime?: string
    endTime?: string
  }) => {
    return apiClient.get("/api/events", { params })
  },

  getEventDetail: async (eventId: string) => {
    return apiClient.get(`/api/events/${eventId}`)
  },
}

// 目标库服务
export const targetService = {
  getPersonnelTargets: async (params?: { page?: number; pageSize?: number; search?: string }) => {
    return apiClient.get("/api/targets/personnel", { params })
  },

  getVehicleTargets: async (params?: { page?: number; pageSize?: number; search?: string }) => {
    return apiClient.get("/api/targets/vehicles", { params })
  },

  getEquipmentTargets: async (params?: { page?: number; pageSize?: number; search?: string }) => {
    return apiClient.get("/api/targets/equipment", { params })
  },

  addPersonnelTarget: async (targetData: any) => {
    return apiClient.post("/api/targets/personnel", targetData)
  },
}
