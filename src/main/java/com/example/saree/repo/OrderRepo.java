package com.example.saree.repo;

import com.example.saree.entity.order.Orders;
import com.example.saree.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepo
        extends JpaRepository<Orders, Long> {

    List<Orders> findByUserOrderByOrderedAtDesc(
            User user
    );
    List<Orders> findAllByOrderByOrderedAtDesc();
}
