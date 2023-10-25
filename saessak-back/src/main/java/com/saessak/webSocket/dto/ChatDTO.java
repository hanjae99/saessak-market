package com.saessak.webSocket.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatDTO {

    private Long ChatId;

    private ChatBoxDTO chatBox;

    private String content;

    private LocalDateTime regTime;
}
