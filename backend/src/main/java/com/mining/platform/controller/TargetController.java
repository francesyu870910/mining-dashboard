package com.mining.platform.controller;

import com.mining.platform.dto.MessageResponse;
import com.mining.platform.entity.Target;
import com.mining.platform.exception.ResourceNotFoundException;
import com.mining.platform.repository.TargetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/targets")
public class TargetController {

    @Autowired
    private TargetRepository targetRepository;

    @GetMapping
    public List<Target> getAllTargets() {
        return targetRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Target> getTargetById(@PathVariable Long id) {
        Target target = targetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("目标", "id", id));
        return ResponseEntity.ok(target);
    }

    @GetMapping("/code/{targetCode}")
    public ResponseEntity<Target> getTargetByCode(@PathVariable String targetCode) {
        Target target = targetRepository.findByTargetCode(targetCode)
                .orElseThrow(() -> new ResourceNotFoundException("目标", "目标编码", targetCode));
        return ResponseEntity.ok(target);
    }

    @GetMapping("/type/{targetType}")
    public List<Target> getTargetsByType(@PathVariable String targetType) {
        return targetRepository.findByTargetType(targetType);
    }

    @GetMapping("/category/{category}")
    public List<Target> getTargetsByCategory(@PathVariable String category) {
        return targetRepository.findByCategory(category);
    }

    @GetMapping("/status/{status}")
    public List<Target> getTargetsByStatus(@PathVariable String status) {
        return targetRepository.findByStatus(status);
    }

    @GetMapping("/priority/{priority}")
    public List<Target> getTargetsByPriority(@PathVariable String priority) {
        return targetRepository.findByPriority(priority);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public ResponseEntity<?> createTarget(@Valid @RequestBody Target target) {
        if (targetRepository.existsByTargetCode(target.getTargetCode())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("目标编码已存在"));
        }
        
        Target savedTarget = targetRepository.save(target);
        return ResponseEntity.ok(savedTarget);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public ResponseEntity<Target> updateTarget(@PathVariable Long id, @Valid @RequestBody Target targetDetails) {
        Target target = targetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("目标", "id", id));

        target.setTargetName(targetDetails.getTargetName());
        target.setTargetType(targetDetails.getTargetType());
        target.setCategory(targetDetails.getCategory());
        target.setStatus(targetDetails.getStatus());
        target.setPriority(targetDetails.getPriority());
        target.setDescription(targetDetails.getDescription());
        target.setImageUrl(targetDetails.getImageUrl());

        Target updatedTarget = targetRepository.save(target);
        return ResponseEntity.ok(updatedTarget);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteTarget(@PathVariable Long id) {
        Target target = targetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("目标", "id", id));

        targetRepository.delete(target);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
} 