package com.mining.platform.dto;

import java.util.Map;

/**
 * 仪表盘概览数据传输对象
 */
public class DashboardSummaryDTO {
    
    // 设备相关统计
    private long totalDevices;
    private Map<String, Long> deviceStatusMap;
    
    // 告警相关统计
    private long totalAlerts;
    private Map<String, Long> alertLevelMap;
    
    // 任务相关统计
    private long totalTasks;
    private Map<String, Long> taskStatusMap;
    
    // 布控任务相关统计
    private long totalMonitoringTasks;
    private Map<String, Long> monitoringTaskStatusMap;
    
    // 系统运行信息
    private double systemUptime;
    private double systemMemoryUsage;
    private double systemCpuUsage;
    private double systemDiskUsage;

    // Getters and Setters
    public long getTotalDevices() {
        return totalDevices;
    }

    public void setTotalDevices(long totalDevices) {
        this.totalDevices = totalDevices;
    }

    public Map<String, Long> getDeviceStatusMap() {
        return deviceStatusMap;
    }

    public void setDeviceStatusMap(Map<String, Long> deviceStatusMap) {
        this.deviceStatusMap = deviceStatusMap;
    }

    public long getTotalAlerts() {
        return totalAlerts;
    }

    public void setTotalAlerts(long totalAlerts) {
        this.totalAlerts = totalAlerts;
    }

    public Map<String, Long> getAlertLevelMap() {
        return alertLevelMap;
    }

    public void setAlertLevelMap(Map<String, Long> alertLevelMap) {
        this.alertLevelMap = alertLevelMap;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(long totalTasks) {
        this.totalTasks = totalTasks;
    }

    public Map<String, Long> getTaskStatusMap() {
        return taskStatusMap;
    }

    public void setTaskStatusMap(Map<String, Long> taskStatusMap) {
        this.taskStatusMap = taskStatusMap;
    }

    public long getTotalMonitoringTasks() {
        return totalMonitoringTasks;
    }

    public void setTotalMonitoringTasks(long totalMonitoringTasks) {
        this.totalMonitoringTasks = totalMonitoringTasks;
    }

    public Map<String, Long> getMonitoringTaskStatusMap() {
        return monitoringTaskStatusMap;
    }

    public void setMonitoringTaskStatusMap(Map<String, Long> monitoringTaskStatusMap) {
        this.monitoringTaskStatusMap = monitoringTaskStatusMap;
    }

    public double getSystemUptime() {
        return systemUptime;
    }

    public void setSystemUptime(double systemUptime) {
        this.systemUptime = systemUptime;
    }

    public double getSystemMemoryUsage() {
        return systemMemoryUsage;
    }

    public void setSystemMemoryUsage(double systemMemoryUsage) {
        this.systemMemoryUsage = systemMemoryUsage;
    }

    public double getSystemCpuUsage() {
        return systemCpuUsage;
    }

    public void setSystemCpuUsage(double systemCpuUsage) {
        this.systemCpuUsage = systemCpuUsage;
    }

    public double getSystemDiskUsage() {
        return systemDiskUsage;
    }

    public void setSystemDiskUsage(double systemDiskUsage) {
        this.systemDiskUsage = systemDiskUsage;
    }
} 