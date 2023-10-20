package com.saessak.board;


import com.saessak.repository.BoardRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/board")
@Log
public class BoardController {

  @Autowired
  private BoardRepository boardRepository;

  @GetMapping("/{boardName}/{page}")
  public ResponseEntity<?> board(@PathVariable("boardName") String boardName, @PathVariable int page) {

    log.info("boardName : " + boardName);
    log.info("page : " + page);

    Pageable pageable = PageRequest.of(page,15);


    return null;
  }


}
