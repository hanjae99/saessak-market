package com.saessak.wishlist.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.saessak.constant.SellStatus;
import com.saessak.entity.Member;
import com.saessak.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class WishListDTO {

    private Long productId;

    private Long wishListId;

    private String title;

    private int price;

    private LocalDateTime updateTime;

    private SellStatus sellStatus;

    private String imgUrl;

    private Long sellMemberId;

    private Long orderMemberId;



    @QueryProjection

    public WishListDTO(Long productId, Long wishListId, String title, int price, LocalDateTime updateTime, SellStatus sellStatus, String imgUrl, Long sellMemberId, Long orderMemberId) {
        this.productId = productId;
        this.wishListId = wishListId;
        this.title = title;
        this.price = price;
        this.updateTime = updateTime;
        this.sellStatus = sellStatus;
        this.imgUrl = imgUrl;
        this.sellMemberId = sellMemberId;
        this.orderMemberId = orderMemberId;
    }
}
