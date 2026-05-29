package com.example.saree.DTOs.userAddressDTO;

public class UserAddressDto {

    private String address;

    private String district;

    private String state;

    private String pinCode;

    private String contactNo;

    public UserAddressDto() {
    }

    public UserAddressDto(String address,
                          String district,
                          String state,
                          String pinCode,
                          String contactNo) {

        this.address = address;
        this.district = district;
        this.state = state;
        this.pinCode = pinCode;
        this.contactNo = contactNo;
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
}
