package com.saessak.board;


import com.saessak.constant.ShowStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardSearchDTO {

  private String boardName;

  private ShowStatus searchBoardStatus;

  private String searchBy = "";
  private String searchQuery = "";

}
