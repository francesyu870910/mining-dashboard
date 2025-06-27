package com.mining.platform.controller;

import com.mining.platform.dto.MessageResponse;
import com.mining.platform.entity.Task;
import com.mining.platform.entity.User;
import com.mining.platform.exception.ResourceNotFoundException;
import com.mining.platform.repository.TaskRepository;
import com.mining.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("任务", "id", id));
        return ResponseEntity.ok(task);
    }

    @GetMapping("/code/{taskCode}")
    public ResponseEntity<Task> getTaskByCode(@PathVariable String taskCode) {
        Task task = taskRepository.findByTaskCode(taskCode)
                .orElseThrow(() -> new ResourceNotFoundException("任务", "任务编码", taskCode));
        return ResponseEntity.ok(task);
    }

    @GetMapping("/type/{taskType}")
    public List<Task> getTasksByType(@PathVariable String taskType) {
        return taskRepository.findByTaskType(taskType);
    }

    @GetMapping("/status/{status}")
    public List<Task> getTasksByStatus(@PathVariable String status) {
        return taskRepository.findByStatus(status);
    }

    @GetMapping("/priority/{priority}")
    public List<Task> getTasksByPriority(@PathVariable String priority) {
        return taskRepository.findByPriority(priority);
    }

    @GetMapping("/assigned/{userId}")
    public List<Task> getTasksByAssignedTo(@PathVariable Long userId) {
        return taskRepository.findByAssignedToId(userId);
    }

    @GetMapping("/created/{userId}")
    public List<Task> getTasksByCreatedBy(@PathVariable Long userId) {
        return taskRepository.findByCreatedById(userId);
    }

    @GetMapping("/my-tasks")
    public List<Task> getMyTasks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("用户", "username", username));
        return taskRepository.findByAssignedToId(user.getId());
    }

    @GetMapping("/my-created-tasks")
    public List<Task> getMyCreatedTasks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("用户", "username", username));
        return taskRepository.findByCreatedById(user.getId());
    }

    @GetMapping("/start-date-range")
    public List<Task> getTasksByStartDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endDate) {
        return taskRepository.findByStartTimeBetween(startDate, endDate);
    }

    @GetMapping("/end-date-range")
    public List<Task> getTasksByEndDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endDate) {
        return taskRepository.findByEndTimeBetween(startDate, endDate);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public ResponseEntity<?> createTask(@Valid @RequestBody Task task) {
        if (task.getTaskCode() != null && taskRepository.existsByTaskCode(task.getTaskCode())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("任务编码已存在"));
        }

        // 设置创建者为当前用户
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("用户", "username", username));
        task.setCreatedBy(user);

        // 验证指派用户是否存在
        if (task.getAssignedTo() != null && task.getAssignedTo().getId() != null) {
            User assignedUser = userRepository.findById(task.getAssignedTo().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("用户", "id", task.getAssignedTo().getId()));
            task.setAssignedTo(assignedUser);
        }

        Task savedTask = taskRepository.save(task);
        return ResponseEntity.ok(savedTask);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR') or @userSecurity.isTaskCreator(#id)")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("任务", "id", id));

        task.setTaskName(taskDetails.getTaskName());
        task.setTaskType(taskDetails.getTaskType());
        task.setStatus(taskDetails.getStatus());
        task.setPriority(taskDetails.getPriority());
        task.setDescription(taskDetails.getDescription());
        task.setStartTime(taskDetails.getStartTime());
        task.setEndTime(taskDetails.getEndTime());
        task.setProgress(taskDetails.getProgress());

        // 如果状态为已完成，且完成时间未设置，则设置完成时间为当前时间
        if ("已完成".equals(taskDetails.getStatus()) && task.getCompletedTime() == null) {
            task.setCompletedTime(new Date());
        }

        // 如果指派了新用户
        if (taskDetails.getAssignedTo() != null && 
            (task.getAssignedTo() == null || !task.getAssignedTo().getId().equals(taskDetails.getAssignedTo().getId()))) {
            User assignedUser = userRepository.findById(taskDetails.getAssignedTo().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("用户", "id", taskDetails.getAssignedTo().getId()));
            task.setAssignedTo(assignedUser);
        }

        Task updatedTask = taskRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }

    @PutMapping("/{id}/progress")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR') or @userSecurity.isTaskAssignee(#id)")
    public ResponseEntity<Task> updateTaskProgress(@PathVariable Long id, @RequestBody Map<String, Integer> progressMap) {
        Integer progress = progressMap.get("progress");
        if (progress == null || progress < 0 || progress > 100) {
            return ResponseEntity.badRequest().build();
        }

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("任务", "id", id));
        
        task.setProgress(progress);
        
        // 如果进度为100%，则将状态更新为已完成，并设置完成时间
        if (progress == 100 && !"已完成".equals(task.getStatus())) {
            task.setStatus("已完成");
            task.setCompletedTime(new Date());
        }

        Task updatedTask = taskRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteTask(@PathVariable Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("任务", "id", id));

        taskRepository.delete(task);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
} 