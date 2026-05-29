package com.example.saree.entity.user;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class UserAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;

    private String district;

    private String state;

    private String pinCode;

    private String contactNo;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public UserAddress() {
    }

    public UserAddress(Long id,
                       String address,
                       String district,
                       String state,
                       String pinCode,
                       String contactNo,
                       User user) {

        this.id = id;
        this.address = address;
        this.district = district;
        this.state = state;
        this.pinCode = pinCode;
        this.contactNo = contactNo;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}