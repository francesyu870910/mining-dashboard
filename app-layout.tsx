"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Settings, Bell, Users, Shield, Clock, MapPin, Activity } from "lucide-react"

interface AppLayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

export default function AppLayout({ children, currentPage, onPageChange }: AppLayoutProps) {
  const isDashboard = currentPage === "dashboard"
  const bgClass = isDashboard ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
  const headerBgClass = isDashboard ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"

  const menuItems = [
    { id: "dashboard", label: "综合展示", icon: Activity },
    { id: "events", label: "事件检索", icon: Search },
    { id: "tasks", label: "任务管理", icon: Users },
    { id: "targets", label: "目标库管理", icon: Shield },
    { id: "monitoring", label: "布控管理", icon: Bell },
    { id: "alerts", label: "布控告警", icon: Bell },
    { id: "users", label: "用户管理", icon: Users },
    { id: "settings", label: "系统设置", icon: Settings },
  ]

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Header */}
      <header className={`p-4 border-b ${headerBgClass}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <span className={`text-lg font-semibold ${isDashboard ? "text-white" : "text-gray-900"}`}>
                智慧矿山综合管控平台
              </span>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-400">
              系统正常运行
            </Badge>
          </div>
          <div className={`flex items-center gap-4 text-sm ${isDashboard ? "text-slate-300" : "text-gray-600"}`}>
            <div
              className={`flex items-center gap-1 px-3 py-1 rounded-lg ${isDashboard ? "bg-slate-800" : "bg-gray-100"}`}
            >
              <Users className="w-4 h-4" />
              <span>管理员</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>2025/6/2 22:29:16</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>华北矿区</span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <nav className="flex items-center gap-2 overflow-x-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "outline"}
                  className={
                    isActive
                      ? "bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                      : "text-slate-300 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white hover:border-slate-600 active:bg-slate-700 whitespace-nowrap"
                  }
                  onClick={() => onPageChange(item.id)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
