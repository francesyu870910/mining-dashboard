"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  User,
  Camera,
  Bell,
  Network,
  Database,
  FileText,
  Shield,
  Monitor,
  Globe,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  Server,
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [settings, setSettings] = useState({
    systemName: "智慧矿山综合管控平台",
    timezone: "Asia/Shanghai",
    language: "zh-CN",
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    recordingEnabled: true,
    recordingDays: 30,
    alertLevel: "medium",
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireSpecialChars: true,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // 保存设置逻辑
    console.log("保存设置:", settings)
  }

  const handleReset = () => {
    // 重置设置逻辑
    console.log("重置设置")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-500">配置系统参数和功能选项</p>
        </div>
      </div>

      <div className="max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-white border border-gray-200">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              基本设置
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              用户设置
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              监控设置
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              告警设置
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              网络设置
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              数据设置
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              日志设置
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              系统维护
            </TabsTrigger>
          </TabsList>

          {/* 基本设置 */}
          <TabsContent value="basic" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Settings className="w-5 h-5" />
                  基本配置
                </CardTitle>
                <CardDescription>配置系统的基本信息和显示设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="systemName" className="text-gray-700">
                      系统名称
                    </Label>
                    <Input
                      id="systemName"
                      value={settings.systemName}
                      onChange={(e) => handleSettingChange("systemName", e.target.value)}
                      className="bg-white border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-gray-700">
                      时区设置
                    </Label>
                    <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Shanghai">Asia/Shanghai (UTC+8)</SelectItem>
                        <SelectItem value="Asia/Beijing">Asia/Beijing (UTC+8)</SelectItem>
                        <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-gray-700">
                      系统语言
                    </Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zh-CN">简体中文</SelectItem>
                        <SelectItem value="zh-TW">繁体中文</SelectItem>
                        <SelectItem value="en-US">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">自动备份</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={settings.autoBackup}
                        onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                      />
                      <span className="text-sm text-gray-600">启用自动数据备份</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Monitor className="w-5 h-5" />
                  显示设置
                </CardTitle>
                <CardDescription>配置界面显示和主题相关设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700">深色模式</Label>
                    <p className="text-sm text-gray-500">启用深色主题界面</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700">紧凑模式</Label>
                    <p className="text-sm text-gray-500">减少界面元素间距</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 用户设置 */}
          <TabsContent value="user" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Shield className="w-5 h-5" />
                  安全策略
                </CardTitle>
                <CardDescription>配置用户登录和密码安全策略</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts" className="text-gray-700">
                      最大登录尝试次数
                    </Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleSettingChange("maxLoginAttempts", Number.parseInt(e.target.value))}
                      className="bg-white border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout" className="text-gray-700">
                      会话超时时间（分钟）
                    </Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                      className="bg-white border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength" className="text-gray-700">
                      密码最小长度
                    </Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={settings.passwordMinLength}
                      onChange={(e) => handleSettingChange("passwordMinLength", Number.parseInt(e.target.value))}
                      className="bg-white border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">密码复杂度要求</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={settings.requireSpecialChars}
                        onCheckedChange={(checked) => handleSettingChange("requireSpecialChars", checked)}
                      />
                      <span className="text-sm text-gray-600">要求特殊字符</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <User className="w-5 h-5" />
                  用户管理
                </CardTitle>
                <CardDescription>配置用户相关的管理选项</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700">允许用户自注册</Label>
                    <p className="text-sm text-gray-500">允许新用户自行注册账号</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700">强制双因素认证</Label>
                    <p className="text-sm text-gray-500">要求所有用户启用2FA</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 监控设置 */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Camera className="w-5 h-5" />
                  录像设置
                </CardTitle>
                <CardDescription>配置视频录像和存储相关设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-700">启用录像功能</Label>
                    <p className="text-sm text-gray-500">自动录制监控视频</p>
                  </div>
                  <Switch
                    checked={settings.recordingEnabled}
                    onCheckedChange={(checked) => handleSettingChange("recordingEnabled", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recordingDays" className="text-gray-700">
                    录像保存天数
                  </Label>
                  <Input
                    id="recordingDays"
                    type="number"
                    value={settings.recordingDays}
                    onChange={(e) => handleSettingChange("recordingDays", Number.parseInt(e.target.value))}
                    className="bg-white border-gray-300"
                  />
                  <p className="text-sm text-gray-500">超过此天数的录像将被自动删除</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">录像质量</Label>
                  <Select defaultValue="high">
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低质量 (720p)</SelectItem>
                      <SelectItem value="medium">中等质量 (1080p)</SelectItem>
                      <SelectItem value="high">高质量 (4K)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Monitor className="w-5 h-5" />
                  监控点位
                </CardTitle>
                <CardDescription>管理监控摄像头和传感器设备</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-sm text-gray-600">在线摄像头</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">18</div>
                    <div className="text-sm text-gray-600">传感器设备</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">2</div>
                    <div className="text-sm text-gray-600">离线设备</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 告警设置 */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Bell className="w-5 h-5" />
                  告警规则
                </CardTitle>
                <CardDescription>配置告警触发条件和处理规则</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-700">默认告警级别</Label>
                  <Select
                    value={settings.alertLevel}
                    onValueChange={(value) => handleSettingChange("alertLevel", value)}
                  >
                    <SelectTrigger className="bg-white border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低级告警</SelectItem>
                      <SelectItem value="medium">中级告警</SelectItem>
                      <SelectItem value="high">高级告警</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-700">通知方式</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-700">邮件通知</Label>
                        <p className="text-sm text-gray-500">通过邮件发送告警信息</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-700">短信通知</Label>
                        <p className="text-sm text-gray-500">通过短信发送紧急告警</p>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <AlertTriangle className="w-5 h-5" />
                  告警统计
                </CardTitle>
                <CardDescription>查看告警处理统计信息</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">5</div>
                    <div className="text-sm text-gray-600">高级告警</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">12</div>
                    <div className="text-sm text-gray-600">中级告警</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">28</div>
                    <div className="text-sm text-gray-600">低级告警</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-sm text-gray-600">已处理</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 网络设置 */}
          <TabsContent value="network" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Network className="w-5 h-5" />
                  网络配置
                </CardTitle>
                <CardDescription>配置系统网络连接和通信设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="serverIp" className="text-gray-700">
                      服务器IP地址
                    </Label>
                    <Input id="serverIp" defaultValue="192.168.1.100" className="bg-white border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serverPort" className="text-gray-700">
                      服务器端口
                    </Label>
                    <Input id="serverPort" defaultValue="8080" className="bg-white border-gray-300" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="databaseHost" className="text-gray-700">
                      数据库主机
                    </Label>
                    <Input id="databaseHost" defaultValue="localhost" className="bg-white border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="databasePort" className="text-gray-700">
                      数据库端口
                    </Label>
                    <Input id="databasePort" defaultValue="3306" className="bg-white border-gray-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Globe className="w-5 h-5" />
                  网络状态
                </CardTitle>
                <CardDescription>查看当前网络连接状态</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">数据库连接</span>
                    <Badge className="bg-green-100 text-green-800">正常</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">外网连接</span>
                    <Badge className="bg-green-100 text-green-800">正常</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">监控设备连接</span>
                    <Badge className="bg-yellow-100 text-yellow-800">部分异常</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 数据设置 */}
          <TabsContent value="data" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Database className="w-5 h-5" />
                  数据管理
                </CardTitle>
                <CardDescription>配置数据备份、清理和导入导出设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">数据备份</h4>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        立即备份
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        恢复备份
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">数据清理</h4>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Trash2 className="w-4 h-4 mr-2" />
                        清理日志
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Trash2 className="w-4 h-4 mr-2" />
                        清理缓存
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">存储信息</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2.5TB</div>
                      <div className="text-sm text-gray-600">总存储空间</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">1.8TB</div>
                      <div className="text-sm text-gray-600">已使用</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">0.7TB</div>
                      <div className="text-sm text-gray-600">可用空间</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 日志设置 */}
          <TabsContent value="logs" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <FileText className="w-5 h-5" />
                  日志配置
                </CardTitle>
                <CardDescription>配置系统日志记录和审计设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-700">日志级别</Label>
                    <Select defaultValue="info">
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">调试 (Debug)</SelectItem>
                        <SelectItem value="info">信息 (Info)</SelectItem>
                        <SelectItem value="warn">警告 (Warning)</SelectItem>
                        <SelectItem value="error">错误 (Error)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logRetention" className="text-gray-700">
                      日志保留天数
                    </Label>
                    <Input id="logRetention" type="number" defaultValue="90" className="bg-white border-gray-300" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-gray-700">审计日志</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-700">用户操作日志</Label>
                        <p className="text-sm text-gray-500">记录用户的所有操作行为</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-700">系统事件日志</Label>
                        <p className="text-sm text-gray-500">记录系统重要事件</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-700">安全事件日志</Label>
                        <p className="text-sm text-gray-500">记录安全相关事件</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 系统维护 */}
          <TabsContent value="system" className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Server className="w-5 h-5" />
                  系统信息
                </CardTitle>
                <CardDescription>查看系统运行状态和版本信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">系统版本:</span>
                      <span className="font-medium">v2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">运行时间:</span>
                      <span className="font-medium">15天 8小时</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CPU使用率:</span>
                      <span className="font-medium">45%</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">内存使用:</span>
                      <span className="font-medium">6.2GB / 16GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">磁盘使用:</span>
                      <span className="font-medium">1.8TB / 2.5TB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">网络状态:</span>
                      <Badge className="bg-green-100 text-green-800">正常</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <RefreshCw className="w-5 h-5" />
                  系统维护
                </CardTitle>
                <CardDescription>执行系统维护和更新操作</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    重启系统
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    检查更新
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    优化数据库
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    清理缓存
                  </Button>
                </div>

                <Separator />

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">维护提醒</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        建议定期执行系统维护操作以确保最佳性能。上次维护时间：2025年5月28日
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 操作按钮 */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            重置设置
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            保存设置
          </Button>
        </div>
      </div>
    </div>
  )
}
