package com.example.saree.entity.cart;

import com.example.saree.entity.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "userId")
    private User user;
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL,  orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();
    private LocalDateTime createdAt;

    public Cart(Long id, List<CartItem> items, User user, LocalDateTime createdAt) {
        this.id = id;
        this.items = items;
        this.user = user;
        this.createdAt = createdAt;
    }

    public Cart() {
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
