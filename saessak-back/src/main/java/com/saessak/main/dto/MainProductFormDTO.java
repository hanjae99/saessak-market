package com.saessak.main.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
@ToString
public class MainProductFormDTO {

    private Long id;

    private String title;

    private Integer price;

    private String imgUrl;

    private LocalDateTime updateTime;

    @QueryProjection
    public MainProductFormDTO(Long id, String title, Integer price, String imgUrl, LocalDateTime updateTime) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imgUrl = imgUrl;
        this.updateTime = updateTime;
    }
}
