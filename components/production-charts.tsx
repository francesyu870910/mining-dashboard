"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, BarChart3, TrendingUp, Activity } from "lucide-react"

export default function ProductionCharts() {
  // 模拟生产数据
  const dailyProduction = [
    { date: "06-01", value: 2650, target: 2800, day: "周六" },
    { date: "06-02", value: 2847, target: 2800, day: "周日" },
    { date: "06-03", value: 2920, target: 2800, day: "周一" },
    { date: "06-04", value: 2756, target: 2800, day: "周二" },
    { date: "06-05", value: 2890, target: 2800, day: "周三" },
    { date: "06-06", value: 3120, target: 2800, day: "周四" },
    { date: "06-07", value: 2980, target: 2800, day: "今日" },
  ]

  const equipmentStatus = [
    { name: "正常运行", value: 85, color: "bg-green-500", count: 24 },
    { name: "维护中", value: 10, color: "bg-yellow-500", count: 3 },
    { name: "故障停机", value: 5, color: "bg-red-500", count: 1 },
  ]

  const departmentPersonnel = [
    { name: "生产部", count: 45, color: "bg-blue-500" },
    { name: "安全部", count: 28, color: "bg-green-500" },
    { name: "设备部", count: 32, color: "bg-yellow-500" },
    { name: "技术部", count: 25, color: "bg-purple-500" },
  ]

  const maxPersonnel = Math.max(...departmentPersonnel.map((d) => d.count))

  return (
    <div className="space-y-6">
      {/* 核心指标卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">2,980</div>
              <div className="text-sm text-slate-400">今日产量 (吨)</div>
              <div className="text-xs text-green-400 mt-1">↗ +6.5%</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">106.4%</div>
              <div className="text-sm text-slate-400">目标完成率</div>
              <div className="text-xs text-green-400 mt-1">超额完成</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">2,852</div>
              <div className="text-sm text-slate-400">周平均产量</div>
              <div className="text-xs text-blue-400 mt-1">7日均值</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">6/7</div>
              <div className="text-sm text-slate-400">达标天数</div>
              <div className="text-xs text-green-400 mt-1">85.7%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要图表区域 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 产量趋势图 - 根据需求调整 */}
        <Card className="bg-slate-800 border-slate-700 card-compact">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-blue-400">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>7日产量趋势</span>
              </div>
              <div className="text-sm text-slate-400">单位: 吨</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 chart-container">
              {/* 目标线标注 - 移到顶部中间 */}
              <div className="flex justify-center mb-1">
                <div className="text-micro text-slate-400 flex items-center gap-1 bg-slate-700/50 px-2 py-0.5 rounded">
                  <span>目标线:</span>
                  <span className="font-medium">2800吨</span>
                </div>
              </div>
              
              {/* 吨数显示行 - 单独一行显示所有吨数 */}
              <div className="flex justify-between px-2">
                {dailyProduction.map((item, index) => {
                  const isToday = item.day === "今日"
                  // 简化数值显示
                  const displayValue = Math.floor(item.value / 100) * 100
                  
                  return (
                    <div key={`value-${index}`} className="w-10 text-center">
                      <div className={`text-micro ${isToday ? "text-blue-400 font-medium" : "text-slate-400"}`}>
                        {displayValue}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* 调整后的柱状图 - 增加间距 */}
              <div className="flex items-end justify-between h-36 bar-chart px-2">
                {dailyProduction.map((item, index) => {
                  const height = (item.value / 3500) * 100
                  const isToday = item.day === "今日"
                  const isAboveTarget = item.value >= item.target
                  
                  return (
                    <div key={index} className="flex flex-col items-center w-10">
                      {/* 柱子 */}
                      <div className="w-3 bg-slate-700 rounded-t bar" style={{ height: "100px" }}>
                        <div
                          className={`w-full rounded-t transition-all ${
                            isToday ? "bg-blue-400" : isAboveTarget ? "bg-green-400" : "bg-orange-400"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                        
                        {/* 目标线 */}
                        <div
                          className="absolute w-full border-t border-dashed border-slate-500"
                          style={{ bottom: `${(item.target / 3500) * 100}%` }}
                        />
                      </div>

                      {/* 只显示日期 */}
                      <div className="text-center mt-1">
                        <div className={`text-micro ${isToday ? "text-blue-400 font-medium" : "text-slate-400"}`}>
                          {item.date}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 图例 */}
              <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded"></div>
                  <span className="text-micro text-slate-400">达标</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-orange-400 rounded"></div>
                  <span className="text-micro text-slate-400">未达标</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-1 border-t border-dashed border-slate-500"></div>
                  <span className="text-micro text-slate-400">目标线</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 设备状态 - 简化版 */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Activity className="w-5 h-5" />
              设备运行状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 总体运行率 */}
              <div className="text-center bg-slate-700/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">94.2%</div>
                <div className="text-sm text-slate-400">设备运行率</div>
              </div>

              {/* 状态分布 */}
              <div className="space-y-3">
                {equipmentStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-slate-300 text-sm">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{item.count}台</div>
                      <div className="text-xs text-slate-400">{item.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部辅助信息 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 人员分布 - 简化版 */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <BarChart3 className="w-5 h-5" />
              在线人员分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departmentPersonnel.map((dept, index) => {
                const percentage = (dept.count / maxPersonnel) * 100
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-2 h-2 rounded-full ${dept.color}`}></div>
                      <span className="text-slate-300 text-sm">{dept.name}</span>
                      <div className="flex-1 mx-3">
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${dept.color}`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    </div>
                    <span className="text-white font-medium text-sm">{dept.count}人</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700 text-center">
              <span className="text-slate-400 text-sm">总计在线：</span>
              <span className="text-blue-400 font-medium ml-2">130人</span>
            </div>
          </CardContent>
        </Card>

        {/* 安全指标 - 简化版 */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Shield className="w-5 h-5" />
              安全生产状态
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 安全天数突出显示 */}
              <div className="text-center bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">127</div>
                <div className="text-sm text-green-300">连续安全天数</div>
              </div>

              {/* 其他安全指标 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center bg-slate-700/20 rounded-lg p-3">
                  <div className="text-lg font-bold text-green-400">0</div>
                  <div className="text-xs text-slate-400">本月事故</div>
                </div>
                <div className="text-center bg-slate-700/20 rounded-lg p-3">
                  <div className="text-lg font-bold text-blue-400">15</div>
                  <div className="text-xs text-slate-400">安全检查</div>
                </div>
              </div>

              {/* 安全等级 */}
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 text-center">
                <span className="text-green-400 font-medium">安全等级：优秀</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
