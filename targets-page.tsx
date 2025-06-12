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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Plus, Search, Edit, Trash2, Users, Car, Cog, AlertTriangle, Upload, Eye } from "lucide-react"

interface PersonTarget {
  id: string
  name: string
  employeeId: string
  department: string
  position: string
  photo: string
  status: "正常" | "黑名单" | "离职"
  lastSeen: string
  accessLevel: "高级" | "中级" | "基础"
}

interface VehicleTarget {
  id: string
  plateNumber: string
  vehicleType: string
  owner: string
  department: string
  status: "正常" | "维修" | "报废"
  lastSeen: string
}

interface EquipmentTarget {
  id: string
  equipmentId: string
  name: string
  type: string
  location: string
  status: "运行" | "维修" | "停用"
  lastCheck: string
}

export default function TargetsPage() {
  const [activeTab, setActiveTab] = useState("personnel")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // 人员目标库数据
  const [personnelTargets] = useState<PersonTarget[]>([
    {
      id: "1",
      name: "刘建华",
      employeeId: "HK2024001",
      department: "生产部",
      position: "生产主管",
      photo: "/placeholder.svg?height=40&width=40",
      status: "正常",
      lastSeen: "2025-06-02 22:15:30",
      accessLevel: "高级",
    },
    {
      id: "2",
      name: "王明远",
      employeeId: "HK2024002",
      department: "安全部",
      position: "安全工程师",
      photo: "/placeholder.svg?height=40&width=40",
      status: "正常",
      lastSeen: "2025-06-02 21:45:12",
      accessLevel: "高级",
    },
    {
      id: "3",
      name: "陈志强",
      employeeId: "HK2024003",
      department: "信息技术部",
      position: "系统管理员",
      photo: "/placeholder.svg?height=40&width=40",
      status: "正常",
      lastSeen: "2025-06-02 20:30:45",
      accessLevel: "高级",
    },
    {
      id: "4",
      name: "张文博",
      employeeId: "HK2024004",
      department: "技术部",
      position: "技术工程师",
      photo: "/placeholder.svg?height=40&width=40",
      status: "正常",
      lastSeen: "2025-06-02 19:15:22",
      accessLevel: "中级",
    },
    {
      id: "5",
      name: "李国庆",
      employeeId: "HK2024005",
      department: "设备部",
      position: "设备维修工",
      photo: "/placeholder.svg?height=40&width=40",
      status: "正常",
      lastSeen: "2025-06-02 18:45:18",
      accessLevel: "中级",
    },
    {
      id: "6",
      name: "赵永强",
      employeeId: "HK2024006",
      department: "质量部",
      position: "质量检验员",
      photo: "/placeholder.svg?height=40&width=40",
      status: "正常",
      lastSeen: "2025-06-02 17:30:35",
      accessLevel: "中级",
    },
    {
      id: "7",
      name: "孙德胜",
      employeeId: "HK2024007",
      department: "生产部",
      position: "设备操作员",
      photo: "/placeholder.svg?height=40&width=40",
      status: "正常",
      lastSeen: "2025-06-02 16:20:42",
      accessLevel: "基础",
    },
    {
      id: "8",
      name: "周海涛",
      employeeId: "HK2024008",
      department: "数据分析部",
      position: "数据分析师",
      photo: "/placeholder.svg?height=40&width=40",
      status: "正常",
      lastSeen: "2025-06-02 15:45:28",
      accessLevel: "中级",
    },
    {
      id: "9",
      name: "马建国",
      employeeId: "HK2023015",
      department: "生产部",
      position: "前操作员",
      photo: "/placeholder.svg?height=40&width=40",
      status: "黑名单",
      lastSeen: "2025-06-01 18:20:15",
      accessLevel: "基础",
    },
    {
      id: "10",
      name: "吴志明",
      employeeId: "HK2023022",
      department: "设备部",
      position: "前维修工",
      photo: "/placeholder.svg?height=40&width=40",
      status: "离职",
      lastSeen: "2025-05-28 14:30:20",
      accessLevel: "基础",
    },
  ])

  // 车辆目标库数据
  const [vehicleTargets] = useState<VehicleTarget[]>([
    {
      id: "1",
      plateNumber: "晋A·HK001",
      vehicleType: "CAT 320D 挖掘机",
      owner: "刘建华",
      department: "生产部",
      status: "正常",
      lastSeen: "2025-06-02 22:10:30",
    },
    {
      id: "2",
      plateNumber: "晋A·HK002",
      vehicleType: "重型自卸车",
      owner: "孙德胜",
      department: "运输部",
      status: "正常",
      lastSeen: "2025-06-02 21:45:15",
    },
    {
      id: "3",
      plateNumber: "晋A·HK003",
      vehicleType: "装载机",
      owner: "李国庆",
      department: "设备部",
      status: "维修",
      lastSeen: "2025-06-02 20:30:45",
    },
    {
      id: "4",
      plateNumber: "晋A·HK004",
      vehicleType: "矿用卡车",
      owner: "张文博",
      department: "运输部",
      status: "正常",
      lastSeen: "2025-06-02 19:20:22",
    },
    {
      id: "5",
      plateNumber: "晋A·HK005",
      vehicleType: "推土机",
      owner: "王明远",
      department: "生产部",
      status: "正常",
      lastSeen: "2025-06-02 18:15:38",
    },
    {
      id: "6",
      plateNumber: "晋A·HK006",
      vehicleType: "洒水车",
      owner: "赵永强",
      department: "环保部",
      status: "正常",
      lastSeen: "2025-06-02 17:30:12",
    },
    {
      id: "7",
      plateNumber: "晋A·HK007",
      vehicleType: "应急救援车",
      owner: "陈志强",
      department: "安全部",
      status: "正常",
      lastSeen: "2025-06-02 16:45:55",
    },
    {
      id: "8",
      plateNumber: "晋A·HK008",
      vehicleType: "巡检车",
      owner: "周海涛",
      department: "技术部",
      status: "正常",
      lastSeen: "2025-06-02 15:20:18",
    },
  ])

  // 设备目标库数据
  const [equipmentTargets] = useState<EquipmentTarget[]>([
    {
      id: "1",
      equipmentId: "HK-CB-001",
      name: "1号主传送带系统",
      type: "传送设备",
      location: "A区-1号生产线",
      status: "运行",
      lastCheck: "2025-06-02 20:00:00",
    },
    {
      id: "2",
      equipmentId: "HK-CR-001",
      name: "主破碎机组",
      type: "破碎设备",
      location: "B区-破碎车间",
      status: "运行",
      lastCheck: "2025-06-02 19:30:00",
    },
    {
      id: "3",
      equipmentId: "HK-SC-001",
      name: "筛分设备系统",
      type: "筛分设备",
      location: "C区-筛分车间",
      status: "维修",
      lastCheck: "2025-06-02 18:30:00",
    },
    {
      id: "4",
      equipmentId: "HK-WS-001",
      name: "洗选设备组",
      type: "洗选设备",
      location: "D区-洗选车间",
      status: "运行",
      lastCheck: "2025-06-02 17:45:00",
    },
    {
      id: "5",
      equipmentId: "HK-VT-001",
      name: "通风系统主机",
      type: "通风设备",
      location: "E区-通风机房",
      status: "运行",
      lastCheck: "2025-06-02 16:20:00",
    },
    {
      id: "6",
      equipmentId: "HK-WP-001",
      name: "排水泵站系统",
      type: "排水设备",
      location: "F区-泵房",
      status: "运行",
      lastCheck: "2025-06-02 15:30:00",
    },
    {
      id: "7",
      equipmentId: "HK-PS-001",
      name: "供电配电系统",
      type: "电力设备",
      location: "G区-配电室",
      status: "运行",
      lastCheck: "2025-06-02 14:45:00",
    },
    {
      id: "8",
      equipmentId: "HK-MS-001",
      name: "环境监测站",
      type: "监测设备",
      location: "H区-监测中心",
      status: "运行",
      lastCheck: "2025-06-02 13:20:00",
    },
    {
      id: "9",
      equipmentId: "HK-CB-002",
      name: "2号副传送带",
      type: "传送设备",
      location: "A区-2号生产线",
      status: "停用",
      lastCheck: "2025-06-01 16:00:00",
    },
    {
      id: "10",
      equipmentId: "HK-CR-002",
      name: "备用破碎机",
      type: "破碎设备",
      location: "B区-备用车间",
      status: "停用",
      lastCheck: "2025-06-01 14:30:00",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "正常":
      case "运行":
        return "bg-green-600"
      case "黑名单":
      case "报废":
      case "停用":
        return "bg-red-600"
      case "离职":
      case "维修":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "高级":
        return "bg-red-600"
      case "中级":
        return "bg-yellow-600"
      case "基础":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const filteredPersonnel = personnelTargets.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredVehicles = vehicleTargets.filter(
    (vehicle) =>
      vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredEquipment = equipmentTargets.filter(
    (equipment) =>
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">目标库管理</h1>
            <p className="text-slate-400">管理AI识别系统的目标数据库</p>
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              添加目标
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
            <DialogHeader>
              <DialogTitle>添加新目标</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetType">目标类型</Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="选择目标类型" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    <SelectItem value="personnel">人员</SelectItem>
                    <SelectItem value="vehicle">车辆</SelectItem>
                    <SelectItem value="equipment">设备</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">上传照片/图像</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-400">点击或拖拽上传图像</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  取消
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">添加</Button>
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
                <p className="text-slate-400 text-sm">人员目标</p>
                <p className="text-2xl font-bold">{personnelTargets.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">车辆目标</p>
                <p className="text-2xl font-bold">{vehicleTargets.length}</p>
              </div>
              <Car className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">设备目标</p>
                <p className="text-2xl font-bold">{equipmentTargets.length}</p>
              </div>
              <Cog className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">黑名单</p>
                <p className="text-2xl font-bold text-red-400">
                  {personnelTargets.filter((p) => p.status === "黑名单").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 目标库内容 */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>目标库列表</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="搜索目标..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border-gray-300 pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="personnel" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                人员目标库
              </TabsTrigger>
              <TabsTrigger value="vehicles" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                车辆目标库
              </TabsTrigger>
              <TabsTrigger value="equipment" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                设备目标库
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personnel" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-900">照片</TableHead>
                    <TableHead className="text-gray-900">姓名</TableHead>
                    <TableHead className="text-gray-900">工号</TableHead>
                    <TableHead className="text-gray-900">部门</TableHead>
                    <TableHead className="text-gray-900">职位</TableHead>
                    <TableHead className="text-gray-900">权限等级</TableHead>
                    <TableHead className="text-gray-900">状态</TableHead>
                    <TableHead className="text-gray-900">最后识别</TableHead>
                    <TableHead className="text-gray-900">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPersonnel.map((person) => (
                    <TableRow key={person.id} className="border-gray-200">
                      <TableCell>
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={person.photo || "/placeholder.svg"} />
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell className="font-mono text-sm">{person.employeeId}</TableCell>
                      <TableCell>{person.department}</TableCell>
                      <TableCell>{person.position}</TableCell>
                      <TableCell>
                        <Badge className={getAccessLevelColor(person.accessLevel)}>{person.accessLevel}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(person.status)}>{person.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">{person.lastSeen}</TableCell>
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

            <TabsContent value="vehicles" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-900">车牌号</TableHead>
                    <TableHead className="text-gray-900">车辆类型</TableHead>
                    <TableHead className="text-gray-900">所有者</TableHead>
                    <TableHead className="text-gray-900">所属部门</TableHead>
                    <TableHead className="text-gray-900">状态</TableHead>
                    <TableHead className="text-gray-900">最后识别</TableHead>
                    <TableHead className="text-gray-900">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id} className="border-gray-200">
                      <TableCell className="font-medium font-mono">{vehicle.plateNumber}</TableCell>
                      <TableCell>{vehicle.vehicleType}</TableCell>
                      <TableCell>{vehicle.owner}</TableCell>
                      <TableCell>{vehicle.department}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">{vehicle.lastSeen}</TableCell>
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

            <TabsContent value="equipment" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="text-gray-900">设备编号</TableHead>
                    <TableHead className="text-gray-900">设备名称</TableHead>
                    <TableHead className="text-gray-900">设备类型</TableHead>
                    <TableHead className="text-gray-900">位置</TableHead>
                    <TableHead className="text-gray-900">状态</TableHead>
                    <TableHead className="text-gray-900">最后检查</TableHead>
                    <TableHead className="text-gray-900">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipment.map((equipment) => (
                    <TableRow key={equipment.id} className="border-gray-200">
                      <TableCell className="font-medium font-mono">{equipment.equipmentId}</TableCell>
                      <TableCell>{equipment.name}</TableCell>
                      <TableCell>{equipment.type}</TableCell>
                      <TableCell>{equipment.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(equipment.status)}>{equipment.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">{equipment.lastCheck}</TableCell>
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
