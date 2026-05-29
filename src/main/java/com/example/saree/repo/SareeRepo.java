package com.example.saree.repo;

import com.example.saree.entity.sareeProducts.SareeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SareeRepo extends JpaRepository<SareeEntity,Long> {
    List<SareeEntity> findByNameContainingIgnoreCase(String query);
    List<SareeEntity> findByNameContainingIgnoreCaseOrDescContainingIgnoreCaseOrCategoryContainingIgnoreCase(
            String name,
            String desc,
            String category
    );
    List<SareeEntity> findByCategoryIgnoreCase(
            String category
    );
}
