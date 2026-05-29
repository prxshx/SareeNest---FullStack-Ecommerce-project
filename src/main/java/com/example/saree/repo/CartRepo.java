package com.example.saree.repo;

import com.example.saree.entity.cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepo extends JpaRepository<Cart,Long> {


}
