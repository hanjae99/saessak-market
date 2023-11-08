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

    private Long id;

    private String title;

    private Integer price;

    private SellStatus sellStatus;

    private String imgUrl;

    private Integer clickedCount;

    private Integer wishedCount;

    private LocalDateTime regTime;

    private LocalDateTime updateTime;

    private String searchBy;

    private String searchQuery;

    private String sortBy;

    @QueryProjection
    public ProductDTO(Long id, String title, Integer price, SellStatus sellStatus, String imgUrl, Integer clickedCount, Integer wishedCount, LocalDateTime regTime, LocalDateTime updateTime, String searchBy, String searchQuery, String sortBy) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.sellStatus = sellStatus;
        this.imgUrl = imgUrl;
        this.clickedCount = clickedCount;
        this.wishedCount = wishedCount;
        this.regTime = regTime;
        this.updateTime = updateTime;
        this.searchBy = searchBy;
        this.searchQuery = searchQuery;
        this.sortBy = sortBy;
    }
}
