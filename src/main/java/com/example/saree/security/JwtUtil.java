package com.example.saree.security;

import com.example.saree.entity.user.Role;
import com.example.saree.entity.user.User;
import com.example.saree.repo.UserRepo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private UserRepo userRepo;
    public JwtUtil(UserRepo userRepo){
        this.userRepo = userRepo;
    }

    private static final String SECRET = "mysecretkeymysecretkeymysecretkey";

    private static final SecretKey secretKey =
            Keys.hmacShaKeyFor(SECRET.getBytes());
    private final int JwtExpiration = 100*60*60*1000;


    public String generateToken(String userName){
       User user = userRepo.findByUsername(userName).orElseThrow(()-> new RuntimeException("username not found"));
       Set<Role> roles = user.getRoles();
       return Jwts.builder().setSubject(userName).claim("roles", roles.
                       stream().map(role-> "ROLE_"+ role.getName()).collect(Collectors.joining(","))).
               setIssuedAt(new Date()).setExpiration(new Date(new Date().
                       getTime()+JwtExpiration)).signWith(secretKey).compact();

    }
    public String extractUserName(String token){
        return Jwts.parserBuilder().setSigningKey(secretKey).build().
                parseClaimsJws(token).getBody().getSubject();
    }

    public Set<String> extractRoles(String token){
      String roles = Jwts.parserBuilder().setSigningKey(secretKey).build().
                parseClaimsJws(token).getBody().get("roles",String.class);
         return Set.of(roles.split(","));

    }
    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();

        return expiration.before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            String username = extractUserName(token);
            boolean isUsernameValid = username.equals(userDetails.getUsername());
            boolean isTokenExpired = isTokenExpired(token);
            return isUsernameValid && !isTokenExpired;
        } catch (Exception e) {
    return false;
        }
    }
}
