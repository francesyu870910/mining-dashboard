package com.mining.platform.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "alerts")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String alertCode;

    private String alertType;

    private String level;

    private String status;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String location;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "device_id")
    private MonitoringDevice device;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private MonitoringTask task;

    @ManyToOne
    @JoinColumn(name = "target_id")
    private Target target;

    @ManyToOne
    @JoinColumn(name = "handled_by")
    private User handledBy;

    @Column(columnDefinition = "TEXT")
    private String handleResult;

    @Temporal(TemporalType.TIMESTAMP)
    private Date alertTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date handledTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        if (alertTime == null) {
            alertTime = new Date();
        }
        if (alertCode == null || alertCode.isEmpty()) {
            alertCode = "ALT" + System.currentTimeMillis();
        }
        if (status == null || status.isEmpty()) {
            status = "未处理";
        }
    }
} 