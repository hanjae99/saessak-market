package com.saessak.board;

import com.saessak.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

private final BoardRepository boardRepository;

public Long createBoard() {


  return null;
}



}