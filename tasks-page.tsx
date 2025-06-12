"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Plus, Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  assignee: string
  priority: "高" | "中" | "低"
  status: "待开始" | "进行中" | "已完成" | "已延期"
  dueDate: string
  progress: number
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "A区主要设备定期维护检查",
      description: "对A区所有挖掘设备、传送带及相关配套设施进行全面定期维护检查，确保设备正常运行",
      assignee: "刘建华",
      priority: "高",
      status: "进行中",
      dueDate: "2025-06-05",
      progress: 65,
    },
    {
      id: "2",
      title: "新员工安全操作规范培训",
      description: "组织新入职员工进行矿山安全操作规范培训，包括理论学习和实操演练",
      assignee: "王明远",
      priority: "中",
      status: "待开始",
      dueDate: "2025-06-08",
      progress: 0,
    },
    {
      id: "3",
      title: "月度环境监测数据分析报告",
      description: "收集整理本月环境监测数据，编制详细的环境质量分析报告并提出改进建议",
      assignee: "周海涛",
      priority: "中",
      status: "已完成",
      dueDate: "2025-06-01",
      progress: 100,
    },
    {
      id: "4",
      title: "下月生产计划制定与调整",
      description: "根据市场需求变化和设备状况，制定并调整下月生产计划，优化资源配置",
      assignee: "陈志强",
      priority: "高",
      status: "已延期",
      dueDate: "2025-05-30",
      progress: 30,
    },
    {
      id: "5",
      title: "监控系统升级改造项目",
      description: "对现有监控系统进行技术升级，增强AI识别能力和数据处理效率",
      assignee: "张文博",
      priority: "高",
      status: "进行中",
      dueDate: "2025-06-10",
      progress: 45,
    },
    {
      id: "6",
      title: "设备故障应急预案演练",
      description: "组织各部门进行设备故障应急预案演练，提高应急响应能力",
      assignee: "李国庆",
      priority: "中",
      status: "待开始",
      dueDate: "2025-06-12",
      progress: 0,
    },
    {
      id: "7",
      title: "质量管理体系内部审核",
      description: "按照ISO质量管理体系要求，开展内部审核工作，确保体系有效运行",
      assignee: "赵永强",
      priority: "中",
      status: "进行中",
      dueDate: "2025-06-15",
      progress: 25,
    },
    {
      id: "8",
      title: "智能化设备采购方案评估",
      description: "评估新型智能化设备采购方案，分析投资回报率和技术可行性",
      assignee: "孙德胜",
      priority: "低",
      status: "待开始",
      dueDate: "2025-06-20",
      progress: 0,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "",
    dueDate: "",
  })

  const handleAddTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignee: newTask.assignee,
      priority: newTask.priority as "高" | "中" | "低",
      status: "待开始",
      dueDate: newTask.dueDate,
      progress: 0,
    }
    setTasks([...tasks, task])
    setNewTask({ title: "", description: "", assignee: "", priority: "", dueDate: "" })
    setIsAddDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已完成":
        return "bg-green-600"
      case "进行中":
        return "bg-blue-600"
      case "待开始":
        return "bg-gray-600"
      case "已延期":
        return "bg-red-600"
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
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "已完成":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "进行中":
        return <Clock className="w-4 h-4 text-blue-400" />
      case "待开始":
        return <Calendar className="w-4 h-4 text-gray-400" />
      case "已延期":
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">任务管理</h1>
            <p className="text-slate-400">管理和跟踪工作任务</p>
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              新建任务
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200 text-gray-900">
            <DialogHeader>
              <DialogTitle>新建任务</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">任务标题</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-white border-gray-300"
                  placeholder="请输入任务标题"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">任务描述</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="bg-white border-gray-300"
                  placeholder="请输入任务描述"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignee">负责人</Label>
                  <Input
                    id="assignee"
                    id="assignee"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    className="bg-white border-gray-300"
                    placeholder="请输入负责人姓名"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">优先级</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue placeholder="选择优先级" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      <SelectItem value="高">高</SelectItem>
                      <SelectItem value="中">中</SelectItem>
                      <SelectItem value="低">低</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">截止日期</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="bg-white border-gray-300"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700">
                  创建
                </Button>
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
                <p className="text-slate-400 text-sm">总任务</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">进行中</p>
                <p className="text-2xl font-bold text-blue-400">{tasks.filter((t) => t.status === "进行中").length}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">已完成</p>
                <p className="text-2xl font-bold text-green-400">{tasks.filter((t) => t.status === "已完成").length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">已延期</p>
                <p className="text-2xl font-bold text-red-400">{tasks.filter((t) => t.status === "已延期").length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 任务列表 */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>任务列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-gray-700">任务标题</TableHead>
                <TableHead className="text-gray-700">负责人</TableHead>
                <TableHead className="text-gray-700">优先级</TableHead>
                <TableHead className="text-gray-700">状态</TableHead>
                <TableHead className="text-gray-700">进度</TableHead>
                <TableHead className="text-gray-700">截止日期</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className="border-gray-200">
                  <TableCell>
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-600 rounded-full h-2">
                        <div className="h-2 rounded-full bg-blue-400" style={{ width: `${task.progress}%` }} />
                      </div>
                      <span className="text-sm text-slate-400">{task.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">{task.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
