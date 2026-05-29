package com.example.saree.DTOs.sareeDTO;


public class ResponseDTO {

    private Long id;
    private String name;
    private String desc;
    private Double price;
    private String category;
    private Integer quantity;
    private Boolean isAvailable;
    private String imageUrl;

    public ResponseDTO() {
    }
    public ResponseDTO(Long id, String name, String desc,
                            Double price, String category,
                            Integer quantity, Boolean isAvailable,
                            String imageUrl) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
        this.isAvailable = isAvailable;
        this.imageUrl = imageUrl;
    }



    // Getters only (response DTO usually doesn’t need setters)

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDesc() { return desc; }
    public Double getPrice() { return price; }
    public String getCategory() { return category; }
    public Integer getQuantity() { return quantity; }
    public Boolean getIsAvailable() { return isAvailable; }
    public String getImageUrl() { return imageUrl; }
}