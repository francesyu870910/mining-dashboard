package com.mining.platform.repository;

import com.mining.platform.entity.Target;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TargetRepository extends JpaRepository<Target, Long> {
    Optional<Target> findByTargetCode(String targetCode);
    
    List<Target> findByTargetType(String targetType);
    
    List<Target> findByCategory(String category);
    
    List<Target> findByStatus(String status);
    
    List<Target> findByPriority(String priority);
    
    Boolean existsByTargetCode(String targetCode);
} 