package com.saessak.board;


import com.saessak.repository.BoardRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/board")
@Log
public class BoardController {

  @Autowired
  private BoardService boardService;

  @GetMapping("/{boardName}/{page}")
  public ResponseEntity<?> board(@PathVariable("boardName") String boardName, @PathVariable int page, @AuthenticationPrincipal String userId, BoardSearchDTO boardSearchDTO) {

    log.info("boardName : " + boardName);
    log.info("page : " + page);
    log.info("userid : " + userId);

    log.info(boardSearchDTO.getBoardName());
    log.info(boardSearchDTO.getSearchBy());
    log.info(boardSearchDTO.getSearchQuery());
    log.info(boardSearchDTO.getBoardName());



    int pageSize = 15;


    Pageable pageable = PageRequest.of(page,pageSize);
    List<BoardDTO> list = boardService.read(boardSearchDTO, pageable).getContent();

    BoardResponseDTO<BoardDTO> responseDTO = BoardResponseDTO.<BoardDTO>builder()
        .list(list)
        .isMaster("m")
        .viewerRole("USER")
        .msg(pageSize+"")
        .build();


    return ResponseEntity.ok().body(responseDTO);
  }


}
