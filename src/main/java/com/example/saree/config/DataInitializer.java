package com.example.saree.config;

import com.example.saree.entity.user.Role;
import com.example.saree.entity.user.User;
import com.example.saree.repo.RoleRepo;
import com.example.saree.repo.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;
    private RoleRepo roleRepo;

    public DataInitializer(UserRepo userRepo, PasswordEncoder passwordEncoder, RoleRepo roleRepo) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.roleRepo = roleRepo;

    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println(" DataInitializer running...");

        if(!userRepo.findByUsername("prakash").isPresent()){
            User user = new User();
            user.setUsername("prakash");
            user.setPassword(passwordEncoder.encode("prakash123"));
            Role role = roleRepo.findByName("ADMIN").orElseThrow(()-> new RuntimeException("no role found"));
            user.setRoles(Set.of(role));
            userRepo.save(user);
        }
    }
}
