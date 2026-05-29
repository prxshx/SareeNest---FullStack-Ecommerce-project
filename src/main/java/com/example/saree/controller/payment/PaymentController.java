package com.example.saree.controller.payment;

import com.example.saree.service.payment.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private PaymentService paymentService;
    public PaymentController(PaymentService paymentService){
        this.paymentService = paymentService;
    }

    @PostMapping("/createOrder")
    public ResponseEntity<String> createOrder(@RequestParam int amount){
        try {
            return ResponseEntity.ok(paymentService.createOrder(amount));
        } catch (Exception e) {
            throw new RuntimeException(e);

        }
    }
}
