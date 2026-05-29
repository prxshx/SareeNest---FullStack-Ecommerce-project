package com.example.saree.controller.order;

import com.example.saree.DTOs.verifyPayment.VerifyPaymentDto;
import com.example.saree.entity.order.Orders;
import com.example.saree.service.order.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(
            OrderService orderService
    ) {
        this.orderService = orderService;
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<String> verifyPayment(
            @RequestBody VerifyPaymentDto dto
    ) throws Exception {

        return ResponseEntity.ok(
                orderService.verifyAndCreateOrder(dto)
        );
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<Orders>> getMyOrders() {

        return ResponseEntity.ok(
                orderService.getMyOrders()
        );
    }
}