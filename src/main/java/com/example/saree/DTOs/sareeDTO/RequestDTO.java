package com.example.saree.DTOs.sareeDTO;

import org.springframework.web.multipart.MultipartFile;



public class RequestDTO {
    private String name;
    private String desc;
    private Double price;
    private String category;
    private Integer quantity;
    private Boolean isAvailable;

    private MultipartFile image;   // For file upload

    public RequestDTO() {
    }

    public RequestDTO(String name, String desc, Double price,
                           String category, Integer quantity,
                           Boolean isAvailable, MultipartFile image) {
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
        this.isAvailable = isAvailable;
        this.image = image;
    }

    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
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

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}