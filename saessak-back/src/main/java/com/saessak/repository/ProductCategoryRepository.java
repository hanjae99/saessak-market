package com.saessak.repository;

import com.saessak.entity.Product;
import com.saessak.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {


    ProductCategory findByProductId(Long productId);

    List<ProductCategory> findByCategoryId(Long categoryId);

    @Query( value =
            "SELECT *" +
            "FROM PRODUCTCATEGORY PC JOIN PRODUCT P ON PC.productId = P.productId" +
            "WHERE P.SELL_STATUS = 'SHOW'" +
            "ORDER BY RAND()" +
            "LIMIT 4", nativeQuery = true)
    List<ProductCategory> categoryRandomData();
}
