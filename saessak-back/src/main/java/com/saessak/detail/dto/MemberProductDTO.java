package com.saessak.detail.dto;

import com.saessak.entity.Member;
import com.saessak.entity.Product;
import lombok.Builder;
import lombok.Data;
import org.modelmapper.ModelMapper;

@Data
@Builder
public class MemberProductDTO {
    private Long productId;
    private Long memberId;
    private String title;
    private int price;
    private String imgUrl;


//    private static ModelMapper modelMapper = new ModelMapper();
//
//    public Product createProduct(){
//        return modelMapper.map(this, Product.class);
//    }
}
