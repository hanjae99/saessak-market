package com.saessak.webSocket.dto;

import com.saessak.entity.Member;
import com.saessak.entity.Product;
import com.saessak.main.dto.ProductDTO;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Builder
public class ChatBoxDTO {

    private Long id;

    private Long productId;

    private String productTitle;

    private int productPrice;

    private String imgUrl;

    private List<ChatDTO> chatList;

    private int chatCount;

    private Long writer;

}
