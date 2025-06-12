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
import { Users, Plus, Search, Edit, Trash2, Shield, UserCheck, UserX } from "lucide-react"

interface User {
  id: string
  username: string
  name: string
  role: string
  status: "active" | "inactive"
  lastLogin: string
  department: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      username: "admin",
      name: "陈志强",
      role: "管理员",
      status: "active",
      lastLogin: "2025-06-02 22:15:30",
      department: "信息技术部",
    },
    {
      id: "2",
      username: "operator1",
      name: "刘建华",
      role: "操作员",
      status: "active",
      lastLogin: "2025-06-02 21:45:12",
      department: "生产部",
    },
    {
      id: "3",
      username: "supervisor1",
      name: "王明远",
      role: "主管",
      status: "active",
      lastLogin: "2025-06-02 20:30:45",
      department: "安全部",
    },
    {
      id: "4",
      username: "operator2",
      name: "李国庆",
      role: "操作员",
      status: "inactive",
      lastLogin: "2025-06-01 18:20:15",
      department: "设备部",
    },
    {
      id: "5",
      username: "engineer1",
      name: "张文博",
      role: "工程师",
      status: "active",
      lastLogin: "2025-06-02 19:30:22",
      department: "技术部",
    },
    {
      id: "6",
      username: "supervisor2",
      name: "赵永强",
      role: "主管",
      status: "active",
      lastLogin: "2025-06-02 18:45:18",
      department: "质量部",
    },
    {
      id: "7",
      username: "operator3",
      name: "孙德胜",
      role: "操作员",
      status: "active",
      lastLogin: "2025-06-02 17:20:35",
      department: "生产部",
    },
    {
      id: "8",
      username: "analyst1",
      name: "周海涛",
      role: "分析师",
      status: "active",
      lastLogin: "2025-06-02 16:15:42",
      department: "数据分析部",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    role: "",
    department: "",
    password: "",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUser = () => {
    const user: User = {
      id: Date.now().toString(),
      username: newUser.username,
      name: newUser.name,
      role: newUser.role,
      status: "active",
      lastLogin: "从未登录",
      department: newUser.department,
    }
    setUsers([...users, user])
    setNewUser({ username: "", name: "", role: "", department: "", password: "" })
    setIsAddDialogOpen(false)
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const deleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">用户管理</h1>
              <p className="text-slate-400">管理系统用户账号和权限</p>
            </div>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                添加用户
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-gray-200 text-gray-900">
              <DialogHeader>
                <DialogTitle>添加新用户</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">用户名</Label>
                    <Input
                      id="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      className="bg-white border-gray-300"
                      placeholder="请输入用户名"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="bg-white border-gray-300"
                      placeholder="请输入姓名"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">角色</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="选择角色" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="管理员">管理员</SelectItem>
                        <SelectItem value="主管">主管</SelectItem>
                        <SelectItem value="工程师">工程师</SelectItem>
                        <SelectItem value="操作员">操作员</SelectItem>
                        <SelectItem value="分析师">分析师</SelectItem>
                        <SelectItem value="观察员">观察员</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">部门</Label>
                    <Select
                      value={newUser.department}
                      onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                    >
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="选择部门" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="信息技术部">信息技术部</SelectItem>
                        <SelectItem value="生产部">生产部</SelectItem>
                        <SelectItem value="安全部">安全部</SelectItem>
                        <SelectItem value="设备部">设备部</SelectItem>
                        <SelectItem value="技术部">技术部</SelectItem>
                        <SelectItem value="质量部">质量部</SelectItem>
                        <SelectItem value="数据分析部">数据分析部</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">初始密码</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="bg-white border-gray-300"
                    placeholder="请输入初始密码"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
                    添加
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">总用户数</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">活跃用户</p>
                  <p className="text-2xl font-bold text-green-400">
                    {users.filter((u) => u.status === "active").length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">停用用户</p>
                  <p className="text-2xl font-bold text-red-400">
                    {users.filter((u) => u.status === "inactive").length}
                  </p>
                </div>
                <UserX className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">管理员</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {users.filter((u) => u.role === "管理员").length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 用户列表 */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>用户列表</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="搜索用户..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white border-gray-300 w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-700">用户名</TableHead>
                  <TableHead className="text-gray-700">姓名</TableHead>
                  <TableHead className="text-gray-700">角色</TableHead>
                  <TableHead className="text-gray-700">部门</TableHead>
                  <TableHead className="text-gray-700">状态</TableHead>
                  <TableHead className="text-gray-700">最后登录</TableHead>
                  <TableHead className="text-gray-700">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-200">
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "管理员" ? "default" : "secondary"}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "destructive"}>
                        {user.status === "active" ? "活跃" : "停用"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === "active" ? (
                            <UserX className="w-4 h-4 text-red-400" />
                          ) : (
                            <UserCheck className="w-4 h-4 text-green-400" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-400"
                          onClick={() => deleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
