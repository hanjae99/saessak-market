package com.saessak.repository;
import com.saessak.detail.dto.DetailDTO;
import com.saessak.entity.Product;
import com.saessak.main.dto.MainProductFormDTO;
import com.saessak.main.dto.ProductDTO;
import com.saessak.main.dto.ProductFormDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductRepositoryCustom {

    Page<ProductDTO> getSearchedProductPage(ProductDTO productDTO, Pageable pageable);

    ProductFormDTO getSearchedProduct(ProductFormDTO productFormDTO);

    DetailDTO getDetailDTO(Long productId);

    List<MainProductFormDTO> getRandomProduct();

    List<MainProductFormDTO> getNewestProduct();
}
