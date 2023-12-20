package com.saessak.detail.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.saessak.entity.Product;
import lombok.Builder;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.List;

@Data
@Builder
public class CategoryProductDTO {
    private Long productId;
    private Long categoryId;
    private String title;
    private int price;
    private String imgUrl;


    @QueryProjection
    public CategoryProductDTO(Long productId, Long categoryId, String title, int price, String imgUrl) {
        this.productId = productId;
        this.categoryId = categoryId;
        this.title = title;
        this.price = price;
        this.imgUrl = imgUrl;
    }
}
