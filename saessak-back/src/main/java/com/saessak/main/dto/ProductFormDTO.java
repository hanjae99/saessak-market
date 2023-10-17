package com.saessak.main.dto;

import com.saessak.constant.SellStatus;
import com.saessak.entity.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.modelmapper.ModelMapper;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

// 상품 등록, 업데이트에 사용될 DTO
@Builder
@Getter
@Setter
@ToString
public class ProductFormDTO {

    private String title;

    private int price;

    private String content;

    private SellStatus sellStatus;

    private String mapData;

//    private List<ProductImageDTO> imageDTOList = new ArrayList<>();
//
//    private List<MultipartFile> imageFileList = new ArrayList<>();

    private static ModelMapper modelMapper = new ModelMapper();

    public Product createProduct(){
        return modelMapper.map(this, Product.class);
    }
}
