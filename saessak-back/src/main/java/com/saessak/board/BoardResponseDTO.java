package com.saessak.board;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardResponseDTO<T> {

  private String msg;
  private List<T> list;
  private String viewerRole;
  private String isMaster;
  private int totalPageSize;
  private int pageSize;

  private String userProfileImgUrl;
  private String userNickName;

}
