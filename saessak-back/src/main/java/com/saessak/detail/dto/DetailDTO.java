package com.saessak.detail.dto;

import com.saessak.constant.SellStatus;
import com.saessak.entity.Image;
import com.saessak.entity.Member;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Builder
public class DetailDTO {

    private Long productId;
    private DetailMemberDTO MemberDTO;
    private String title;
    private String content;
    private List<String> imagesUrl;
    private int price;
    private int clickCount;
    private SellStatus sellStatus;
    private String mapData;
    private List<CategoryProductDTO> categoryProductDTO;

//    public DetailDTO(){}
//    public DetailDTO(Long productId,
//                     DetailMemberDTO memberDTO,
//                     String title,
//                     String content,
//                     int price,
//                     int clickCount,
//                     SellStatus sellStatus,
//                     String mapData,
//                     List<CategoryProductDTO> categoryProductDTO) {
//        this.productId = productId;
//        MemberDTO = memberDTO;
//        this.title = title;
//        this.content = content;
//        this.price = price;
//        this.clickCount = clickCount;
//        this.sellStatus = sellStatus;
//        this.mapData = mapData;
//        this.categoryProductDTO = categoryProductDTO;
//    }
}