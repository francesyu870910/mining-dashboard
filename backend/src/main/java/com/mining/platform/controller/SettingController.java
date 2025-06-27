package com.mining.platform.controller;

import com.mining.platform.dto.MessageResponse;
import com.mining.platform.entity.SystemSetting;
import com.mining.platform.entity.User;
import com.mining.platform.exception.ResourceNotFoundException;
import com.mining.platform.repository.SystemSettingRepository;
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
@RequestMapping("/api/settings")
public class SettingController {

    @Autowired
    private SystemSettingRepository settingRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<SystemSetting> getAllSettings() {
        return settingRepository.findAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SystemSetting> getSettingById(@PathVariable Long id) {
        SystemSetting setting = settingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("系统设置", "id", id));
        return ResponseEntity.ok(setting);
    }

    @GetMapping("/key/{key}")
    public ResponseEntity<SystemSetting> getSettingByKey(@PathVariable String key) {
        SystemSetting setting = settingRepository.findByKey(key)
                .orElseThrow(() -> new ResourceNotFoundException("系统设置", "key", key));
        return ResponseEntity.ok(setting);
    }

    @GetMapping("/category/{category}")
    public List<SystemSetting> getSettingsByCategory(@PathVariable String category) {
        return settingRepository.findByCategory(category);
    }

    @GetMapping("/system")
    public List<SystemSetting> getSystemSettings() {
        return settingRepository.findByIsSystem(true);
    }

    @GetMapping("/custom")
    public List<SystemSetting> getCustomSettings() {
        return settingRepository.findByIsSystem(false);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createSetting(@Valid @RequestBody SystemSetting setting) {
        if (settingRepository.existsByKey(setting.getKey())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("设置键已存在"));
        }

        // 设置最后修改人为当前用户
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("用户", "username", username));
        setting.setLastModifiedBy(user);

        SystemSetting savedSetting = settingRepository.save(setting);
        return ResponseEntity.ok(savedSetting);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SystemSetting> updateSetting(@PathVariable Long id, @Valid @RequestBody SystemSetting settingDetails) {
        SystemSetting setting = settingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("系统设置", "id", id));

        // 系统设置不允许修改key和isSystem
        if (setting.getIsSystem()) {
            setting.setValue(settingDetails.getValue());
            setting.setDescription(settingDetails.getDescription());
        } else {
            setting.setValue(settingDetails.getValue());
            setting.setCategory(settingDetails.getCategory());
            setting.setDescription(settingDetails.getDescription());
        }

        // 设置最后修改人为当前用户
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("用户", "username", username));
        setting.setLastModifiedBy(user);

        SystemSetting updatedSetting = settingRepository.save(setting);
        return ResponseEntity.ok(updatedSetting);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteSetting(@PathVariable Long id) {
        SystemSetting setting = settingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("系统设置", "id", id));

        // 系统设置不允许删除
        if (setting.getIsSystem()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("deleted", Boolean.FALSE, "error", Boolean.TRUE));
        }

        settingRepository.delete(setting);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/init")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> initializeDefaultSettings() {
        // 如果已经存在系统设置，则不再初始化
        if (!settingRepository.findByIsSystem(true).isEmpty()) {
            return ResponseEntity.ok(new MessageResponse("系统设置已存在，无需初始化"));
        }

        // 获取当前用户作为最后修改人
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("用户", "username", username));

        // 创建默认系统设置
        SystemSetting[] defaultSettings = {
            createSystemSetting("system.name", "智慧矿山监控平台", "系统", "系统名称", user),
            createSystemSetting("system.version", "1.0.0", "系统", "系统版本", user),
            createSystemSetting("system.timezone", "Asia/Shanghai", "系统", "系统时区", user),
            createSystemSetting("system.dateFormat", "YYYY/MM/DD", "系统", "日期格式", user),
            createSystemSetting("system.timeFormat", "HH:mm:ss", "系统", "时间格式", user),
            createSystemSetting("system.defaultLanguage", "zh_CN", "系统", "默认语言", user),
            createSystemSetting("system.theme", "dark", "系统", "系统主题", user),
            createSystemSetting("system.pageSize", "10", "系统", "默认分页大小", user),
            createSystemSetting("alert.autoRefresh", "true", "告警", "告警自动刷新", user),
            createSystemSetting("alert.refreshInterval", "30", "告警", "告警刷新间隔(秒)", user),
            createSystemSetting("alert.soundEnabled", "true", "告警", "告警声音启用", user),
            createSystemSetting("monitoring.autoRefresh", "true", "监控", "监控数据自动刷新", user),
            createSystemSetting("monitoring.refreshInterval", "5", "监控", "监控数据刷新间隔(秒)", user)
        };

        // 保存所有默认设置
        for (SystemSetting setting : defaultSettings) {
            settingRepository.save(setting);
        }

        return ResponseEntity.ok(new MessageResponse("系统设置初始化成功"));
    }

    private SystemSetting createSystemSetting(String key, String value, String category, String description, User user) {
        SystemSetting setting = new SystemSetting();
        setting.setKey(key);
        setting.setValue(value);
        setting.setCategory(category);
        setting.setDescription(description);
        setting.setIsSystem(true);
        setting.setLastModifiedBy(user);
        return setting;
    }
} 