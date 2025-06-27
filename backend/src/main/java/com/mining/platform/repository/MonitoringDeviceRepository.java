package com.mining.platform.repository;

import com.mining.platform.entity.MonitoringDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MonitoringDeviceRepository extends JpaRepository<MonitoringDevice, Long> {
    Optional<MonitoringDevice> findByDeviceCode(String deviceCode);
    
    List<MonitoringDevice> findByDeviceType(String deviceType);
    
    List<MonitoringDevice> findByLocation(String location);
    
    List<MonitoringDevice> findByStatus(String status);
    
    Boolean existsByDeviceCode(String deviceCode);
} 