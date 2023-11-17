package com.saessak.game.dto;


import com.querydsl.core.annotations.QueryProjection;
import com.saessak.constant.SellStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@Builder
public class GameDTO {

    private Long productId;
    private String title;
    private int price;
    private String content;
    private String imgUrl;


    @QueryProjection
    public GameDTO(Long productId, String title, int price, String content, String imgUrl) {
        this.productId = productId;
        this.title = title;
        this.price = price;
        this.content = content;
        this.imgUrl = imgUrl;
    }
}
