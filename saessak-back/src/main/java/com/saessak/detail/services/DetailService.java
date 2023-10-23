package com.saessak.detail.services;

import com.saessak.detail.dto.CategoryDTO;
import com.saessak.detail.dto.CategoryProductDTO;
import com.saessak.detail.dto.DetailDTO;
import com.saessak.detail.dto.MemberProductDTO;
import com.saessak.entity.*;
import com.saessak.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class DetailService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ImageRepository imageRepository;

    public DetailDTO get(Long productId){
        //제품상세 데이터
        Product product = productRepository.findById(productId)
                .orElseThrow(EntityNotFoundException::new);

        //상품 등록 유저 닉네임 데이터
        Member member= memberRepository
                .findById(product.getSellMember().getId())
                .orElseThrow();

        //유저의 다른 상품 목록
        List<Product> memberProductlist = productRepository.findBySellMemberId(member.getId());


        //카테고리 아이디 알아오기
        ProductCategory productCateId = productCategoryRepository.findByProductId(productId);


        //카테고리 정보 가져오기
        Category category = categoryRepository.findById(productCateId.getId()).orElseThrow();

        //카테고리 정보가 같은 productid 가져오기
        List<ProductCategory> productCategory = productCategoryRepository.findByCategoryId(category.getId());

        List<CategoryProductDTO> categoryProductDTOList = new ArrayList<>();


        //가져온 productId로 product 랜덤으로 4개의 값 가져오기
        for(int i=0; i<4; i++){
           Product categoryProduct = productRepository
                   .findById(productCategory.get(i).getProduct().getId()).orElseThrow();
            List<Image> image =imageRepository.findByProductId(categoryProduct.getId());


            CategoryProductDTO categoryProductDTO =   CategoryProductDTO.builder()
                   .productId(categoryProduct.getId())
                   .categoryId(category.getId())
                   .price(categoryProduct.getPrice())
                   .title(categoryProduct.getTitle())
                   .imgUrl(image.get(0).getImgUrl())
                   .build();

            categoryProductDTOList.add(categoryProductDTO);

        };



        return null;
    }



}
