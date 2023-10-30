package com.saessak.webSocket.dto;

import com.saessak.entity.Member;
import com.saessak.entity.Product;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Data
@Builder
public class ChatBoxDTO {

    private Long id;

    private Long productId;

    private Long sellMemberId;

    private Long orderMemberId;

    private int chatCount;

}
