"use client"

import { useState } from "react"
import AppLayout from "./app-layout"
import DashboardContent from "./dashboard-content"
import EventsPage from "./events-page"
import TasksPage from "./tasks-page"
import TargetsPage from "./targets-page"
import MonitoringPage from "./monitoring-page"
import AlertsPage from "./alerts-page"
import SettingsPage from "./settings-page"
import UserManagement from "./user-management"

export default function MainApp() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
  }

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardContent />
      case "events":
        return <EventsPage />
      case "tasks":
        return <TasksPage />
      case "targets":
        return <TargetsPage />
      case "monitoring":
        return <MonitoringPage />
      case "alerts":
        return <AlertsPage />
      case "users":
        return <UserManagement />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardContent />
    }
  }

  return (
    <AppLayout currentPage={currentPage} onPageChange={handlePageChange}>
      {renderContent()}
    </AppLayout>
  )
}
