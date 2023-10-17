package com.saessak.main.service;

import com.saessak.constant.SellStatus;
import com.saessak.entity.Image;
import com.saessak.entity.Product;
import com.saessak.main.dto.ProductDTO;
import com.saessak.repository.ImageRepository;
import com.saessak.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
//@Transactional
@Slf4j
class ProductServiceTest {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductService productService;

    @Autowired
    ImageRepository imageRepository;

    public void createSample(){
        Product product = new Product();
        product.setTitle("아이폰 싸게 팝니다");
        product.setContent("얼마 사용안한 아이폰 싸게 팝니다");
        product.setPrice(50000);
        product.setSellStatus(SellStatus.SELL);
        productRepository.save(product);

        Image image = new Image();
        image.setImgName("상품 이미지1");
        image.setImgUrl("src/main/img1.jpg");
        image.setProduct(product);
        imageRepository.save(image);

//        Image image1 = imageRepository.findByProductId(product.getId());
//
//        log.info("imageUrl: " + image1.getImgUrl());
    }

    @Test
    @DisplayName("상품 검색 테스트")
    public void read(){
        this.createSample();

        ProductDTO productDTO = ProductDTO.builder()
                .title("아이패드")
                .sellStatus(SellStatus.SELL)
                .build();

        Pageable pageable = PageRequest.of(0, 5);

        Page<ProductDTO> list = productService.read(productDTO, pageable);

        log.info("productDTO_page: " + list.getContent());
        log.info("pageNum: " + list.getNumber());
        log.info("totalPage: " + list.getTotalPages());

    }
}