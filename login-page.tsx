"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Activity, Eye, EyeOff, Lock, User, Mail, ArrowRight, KeyRound, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { authService } from "@/lib/api-services"

// 为API服务扩展忘记密码相关方法
const passwordResetService = {
  // 请求验证码
  requestVerificationCode: async (username: string) => {
    try {
      // 这里需要后端实现相应API
      // 模拟API调用
      console.log("请求验证码:", username)
      return { success: true }
    } catch (error) {
      console.error("请求验证码失败:", error)
      return { success: false, error }
    }
  },

  // 验证验证码
  verifyCode: async (username: string, code: string) => {
    try {
      // 这里需要后端实现相应API
      // 模拟API调用
      console.log("验证验证码:", username, code)
      return { success: true }
    } catch (error) {
      console.error("验证码验证失败:", error)
      return { success: false, error }
    }
  },

  // 重置密码
  resetPassword: async (username: string, newPassword: string, code: string) => {
    try {
      // 这里需要后端实现相应API
      // 模拟API调用
      console.log("重置密码:", username, newPassword, code)
      return { success: true }
    } catch (error) {
      console.error("重置密码失败:", error)
      return { success: false, error }
    }
  }
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  // 忘记密码相关状态
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [resetStep, setResetStep] = useState(1) // 1: 输入用户名, 2: 输入验证码, 3: 设置新密码, 4: 完成
  const [resetFormData, setResetFormData] = useState({
    username: "",
    verificationCode: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [resetError, setResetError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里处理登录逻辑
    console.log("登录信息:", formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleResetInputChange = (field: string, value: string) => {
    setResetFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setResetError("")
  }

  // 处理忘记密码打开
  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true)
    setResetStep(1)
    setResetFormData({
      username: formData.username, // 预填充用户名
      verificationCode: "",
      newPassword: "",
      confirmPassword: "",
    })
    setResetError("")
  }

  // 处理忘记密码关闭
  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false)
    setResetStep(1)
    setResetError("")
  }

  // 请求验证码
  const handleRequestVerificationCode = async () => {
    if (!resetFormData.username) {
      setResetError("请输入用户名")
      return
    }

    setIsVerifying(true)
    try {
      const result = await passwordResetService.requestVerificationCode(resetFormData.username)
      if (result.success) {
        setResetStep(2) // 进入验证码验证步骤
        setResetError("")
      } else {
        setResetError("验证码发送失败，请稍后重试")
      }
    } catch (error) {
      setResetError("验证码发送失败，请稍后重试")
    } finally {
      setIsVerifying(false)
    }
  }

  // 验证验证码
  const handleVerifyCode = async () => {
    if (!resetFormData.verificationCode) {
      setResetError("请输入验证码")
      return
    }

    setIsVerifying(true)
    try {
      const result = await passwordResetService.verifyCode(
        resetFormData.username,
        resetFormData.verificationCode
      )
      if (result.success) {
        setResetStep(3) // 进入重置密码步骤
        setResetError("")
      } else {
        setResetError("验证码验证失败，请检查后重试")
      }
    } catch (error) {
      setResetError("验证码验证失败，请检查后重试")
    } finally {
      setIsVerifying(false)
    }
  }

  // 重置密码
  const handleResetPassword = async () => {
    if (!resetFormData.newPassword) {
      setResetError("请输入新密码")
      return
    }

    if (resetFormData.newPassword !== resetFormData.confirmPassword) {
      setResetError("两次输入的密码不一致")
      return
    }

    if (resetFormData.newPassword.length < 8) {
      setResetError("密码长度至少为8位")
      return
    }

    setIsResetting(true)
    try {
      const result = await passwordResetService.resetPassword(
        resetFormData.username,
        resetFormData.newPassword,
        resetFormData.verificationCode
      )
      if (result.success) {
        setResetStep(4) // 完成重置
        setResetError("")
      } else {
        setResetError("密码重置失败，请稍后重试")
      }
    } catch (error) {
      setResetError("密码重置失败，请稍后重试")
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">智慧矿山</h1>
              <p className="text-sm text-slate-400">综合管控平台</p>
            </div>
          </div>
        </div>

        {/* 登录表单 */}
        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-white">系统登录</CardTitle>
            <p className="text-sm text-slate-400">请输入您的账号和密码</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 用户名输入 */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300">
                  用户名
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="请输入用户名"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* 密码输入 */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  密码
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 记住我选项 */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                  className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="remember" className="text-sm text-slate-300 cursor-pointer">
                  记住我
                </Label>
              </div>

              {/* 登录按钮 */}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5">
                登录
              </Button>

              {/* 其他选项 */}
              <div className="flex justify-between text-sm">
                <button 
                  type="button" 
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                  onClick={handleForgotPasswordOpen}
                >
                  忘记密码？
                </button>
                <button type="button" className="text-slate-400 hover:text-slate-300 hover:underline">
                  联系管理员
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* 底部信息 */}
        <div className="text-center mt-8 text-sm text-slate-400">
          <p>© 2025 智慧矿山综合管控平台</p>
          <p className="mt-1">版本 v1.1.0</p>
        </div>
      </div>

      {/* 忘记密码对话框 */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">忘记密码</DialogTitle>
            <DialogDescription className="text-slate-400">
              {resetStep === 1 && "请输入您的用户名，我们将发送验证码到您的邮箱"}
              {resetStep === 2 && "请输入您收到的验证码"}
              {resetStep === 3 && "请设置新密码"}
              {resetStep === 4 && "密码重置成功！"}
            </DialogDescription>
          </DialogHeader>

          {resetError && (
            <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm mb-4">
              <AlertCircle className="w-4 h-4" />
              <span>{resetError}</span>
            </div>
          )}

          {/* 步骤1：输入用户名 */}
          {resetStep === 1 && (
            <>
              <div className="space-y-3 py-2">
                <div className="space-y-2">
                  <Label htmlFor="reset-username" className="text-slate-300">用户名</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="reset-username"
                      value={resetFormData.username}
                      onChange={(e) => handleResetInputChange("username", e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                      placeholder="输入您的用户名"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={handleForgotPasswordClose}
                  className="bg-transparent text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white"
                >
                  取消
                </Button>
                <Button 
                  onClick={handleRequestVerificationCode}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isVerifying}
                >
                  {isVerifying ? "发送中..." : "发送验证码"}
                </Button>
              </DialogFooter>
            </>
          )}

          {/* 步骤2：输入验证码 */}
          {resetStep === 2 && (
            <>
              <div className="space-y-3 py-2">
                <div className="space-y-2">
                  <Label htmlFor="verification-code" className="text-slate-300">验证码</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="verification-code"
                      value={resetFormData.verificationCode}
                      onChange={(e) => handleResetInputChange("verificationCode", e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                      placeholder="请输入收到的验证码"
                    />
                  </div>
                  <p className="text-xs text-slate-400">验证码已发送至您的邮箱，请查收</p>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setResetStep(1)}
                  className="bg-transparent text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white"
                >
                  返回
                </Button>
                <Button 
                  onClick={handleVerifyCode}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isVerifying}
                >
                  {isVerifying ? "验证中..." : "验证"}
                </Button>
              </DialogFooter>
            </>
          )}

          {/* 步骤3：设置新密码 */}
          {resetStep === 3 && (
            <>
              <div className="space-y-3 py-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-slate-300">新密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={resetFormData.newPassword}
                      onChange={(e) => handleResetInputChange("newPassword", e.target.value)}
                      className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                      placeholder="请输入新密码"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">密码至少需要8位(包含大小写字母、数字和特殊字符)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-slate-300">确认密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={resetFormData.confirmPassword}
                      onChange={(e) => handleResetInputChange("confirmPassword", e.target.value)}
                      className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                      placeholder="请再次输入新密码"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setResetStep(2)}
                  className="bg-transparent text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white"
                >
                  返回
                </Button>
                <Button 
                  onClick={handleResetPassword}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isResetting}
                >
                  {isResetting ? "重置中..." : "重置密码"}
                </Button>
              </DialogFooter>
            </>
          )}

          {/* 步骤4：完成 */}
          {resetStep === 4 && (
            <>
              <div className="py-6 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mb-4">
                  <ArrowRight className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-center text-white text-lg">密码重置成功！</p>
                <p className="text-center text-slate-400 mt-2">您现在可以使用新密码登录系统</p>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleForgotPasswordClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                >
                  返回登录
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
