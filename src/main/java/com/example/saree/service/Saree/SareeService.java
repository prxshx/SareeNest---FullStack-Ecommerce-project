    package com.example.saree.service.Saree;

    import com.cloudinary.Cloudinary;
    import com.cloudinary.utils.ObjectUtils;
    import com.example.saree.entity.sareeProducts.SareeEntity;
    import com.example.saree.repo.CartItemRepo;
    import com.example.saree.repo.SareeRepo;
    import com.example.saree.DTOs.sareeDTO.DTOMapper;
    import com.example.saree.DTOs.sareeDTO.RequestDTO;
    import com.example.saree.DTOs.sareeDTO.ResponseDTO;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.io.IOException;
    import java.util.List;
    import java.util.Map;

    @Service
    public class SareeService {
        @Autowired
        private DTOMapper dtoMapper;

        @Autowired
        private Cloudinary cloudinary;


        private final SareeRepo sareeRepo;
        private final CartItemRepo cartItemRepo;

        public  SareeService(SareeRepo sareeRepo, CartItemRepo cartItemRepo){
            this.sareeRepo = sareeRepo;
            this.cartItemRepo = cartItemRepo;
        }
        


        public ResponseDTO addSaree(RequestDTO dto) throws IOException {

            String imageUrl = null;
            String imagePublicId = null;

            if (dto.getImage() != null && !dto.getImage().isEmpty()  ) {
                Map cloudinaryImage = cloudinary.uploader().upload(dto.getImage().getBytes(), ObjectUtils.emptyMap());
           imageUrl = cloudinaryImage.get("secure_url").toString();
              imagePublicId = cloudinaryImage.get("public_id").toString();
            }
            SareeEntity entity = dtoMapper.ToSareeEntity(dto);
            entity.setImageUrl(imageUrl);
            entity.setImagePublicId(imagePublicId);

        SareeEntity newEntity =  sareeRepo.save(entity);

return dtoMapper.ToresponseDTO(newEntity);

        }

        public List<ResponseDTO> getAllSarees() {

            List<SareeEntity> res = sareeRepo.findAll();
            List<ResponseDTO> responseList =  res.stream().map((saree)-> dtoMapper.ToresponseDTO(saree)).toList();

            return  responseList;
        }

        public void deleteProduct(Long id) throws IOException {

            SareeEntity entity = sareeRepo.findById(id).orElseThrow(()->new RuntimeException("Product not found"));

            if( entity.getImagePublicId() != null){
                cloudinary.uploader().destroy(entity.getImagePublicId(),ObjectUtils.emptyMap());
            }
cartItemRepo.deleteBySareeId(id);
            sareeRepo.delete(entity);
        }

        public ResponseDTO getSareeById(Long id) {

            SareeEntity entity = sareeRepo.findById(id).orElseThrow(()->new RuntimeException("Cannot find the product or id mismatch"));

            ResponseDTO res = dtoMapper.ToresponseDTO(entity);

            return res;

        }


        public ResponseDTO updateProduct(RequestDTO dto, Long id) throws IOException {
            SareeEntity saree = sareeRepo.findById(id).orElseThrow(()->new RuntimeException("Cannot find the product or id mismatch"));
            if(saree.getImagePublicId() != null){
                cloudinary.uploader().destroy(saree.getImagePublicId(),ObjectUtils.emptyMap());
            }
            String imgurl = null;
            String imgPublicId = null;
            if(dto.getImage() != null && !dto.getImage().isEmpty()){
                Map cloudinaryImage = cloudinary.uploader().upload(dto.getImage().getBytes(), ObjectUtils.emptyMap());
                imgurl = cloudinaryImage.get("secure_url").toString();
                imgPublicId = cloudinaryImage.get("public_id").toString();
            }
            saree.setImageUrl((imgurl));
            saree.setImagePublicId(imgPublicId);
           SareeEntity updatedSaree = dtoMapper.ToSareeEntityUpdate(dto,saree);
           sareeRepo.save(updatedSaree);
           return dtoMapper.ToresponseDTO(updatedSaree);

        }
        public List<SareeEntity> searchProducts(String query) {

            return sareeRepo
                    .findByNameContainingIgnoreCaseOrDescContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                            query,
                            query,
                            query
                    );
        }
        public List<SareeEntity> getProductsByCategory(
                String category
        ) {

            return sareeRepo.findByCategoryIgnoreCase(
                    category
            );
        }
    }
