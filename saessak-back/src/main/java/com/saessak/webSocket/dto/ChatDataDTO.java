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

    private String name;

    private String msg;

    private LocalDateTime date;
}
