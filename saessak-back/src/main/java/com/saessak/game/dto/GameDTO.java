package com.saessak.game.dto;


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




}
