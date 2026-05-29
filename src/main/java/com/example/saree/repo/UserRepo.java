package com.example.saree.repo;

import com.example.saree.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
   Optional<User> findByUsername(String username);
}
