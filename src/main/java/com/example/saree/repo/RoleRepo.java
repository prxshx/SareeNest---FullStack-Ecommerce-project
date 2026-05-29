package com.example.saree.repo;
import com.example.saree.entity.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepo extends JpaRepository<Role,Long>{
    Optional<Role> findByName(String name);
}
