package com.example.saree.controller.userAddress;

import com.example.saree.DTOs.userAddressDTO.UserAddressDto;
import com.example.saree.entity.user.UserAddress;
import com.example.saree.service.userAddress.UserAddressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
public class UserAddressController {

    private UserAddressService userAddressService;

    public UserAddressController(UserAddressService userAddressService){
        this.userAddressService = userAddressService;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveAddress(@RequestBody UserAddressDto dto){
        return ResponseEntity.ok(userAddressService.saveAddress(dto));
    }

    @GetMapping("/get")
    public ResponseEntity<UserAddress> getUserAddress(){
        return ResponseEntity.ok(userAddressService.getUserAddress());
    }
}
