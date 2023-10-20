package com.saessak.main.dto;

import com.querydsl.core.annotations.QueryProjection;
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

    @QueryProjection
    public ProductImageDTO(Long id, String imgName,
                           String oriName, String imgUrl){
        this.id = id;
        this.imgName = imgName;
        this.oriName = oriName;
        this.imgUrl = imgUrl;
    }
}
