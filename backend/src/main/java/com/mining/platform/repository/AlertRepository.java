package com.mining.platform.repository;

import com.mining.platform.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByDeviceId(Long deviceId);
    
    List<Alert> findByTaskId(Long taskId);
    
    List<Alert> findByTargetId(Long targetId);
    
    List<Alert> findByStatus(String status);
    
    List<Alert> findByLevel(String level);
    
    List<Alert> findByAlertType(String alertType);
    
    List<Alert> findByHandledById(Long userId);
    
    List<Alert> findByAlertTimeBetween(Date startDate, Date endDate);
} 