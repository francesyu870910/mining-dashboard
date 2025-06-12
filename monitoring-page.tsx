"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Bell,
  Plus,
  Search,
  Edit,
  Trash2,
  Camera,
  MapPin,
  AlertTriangle,
  Eye,
  Power,
  Users,
  Car,
  Cog,
  Map,
} from "lucide-react"

interface MonitoringPoint {
  id: string
  name: string
  location: string
  deviceType: string
  status: "在线" | "离线" | "维护中"
  ipAddress: string
  lastActive: string
  monitoringType: string[]
}

interface MonitoringTask {
  id: string
  name: string
  type: "人员布控" | "车辆布控" | "区域布控" | "设备布控"
  target: string
  location: string
  status: "活跃" | "暂停" | "已结束"
  startTime: string
  endTime: string
  priority: "高" | "中" | "低"
}

interface MonitoringRule {
  id: string
  name: string
  type: "人员规则" | "车辆规则" | "区域规则" | "设备规则"
  condition: string
  action: string
  status: "启用" | "禁用"
  createdBy: string
  createdAt: string
}

export default function MonitoringPage() {
  const [activeTab, setActiveTab] = useState("points")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // 监控点位数据
  const [monitoringPoints] = useState<MonitoringPoint[]>([
    {
      id: "1",
      name: "入口监控点",
      location: "矿区主入口",
      deviceType: "高清摄像头",
      status: "在线",
      ipAddress: "192.168.1.101",
      lastActive: "2025-06-02 22:30:15",
      monitoringType: ["人员识别", "车辆识别"],
    },
    {
      id: "2",
      name: "A区生产线",
      location: "A区-1号生产线",
      deviceType: "球型摄像头",
      status: "在线",
      ipAddress: "192.168.1.102",
      lastActive: "2025-06-02 22:28:45",
      monitoringType: ["设备监控", "区域监控"],
    },
    {
      id: "3",
      name: "B区安全通道",
      location: "B区-安全通道",
      deviceType: "红外摄像头",
      status: "离线",
      ipAddress: "192.168.1.103",
      lastActive: "2025-06-02 20:15:30",
      monitoringType: ["人员识别", "区域监控"],
    },
    {
      id: "4",
      name: "设备仓库",
      location: "C区-设备仓库",
      deviceType: "高清摄像头",
      status: "维护中",
      ipAddress: "192.168.1.104",
      lastActive: "2025-06-02 18:45:20",
      monitoringType: ["设备监控"],
    },
  ])

  // 布控任务数据
  const [monitoringTasks] = useState<MonitoringTask[]>([
    {
      id: "1",
      name: "重点人员监控",
      type: "人员布控",
      target: "黑名单人员",
      location: "全矿区",
      status: "活跃",
      startTime: "2025-06-01 08:00:00",
      endTime: "2025-06-30 18:00:00",
      priority: "高",
    },
    {
      id: "2",
      name: "车辆进出监控",
      type: "车辆布控",
      target: "所有车辆",
      location: "矿区入口",
      status: "活跃",
      startTime: "2025-06-01 00:00:00",
      endTime: "2025-12-31 23:59:59",
      priority: "中",
    },
    {
      id: "3",
      name: "危险区域监控",
      type: "区域布控",
      target: "A区爆破区域",
      location: "A区-爆破区",
      status: "暂停",
      startTime: "2025-06-02 08:00:00",
      endTime: "2025-06-02 18:00:00",
      priority: "高",
    },
    {
      id: "4",
      name: "关键设备监控",
      type: "设备布控",
      target: "主传送带",
      location: "B区-生产线",
      status: "活跃",
      startTime: "2025-06-01 00:00:00",
      endTime: "2025-12-31 23:59:59",
      priority: "中",
    },
  ])

  // 布控规则数据
  const [monitoringRules] = useState<MonitoringRule[]>([
    {
      id: "1",
      name: "黑名单人员告警",
      type: "人员规则",
      condition: "当识别到黑名单人员时",
      action: "发送高级告警，通知安全部门",
      status: "启用",
      createdBy: "管理员",
      createdAt: "2025-05-15 10:30:00",
    },
    {
      id: "2",
      name: "未授权车辆告警",
      type: "车辆规则",
      condition: "当识别到未授权车辆进入矿区时",
      action: "发送中级告警，记录车辆信息",
      status: "启用",
      createdBy: "管理员",
      createdAt: "2025-05-20 14:15:00",
    },
    {
      id: "3",
      name: "区域人员超限",
      type: "区域规则",
      condition: "当危险区域人员数量超过5人时",
      action: "发送高级告警，启动疏散预案",
      status: "启用",
      createdBy: "安全主管",
      createdAt: "2025-05-25 09:45:00",
    },
    {
      id: "4",
      name: "设备温度过高",
      type: "设备规则",
      condition: "当设备温度超过80°C时",
      action: "发送高级告警，自动停止设备运行",
      status: "禁用",
      createdBy: "设备主管",
      createdAt: "2025-05-28 16:20:00",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "在线":
      case "活跃":
      case "启用":
        return "bg-green-600"
      case "离线":
      case "已结束":
      case "禁用":
        return "bg-red-600"
      case "维护中":
      case "暂停":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "高":
        return "bg-red-600"
      case "中":
        return "bg-yellow-600"
      case "低":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "人员布控":
      case "人员规则":
        return <Users className="w-4 h-4 text-blue-400" />
      case "车辆布控":
      case "车辆规则":
        return <Car className="w-4 h-4 text-green-400" />
      case "区域布控":
      case "区域规则":
        return <Map className="w-4 h-4 text-yellow-400" />
      case "设备布控":
      case "设备规则":
        return <Cog className="w-4 h-4 text-purple-400" />
      default:
        return null
    }
  }

  const filteredPoints = monitoringPoints.filter(
    (point) =>
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.deviceType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTasks = monitoringTasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredRules = monitoringRules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.action.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">布控管理</h1>
            <p className="text-slate-400">配置监控点位和布控策略</p>
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              {activeTab === "points" ? "添加监控点" : activeTab === "tasks" ? "添加布控任务" : "添加布控规则"}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
            <DialogHeader>
              <DialogTitle>
                {activeTab === "points" ? "添加监控点" : activeTab === "tasks" ? "添加布控任务" : "添加布控规则"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {activeTab === "points" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">监控点名称</Label>
                    <Input id="name" className="bg-white border-gray-300" placeholder="请输入监控点名称" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">位置</Label>
                    <Input id="location" className="bg-white border-gray-300" placeholder="请输入监控点位置" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deviceType">设备类型</Label>
                    <Select>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="选择设备类型" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="highdef">高清摄像头</SelectItem>
                        <SelectItem value="dome">球型摄像头</SelectItem>
                        <SelectItem value="infrared">红外摄像头</SelectItem>
                        <SelectItem value="thermal">热成像摄像头</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ipAddress">IP地址</Label>
                    <Input id="ipAddress" className="bg-white border-gray-300" placeholder="请输入IP地址" />
                  </div>
                  <div className="space-y-2">
                    <Label>监控类型</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="personnel" />
                        <Label htmlFor="personnel">人员识别</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="vehicle" />
                        <Label htmlFor="vehicle">车辆识别</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="area" />
                        <Label htmlFor="area">区域监控</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="equipment" />
                        <Label htmlFor="equipment">设备监控</Label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "tasks" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="taskName">任务名称</Label>
                    <Input id="taskName" className="bg-white border-gray-300" placeholder="请输入任务名称" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskType">布控类型</Label>
                    <Select>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="选择布控类型" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="personnel">人员布控</SelectItem>
                        <SelectItem value="vehicle">车辆布控</SelectItem>
                        <SelectItem value="area">区域布控</SelectItem>
                        <SelectItem value="equipment">设备布控</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target">布控目标</Label>
                    <Input id="target" className="bg-white border-gray-300" placeholder="请输入布控目标" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taskLocation">布控位置</Label>
                    <Input id="taskLocation" className="bg-white border-gray-300" placeholder="请输入布控位置" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">开始时间</Label>
                      <Input id="startTime" type="datetime-local" className="bg-white border-gray-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endTime">结束时间</Label>
                      <Input id="endTime" type="datetime-local" className="bg-white border-gray-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">优先级</Label>
                    <Select>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="选择优先级" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="high">高</SelectItem>
                        <SelectItem value="medium">中</SelectItem>
                        <SelectItem value="low">低</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {activeTab === "rules" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="ruleName">规则名称</Label>
                    <Input id="ruleName" className="bg-white border-gray-300" placeholder="请输入规则名称" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ruleType">规则类型</Label>
                    <Select>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="选择规则类型" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="personnel">人员规则</SelectItem>
                        <SelectItem value="vehicle">车辆规则</SelectItem>
                        <SelectItem value="area">区域规则</SelectItem>
                        <SelectItem value="equipment">设备规则</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">触发条件</Label>
                    <Textarea
                      id="condition"
                      className="bg-white border-gray-300"
                      placeholder="请输入触发条件"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="action">执行动作</Label>
                    <Textarea id="action" className="bg-white border-gray-300" placeholder="请输入执行动作" rows={2} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ruleStatus" defaultChecked />
                    <Label htmlFor="ruleStatus">启用规则</Label>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">保存</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">监控点位</p>
                <p className="text-2xl font-bold">{monitoringPoints.length}</p>
              </div>
              <Camera className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">布控任务</p>
                <p className="text-2xl font-bold">{monitoringTasks.length}</p>
              </div>
              <MapPin className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">布控规则</p>
                <p className="text-2xl font-bold">{monitoringRules.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">在线监控点</p>
                <p className="text-2xl font-bold text-green-400">
                  {monitoringPoints.filter((p) => p.status === "在线").length}
                </p>
              </div>
              <Power className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 布控管理内容 */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>布控管理</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="points" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                监控点位
              </TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                布控任务
              </TabsTrigger>
              <TabsTrigger value="rules" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                布控规则
              </TabsTrigger>
            </TabsList>

            <TabsContent value="points" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-900">监控点名称</TableHead>
                    <TableHead className="text-gray-900">位置</TableHead>
                    <TableHead className="text-gray-900">设备类型</TableHead>
                    <TableHead className="text-gray-900">状态</TableHead>
                    <TableHead className="text-gray-900">IP地址</TableHead>
                    <TableHead className="text-gray-900">监控类型</TableHead>
                    <TableHead className="text-gray-900">最后活动</TableHead>
                    <TableHead className="text-gray-900">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPoints.map((point) => (
                    <TableRow key={point.id} className="border-gray-200">
                      <TableCell className="font-medium">{point.name}</TableCell>
                      <TableCell>{point.location}</TableCell>
                      <TableCell>{point.deviceType}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(point.status)}>{point.status}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{point.ipAddress}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {point.monitoringType.map((type) => (
                            <Badge key={type} variant="outline" className="border-gray-300">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-500">{point.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="tasks" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-900">任务名称</TableHead>
                    <TableHead className="text-gray-900">布控类型</TableHead>
                    <TableHead className="text-gray-900">布控目标</TableHead>
                    <TableHead className="text-gray-900">布控位置</TableHead>
                    <TableHead className="text-gray-900">状态</TableHead>
                    <TableHead className="text-gray-900">优先级</TableHead>
                    <TableHead className="text-gray-900">时间范围</TableHead>
                    <TableHead className="text-gray-900">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id} className="border-gray-200">
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(task.type)}
                          <span>{task.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{task.target}</TableCell>
                      <TableCell>{task.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-xs">
                        <div>{task.startTime}</div>
                        <div>至</div>
                        <div>{task.endTime}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="rules" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-900">规则名称</TableHead>
                    <TableHead className="text-gray-900">规则类型</TableHead>
                    <TableHead className="text-gray-900">触发条件</TableHead>
                    <TableHead className="text-gray-900">执行动作</TableHead>
                    <TableHead className="text-gray-900">状态</TableHead>
                    <TableHead className="text-gray-900">创建人</TableHead>
                    <TableHead className="text-gray-900">创建时间</TableHead>
                    <TableHead className="text-gray-900">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRules.map((rule) => (
                    <TableRow key={rule.id} className="border-gray-200">
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(rule.type)}
                          <span>{rule.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={rule.condition}>
                          {rule.condition}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={rule.action}>
                          {rule.action}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(rule.status)}>{rule.status}</Badge>
                      </TableCell>
                      <TableCell>{rule.createdBy}</TableCell>
                      <TableCell className="text-gray-500">{rule.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
    </div>
  )
}
