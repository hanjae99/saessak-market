package com.saessak.repository;

import com.saessak.detail.dto.CateProductInter;
import com.saessak.detail.dto.CategoryProductDTO;
import com.saessak.entity.Product;
import com.saessak.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long>, ProductCategoryCustomRepository {


    List<ProductCategory> findByProductId(Long productId);

    List<ProductCategory> findByCategoryId(Long categoryId);

    @Query( value =
            "SELECT P.product_id AS productId, PC.category_id AS categoryId, P.title, P.price, I.img_url AS imgUrl " +
                    "FROM PRODUCT_CATEGORY PC " +
                    "JOIN PRODUCT P ON PC.product_id = P.product_id " +
                    "JOIN image I ON P.product_id = I.product_id " +
                    "WHERE PC.category_id = :categoryId " +
                    "AND P.SELL_STATUS = 'SELL' " +
                    "AND P.product_id != :productId "+
                    "GROUP BY P.product_id " +
                    "ORDER BY RAND() " +
                    "LIMIT 4", nativeQuery = true)
    List<CateProductInter> categoryRandomData(@Param("categoryId") Long categoryId,@Param("productId") Long productId);


}
