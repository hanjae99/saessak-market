package com.saessak.repository;

import com.saessak.detail.dto.CateProductInter;
import com.saessak.detail.dto.CategoryProductDTO;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductCategoryCustomRepository {

    List<CategoryProductDTO> cateRandomData( Long categoryId);
    public List<CategoryProductDTO> categoryRandomDataWithQueryDSL(Long categoryId, Long productId);
}
