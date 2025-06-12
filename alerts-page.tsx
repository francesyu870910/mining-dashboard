"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Bell,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MessageSquare,
  X,
  Users,
  Car,
  Map,
  Cog,
  Play,
  Pause,
  Volume2,
  VolumeX,
  BarChart2,
} from "lucide-react"

interface Alert {
  id: string
  time: string
  type: "人员告警" | "车辆告警" | "区域告警" | "设备告警"
  level: "高级" | "中级" | "低级"
  location: string
  description: string
  status: "未处理" | "处理中" | "已处理" | "已忽略"
  source: string
  image: string
  video?: string
}

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [dateFilter, setDateFilter] = useState("today")
  const [levelFilter, setLevelFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // 告警数据
  const [alerts] = useState<Alert[]>([
    {
      id: "1",
      time: "2025-06-02 22:30:15",
      type: "人员告警",
      level: "高级",
      location: "矿区主入口",
      description: "检测到黑名单人员进入",
      status: "未处理",
      source: "入口监控点",
      image: "/placeholder.svg?height=200&width=320",
      video: "/placeholder.svg?height=200&width=320",
    },
    {
      id: "2",
      time: "2025-06-02 22:25:30",
      type: "设备告警",
      level: "中级",
      location: "A区-1号生产线",
      description: "设备温度异常",
      status: "处理中",
      source: "设备监控系统",
      image: "/placeholder.svg?height=200&width=320",
    },
    {
      id: "3",
      time: "2025-06-02 22:20:45",
      type: "区域告警",
      level: "高级",
      location: "B区-危险区域",
      description: "危险区域人员超限",
      status: "未处理",
      source: "区域监控点",
      image: "/placeholder.svg?height=200&width=320",
      video: "/placeholder.svg?height=200&width=320",
    },
    {
      id: "4",
      time: "2025-06-02 22:15:12",
      type: "车辆告警",
      level: "低级",
      location: "矿区入口",
      description: "未登记车辆进入",
      status: "已处理",
      source: "车辆识别系统",
      image: "/placeholder.svg?height=200&width=320",
    },
    {
      id: "5",
      time: "2025-06-02 22:10:30",
      type: "设备告警",
      level: "高级",
      location: "C区-设备仓库",
      description: "设备异常停止运行",
      status: "已忽略",
      source: "设备监控系统",
      image: "/placeholder.svg?height=200&width=320",
    },
    {
      id: "6",
      time: "2025-06-02 22:05:45",
      type: "人员告警",
      level: "中级",
      location: "D区-办公区",
      description: "检测到未授权人员",
      status: "未处理",
      source: "人脸识别系统",
      image: "/placeholder.svg?height=200&width=320",
      video: "/placeholder.svg?height=200&width=320",
    },
  ])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "高级":
        return "bg-red-600"
      case "中级":
        return "bg-yellow-600"
      case "低级":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已处理":
        return "bg-green-600"
      case "处理中":
        return "bg-blue-600"
      case "未处理":
        return "bg-red-600"
      case "已忽略":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "人员告警":
        return <Users className="w-4 h-4 text-blue-400" />
      case "车辆告警":
        return <Car className="w-4 h-4 text-green-400" />
      case "区域告警":
        return <Map className="w-4 h-4 text-yellow-400" />
      case "设备告警":
        return <Cog className="w-4 h-4 text-purple-400" />
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "已处理":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "处理中":
        return <Clock className="w-4 h-4 text-blue-400" />
      case "未处理":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      case "已忽略":
        return <X className="w-4 h-4 text-gray-400" />
      default:
        return null
    }
  }

  const handleViewAlert = (alert: Alert) => {
    setSelectedAlert(alert)
    setIsDetailOpen(true)
  }

  const handleProcessAlert = () => {
    setIsProcessDialogOpen(false)
    // 这里处理告警的逻辑
  }

  // 根据标签页和筛选条件过滤告警
  const filteredAlerts = alerts.filter((alert) => {
    // 标签页筛选
    if (activeTab !== "all" && activeTab === "unprocessed" && alert.status !== "未处理") return false
    if (activeTab !== "all" && activeTab === "processing" && alert.status !== "处理中") return false
    if (activeTab !== "all" && activeTab === "processed" && alert.status !== "已处理") return false
    if (activeTab !== "all" && activeTab === "ignored" && alert.status !== "已忽略") return false

    // 搜索筛选
    if (
      searchTerm &&
      !alert.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !alert.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !alert.source.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false

    // 级别筛选
    if (levelFilter !== "all" && alert.level !== levelFilter) return false

    // 类型筛选
    if (typeFilter !== "all" && alert.type !== typeFilter) return false

    // 日期筛选 (简化版，实际应用中需要更精确的日期比较)
    if (dateFilter !== "all") return true

    return true
  })

  // 统计各类告警数量
  const alertStats = {
    total: alerts.length,
    unprocessed: alerts.filter((a) => a.status === "未处理").length,
    processing: alerts.filter((a) => a.status === "处理中").length,
    processed: alerts.filter((a) => a.status === "已处理").length,
    ignored: alerts.filter((a) => a.status === "已忽略").length,
    high: alerts.filter((a) => a.level === "高级").length,
    medium: alerts.filter((a) => a.level === "中级").length,
    low: alerts.filter((a) => a.level === "低级").length,
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">布控告警</h1>
            <p className="text-slate-400">查看和处理布控告警信息</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-slate-700 bg-slate-800 text-slate-300">
                <Filter className="w-4 h-4 mr-2" />
                筛选
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-white border-gray-200 text-gray-900">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>时间范围</Label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">全部时间</SelectItem>
                      <SelectItem value="today">今天</SelectItem>
                      <SelectItem value="yesterday">昨天</SelectItem>
                      <SelectItem value="week">本周</SelectItem>
                      <SelectItem value="month">本月</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>告警级别</Label>
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">全部级别</SelectItem>
                      <SelectItem value="高级">高级</SelectItem>
                      <SelectItem value="中级">中级</SelectItem>
                      <SelectItem value="低级">低级</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>告警类型</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="all">全部类型</SelectItem>
                      <SelectItem value="人员告警">人员告警</SelectItem>
                      <SelectItem value="车辆告警">车辆告警</SelectItem>
                      <SelectItem value="区域告警">区域告警</SelectItem>
                      <SelectItem value="设备告警">设备告警</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-2 flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">应用筛选</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button className="bg-blue-600 hover:bg-blue-700">
            <BarChart2 className="w-4 h-4 mr-2" />
            告警统计
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">未处理告警</p>
                <p className="text-2xl font-bold text-red-400">{alertStats.unprocessed}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">处理中告警</p>
                <p className="text-2xl font-bold text-blue-400">{alertStats.processing}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">已处理告警</p>
                <p className="text-2xl font-bold text-green-400">{alertStats.processed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">高级告警</p>
                <p className="text-2xl font-bold text-red-400">{alertStats.high}</p>
              </div>
              <Bell className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 告警列表 */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>告警列表</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索告警..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border-gray-300 pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 bg-gray-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                全部 ({alertStats.total})
              </TabsTrigger>
              <TabsTrigger
                value="unprocessed"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                未处理 ({alertStats.unprocessed})
              </TabsTrigger>
              <TabsTrigger
                value="processing"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                处理中 ({alertStats.processing})
              </TabsTrigger>
              <TabsTrigger value="processed" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                已处理 ({alertStats.processed})
              </TabsTrigger>
              <TabsTrigger value="ignored" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                已忽略 ({alertStats.ignored})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">时间</TableHead>
                    <TableHead className="text-slate-300">类型</TableHead>
                    <TableHead className="text-slate-300">级别</TableHead>
                    <TableHead className="text-slate-300">位置</TableHead>
                    <TableHead className="text-slate-300">描述</TableHead>
                    <TableHead className="text-slate-300">来源</TableHead>
                    <TableHead className="text-slate-300">状态</TableHead>
                    <TableHead className="text-slate-300">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow key={alert.id} className="border-slate-700">
                      <TableCell className="text-slate-400">{alert.time}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(alert.type)}
                          <span>{alert.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getLevelColor(alert.level)}>{alert.level}</Badge>
                      </TableCell>
                      <TableCell>{alert.location}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={alert.description}>
                          {alert.description}
                        </div>
                      </TableCell>
                      <TableCell>{alert.source}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(alert.status)}
                          <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewAlert(alert)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {alert.status === "未处理" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setSelectedAlert(alert)
                                setIsProcessDialogOpen(true)
                              }}
                            >
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 告警详情对话框 */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>告警详情</span>
              <Badge className={selectedAlert ? getLevelColor(selectedAlert.level) : ""}>{selectedAlert?.level}</Badge>
            </DialogTitle>
          </DialogHeader>

          {selectedAlert && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={selectedAlert.image || "/placeholder.svg"}
                      alt="告警图像"
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-slate-800/80">告警图像</Badge>
                    </div>
                  </div>

                  {selectedAlert.video && (
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={selectedAlert.video || "/placeholder.svg"}
                        alt="告警视频"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-slate-800/50 border-none hover:bg-slate-700/70"
                          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        >
                          {isVideoPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-slate-800/50 border-none hover:bg-slate-700/70 h-8 w-8"
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-slate-800/80">告警视频</Badge>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-400">告警ID</p>
                      <p className="font-mono">{selectedAlert.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">告警时间</p>
                      <p>{selectedAlert.time}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">告警类型</p>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(selectedAlert.type)}
                        <span>{selectedAlert.type}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">告警级别</p>
                      <Badge className={getLevelColor(selectedAlert.level)}>{selectedAlert.level}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">告警位置</p>
                      <p>{selectedAlert.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">告警来源</p>
                      <p>{selectedAlert.source}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">告警状态</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedAlert.status)}
                        <Badge className={getStatusColor(selectedAlert.status)}>{selectedAlert.status}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">告警描述</p>
                    <p className="mt-1 p-2 bg-slate-700 rounded-md">{selectedAlert.description}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">处理记录</p>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md h-24 overflow-y-auto">
                      {selectedAlert.status === "已处理" || selectedAlert.status === "处理中" ? (
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-blue-400 mt-2"></div>
                            <div>
                              <p className="text-sm">
                                <span className="text-blue-400">系统</span> 创建告警
                              </p>
                              <p className="text-xs text-slate-400">{selectedAlert.time}</p>
                            </div>
                          </div>
                          {selectedAlert.status === "处理中" && (
                            <div className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-blue-400 mt-2"></div>
                              <div>
                                <p className="text-sm">
                                  <span className="text-blue-400">管理员</span> 开始处理告警
                                </p>
                                <p className="text-xs text-slate-400">2025-06-02 22:31:05</p>
                              </div>
                            </div>
                          )}
                          {selectedAlert.status === "已处理" && (
                            <>
                              <div className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-blue-400 mt-2"></div>
                                <div>
                                  <p className="text-sm">
                                    <span className="text-blue-400">管理员</span> 开始处理告警
                                  </p>
                                  <p className="text-xs text-slate-400">2025-06-02 22:16:05</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-green-400 mt-2"></div>
                                <div>
                                  <p className="text-sm">
                                    <span className="text-blue-400">管理员</span> 完成处理：已确认并处理
                                  </p>
                                  <p className="text-xs text-slate-400">2025-06-02 22:18:30</p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">暂无处理记录</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {selectedAlert.status === "未处理" && (
                  <>
                    <Button
                      variant="outline"
                      className="border-slate-700 hover:bg-slate-700"
                      onClick={() => setIsDetailOpen(false)}
                    >
                      忽略
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setIsDetailOpen(false)
                        setIsProcessDialogOpen(true)
                      }}
                    >
                      处理告警
                    </Button>
                  </>
                )}
                {selectedAlert.status === "处理中" && (
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setIsDetailOpen(false)
                      setIsProcessDialogOpen(true)
                    }}
                  >
                    完成处理
                  </Button>
                )}
                {(selectedAlert.status === "已处理" || selectedAlert.status === "已忽略") && (
                  <Button variant="outline" className="border-slate-700 hover:bg-slate-700">
                    导出记录
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="border-slate-700 hover:bg-slate-700"
                  onClick={() => setIsDetailOpen(false)}
                >
                  关闭
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 处理告警对话框 */}
      <Dialog open={isProcessDialogOpen} onOpenChange={setIsProcessDialogOpen}>
        <DialogContent className="bg-white border-gray-200 text-gray-900">
          <DialogHeader>
            <DialogTitle>处理告警</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedAlert && (
              <div className="p-3 bg-slate-700 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getLevelColor(selectedAlert.level)}>{selectedAlert.level}</Badge>
                  <span className="font-medium">{selectedAlert.description}</span>
                </div>
                <div className="text-sm text-slate-400">
                  <span>{selectedAlert.time}</span> · <span>{selectedAlert.location}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="processType">处理方式</Label>
              <Select defaultValue="confirm">
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="confirm">确认并处理</SelectItem>
                  <SelectItem value="transfer">转交他人处理</SelectItem>
                  <SelectItem value="ignore">标记为误报</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="processNote">处理备注</Label>
              <Textarea
                id="processNote"
                placeholder="请输入处理备注..."
                className="bg-white border-gray-300"
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="notify" />
              <Label htmlFor="notify">通知相关人员</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsProcessDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleProcessAlert} className="bg-blue-600 hover:bg-blue-700">
                提交
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
