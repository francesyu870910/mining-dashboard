"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  Settings,
  Bell,
  Users,
  Shield,
  Clock,
  MapPin,
  Activity,
  LogOut,
  Lock,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authService } from "@/lib/api-services"

// 为API服务扩展修改密码相关方法
const passwordService = {
  // 验证原密码
  verifyCurrentPassword: async (username: string, currentPassword: string) => {
    try {
      // 这里需要后端实现相应API
      // 模拟API调用
      console.log("验证原密码:", username, currentPassword)
      return { success: true }
    } catch (error) {
      console.error("原密码验证失败:", error)
      return { success: false, error }
    }
  },

  // 修改密码
  changePassword: async (username: string, currentPassword: string, newPassword: string) => {
    try {
      // 这里需要后端实现相应API
      // 模拟API调用
      console.log("修改密码:", username, currentPassword, newPassword)
      return { success: true }
    } catch (error) {
      console.error("修改密码失败:", error)
      return { success: false, error }
    }
  }
}

interface AppLayoutProps {
  children: React.ReactNode
  currentPage: string
  onPageChange: (page: string) => void
}

export default function AppLayout({ children, currentPage, onPageChange }: AppLayoutProps) {
  const isDashboard = currentPage === "dashboard"
  const bgClass = isDashboard ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
  const headerBgClass = isDashboard ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"

  // 添加当前时间状态
  const [currentTime, setCurrentTime] = useState<string>("")

  // 更新当前时间的效果
  useEffect(() => {
    // 格式化日期时间的函数
    const formatDateTime = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = (now.getMonth() + 1).toString().padStart(2, '0')
      const day = now.getDate().toString().padStart(2, '0')
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
    }

    // 立即设置一次当前时间
    setCurrentTime(formatDateTime())

    // 设置定时器每秒更新一次时间
    const timer = setInterval(() => {
      setCurrentTime(formatDateTime())
    }, 1000)

    // 组件卸载时清除定时器
    return () => clearInterval(timer)
  }, [])

  // 修改密码相关状态
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [changeFormData, setChangeFormData] = useState({
    username: "admin", // 默认值，实际应该从当前用户会话中获取
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [changeError, setChangeError] = useState("")
  const [changeStep, setChangeStep] = useState(1) // 1: 输入当前密码和新密码, 2: 完成
  const [isChanging, setIsChanging] = useState(false)

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

  // 处理修改密码打开
  const handleChangePasswordOpen = () => {
    setChangePasswordOpen(true)
    setChangeStep(1)
    setChangeFormData({
      ...changeFormData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setChangeError("")
  }

  // 处理修改密码关闭
  const handleChangePasswordClose = () => {
    setChangePasswordOpen(false)
    setChangeStep(1)
    setChangeError("")
  }

  // 处理输入改变
  const handleChangeInputChange = (field: string, value: string) => {
    setChangeFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setChangeError("")
  }

  // 处理修改密码
  const handleChangePassword = async () => {
    if (!changeFormData.currentPassword) {
      setChangeError("请输入当前密码")
      return
    }

    if (!changeFormData.newPassword) {
      setChangeError("请输入新密码")
      return
    }

    if (changeFormData.newPassword !== changeFormData.confirmPassword) {
      setChangeError("两次输入的密码不一致")
      return
    }

    if (changeFormData.newPassword.length < 8) {
      setChangeError("密码长度至少为8位")
      return
    }

    if (changeFormData.newPassword === changeFormData.currentPassword) {
      setChangeError("新密码不能与当前密码相同")
      return
    }

    setIsChanging(true)
    try {
      const result = await passwordService.changePassword(
        changeFormData.username,
        changeFormData.currentPassword,
        changeFormData.newPassword
      )
      if (result.success) {
        setChangeStep(2) // 完成修改
        setChangeError("")
      } else {
        setChangeError("密码修改失败，请稍后重试")
      }
    } catch (error) {
      setChangeError("密码修改失败，请稍后重试")
    } finally {
      setIsChanging(false)
    }
  }

  // 处理退出登录
  const handleLogout = () => {
    // 这里处理退出登录逻辑
    console.log("退出登录")
    // 重定向到登录页面
    window.location.href = "/login"
  }

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
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{currentTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>华北矿区</span>
            </div>
            {/* 管理员下拉菜单 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg cursor-pointer ${
                    isDashboard ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>管理员</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={`${
                  isDashboard
                    ? "bg-slate-800 border-slate-700 text-slate-300"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                <DropdownMenuItem
                  className={`cursor-pointer ${
                    isDashboard ? "hover:bg-slate-700 hover:text-white" : "hover:bg-gray-100"
                  }`}
                  onClick={handleChangePasswordOpen}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  <span>修改密码</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className={isDashboard ? "bg-slate-700" : "bg-gray-200"} />
                <DropdownMenuItem
                  className={`cursor-pointer ${
                    isDashboard ? "hover:bg-slate-700 hover:text-white" : "hover:bg-gray-100"
                  }`}
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>退出登录</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

      {/* 修改密码对话框 */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent
          className={`${
            isDashboard
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          <DialogHeader>
            <DialogTitle className={isDashboard ? "text-white" : "text-gray-900"}>修改密码</DialogTitle>
            <DialogDescription className={isDashboard ? "text-slate-400" : "text-gray-500"}>
              {changeStep === 1 && "请输入当前密码和新密码"}
              {changeStep === 2 && "密码修改成功！"}
            </DialogDescription>
          </DialogHeader>

          {changeError && (
            <div
              className={`flex items-center gap-2 p-3 ${
                isDashboard
                  ? "bg-red-900/30 border border-red-800 text-red-200"
                  : "bg-red-100 border border-red-300 text-red-800"
              } rounded-md text-sm mb-4`}
            >
              <AlertCircle className="w-4 h-4" />
              <span>{changeError}</span>
            </div>
          )}

          {/* 步骤1：输入当前密码和新密码 */}
          {changeStep === 1 && (
            <>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="current-password"
                    className={isDashboard ? "text-slate-300" : "text-gray-700"}
                  >
                    当前密码
                  </Label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                        isDashboard ? "text-slate-400" : "text-gray-400"
                      }`}
                    />
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={changeFormData.currentPassword}
                      onChange={(e) => handleChangeInputChange("currentPassword", e.target.value)}
                      className={`pl-10 pr-10 ${
                        isDashboard
                          ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                      }`}
                      placeholder="输入当前密码"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        isDashboard
                          ? "text-slate-400 hover:text-slate-300"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="new-password"
                    className={isDashboard ? "text-slate-300" : "text-gray-700"}
                  >
                    新密码
                  </Label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                        isDashboard ? "text-slate-400" : "text-gray-400"
                      }`}
                    />
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={changeFormData.newPassword}
                      onChange={(e) => handleChangeInputChange("newPassword", e.target.value)}
                      className={`pl-10 pr-10 ${
                        isDashboard
                          ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                      }`}
                      placeholder="请输入新密码"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        isDashboard
                          ? "text-slate-400 hover:text-slate-300"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p
                    className={`text-xs ${isDashboard ? "text-slate-400" : "text-gray-500"}`}
                  >
                    密码至少需要8位(包含大小写字母、数字和特殊字符）
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className={isDashboard ? "text-slate-300" : "text-gray-700"}
                  >
                    确认密码
                  </Label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                        isDashboard ? "text-slate-400" : "text-gray-400"
                      }`}
                    />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={changeFormData.confirmPassword}
                      onChange={(e) => handleChangeInputChange("confirmPassword", e.target.value)}
                      className={`pl-10 pr-10 ${
                        isDashboard
                          ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                      }`}
                      placeholder="请再次输入新密码"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        isDashboard
                          ? "text-slate-400 hover:text-slate-300"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleChangePasswordClose}
                  className={`${
                    isDashboard
                      ? "bg-transparent text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  取消
                </Button>
                <Button
                  onClick={handleChangePassword}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isChanging}
                >
                  {isChanging ? "修改中..." : "修改密码"}
                </Button>
              </DialogFooter>
            </>
          )}

          {/* 步骤2：完成 */}
          {changeStep === 2 && (
            <>
              <div className="py-6 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mb-4">
                  <CheckIcon className="w-8 h-8 text-green-500" />
                </div>
                <p
                  className={`text-center text-lg ${
                    isDashboard ? "text-white" : "text-gray-900"
                  }`}
                >
                  密码修改成功！
                </p>
                <p
                  className={`text-center mt-2 ${
                    isDashboard ? "text-slate-400" : "text-gray-500"
                  }`}
                >
                  下次登录时请使用新密码
                </p>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleChangePasswordClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                >
                  确定
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// 检查图标组件
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

// 眼睛图标组件
const Eye = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

// 眼睛关闭图标组件
const EyeOff = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
)

// 警告图标组件
const AlertCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
)
