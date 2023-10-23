package com.saessak.detail.dto;

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

}
