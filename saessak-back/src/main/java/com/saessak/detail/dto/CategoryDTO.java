package com.saessak.detail.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryDTO {
    private Long produnctId;
    private Long categoryId;
}
