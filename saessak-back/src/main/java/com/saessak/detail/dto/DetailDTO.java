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
    private DetailMemberDTO memberDTO;
    private String title;
    private String content;
    private List<String> imagesUrl;
    private int price;
    private int clickCount;
    private SellStatus sellStatus;
    private String mapData;
    private List<CategoryProductDTO> categoryProductDTO;
    private String isWriter;


    public DetailDTO(Long productId,
                     DetailMemberDTO memberDTO,
                     String title,
                     String content,
                     List<String> imagesUrl,
                     int price,
                     int clickCount,
                     SellStatus sellStatus,
                     String mapData,
                     List<CategoryProductDTO> categoryProductDTO,
                     String isWriter) {
        this.productId = productId;
        this.memberDTO = memberDTO;
        this.title = title;
        this.content = content;
        this.imagesUrl = imagesUrl;
        this.price = price;
        this.clickCount = clickCount;
        this.sellStatus = sellStatus;
        this.mapData = mapData;
        this.categoryProductDTO = categoryProductDTO;
        this.isWriter = isWriter;
    }
}