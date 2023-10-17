package com.saessak.board;

import lombok.Data;


@Data
public class BoardDTO {

  private Long id;
  private String boardName;
  private String title;
  private String content;
  private Integer clickCount;
  private Integer recommend;
  private String showStatus;

}
