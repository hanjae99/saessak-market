package com.saessak.webSocket.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Builder
@Setter
@Getter
@ToString
public class ChatDataDTO {

    private Long memberId;

    private String content;

    private LocalDateTime date;
}
