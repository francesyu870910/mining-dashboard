"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Calendar, AlertTriangle, Info, CheckCircle, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface Event {
  id: string
  time: string
  type: "安全" | "设备" | "生产" | "环境"
  level: "高级" | "中级" | "低级"
  description: string
  location: string
  status: "已处理" | "处理中" | "未处理"
}

export default function EventsPage() {
  const [events] = useState<Event[]>([
    {
      id: "1",
      time: "2025-06-02 22:30:15",
      type: "安全",
      level: "高级",
      description: "矿井下发现异常气体浓度",
      location: "A区-3号井",
      status: "处理中",
    },
    {
      id: "2",
      time: "2025-06-02 22:25:30",
      type: "设备",
      level: "中级",
      description: "挖掘机械温度过高",
      location: "B区-设备间",
      status: "已处理",
    },
    {
      id: "3",
      time: "2025-06-02 22:20:45",
      type: "生产",
      level: "低级",
      description: "产量指标轻微下降",
      location: "C区-生产线",
      status: "未处理",
    },
    {
      id: "4",
      time: "2025-06-02 22:15:12",
      type: "环境",
      level: "中级",
      description: "粉尘浓度超标",
      location: "D区-通风口",
      status: "处理中",
    },
    {
      id: "5",
      time: "2025-06-02 22:10:30",
      type: "设备",
      level: "高级",
      description: "主要传送带故障",
      location: "主传送带-1号",
      status: "已处理",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("全部")
  const [filterLevel, setFilterLevel] = useState("全部")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)

  // 打开事件详情对话框
  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "全部" || event.type === filterType
    const matchesLevel = filterLevel === "全部" || event.level === filterLevel
    return matchesSearch && matchesType && matchesLevel
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "已处理":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "处理中":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "未处理":
        return <Info className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* 页面标题 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Search className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">事件检索</h1>
          <p className="text-slate-400">查询和管理系统事件记录</p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">今日事件</p>
                <p className="text-2xl font-bold">{events.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">高级事件</p>
                <p className="text-2xl font-bold text-red-400">{events.filter((e) => e.level === "高级").length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">处理中</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {events.filter((e) => e.status === "处理中").length}
                </p>
              </div>
              <Info className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">已处理</p>
                <p className="text-2xl font-bold text-green-400">
                  {events.filter((e) => e.status === "已处理").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和过滤 */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>事件列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="搜索事件描述或位置..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border-gray-300 pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="全部">全部类型</SelectItem>
                <SelectItem value="安全">安全</SelectItem>
                <SelectItem value="设备">设备</SelectItem>
                <SelectItem value="生产">生产</SelectItem>
                <SelectItem value="环境">环境</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-32 bg-white border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="全部">全部级别</SelectItem>
                <SelectItem value="高级">高级</SelectItem>
                <SelectItem value="中级">中级</SelectItem>
                <SelectItem value="低级">低级</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Filter className="w-4 h-4 mr-2" />
              筛选
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-700">时间</TableHead>
                <TableHead className="text-gray-700">类型</TableHead>
                <TableHead className="text-gray-700">级别</TableHead>
                <TableHead className="text-gray-700">描述</TableHead>
                <TableHead className="text-gray-700">位置</TableHead>
                <TableHead className="text-gray-700">状态</TableHead>
                <TableHead className="text-gray-700">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id} className="border-gray-200">
                  <TableCell className="text-gray-500">{event.time}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-600">
                      {event.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getLevelColor(event.level)}>{event.level}</Badge>
                  </TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell className="text-gray-500">{event.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(event.status)}
                      <span>{event.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      onClick={() => handleViewDetails(event)}
                    >
                      <Eye className="w-4 h-4" />
                      查看
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 事件详情对话框 */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="bg-white border-gray-200 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">事件详情</DialogTitle>
            <DialogDescription className="text-gray-500">
              查看事件的详细信息
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">事件ID</p>
                  <p className="font-medium">{selectedEvent.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">发生时间</p>
                  <p className="font-medium">{selectedEvent.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">事件类型</p>
                  <Badge variant="outline" className="border-slate-600">
                    {selectedEvent.type}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">事件级别</p>
                  <Badge className={getLevelColor(selectedEvent.level)}>
                    {selectedEvent.level}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">发生位置</p>
                  <p className="font-medium">{selectedEvent.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">处理状态</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedEvent.status)}
                    <span>{selectedEvent.status}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">事件描述</p>
                <p className="bg-gray-50 p-3 rounded-md">{selectedEvent.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">处理记录</p>
                <div className="bg-gray-50 p-3 rounded-md space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">2025-06-02 22:31:05</span>
                    <span>系统自动记录事件</span>
                  </div>
                  {selectedEvent.status !== "未处理" && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">2025-06-02 22:32:30</span>
                      <span>安全员已确认并开始处理</span>
                    </div>
                  )}
                  {selectedEvent.status === "已处理" && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">2025-06-02 22:45:12</span>
                      <span>问题已解决，恢复正常</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowEventDetails(false)}
            >
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
