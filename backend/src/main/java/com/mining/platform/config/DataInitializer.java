package com.mining.platform.config;

import com.mining.platform.entity.ERole;
import com.mining.platform.entity.Role;
import com.mining.platform.entity.User;
import com.mining.platform.repository.RoleRepository;
import com.mining.platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // 初始化角色
        initRoles();
        
        // 初始化管理员账户
        initAdminUser();
    }
    
    private void initRoles() {
        // 检查是否已经初始化过角色
        if (roleRepository.count() > 0) {
            return;
        }
        
        // 创建角色
        Role userRole = new Role(ERole.ROLE_USER);
        Role modRole = new Role(ERole.ROLE_MODERATOR);
        Role adminRole = new Role(ERole.ROLE_ADMIN);
        
        // 保存角色
        roleRepository.save(userRole);
        roleRepository.save(modRole);
        roleRepository.save(adminRole);
        
        System.out.println("初始化角色数据完成");
    }
    
    private void initAdminUser() {
        // 检查是否已经存在管理员账户
        if (userRepository.existsByUsername("admin")) {
            return;
        }
        
        // 创建管理员账户
        User adminUser = new User();
        adminUser.setUsername("admin");
        adminUser.setEmail("admin@mining-platform.com");
        adminUser.setPassword(passwordEncoder.encode("admin123456"));
        adminUser.setFullName("系统管理员");
        adminUser.setDepartment("系统管理部");
        adminUser.setEnabled(true);
        
        // 设置管理员角色
        Set<Role> roles = new HashSet<>();
        roleRepository.findByName(ERole.ROLE_ADMIN).ifPresent(roles::add);
        adminUser.setRoles(roles);
        
        // 保存管理员账户
        userRepository.save(adminUser);
        
        System.out.println("初始化管理员账户完成");
    }
} 