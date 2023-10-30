package com.saessak.board;

import com.querydsl.core.annotations.QueryProjection;
import com.saessak.constant.ShowStatus;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Data
@Builder
public class BoardDTO {

  private Long id;
  private String boardName;
  private String title;
  private String content;
  private Integer clickCount;
  private Integer recommend;
  private ShowStatus showStatus;
  private LocalDateTime regTime;
  private LocalDateTime updateTime;

  private String writer;
  private Long boardNumber;

  @QueryProjection
  public BoardDTO(
      Long id,
      String boardName,
      String title,
      String content,
      Integer clickCount,
      Integer recommend,
      ShowStatus showStatus,
      LocalDateTime regTime,
      LocalDateTime updateTime,
      String writer,
      Long boardNumber
      ) {

    this.id = id;
    this.boardName = boardName;
    this.title = title;
    this.content = content;
    this.clickCount = clickCount;
    this.recommend = recommend;
    this.showStatus = showStatus;
    this.regTime = regTime;
    this.updateTime = updateTime;
    this.writer = writer;
    this.boardNumber = boardNumber;
  }
}