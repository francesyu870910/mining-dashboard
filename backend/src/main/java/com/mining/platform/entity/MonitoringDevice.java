package com.mining.platform.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "monitoring_devices")
public class MonitoringDevice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String deviceCode;

    @NotBlank
    private String deviceName;

    private String deviceType;

    private String location;

    private String status;

    private String ipAddress;

    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    private Date installDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastMaintenanceDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }
} 