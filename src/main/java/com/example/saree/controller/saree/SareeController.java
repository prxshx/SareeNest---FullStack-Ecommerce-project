package com.example.saree.controller.saree;

import com.example.saree.DTOs.sareeDTO.RequestDTO;
import com.example.saree.DTOs.sareeDTO.ResponseDTO;
import com.example.saree.entity.sareeProducts.SareeEntity;
import com.example.saree.service.Saree.SareeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/saree")
@CrossOrigin(origins = "*")
public class SareeController {


    private final SareeService service;
    public SareeController(SareeService service){
        this.service = service;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ResponseDTO>> getAllSarees() {
        return ResponseEntity.ok(service.getAllSarees());
    }

    @GetMapping("/getSareeById/{id}")
    public ResponseEntity<ResponseDTO> getSareeById(@PathVariable Long id){
        ResponseDTO entity = service.getSareeById(id);
        return ResponseEntity.ok(entity);

    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addSaree")
    public ResponseEntity<ResponseDTO> addSaree(@ModelAttribute RequestDTO dto) throws IOException {
      ResponseDTO res =  service.addSaree(dto);
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) throws IOException {

        service.deleteProduct(id);
        return  ResponseEntity.ok("Product deleted successfully");
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseDTO> updateProduct(@ModelAttribute RequestDTO dto, @PathVariable Long id ) throws IOException {
        return ResponseEntity.ok(service.updateProduct(dto,id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<SareeEntity>> searchProducts(
            @RequestParam String query
    ) {

        return ResponseEntity.ok(
                service.searchProducts(query)
        );
    }
    @GetMapping("/category/{category}")
    public ResponseEntity<List<SareeEntity>>
    getProductsByCategory(
            @PathVariable String category
    ) {

        return ResponseEntity.ok(
                service.getProductsByCategory(
                        category
                )
        );
    }
}
