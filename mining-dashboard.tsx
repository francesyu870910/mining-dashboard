"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  Settings,
  Bell,
  TrendingUp,
  Users,
  Shield,
  Truck,
  Clock,
  MapPin,
  Activity,
  Thermometer,
  Droplets,
  Wind,
  Zap,
} from "lucide-react"

export default function MiningDashboard() {
  const alertItems = [
    { time: "10:30", status: "高级", type: "danger" },
    { time: "10:25", status: "中级", type: "warning" },
    { time: "10:20", status: "中级", type: "warning" },
    { time: "10:15", status: "", type: "info" },
    { time: "10:10", status: "高级", type: "danger" },
    { time: "10:05", status: "中级", type: "warning" },
  ]

  const equipmentItems = [
    { name: "运行", status: "running", progress: 85 },
    { name: "运行", status: "running", progress: 92 },
    { name: "维修", status: "maintenance", progress: 45 },
    { name: "运行", status: "running", progress: 78 },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-semibold">智慧矿山综合管控平台</span>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-400">
              系统正常运行
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-1 px-3 py-1 bg-slate-800 rounded-lg">
              <Users className="w-4 h-4" />
              <span>管理员</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>2025/6/7 22:29:16</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>华北矿区</span>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <nav className="flex items-center gap-4">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              <Activity className="w-4 h-4 mr-2" />
              综合展示
            </Button>
            <Button
              variant="outline"
              className="text-slate-300 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white hover:border-slate-600 active:bg-slate-700"
            >
              <Search className="w-4 h-4 mr-2" />
              事件检索
            </Button>
            <Button
              variant="outline"
              className="text-slate-300 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white hover:border-slate-600 active:bg-slate-700"
            >
              <Users className="w-4 h-4 mr-2" />
              任务管理
            </Button>
            <Button
              variant="outline"
              className="text-slate-300 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white hover:border-slate-600 active:bg-slate-700"
            >
              <Shield className="w-4 h-4 mr-2" />
              目标库管理
            </Button>
            <Button
              variant="outline"
              className="text-slate-300 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white hover:border-slate-600 active:bg-slate-700"
            >
              <Bell className="w-4 h-4 mr-2" />
              布控管理
            </Button>
            <Button
              variant="outline"
              className="text-slate-300 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white hover:border-slate-600 active:bg-slate-700"
            >
              <Bell className="w-4 h-4 mr-2" />
              布控告警
            </Button>
            <Button
              variant="outline"
              className="text-slate-300 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white hover:border-slate-600 active:bg-slate-700"
            >
              <Users className="w-4 h-4 mr-2" />
              用户管理
            </Button>
            <Button
              variant="outline"
              className="text-slate-300 border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-white hover:border-slate-600 active:bg-slate-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              系统设置
            </Button>
          </nav>
        </div>
      </header>

      <div className="flex gap-4 p-4">
        {/* Left Sidebar */}
        <div className="w-80 space-y-4">
          {/* Metrics Cards */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">日产量</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">2,847</span>
                    <span className="text-sm text-slate-400">吨</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12.5%</span>
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
                    <span className="text-2xl font-bold">94.2</span>
                    <span className="text-sm text-slate-400">%</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendingUp className="w-3 h-3" />
                    <span>+2.1%</span>
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
                    <span className="text-2xl font-bold">156</span>
                    <span className="text-sm text-slate-400">人</span>
                  </div>
                  <div className="flex items-center gap-1 text-red-400 text-sm">
                    <span>-3</span>
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
                    <span className="text-2xl font-bold">127</span>
                    <span className="text-sm text-slate-400">天</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-sm">
                    <TrendingUp className="w-3 h-3" />
                    <span>+1</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Production Data Chart */}
          <Card className="bg-slate-800 border-slate-700 h-80">
            <CardHeader className="border-b-0 pb-0">
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <TrendingUp className="w-5 h-5" />
                生产数据分析
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-48">
              <div className="text-center text-slate-400">
                <Activity className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                <p className="text-lg">生产数据图表区域</p>
                <p className="text-sm">实时显示日/周/月产量趋势</p>
              </div>
            </CardContent>
          </Card>

          {/* Equipment Status */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Truck className="w-5 h-5" />
                设备运行状态
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {equipmentItems.map((item, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.status === "running"
                              ? "bg-green-400"
                              : item.status === "maintenance"
                                ? "bg-yellow-400"
                                : "bg-red-400"
                          }`}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.status === "running"
                            ? "bg-green-400"
                            : item.status === "maintenance"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-4">
          {/* Alerts */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Bell className="w-5 h-5" />
                  实时告警
                </CardTitle>
                <Badge variant="destructive" className="bg-red-600">
                  2 高级
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {alertItems.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        alert.type === "danger"
                          ? "bg-red-400"
                          : alert.type === "warning"
                            ? "bg-yellow-400"
                            : "bg-blue-400"
                      }`}
                    />
                    <span className="text-sm">{alert.time}</span>
                  </div>
                  {alert.status && (
                    <Badge
                      variant={alert.type === "danger" ? "destructive" : "secondary"}
                      className={alert.type === "danger" ? "bg-red-600" : "bg-yellow-600"}
                    >
                      {alert.status}
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Environmental Monitoring */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Thermometer className="w-5 h-5" />
                环境监测
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Thermometer className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-slate-400">温度</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">28°C</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-slate-400">湿度</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">65%</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Wind className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-slate-400">粉尘μg/m³</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">45</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-slate-400">能效比</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">92.3%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
