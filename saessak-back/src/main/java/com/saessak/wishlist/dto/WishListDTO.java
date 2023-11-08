package com.saessak.wishlist.dto;

import com.saessak.constant.SellStatus;
import com.saessak.entity.Member;
import com.saessak.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WishListDTO {

    private Long productId;

    private Long wishListId;

    private String title;

    private int price;

    private LocalDateTime updateTime;

    private SellStatus sellStatus;

    private String imgUrl;

    private Member member;

    private Product product;

    private Long sellMemberId;

    private Long orderMemberId;

    private Long buyListId;

}
