package com.mining.platform.controller;

import com.mining.platform.dto.MessageResponse;
import com.mining.platform.entity.MonitoringDevice;
import com.mining.platform.entity.MonitoringTask;
import com.mining.platform.entity.Target;
import com.mining.platform.entity.User;
import com.mining.platform.exception.ResourceNotFoundException;
import com.mining.platform.repository.MonitoringDeviceRepository;
import com.mining.platform.repository.MonitoringTaskRepository;
import com.mining.platform.repository.TargetRepository;
import com.mining.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/monitoring")
public class MonitoringTaskController {

    @Autowired
    private MonitoringTaskRepository taskRepository;

    @Autowired
    private MonitoringDeviceRepository deviceRepository;

    @Autowired
    private TargetRepository targetRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<MonitoringTask> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonitoringTask> getTaskById(@PathVariable Long id) {
        MonitoringTask task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("布控任务", "id", id));
        return ResponseEntity.ok(task);
    }

    @GetMapping("/device/{deviceId}")
    public List<MonitoringTask> getTasksByDeviceId(@PathVariable Long deviceId) {
        return taskRepository.findByDeviceId(deviceId);
    }

    @GetMapping("/target/{targetId}")
    public List<MonitoringTask> getTasksByTargetId(@PathVariable Long targetId) {
        return taskRepository.findByTargetId(targetId);
    }

    @GetMapping("/status/{status}")
    public List<MonitoringTask> getTasksByStatus(@PathVariable String status) {
        return taskRepository.findByStatus(status);
    }

    @GetMapping("/priority/{priority}")
    public List<MonitoringTask> getTasksByPriority(@PathVariable String priority) {
        return taskRepository.findByPriority(priority);
    }

    @GetMapping("/user/{userId}")
    public List<MonitoringTask> getTasksByUserId(@PathVariable Long userId) {
        return taskRepository.findByCreatedById(userId);
    }

    @GetMapping("/my-tasks")
    public List<MonitoringTask> getMyTasks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("用户", "username", username));
        return taskRepository.findByCreatedById(user.getId());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public ResponseEntity<?> createTask(@Valid @RequestBody MonitoringTask task) {
        // 验证设备是否存在
        MonitoringDevice device = deviceRepository.findById(task.getDevice().getId())
                .orElseThrow(() -> new ResourceNotFoundException("监控设备", "id", task.getDevice().getId()));
        task.setDevice(device);

        // 验证目标是否存在
        Target target = targetRepository.findById(task.getTarget().getId())
                .orElseThrow(() -> new ResourceNotFoundException("目标", "id", task.getTarget().getId()));
        task.setTarget(target);

        // 设置创建者为当前用户
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("用户", "username", username));
        task.setCreatedBy(user);

        MonitoringTask savedTask = taskRepository.save(task);
        return ResponseEntity.ok(savedTask);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public ResponseEntity<MonitoringTask> updateTask(@PathVariable Long id, @Valid @RequestBody MonitoringTask taskDetails) {
        MonitoringTask task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("布控任务", "id", id));

        // 更新基本信息
        task.setTaskName(taskDetails.getTaskName());
        task.setTaskType(taskDetails.getTaskType());
        task.setStatus(taskDetails.getStatus());
        task.setPriority(taskDetails.getPriority());
        task.setRules(taskDetails.getRules());
        task.setDescription(taskDetails.getDescription());
        task.setStartTime(taskDetails.getStartTime());
        task.setEndTime(taskDetails.getEndTime());

        // 如果更新了设备
        if (taskDetails.getDevice() != null && !task.getDevice().getId().equals(taskDetails.getDevice().getId())) {
            MonitoringDevice device = deviceRepository.findById(taskDetails.getDevice().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("监控设备", "id", taskDetails.getDevice().getId()));
            task.setDevice(device);
        }

        // 如果更新了目标
        if (taskDetails.getTarget() != null && !task.getTarget().getId().equals(taskDetails.getTarget().getId())) {
            Target target = targetRepository.findById(taskDetails.getTarget().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("目标", "id", taskDetails.getTarget().getId()));
            task.setTarget(target);
        }

        MonitoringTask updatedTask = taskRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteTask(@PathVariable Long id) {
        MonitoringTask task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("布控任务", "id", id));

        taskRepository.delete(task);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
} 