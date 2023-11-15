package com.saessak.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final long MAX_AGE_SECS = 3600;

    @Value("${uploadPath}")
    String uploadPath;

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**")
//                .allowedOrigins("http://saessakmarket.store") // 들어올 수 있는 허용 경로
                .allowedOrigins("http://localhost:3000") // 들어올 수 있는 허용 경로
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // 해당 경로가 사용할수 있는 메소드
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(MAX_AGE_SECS); // 허용 시간
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        registry.addResourceHandler("/images/**")
                .addResourceLocations(uploadPath + "/images/");
    }
}
