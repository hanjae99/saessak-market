package com.saessak.detail.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ChatBoxDTO {

    private Long id;

    private Long productId;

    private Long sellMemberId;

    private Long orderMemberId;

    private int chatCount;

}
