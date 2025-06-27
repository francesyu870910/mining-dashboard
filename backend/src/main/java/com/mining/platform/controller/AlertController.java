package com.mining.platform.controller;

import com.mining.platform.dto.MessageResponse;
import com.mining.platform.entity.Alert;
import com.mining.platform.entity.User;
import com.mining.platform.exception.ResourceNotFoundException;
import com.mining.platform.repository.AlertRepository;
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
@RequestMapping("/api/alerts")
public class AlertController {

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alert> getAlertById(@PathVariable Long id) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("告警", "id", id));
        return ResponseEntity.ok(alert);
    }

    @GetMapping("/device/{deviceId}")
    public List<Alert> getAlertsByDeviceId(@PathVariable Long deviceId) {
        return alertRepository.findByDeviceId(deviceId);
    }

    @GetMapping("/task/{taskId}")
    public List<Alert> getAlertsByTaskId(@PathVariable Long taskId) {
        return alertRepository.findByTaskId(taskId);
    }

    @GetMapping("/target/{targetId}")
    public List<Alert> getAlertsByTargetId(@PathVariable Long targetId) {
        return alertRepository.findByTargetId(targetId);
    }

    @GetMapping("/status/{status}")
    public List<Alert> getAlertsByStatus(@PathVariable String status) {
        return alertRepository.findByStatus(status);
    }

    @GetMapping("/level/{level}")
    public List<Alert> getAlertsByLevel(@PathVariable String level) {
        return alertRepository.findByLevel(level);
    }

    @GetMapping("/type/{alertType}")
    public List<Alert> getAlertsByType(@PathVariable String alertType) {
        return alertRepository.findByAlertType(alertType);
    }

    @GetMapping("/handled-by/{userId}")
    public List<Alert> getAlertsByHandledBy(@PathVariable Long userId) {
        return alertRepository.findByHandledById(userId);
    }

    @GetMapping("/my-handled")
    public List<Alert> getMyHandledAlerts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("用户", "username", username));
        return alertRepository.findByHandledById(user.getId());
    }

    @GetMapping("/date-range")
    public List<Alert> getAlertsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endDate) {
        return alertRepository.findByAlertTimeBetween(startDate, endDate);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public ResponseEntity<Alert> createAlert(@Valid @RequestBody Alert alert) {
        Alert savedAlert = alertRepository.save(alert);
        return ResponseEntity.ok(savedAlert);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public ResponseEntity<Alert> updateAlert(@PathVariable Long id, @Valid @RequestBody Alert alertDetails) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("告警", "id", id));

        alert.setAlertType(alertDetails.getAlertType());
        alert.setLevel(alertDetails.getLevel());
        alert.setStatus(alertDetails.getStatus());
        alert.setDescription(alertDetails.getDescription());
        alert.setLocation(alertDetails.getLocation());
        alert.setImageUrl(alertDetails.getImageUrl());
        alert.setDevice(alertDetails.getDevice());
        alert.setTask(alertDetails.getTask());
        alert.setTarget(alertDetails.getTarget());
        alert.setAlertTime(alertDetails.getAlertTime());

        Alert updatedAlert = alertRepository.save(alert);
        return ResponseEntity.ok(updatedAlert);
    }

    @PutMapping("/{id}/handle")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public ResponseEntity<Alert> handleAlert(@PathVariable Long id, @RequestBody Map<String, String> handleInfo) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("告警", "id", id));

        // 设置处理人为当前用户
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("用户", "username", username));

        alert.setHandledBy(user);
        alert.setHandledTime(new Date());
        alert.setStatus("已处理");
        alert.setHandleResult(handleInfo.get("handleResult"));

        Alert updatedAlert = alertRepository.save(alert);
        return ResponseEntity.ok(updatedAlert);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteAlert(@PathVariable Long id) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("告警", "id", id));

        alertRepository.delete(alert);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
} 