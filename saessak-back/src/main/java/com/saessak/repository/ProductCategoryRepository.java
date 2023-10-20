package com.saessak.repository;

import com.saessak.entity.Product;
import com.saessak.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {


    List<ProductCategory> findByProductId(Long productId);
}
