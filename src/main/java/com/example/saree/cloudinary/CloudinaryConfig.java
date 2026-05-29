package com.example.saree.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dc4hp0mpq",
                "api_key", "433159297934648",
                "api_secret", "B2gm8s_5fzYOooguKPsR9dqr7K4"
        ));
    }


}