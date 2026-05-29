package com.example.saree.controller.order;

import com.example.saree.DTOs.orderDTO.UpdateOrderStatusDto;
import com.example.saree.entity.order.Orders;
import com.example.saree.service.order.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.saree.DTOs.orderDTO.UpdateOrderStatusDto;
import com.example.saree.entity.order.OrderStatus;
import java.util.List;

@RestController
@RequestMapping("/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;

    public AdminOrderController(
            OrderService orderService
    ) {
        this.orderService = orderService;
    }

    // 🔥 GET ALL ORDERS
    @GetMapping("/all-orders")
    public ResponseEntity<List<Orders>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }

    // 🔥 UPDATE ORDER STATUS
    @PutMapping("/update-status/{id}")
    public ResponseEntity<String> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody UpdateOrderStatusDto dto
    ) {

        return ResponseEntity.ok(
                orderService.updateOrderStatus(id, dto)
        );
    }
}