package com.mining.platform.controller;

import com.mining.platform.dto.MessageResponse;
import com.mining.platform.entity.MonitoringDevice;
import com.mining.platform.exception.ResourceNotFoundException;
import com.mining.platform.repository.MonitoringDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/devices")
public class MonitoringDeviceController {

    @Autowired
    private MonitoringDeviceRepository deviceRepository;

    @GetMapping
    public List<MonitoringDevice> getAllDevices() {
        return deviceRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonitoringDevice> getDeviceById(@PathVariable Long id) {
        MonitoringDevice device = deviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("监控设备", "id", id));
        return ResponseEntity.ok(device);
    }

    @GetMapping("/code/{deviceCode}")
    public ResponseEntity<MonitoringDevice> getDeviceByCode(@PathVariable String deviceCode) {
        MonitoringDevice device = deviceRepository.findByDeviceCode(deviceCode)
                .orElseThrow(() -> new ResourceNotFoundException("监控设备", "设备编码", deviceCode));
        return ResponseEntity.ok(device);
    }

    @GetMapping("/type/{deviceType}")
    public List<MonitoringDevice> getDevicesByType(@PathVariable String deviceType) {
        return deviceRepository.findByDeviceType(deviceType);
    }

    @GetMapping("/location/{location}")
    public List<MonitoringDevice> getDevicesByLocation(@PathVariable String location) {
        return deviceRepository.findByLocation(location);
    }

    @GetMapping("/status/{status}")
    public List<MonitoringDevice> getDevicesByStatus(@PathVariable String status) {
        return deviceRepository.findByStatus(status);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createDevice(@Valid @RequestBody MonitoringDevice device) {
        if (deviceRepository.existsByDeviceCode(device.getDeviceCode())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("设备编码已存在"));
        }
        
        MonitoringDevice savedDevice = deviceRepository.save(device);
        return ResponseEntity.ok(savedDevice);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MonitoringDevice> updateDevice(@PathVariable Long id, @Valid @RequestBody MonitoringDevice deviceDetails) {
        MonitoringDevice device = deviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("监控设备", "id", id));

        device.setDeviceName(deviceDetails.getDeviceName());
        device.setDeviceType(deviceDetails.getDeviceType());
        device.setLocation(deviceDetails.getLocation());
        device.setStatus(deviceDetails.getStatus());
        device.setIpAddress(deviceDetails.getIpAddress());
        device.setDescription(deviceDetails.getDescription());
        device.setInstallDate(deviceDetails.getInstallDate());
        device.setLastMaintenanceDate(deviceDetails.getLastMaintenanceDate());

        MonitoringDevice updatedDevice = deviceRepository.save(device);
        return ResponseEntity.ok(updatedDevice);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteDevice(@PathVariable Long id) {
        MonitoringDevice device = deviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("监控设备", "id", id));

        deviceRepository.delete(device);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
} 