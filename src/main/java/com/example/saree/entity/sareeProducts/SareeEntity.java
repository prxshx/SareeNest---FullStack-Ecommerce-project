package com.example.saree.entity.sareeProducts;

import jakarta.persistence.*;

@Entity
public class SareeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;
    private String name;
    @Column(name = "`desc`", columnDefinition = "TEXT")
    private String desc;
    private Double price;
    private String category;
    private Integer quantity;
    private Boolean isAvailable;
    private String imageUrl;
    private String imagePublicId;



    public SareeEntity() {
    }
    public SareeEntity(Long id, String name, Double price, String desc, String category, Boolean isAvailable, Integer quantity, String imageUrl, String imagePublicId ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.desc = desc;
        this.category = category;
        this.isAvailable = isAvailable;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.imagePublicId = imagePublicId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
    public String getImagePublicId() {
        return imagePublicId;
    }

    public void setImagePublicId(String imagePublicId) {
        this.imagePublicId = imagePublicId;
    }

}
