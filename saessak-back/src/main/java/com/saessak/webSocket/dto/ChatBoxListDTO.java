package com.saessak.webSocket.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatBoxListDTO {

    private Long chatBoxId;

    private Long productId;

    private String productTitle;

    private int productPrice;

    private String imgUrl;

    private LocalDateTime lastChatTime;

    private String counterNickName;


    @QueryProjection
    public ChatBoxListDTO(Long chatBoxId, Long productId, String productTitle, int productPrice, String imgUrl, LocalDateTime lastChatTime, String counterNickName) {
        this.chatBoxId = chatBoxId;
        this.productId = productId;
        this.productTitle = productTitle;
        this.productPrice = productPrice;
        this.imgUrl = imgUrl;
        this.lastChatTime = lastChatTime;
        this.counterNickName = counterNickName;
    }
}
