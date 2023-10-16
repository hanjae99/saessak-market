package com.saessak.main.service;

import com.saessak.main.dto.ProductDTO;
import com.saessak.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<ProductDTO> read(ProductDTO productDTO, Pageable pageable){
        return productRepository.getSearchedProductPage(productDTO, pageable);
    }
}
