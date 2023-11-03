package com.saessak.webSocket.dto;

import com.saessak.entity.Chat;
import com.saessak.entity.Product;
import lombok.Builder;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatDTO {

    private Long chatBoxId;

    private Long memberId;

    private String memberNickname;

    private String content;

    private LocalDateTime regTime;

}
