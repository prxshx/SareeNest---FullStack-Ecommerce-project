package com.example.saree.service.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;
    public String createOrder(int amount) throws Exception {
        RazorpayClient razorpayClient = new RazorpayClient(keyId,keySecret);

        JSONObject orderDetails = new JSONObject();
        orderDetails.put("amount", amount*100);
        orderDetails.put("currency", "INR");
        orderDetails.put("receipt", "txn_" + System.currentTimeMillis());

       Order order = razorpayClient.orders.create(orderDetails);
       return order.toString();


    }
}
