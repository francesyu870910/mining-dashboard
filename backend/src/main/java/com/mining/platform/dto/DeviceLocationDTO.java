package com.mining.platform.dto;

import java.time.LocalDateTime;

/**
 * 设备位置数据传输对象
 */
public class DeviceLocationDTO {
    
    // 设备ID
    private Long deviceId;
    
    // 设备名称
    private String deviceName;
    
    // 设备类型
    private String deviceType;
    
    // 设备状态
    private String status;
    
    // 纬度
    private Double latitude;
    
    // 经度
    private Double longitude;
    
    // 最后更新时间
    private LocalDateTime lastUpdateTime;

    // Getters and Setters
    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public LocalDateTime getLastUpdateTime() {
        return lastUpdateTime;
    }

    public void setLastUpdateTime(LocalDateTime lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }
} 