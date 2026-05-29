package com.example.saree.entity.cart;

import com.example.saree.entity.sareeProducts.SareeEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "cartId")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "productId")
    private SareeEntity saree;
    private int quantity;

    public CartItem() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CartItem(Long id, Cart cart, SareeEntity saree, int quantity) {
        this.id = id;
        this.cart = cart;
        this.saree = saree;
        this.quantity = quantity;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public SareeEntity getSaree() {
        return saree;
    }

    public void setSaree(SareeEntity saree) {
        this.saree = saree;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


}
