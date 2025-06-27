package com.mining.platform.repository;

import com.mining.platform.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findByTaskCode(String taskCode);
    
    List<Task> findByTaskType(String taskType);
    
    List<Task> findByStatus(String status);
    
    List<Task> findByPriority(String priority);
    
    List<Task> findByAssignedToId(Long userId);
    
    List<Task> findByCreatedById(Long userId);
    
    List<Task> findByStartTimeBetween(Date startDate, Date endDate);
    
    List<Task> findByEndTimeBetween(Date startDate, Date endDate);
    
    Boolean existsByTaskCode(String taskCode);
} 