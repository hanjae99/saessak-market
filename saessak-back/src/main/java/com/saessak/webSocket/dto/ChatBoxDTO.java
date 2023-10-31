package com.saessak.webSocket.dto;

import com.saessak.entity.Member;
import com.saessak.entity.Product;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Builder
public class ChatBoxDTO {

    private Long id;

    private Long productId;

//    private Long sellMemberId;
//
//    private Long orderMemberId;

    private List<ChatDTO> chatList;

    private int chatCount;

}
