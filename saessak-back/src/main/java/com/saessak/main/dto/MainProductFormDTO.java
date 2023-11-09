package com.saessak.main.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@ToString
public class MainProductFormDTO {

    private Long id;

    private String title;

    private Integer price;

    private String imgUrl;

    private Integer clickedCount;

    private Integer wishedCount;

    private LocalDateTime regTime;

    private LocalDateTime updateTime;

    @QueryProjection
    public MainProductFormDTO(Long id, String title, Integer price, String imgUrl, Integer clickedCount, Integer wishedCount, LocalDateTime regTime, LocalDateTime updateTime) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imgUrl = imgUrl;
        this.clickedCount = clickedCount;
        this.wishedCount = wishedCount;
        this.regTime = regTime;
        this.updateTime = updateTime;
    }
}
