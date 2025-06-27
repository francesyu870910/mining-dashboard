package com.mining.platform.controller;

import com.mining.platform.dto.DashboardSummaryDTO;
import com.mining.platform.dto.DeviceLocationDTO;
import com.mining.platform.dto.TimeSeriesDataDTO;
import com.mining.platform.entity.Alert;
import com.mining.platform.entity.MonitoringDevice;
import com.mining.platform.entity.MonitoringTask;
import com.mining.platform.entity.Task;
import com.mining.platform.repository.AlertRepository;
import com.mining.platform.repository.MonitoringDeviceRepository;
import com.mining.platform.repository.MonitoringTaskRepository;
import com.mining.platform.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private MonitoringDeviceRepository deviceRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private MonitoringTaskRepository monitoringTaskRepository;

    /**
     * 获取仪表盘概览数据
     * @return 包含各种统计信息的概览数据
     */
    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getDashboardSummary() {
        DashboardSummaryDTO summary = new DashboardSummaryDTO();
        
        // 统计设备数量和状态
        long totalDevices = deviceRepository.count();
        summary.setTotalDevices(totalDevices);
        
        Map<String, Long> deviceStatusMap = new HashMap<>();
        List<MonitoringDevice> allDevices = deviceRepository.findAll();
        for (MonitoringDevice device : allDevices) {
            String status = device.getStatus();
            deviceStatusMap.put(status, deviceStatusMap.getOrDefault(status, 0L) + 1);
        }
        summary.setDeviceStatusMap(deviceStatusMap);
        
        // 统计告警数量和级别
        long totalAlerts = alertRepository.count();
        summary.setTotalAlerts(totalAlerts);
        
        Map<String, Long> alertLevelMap = new HashMap<>();
        List<Alert> allAlerts = alertRepository.findAll();
        for (Alert alert : allAlerts) {
            String level = alert.getLevel();
            alertLevelMap.put(level, alertLevelMap.getOrDefault(level, 0L) + 1);
        }
        summary.setAlertLevelMap(alertLevelMap);
        
        // 统计任务数量和状态
        long totalTasks = taskRepository.count();
        summary.setTotalTasks(totalTasks);
        
        Map<String, Long> taskStatusMap = new HashMap<>();
        List<Task> allTasks = taskRepository.findAll();
        for (Task task : allTasks) {
            String status = task.getStatus();
            taskStatusMap.put(status, taskStatusMap.getOrDefault(status, 0L) + 1);
        }
        summary.setTaskStatusMap(taskStatusMap);
        
        // 统计布控任务数量和状态
        long totalMonitoringTasks = monitoringTaskRepository.count();
        summary.setTotalMonitoringTasks(totalMonitoringTasks);
        
        Map<String, Long> monitoringTaskStatusMap = new HashMap<>();
        List<MonitoringTask> allMonitoringTasks = monitoringTaskRepository.findAll();
        for (MonitoringTask task : allMonitoringTasks) {
            String status = task.getStatus();
            monitoringTaskStatusMap.put(status, monitoringTaskStatusMap.getOrDefault(status, 0L) + 1);
        }
        summary.setMonitoringTaskStatusMap(monitoringTaskStatusMap);
        
        // 设置系统运行信息
        summary.setSystemUptime(getSystemUptime());
        summary.setSystemMemoryUsage(getSystemMemoryUsage());
        summary.setSystemCpuUsage(getSystemCpuUsage());
        summary.setSystemDiskUsage(getSystemDiskUsage());
        
        return ResponseEntity.ok(summary);
    }

    /**
     * 获取最近的告警信息
     * @param limit 限制返回的告警数量
     * @return 最近的告警列表
     */
    @GetMapping("/recent-alerts")
    public ResponseEntity<List<Alert>> getRecentAlerts(@RequestParam(defaultValue = "5") int limit) {
        List<Alert> recentAlerts = alertRepository.findAll(
            PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "alertTime"))
        ).getContent();
        return ResponseEntity.ok(recentAlerts);
    }

    /**
     * 获取设备状态统计
     * @return 设备状态统计信息
     */
    @GetMapping("/device-stats")
    public ResponseEntity<Map<String, Long>> getDeviceStats() {
        Map<String, Long> deviceStats = new HashMap<>();
        List<MonitoringDevice> allDevices = deviceRepository.findAll();
        
        for (MonitoringDevice device : allDevices) {
            String status = device.getStatus();
            deviceStats.put(status, deviceStats.getOrDefault(status, 0L) + 1);
        }
        
        return ResponseEntity.ok(deviceStats);
    }

    /**
     * 获取任务完成情况统计
     * @return 任务完成情况统计信息
     */
    @GetMapping("/task-stats")
    public ResponseEntity<Map<String, Long>> getTaskStats() {
        Map<String, Long> taskStats = new HashMap<>();
        List<Task> allTasks = taskRepository.findAll();
        
        for (Task task : allTasks) {
            String status = task.getStatus();
            taskStats.put(status, taskStats.getOrDefault(status, 0L) + 1);
        }
        
        return ResponseEntity.ok(taskStats);
    }

    /**
     * 获取告警级别统计
     * @return 告警级别统计信息
     */
    @GetMapping("/alert-stats")
    public ResponseEntity<Map<String, Long>> getAlertStats() {
        Map<String, Long> alertStats = new HashMap<>();
        List<Alert> allAlerts = alertRepository.findAll();
        
        for (Alert alert : allAlerts) {
            String level = alert.getLevel();
            alertStats.put(level, alertStats.getOrDefault(level, 0L) + 1);
        }
        
        return ResponseEntity.ok(alertStats);
    }

    /**
     * 获取布控任务状态统计
     * @return 布控任务状态统计信息
     */
    @GetMapping("/monitoring-task-stats")
    public ResponseEntity<Map<String, Long>> getMonitoringTaskStats() {
        Map<String, Long> monitoringTaskStats = new HashMap<>();
        List<MonitoringTask> allTasks = monitoringTaskRepository.findAll();
        
        for (MonitoringTask task : allTasks) {
            String status = task.getStatus();
            monitoringTaskStats.put(status, monitoringTaskStats.getOrDefault(status, 0L) + 1);
        }
        
        return ResponseEntity.ok(monitoringTaskStats);
    }

    /**
     * 获取时间范围内的告警数据统计
     * @param startDate 开始日期
     * @param endDate 结束日期
     * @param interval 时间间隔类型 (day, week, month)
     * @return 时间序列数据
     */
    @GetMapping("/alert-trend")
    public ResponseEntity<List<TimeSeriesDataDTO>> getAlertTrend(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "day") String interval) {
        
        // 转换日期范围为LocalDateTime
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);
        
        // 获取日期范围内的所有告警
        List<Alert> alerts = alertRepository.findAll().stream()
                .filter(alert -> {
                    LocalDateTime alertTime = alert.getAlertTime();
                    return alertTime != null && 
                           !alertTime.isBefore(startDateTime) && 
                           !alertTime.isAfter(endDateTime);
                })
                .collect(Collectors.toList());
        
        // 按时间间隔分组统计
        Map<String, Long> timeSeriesMap = new HashMap<>();
        DateTimeFormatter formatter;
        
        switch (interval.toLowerCase()) {
            case "week":
                formatter = DateTimeFormatter.ofPattern("yyyy-'W'w");
                break;
            case "month":
                formatter = DateTimeFormatter.ofPattern("yyyy-MM");
                break;
            case "day":
            default:
                formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                break;
        }
        
        for (Alert alert : alerts) {
            String timeKey = alert.getAlertTime().format(formatter);
            timeSeriesMap.put(timeKey, timeSeriesMap.getOrDefault(timeKey, 0L) + 1);
        }
        
        // 转换为时间序列数据列表
        List<TimeSeriesDataDTO> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : timeSeriesMap.entrySet()) {
            TimeSeriesDataDTO dataPoint = new TimeSeriesDataDTO();
            dataPoint.setTimestamp(entry.getKey());
            dataPoint.setValue(entry.getValue());
            result.add(dataPoint);
        }
        
        // 按时间戳排序
        result.sort(Comparator.comparing(TimeSeriesDataDTO::getTimestamp));
        
        return ResponseEntity.ok(result);
    }

    /**
     * 获取设备位置分布
     * @return 设备位置列表
     */
    @GetMapping("/device-locations")
    public ResponseEntity<List<DeviceLocationDTO>> getDeviceLocations() {
        List<MonitoringDevice> devices = deviceRepository.findAll();
        List<DeviceLocationDTO> deviceLocations = new ArrayList<>();
        
        for (MonitoringDevice device : devices) {
            // 如果设备有位置信息，则添加到结果列表
            if (device.getLatitude() != null && device.getLongitude() != null) {
                DeviceLocationDTO locationDTO = new DeviceLocationDTO();
                locationDTO.setDeviceId(device.getId());
                locationDTO.setDeviceName(device.getName());
                locationDTO.setDeviceType(device.getType());
                locationDTO.setStatus(device.getStatus());
                locationDTO.setLatitude(device.getLatitude());
                locationDTO.setLongitude(device.getLongitude());
                locationDTO.setLastUpdateTime(device.getLastUpdateTime());
                
                deviceLocations.add(locationDTO);
            }
        }
        
        return ResponseEntity.ok(deviceLocations);
    }

    /**
     * 获取系统运行时间（模拟数据）
     * @return 系统运行时间（小时）
     */
    private double getSystemUptime() {
        // 实际实现中，应该从系统中获取真实的运行时间
        // 这里返回模拟数据
        return 720.5; // 模拟系统已运行720.5小时
    }

    /**
     * 获取系统内存使用情况（模拟数据）
     * @return 内存使用百分比
     */
    private double getSystemMemoryUsage() {
        // 实际实现中，应该从系统中获取真实的内存使用情况
        // 这里返回模拟数据
        return 45.2; // 模拟系统内存使用率45.2%
    }

    /**
     * 获取系统CPU使用情况（模拟数据）
     * @return CPU使用百分比
     */
    private double getSystemCpuUsage() {
        // 实际实现中，应该从系统中获取真实的CPU使用情况
        // 这里返回模拟数据
        return 32.7; // 模拟系统CPU使用率32.7%
    }

    /**
     * 获取系统磁盘使用情况（模拟数据）
     * @return 磁盘使用百分比
     */
    private double getSystemDiskUsage() {
        // 实际实现中，应该从系统中获取真实的磁盘使用情况
        // 这里返回模拟数据
        return 58.9; // 模拟系统磁盘使用率58.9%
    }
} 