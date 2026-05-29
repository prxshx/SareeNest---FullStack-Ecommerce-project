package com.example.saree.service.order;

import com.example.saree.DTOs.verifyPayment.VerifyPaymentDto;
import com.example.saree.entity.sareeProducts.SareeEntity;
import com.example.saree.entity.cart.Cart;
import com.example.saree.entity.cart.CartItem;
import com.example.saree.entity.order.OrderItem;
import com.example.saree.entity.order.OrderStatus;
import com.example.saree.entity.order.Orders;
import com.example.saree.entity.user.User;
import com.example.saree.repo.CartRepo;
import com.example.saree.repo.OrderRepo;
import com.example.saree.repo.UserRepo;
import com.razorpay.Utils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.example.saree.DTOs.orderDTO.UpdateOrderStatusDto;
import com.example.saree.entity.order.OrderStatus;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final UserRepo userRepo;
    private final OrderRepo orderRepo;
    private final CartRepo cartRepo;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    public OrderService(
            UserRepo userRepo,
            OrderRepo orderRepo,
            CartRepo cartRepo
    ) {
        this.userRepo = userRepo;
        this.orderRepo = orderRepo;
        this.cartRepo = cartRepo;
    }

    public String verifyAndCreateOrder(
            VerifyPaymentDto dto
    ) throws Exception {

        // 🔥 VERIFY SIGNATURE
//        String generatedSignature =
//                Utils.getHash(
//                        dto.getRazorpay_order_id()
//                                + "|"
//                                + dto.getRazorpay_payment_id(),
//                        razorpaySecret
//                );
//
//        if (!generatedSignature.equals(
//                dto.getRazorpay_signature()
//        )) {
//            throw new RuntimeException("Payment verification failed");
//        }

        boolean isValid = Utils.verifySignature(
                dto.getRazorpay_order_id()
                        + "|" +
                        dto.getRazorpay_payment_id(),

                dto.getRazorpay_signature(),

                razorpaySecret
        );

        if (!isValid) {
            throw new RuntimeException(
                    "Payment verification failed"
            );
        }
        // 🔥 USER
        String username =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        Optional<User> optionalUser =
                userRepo.findByUsername(username);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();

        Cart cart = user.getCart();

        if (cart == null || cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // 🔥 CREATE ORDER
        Orders order = new Orders();

        order.setUser(user);

        order.setAddress(user.getUserAddress());

        order.setRazorpayOrderId(
                dto.getRazorpay_order_id()
        );

        order.setRazorpayPaymentId(
                dto.getRazorpay_payment_id()
        );

        order.setRazorpaySignature(
                dto.getRazorpay_signature()
        );

        order.setOrderStatus(OrderStatus.PLACED);

        order.setOrderedAt(LocalDateTime.now());

        double total = 0;

        // 🔥 COPY CART ITEMS
        for (CartItem cartItem : cart.getItems()) {

            SareeEntity saree =
                    cartItem.getSaree();

            // 🔥 REDUCE STOCK
            saree.setQuantity(
                    saree.getQuantity()
                            - cartItem.getQuantity()
            );

            if (saree.getQuantity() <= 0) {
                saree.setAvailable(false);
            }

            OrderItem orderItem =
                    new OrderItem();

            orderItem.setOrder(order);

            orderItem.setSaree(saree);

            orderItem.setQuantity(
                    cartItem.getQuantity()
            );

            orderItem.setPrice(
                    saree.getPrice()
            );

            total +=
                    saree.getPrice()
                            * cartItem.getQuantity();

            order.getOrderItems().add(orderItem);
        }

        order.setTotalAmount(total);

        // 🔥 SAVE ORDER
        orderRepo.save(order);

        // 🔥 CLEAR CART
        cart.getItems().clear();

        cartRepo.save(cart);

        return "Order placed successfully";
    }

    public List<Orders> getMyOrders() {

        // 🔥 Logged in username
        String username =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        Optional<User> optionalUser =
                userRepo.findByUsername(username);

        if (optionalUser.isEmpty()) {

            throw new RuntimeException(
                    "User not found"
            );
        }

        User user = optionalUser.get();

        return orderRepo.findByUserOrderByOrderedAtDesc(
                user
        );
    }

    public List<Orders> getAllOrders() {
        return orderRepo.findAllByOrderByOrderedAtDesc();
    }
    public String updateOrderStatus(
            Long id,
            UpdateOrderStatusDto dto
    ) {

        Orders order = orderRepo.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Order not found"
                        )
                );

        order.setOrderStatus(dto.getStatus());

        orderRepo.save(order);

        return "Order status updated successfully";
    }
}