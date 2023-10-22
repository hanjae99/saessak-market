package com.saessak.detail.services;

import com.saessak.detail.dto.CategoryDTO;
import com.saessak.detail.dto.DetailDTO;
import com.saessak.repository.CategoryRepository;
import com.saessak.repository.MemberRepository;
import com.saessak.repository.ProductCategoryRepository;
import com.saessak.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class DetailService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final ProductCategoryRepository productCategoryRepository;

    public DetailDTO get(Long productId){
        productRepository.findById(productId);

        return null;
    }



}
