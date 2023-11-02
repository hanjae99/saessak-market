package com.saessak.wishlist.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.saessak.constant.SellStatus;

import java.time.LocalDateTime;

public interface WishListInter {

    Long getMemberId();

    Long getProductId();

    Long getWishListId();

    Long getSellMemberId();

    Long getOrderMemberId();

    Long getBuyListId();

    String getTitle();

    int getPrice();

    LocalDateTime getUpdateTime();

    SellStatus getSellStatus();

    String getImgUrl();
}
