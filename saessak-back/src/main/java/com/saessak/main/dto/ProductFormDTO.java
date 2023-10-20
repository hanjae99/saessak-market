package com.saessak.main.dto;

import com.saessak.constant.SellStatus;
import com.saessak.entity.Member;
import com.saessak.entity.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

// 상품 등록, 업데이트에 사용될 DTO
@Builder
@Getter
@Setter
@ToString
public class ProductFormDTO {

    private Long id;

    private String title;

    private Integer price;

    private String content;

    private SellStatus sellStatus;

    private String mapData;

    private List<ProductImageDTO> imageDTOList = new ArrayList<>();

    private Member sellMember;

//    private List<Long> productImgIds = new ArrayList<>();

    private static ModelMapper modelMapper = new ModelMapper();

    public Product createProduct(){
        return modelMapper.map(this, Product.class);
    }
}
