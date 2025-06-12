"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useMonitoringStore } from "@/store/monitoring-store"
import { useRealTimeData } from "@/hooks/use-real-time-data"
import { TrendingUp, Users, Shield, Activity } from "lucide-react"

export default function DashboardWithApi() {
  const { dashboardData, isLoading, error, fetchDashboardData } = useMonitoringStore()

  // 启用实时数据更新
  useRealTimeData()

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-slate-400">加载中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-400">加载失败: {error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4 p-4">
      {/* Left Sidebar - Metrics Cards */}
      <div className="w-80 space-y-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">日产量</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{dashboardData?.production?.daily || 0}</span>
                  <span className="text-sm text-slate-400">吨</span>
                </div>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{dashboardData?.production?.trend || 0}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">设备运行率</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{dashboardData?.equipment?.operationRate || 0}</span>
                  <span className="text-sm text-slate-400">%</span>
                </div>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{dashboardData?.equipment?.trend || 0}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">在线人员</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{dashboardData?.personnel?.online || 0}</span>
                  <span className="text-sm text-slate-400">人</span>
                </div>
                <div className="flex items-center gap-1 text-red-400 text-sm">
                  <span>{dashboardData?.personnel?.change || 0}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">安全天数</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{dashboardData?.safety?.days || 0}</span>
                  <span className="text-sm text-slate-400">天</span>
                </div>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{dashboardData?.safety?.trend || 0}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 其他内容保持不变 */}
    </div>
  )
}
