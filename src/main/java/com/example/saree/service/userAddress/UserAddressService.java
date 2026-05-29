package com.example.saree.service.userAddress;

import com.example.saree.DTOs.userAddressDTO.UserAddressDto;
import com.example.saree.entity.user.User;
import com.example.saree.entity.user.UserAddress;
import com.example.saree.repo.UserAddressRepo;
import com.example.saree.repo.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserAddressService {

    private final UserAddressRepo userAddressRepo;
    private final UserRepo userRepo;

    public UserAddressService(
            UserAddressRepo userAddressRepo,
            UserRepo userRepo
    ){
        this.userAddressRepo = userAddressRepo;
        this.userRepo = userRepo;
    }

    public String extractUserName(){

        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }


    public User getUserDetails(String name){

        Optional<User> user =
                userRepo.findByUsername(name);

        if(user.isEmpty()){
            throw new RuntimeException("Username not found");
        }

        return user.get();
    }


    public String saveAddress(UserAddressDto dto) {

        String name = extractUserName();

        User user = getUserDetails(name);

        UserAddress address;

        if(user.getUserAddress() != null){

            address = user.getUserAddress();

        } else {
            address = new UserAddress();

            address.setUser(user);

            user.setUserAddress(address);
        }

        address.setAddress(dto.getAddress());
        address.setDistrict(dto.getDistrict());
        address.setState(dto.getState());
        address.setPinCode(dto.getPinCode());
        address.setContactNo(dto.getContactNo());

        userAddressRepo.save(address);

        return "Address saved successfully";
    }

    public UserAddress getUserAddress() {

        String name = extractUserName();

        User user = getUserDetails(name);

        if(user.getUserAddress() == null){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Address not found"
            );
        }

        return user.getUserAddress();
    }
}