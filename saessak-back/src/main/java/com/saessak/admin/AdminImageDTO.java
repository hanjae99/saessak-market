package com.saessak.admin;


import com.querydsl.core.annotations.QueryProjection;
import com.saessak.constant.ShowStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AdminImageDTO {

  private String imgUrl;
  private Long member_id;
  private Long board_id;
  private Long product_id;
  private Long id;

  @QueryProjection
  public AdminImageDTO(
      String imgUrl,
      Long member_id,
      Long board_id,
      Long product_id,
      Long id
  ) {
    this.imgUrl = imgUrl;
    this.member_id = member_id;
    this.board_id = board_id;
    this.product_id = product_id;
    this.id = id;
  }

}
