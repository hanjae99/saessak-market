package com.saessak.main.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class ProductImageDTO {

    private Long id;

    private String imgName;

    private String oriName;

    private String imgUrl;
}
