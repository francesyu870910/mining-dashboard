"use client"

import { useEffect } from "react"
import { useWebSocket } from "@/lib/websocket"
import { useMonitoringStore } from "@/store/monitoring-store"

export function useRealTimeData() {
  const ws = useWebSocket(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080/ws")
  const { fetchDashboardData, fetchAlerts } = useMonitoringStore()

  useEffect(() => {
    if (!ws) return

    // 订阅实时告警
    const handleNewAlert = (alertData: any) => {
      console.log("New alert received:", alertData)
      fetchAlerts() // 重新获取告警列表
    }

    // 订阅仪表板数据更新
    const handleDashboardUpdate = (dashboardData: any) => {
      console.log("Dashboard data updated:", dashboardData)
      fetchDashboardData()
    }

    // 订阅设备状态更新
    const handleDeviceStatus = (deviceData: any) => {
      console.log("Device status updated:", deviceData)
      // 更新设备状态
    }

    ws.subscribe("new_alert", handleNewAlert)
    ws.subscribe("dashboard_update", handleDashboardUpdate)
    ws.subscribe("device_status", handleDeviceStatus)

    return () => {
      ws.unsubscribe("new_alert", handleNewAlert)
      ws.unsubscribe("dashboard_update", handleDashboardUpdate)
      ws.unsubscribe("device_status", handleDeviceStatus)
    }
  }, [ws, fetchDashboardData, fetchAlerts])
}
