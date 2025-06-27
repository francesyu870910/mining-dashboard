package com.mining.platform.dto;

/**
 * 时间序列数据传输对象
 */
public class TimeSeriesDataDTO {
    
    // 时间戳（格式化后的字符串，如"2023-01-01"）
    private String timestamp;
    
    // 数据值
    private Long value;

    // Getters and Setters
    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }
} 