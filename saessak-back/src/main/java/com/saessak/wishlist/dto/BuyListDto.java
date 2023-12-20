package com.saessak.wishlist.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.saessak.constant.SellStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BuyListDto {

    private Long id;

    private String title;

    private int price;

    private SellStatus sellStatus;

    private LocalDateTime updateTime;

    private String imgUrl;

    private Long sellMemberId;

    private Long orderMemberId;

    @QueryProjection

    public BuyListDto(Long id, String title, int price, SellStatus sellStatus, LocalDateTime updateTime, String imgUrl, Long sellMemberId, Long orderMemberId) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.sellStatus = sellStatus;
        this.updateTime = updateTime;
        this.imgUrl = imgUrl;
        this.sellMemberId = sellMemberId;
        this.orderMemberId = orderMemberId;
    }
}
