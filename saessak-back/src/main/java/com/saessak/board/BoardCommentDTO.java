package com.saessak.board;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardCommentDTO {

  private Long id;
  private Long pid;
  private String content;
  private LocalDateTime upTime;

  private String writerNickName;
  private String writerProfileImgUrl;


}
