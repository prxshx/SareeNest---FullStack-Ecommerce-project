package com.example.saree.entity.order;
import com.example.saree.entity.sareeProducts.SareeEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    private double price;

    @JsonIgnoreProperties({
            "hibernateLazyInitializer",
            "handler"
    })
    @ManyToOne
    @JoinColumn(name = "saree_id")
    private SareeEntity saree;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders order;

    public OrderItem() {
    }

    public Long getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public SareeEntity getSaree() {
        return saree;
    }

    public void setSaree(SareeEntity saree) {
        this.saree = saree;
    }

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }
}