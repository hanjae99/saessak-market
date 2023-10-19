package com.saessak.repository;

import com.saessak.main.dto.ProductDTO;
import com.saessak.main.dto.ProductFormDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepositoryCustom {

    Page<ProductDTO> getSearchedProductPage(ProductDTO productDTO, Pageable pageable);

    ProductFormDTO getSearchedProduct(ProductFormDTO productFormDTO);
}
