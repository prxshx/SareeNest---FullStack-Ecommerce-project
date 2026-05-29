package com.example.saree.repo;

import com.example.saree.entity.cart.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CartItemRepo extends JpaRepository<CartItem,Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem c WHERE c.saree.id = :sareeId")
    void deleteBySareeId(@Param("sareeId") Long sareeId);

}
