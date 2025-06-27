package com.mining.platform.repository;

import com.mining.platform.entity.MonitoringTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MonitoringTaskRepository extends JpaRepository<MonitoringTask, Long> {
    List<MonitoringTask> findByDeviceId(Long deviceId);
    
    List<MonitoringTask> findByTargetId(Long targetId);
    
    List<MonitoringTask> findByStatus(String status);
    
    List<MonitoringTask> findByPriority(String priority);
    
    List<MonitoringTask> findByCreatedById(Long userId);
} 