package com.mining.platform.security;

import com.mining.platform.entity.Task;
import com.mining.platform.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("userSecurity")
public class UserSecurity {
    
    @Autowired
    private TaskRepository taskRepository;
    
    /**
     * 检查当前登录用户是否是指定的用户ID
     * 
     * @param userId 要检查的用户ID
     * @return 如果当前用户是指定的用户，则返回true
     */
    public boolean isCurrentUser(Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        
        Object principal = authentication.getPrincipal();
        if (principal instanceof org.springframework.security.core.userdetails.User) {
            String username = ((org.springframework.security.core.userdetails.User) principal).getUsername();
            // 这里需要一个查询用户ID的服务，简化起见，假设用户名就是ID的字符串形式
            return username.equals(userId.toString());
        }
        
        return false;
    }
    
    /**
     * 检查当前登录用户是否是指定任务的创建者
     * 
     * @param taskId 要检查的任务ID
     * @return 如果当前用户是任务的创建者，则返回true
     */
    public boolean isTaskCreator(Long taskId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        
        String username = authentication.getName();
        
        return taskRepository.findById(taskId)
                .map(task -> task.getCreatedBy() != null && 
                             username.equals(task.getCreatedBy().getUsername()))
                .orElse(false);
    }
    
    /**
     * 检查当前登录用户是否是指定任务的被指派人
     * 
     * @param taskId 要检查的任务ID
     * @return 如果当前用户是任务的被指派人，则返回true
     */
    public boolean isTaskAssignee(Long taskId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        
        String username = authentication.getName();
        
        return taskRepository.findById(taskId)
                .map(task -> task.getAssignedTo() != null && 
                             username.equals(task.getAssignedTo().getUsername()))
                .orElse(false);
    }
} 