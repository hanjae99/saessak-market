package com.saessak.repository;

import com.saessak.board.BoardDTO;
import com.saessak.board.BoardSearchDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepositoryCustom {
  Page<BoardDTO> getSearchBoardPage(BoardSearchDTO boardSearchDTO, Pageable pageable);
}
