package com.saessak.board;


import com.saessak.constant.Role;
import com.saessak.constant.ShowStatus;
import com.saessak.entity.*;
import com.saessak.repository.*;
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
import java.util.*;
import java.util.stream.Collectors;


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
  @Autowired
  private BoardMainRepository boardMainRepository;
  @Autowired
  private BoardNtcRepository boardNtcRepository;
  @Autowired
  private BoardVocRepository boardVocRepository;

  @GetMapping("/{boardName}/detail/{boardId}")
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
    String isMaster = "no";
    if (!userId.equals("anonymousUser")) {
      role = boardService.getUserRole(userId);
      Member member = memberRepository.findById(Long.parseLong(userId)).orElseThrow(EntityNotFoundException::new);
      if (boardDTO.getWriter().equals(member.getNickName())) {
        isMaster = "master";
      }
    }








    BoardResponseDTO<BoardDTO> responseDTO = BoardResponseDTO.<BoardDTO>builder()
        .list(list)
        .viewerRole(role)
        .isMaster(isMaster)
        .build();

    return ResponseEntity.ok().body(responseDTO);
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

    List<BoardDTO> list = new ArrayList<>();
    if (!pb.isEmpty()) {
      list = pb.getContent().stream().peek(p -> {
        switch (p.getBoardName()) {
          case "main":
            BoardMain boardMain = new BoardMain();
            boardMain = boardMainRepository.findByBoardId(p.getId());
            p.setBoardNumber(boardMain.getId());
            break;
          case "ntc":
            BoardNtc boardNtc = new BoardNtc();
            boardNtc = boardNtcRepository.findByBoardId(p.getId());
            p.setBoardNumber(boardNtc.getId());
            break;
          case "voc":
            BoardVoc boardVoc = new BoardVoc();
            boardVoc = boardVocRepository.findByBoardId(p.getId());
            p.setBoardNumber(boardVoc.getId());
            break;
        }
      }).collect(Collectors.toList());
      if (Objects.equals(boardName, "voc")) {
        list = list.stream().filter(p->p.getWriter().equals(memberRepository.findById(Long.parseLong(userId)).orElseThrow(EntityNotFoundException::new).getNickName())).collect(Collectors.toList());
      }
    }
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
    if (boardName.equals("ntc") && !writer.getRole().equals(Role.ADMIN)) {
      return ResponseEntity.badRequest().body("403");
    }
    Board board = new Board();
    board.setMember(writer);
//    log.info(boardDTO.getBoardName());
    board.setBoardName(boardDTO.getBoardName());
    board.setShowStatus(ShowStatus.SHOW);
    board.setTitle(boardDTO.getTitle());
    Board savedBoard = boardRepository.save(board);

    String content = boardDTO.getContent();
    List<String> blobUrl = new ArrayList<>();
    List<String> realUrl = new ArrayList<>();

    if (imgs!=null) {
      imgs.forEach(p->{
        Image image = new Image();
        image.setBoard(savedBoard);
        try {
          boardService.saveImg(image, p);
        } catch (Exception e) {
          throw new RuntimeException(e);
        }
        blobUrl.add(p.getOriginalFilename().split("\\?")[0]);
        realUrl.add("$back$"+image.getImgUrl());
      });
    }
//    log.info(content);
    for (int i = 0; i < blobUrl.size(); i++) {
      content = content.replace(blobUrl.get(i), realUrl.get(i));
    }
//    log.info("컨--------텐트---------------"+content);
    savedBoard.setContent(content);
    boardRepository.save(savedBoard);

    switch (boardDTO.getBoardName()) {
      case "main":
        BoardMain boardMain = new BoardMain();
        boardMain.setBoard(savedBoard);
        boardMainRepository.save(boardMain);
        break;
      case "ntc":
        BoardNtc boardNtc = new BoardNtc();
        boardNtc.setBoard(savedBoard);
        boardNtcRepository.save(boardNtc);
        break;
      case "voc":
        BoardVoc boardVoc = new BoardVoc();
        boardVoc.setBoard(savedBoard);
        boardVocRepository.save(boardVoc);
        break;
    }


    return ResponseEntity.ok().body("kk");

  }

}
