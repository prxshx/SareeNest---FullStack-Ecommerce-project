package com.example.saree.DTOs.orderDTO;

import com.example.saree.entity.order.OrderStatus;

public class UpdateOrderStatusDto {

    private OrderStatus status;

    public UpdateOrderStatusDto() {
    }

    public UpdateOrderStatusDto(OrderStatus status) {
        this.status = status;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}