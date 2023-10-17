package com.saessak.main.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.saessak.constant.SellStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

// 메인, 검색 상품 조회에 사용될 DTO
@Builder
@Getter
@Setter
@ToString
public class ProductDTO {

    private String title;

    private int price;

    private SellStatus sellStatus;

    private String imgUrl;

    private LocalDateTime regTime;

    private LocalDateTime updateTime;


    @QueryProjection
    public ProductDTO(String title, int price, SellStatus sellStatus, String imgUrl,
                      LocalDateTime regTime, LocalDateTime updateTime){
        this.title = title;
        this.price = price;
        this.sellStatus = sellStatus;
        this.imgUrl = imgUrl;
        this.regTime = regTime;
        this.updateTime = updateTime;
    }

}
