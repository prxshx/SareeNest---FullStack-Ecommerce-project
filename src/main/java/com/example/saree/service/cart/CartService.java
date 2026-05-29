package com.example.saree.service.cart;

import com.example.saree.entity.sareeProducts.SareeEntity;
import com.example.saree.entity.user.User;
import com.example.saree.entity.cart.Cart;
import com.example.saree.entity.cart.CartItem;
import com.example.saree.repo.CartItemRepo;
import com.example.saree.repo.CartRepo;
import com.example.saree.repo.SareeRepo;
import com.example.saree.repo.UserRepo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final CartRepo cartRepo;
    private final  SareeRepo sareeRepo;
    private final CartItemRepo cartItemRepo;
    private final UserRepo userRepo;
    public CartService(SareeRepo sareeRepo, CartItemRepo cartItemRepo, UserRepo userRepo, CartRepo cartRepo){
        this.cartItemRepo = cartItemRepo;
        this.sareeRepo = sareeRepo;
        this.userRepo = userRepo;
        this.cartRepo = cartRepo;
    }
    public void addCartItem(Long id) {
       String name = SecurityContextHolder.getContext().getAuthentication().getName();

       Optional<User> user = userRepo.findByUsername(name);
       if(user.isEmpty()){
           throw new RuntimeException("Username not found");
       }
       User newUser = user.get();

       java.util.Optional<SareeEntity> productId = sareeRepo.findById(id);
       if(productId.isEmpty()){
           throw  new RuntimeException("Product id not found");
       }
       SareeEntity prod = productId.get();
        int getProductQuantity = prod.getQuantity();
        if(newUser.getCart() == null){
            Cart cart = new Cart();
          cart.setUser(newUser);
          newUser.setCart(cart);
          CartItem cartItem = new CartItem();
          cartItem.setSaree(prod);

            if(getProductQuantity >= 1 && prod.getAvailable()){
                cartItem.setQuantity(1);
            }else {
                throw new RuntimeException("out of stock");
            }

          cart.getItems().add(cartItem);
          cartItem.setCart(cart);
          cartRepo.save(cart);

      }else {
            Cart cart = newUser.getCart();
        Optional<CartItem> existing = newUser.getCart().getItems().stream().filter(
                item -> item.getSaree().getId().equals(prod.getId())).findFirst();

        if(existing.isPresent()){
           CartItem  item = existing.get();
            if(prod.getAvailable() && getProductQuantity >= 1 && item.getQuantity() < getProductQuantity){
               item.setQuantity(item.getQuantity()+1);
           }else {
               throw new RuntimeException("Out of stock, maximum stock reached");
            }

        }else {
            CartItem cartItem = new CartItem();
            cartItem.setSaree(prod);
            if(getProductQuantity >= 1 && prod.getAvailable()){
                cartItem.setQuantity(1);
            }else {
                throw new RuntimeException("out of stock");
            }
            cartItem.setCart(cart);
            cart.getItems().add(cartItem);
        }
cartRepo.save(cart);

      }
    }

    public List<CartItem> getCartItems() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<User> user = userRepo.findByUsername(name);
        if(user.isEmpty()){
            throw new RuntimeException("Username not found");
        }
        User newUser = user.get();
    if(newUser.getCart() == null){
        return new ArrayList<>();
    }
return  newUser.getCart().getItems();
    }

    public String decreaseQuantity(Long id) {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepo.findByUsername(name);
        if(user.isEmpty()){
            throw new RuntimeException("User not found");
        }
        User userdata = user.get();
        Optional<SareeEntity> saree = sareeRepo.findById(id);
        if(saree.isEmpty()){
            throw new RuntimeException("Product id not found");
        }
        SareeEntity sareeData = saree.get();
        if (userdata.getCart() != null) {

            Optional<CartItem> item = userdata.getCart().getItems().stream().filter(itm->
                    itm.getSaree().getId().equals(sareeData.getId())).findFirst();
            if(item.isPresent()){
                CartItem cartItem = item.get();
                if(cartItem.getQuantity() > 1){
                    cartItem.setQuantity(cartItem.getQuantity()-1);
                }else{
                    userdata.getCart().getItems().remove(cartItem);
                }
            }else {
                throw new RuntimeException("Product not found in cart");
            }
        }else {
            throw new RuntimeException("Product not found in cart");
        }
        cartRepo.save(userdata.getCart());
        return "product updated";
    }

    public String deleteItem(Long id) {

        String name = SecurityContextHolder.getContext().getAuthentication().getName();

        Optional<User> user = userRepo.findByUsername(name);

        if(user.isEmpty()){
            throw new RuntimeException("User not found");
        }

        User userdata = user.get();

        if(userdata.getCart() == null){
            throw new RuntimeException("Cart not found");
        }

        Optional<CartItem> cartItem = userdata.getCart().getItems().stream()
                .filter(f -> f.getSaree().getId().equals(id))
                .findFirst();

        if(cartItem.isPresent()){

            CartItem item = cartItem.get();

            userdata.getCart().getItems().remove(item);

            cartRepo.save(userdata.getCart());

            return "Product deleted successfully";

        } else {

            throw new RuntimeException("Product not found in cart");
        }
    }

    public List<SareeEntity> getSearchedSarees(String query) {
        if(query == null || query.trim().isEmpty()){
            return sareeRepo.findAll();
        }
        return sareeRepo.findByNameContainingIgnoreCase(query);
    }
}
