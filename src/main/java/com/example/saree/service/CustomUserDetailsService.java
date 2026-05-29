package com.example.saree.service;

import com.example.saree.entity.user.User;
import com.example.saree.repo.UserRepo;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo repo;

    public CustomUserDetailsService(UserRepo repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("username not found"));

       return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
               user.getRoles().stream().map(
               role -> new SimpleGrantedAuthority("ROLE_"+ role.getName()
       )).collect(Collectors.toList()));
    }
}
