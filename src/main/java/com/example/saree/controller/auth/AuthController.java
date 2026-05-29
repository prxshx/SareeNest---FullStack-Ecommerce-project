package com.example.saree.controller.auth;

import com.example.saree.entity.user.Role;
import com.example.saree.entity.user.User;
import com.example.saree.repo.RoleRepo;
import com.example.saree.repo.UserRepo;
import com.example.saree.DTOs.authDTO.RequestLoginUserDTO;
import com.example.saree.DTOs.authDTO.RequestRegisterUserDTO;
import com.example.saree.security.JwtUtil;
import com.example.saree.service.CustomUserDetailsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;


    public AuthController(RoleRepo roleRepo, UserRepo userRepo, PasswordEncoder passwordEncoder, CustomUserDetailsService customUserDetailsService, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.roleRepo = roleRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody RequestRegisterUserDTO requestRegisterUserDTO){

        if(userRepo.findByUsername(requestRegisterUserDTO.getUsername()).isPresent()){
            return "User already registered";
        }
        User user = new User();
        Role role = roleRepo.findByName("USER").orElseThrow(()->
                new RuntimeException("no roles in this type"));

        user.setUsername(requestRegisterUserDTO.getUsername());
        user.setPassword(passwordEncoder.encode(requestRegisterUserDTO.getPassword()));
        user.setRoles(Set.of(role));

        userRepo.save(user);
        return "User registered successfully";

    }
    @PostMapping("/login")
    public String loginUser(@RequestBody RequestLoginUserDTO requestLoginUserDTO){
  try{
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
            (requestLoginUserDTO.getUsername(),requestLoginUserDTO.getPassword()));

}   catch (Exception e){
throw new RuntimeException("Authentication failed");
}
return  jwtUtil.generateToken(requestLoginUserDTO.getUsername());
    }
}
