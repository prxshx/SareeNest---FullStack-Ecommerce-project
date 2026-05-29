package com.example.saree.DTOs.sareeDTO;

import com.example.saree.entity.sareeProducts.SareeEntity;
import org.springframework.stereotype.Component;

@Component
public class DTOMapper {
    public ResponseDTO ToresponseDTO(SareeEntity entity){
        return new ResponseDTO(entity.getId(), entity.getName(),entity.getDesc(), entity.getPrice(),entity.getCategory(),entity.getQuantity(),entity.getAvailable(),entity.getImageUrl()
                );
    }


    public SareeEntity ToSareeEntity(RequestDTO dto){
        SareeEntity entity = new SareeEntity();
        entity.setName(dto.getName());
        entity.setDesc(dto.getDesc());
        entity.setPrice(dto.getPrice());
        entity.setCategory(dto.getCategory());
        entity.setQuantity(dto.getQuantity());
        entity.setAvailable(dto.getIsAvailable());
        return entity;
    }

    public SareeEntity ToSareeEntityUpdate(RequestDTO dto, SareeEntity entity){
        entity.setName(dto.getName());
        entity.setDesc(dto.getDesc());
        entity.setPrice(dto.getPrice());
        entity.setCategory(dto.getCategory());
        entity.setQuantity(dto.getQuantity());
        entity.setAvailable(dto.getIsAvailable());
        return entity;
    }
}
