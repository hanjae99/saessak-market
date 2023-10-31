package com.saessak.webSocket.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatDTO {

    private Long chatBoxId;

    private Long memberId;

    private String content;

    private LocalDateTime regTime;

}
