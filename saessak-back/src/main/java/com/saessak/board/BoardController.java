package com.saessak.board;


import com.saessak.constant.ShowStatus;
import com.saessak.entity.Board;
import com.saessak.entity.Image;
import com.saessak.entity.Member;
import com.saessak.repository.BoardRepository;
import com.saessak.repository.MemberRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/board")
@Log
public class BoardController {

  @Autowired
  private BoardService boardService;
  @Autowired
  private BoardRepository boardRepository;
  @Autowired
  private MemberRepository memberRepository;


  @GetMapping("/board/{boardName}/detail/{boardId}")
  public ResponseEntity<?> readBoardDetail(@PathVariable("boardName") String boardName,
                                           @PathVariable("boardId") String boardId,
                                           @AuthenticationPrincipal String userId) {
    List<BoardDTO> list = new ArrayList<>();
    Board board = boardRepository.findById(Long.parseLong(boardId)).orElseThrow(EntityNotFoundException::new);
    BoardDTO boardDTO = BoardDTO.builder()
        .title(board.getTitle())
        .content(board.getContent())
        .recommend(board.getRecommend())
        .regTime(board.getRegTime())
        .updateTime(board.getUpdateTime())
        .writer(board.getMember().getNickName())
        .build();
    list.add(boardDTO);

    String role = "any";

    if (!userId.equals("anonymousUser")) {
      role = boardService.getUserRole(userId);
    }

    BoardResponseDTO<BoardDTO> responseDTO = BoardResponseDTO.<BoardDTO>builder()
        .list(list)
        .viewerRole(role)
        .isMaster()
        .build();

    return null;
  }
//  title:"", content:"", clickCount:"", recommend:"", regTime:Date.now(), writer:""

  @GetMapping("/{boardName}/{page}")
  public ResponseEntity<?> readBoardList(@PathVariable("boardName") String boardName, @PathVariable("page") int page, @AuthenticationPrincipal String userId, BoardSearchDTO boardSearchDTO) {

    log.info("boardName : " + boardName);
    log.info("page : " + page);
    log.info("userid : " + userId);

    log.info(boardSearchDTO.getBoardName());
    log.info(boardSearchDTO.getSearchBy());
    log.info(boardSearchDTO.getSearchQuery());
    log.info(boardSearchDTO.getBoardName());



    int pageSize = 15;
    String role = "any";

    if (!userId.equals("anonymousUser")) {
      role = boardService.getUserRole(userId);
    }



    Pageable pageable = PageRequest.of(page-1,pageSize);
    Page<BoardDTO> pb = boardService.read(boardSearchDTO, pageable);

    log.info("pb : " + pb.toString());

    List<BoardDTO> list = pb.getContent();
    int totalPageSize = pb.getTotalPages();


    BoardResponseDTO<BoardDTO> responseDTO = BoardResponseDTO.<BoardDTO>builder()
        .list(list)
        .viewerRole(role)
        .pageSize(pageSize)
        .totalPageSize(totalPageSize)
        .build();


    return ResponseEntity.ok().body(responseDTO);
  }


  @PostMapping("/create/{boardName}")
  public ResponseEntity<?> createBoard(@PathVariable("boardName") String boardName,
                                       @AuthenticationPrincipal String userId,
                                       @RequestPart List<MultipartFile> imgs,
                                       BoardDTO boardDTO) {

    Member writer = memberRepository.findById(Long.parseLong(userId)).orElseThrow(EntityNotFoundException::new);
    Board board = new Board();
    board.setMember(writer);
    log.info(boardDTO.getBoardName());
    board.setBoardName(boardDTO.getBoardName());
    board.setShowStatus(ShowStatus.SHOW);
    board.setContent(boardDTO.getContent());
    board.setTitle(boardDTO.getTitle());
    Board savedBoard = boardRepository.save(board);


    if (imgs!=null) {
      imgs.forEach(p->{
        Image image = new Image();
        image.setBoard(savedBoard);
        try {
          boardService.saveImg(image, p);
        } catch (Exception e) {
          throw new RuntimeException(e);
        }
        savedBoard.setContent(savedBoard.getContent().replace(p.getOriginalFilename().split("\\?")[0],image.getImgUrl()));
      });
    }


    return ResponseEntity.ok().body("ok");

  }

}
