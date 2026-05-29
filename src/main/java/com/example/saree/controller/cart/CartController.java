package com.example.saree.controller.cart;

import com.example.saree.entity.sareeProducts.SareeEntity;
import com.example.saree.entity.cart.CartItem;
import com.example.saree.service.cart.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    private CartService cartService;
    public  CartController(CartService cartService){
        this.cartService = cartService;
    }
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/addProduct/{id}")
    public ResponseEntity<String> addCartItem(@PathVariable Long id){
        try{
            cartService.addCartItem(id);
        }catch (Exception e){
            throw  new RuntimeException("Error adding product into cart, Please try again");
        }
        return ResponseEntity.status(201).body("Cart item added successfully");
    }
    @GetMapping("/getCartItems")
    public ResponseEntity<List<CartItem>> getCartItems(){
        return ResponseEntity.status(200).body(cartService.getCartItems());
    }
    @PostMapping("decreaseQuantity/{id}")
    public ResponseEntity<String> decreaseQuantity(@PathVariable Long id){
        return ResponseEntity.ok().body(cartService.decreaseQuantity(id));
    }
    @DeleteMapping("/deleteItem/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id){
        return ResponseEntity.ok().body(cartService.deleteItem(id));
    }
@GetMapping("/search")
    public ResponseEntity<List<SareeEntity>> getSearchedSarees(@RequestParam String query){

        return ResponseEntity.ok(cartService.getSearchedSarees(query));
}
}
