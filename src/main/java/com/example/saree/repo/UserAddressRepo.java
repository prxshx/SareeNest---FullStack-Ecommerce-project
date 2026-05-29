package com.example.saree.repo;

import com.example.saree.entity.user.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAddressRepo extends   JpaRepository<UserAddress, Long> {
}
