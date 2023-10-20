package com.saessak.board;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Builder
public class BoardDTO {

  private Long id;
  private String boardName;
  private String title;
  private String content;
  private Integer clickCount;
  private Integer recommend;
  private String showStatus;

  @QueryProjection
  public BoardDTO(
      Long id,
      String boardName,
      String title,
      String content,
      Integer clickCount,
      Integer recommend,
      String showStatus
      ) {

    this.id = id;
    this.boardName = boardName;
    this.title = title;
    this.content = content;
    this.clickCount = clickCount;
    this.recommend = recommend;
    this.showStatus = showStatus;
  }
}