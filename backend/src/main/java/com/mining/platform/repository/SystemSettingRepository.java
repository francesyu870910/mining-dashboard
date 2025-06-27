package com.mining.platform.repository;

import com.mining.platform.entity.SystemSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SystemSettingRepository extends JpaRepository<SystemSetting, Long> {
    Optional<SystemSetting> findByKey(String key);
    
    List<SystemSetting> findByCategory(String category);
    
    List<SystemSetting> findByIsSystem(Boolean isSystem);
    
    Boolean existsByKey(String key);
} 