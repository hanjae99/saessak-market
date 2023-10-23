package com.saessak.board;

import com.saessak.main.dto.ProductDTO;
import com.saessak.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

private final BoardRepository boardRepository;

  public Page<BoardDTO> read(BoardSearchDTO boardSearchDTO, Pageable pageable){
    return boardRepository.getSearchBoardPage(boardSearchDTO, pageable);
  }



}
