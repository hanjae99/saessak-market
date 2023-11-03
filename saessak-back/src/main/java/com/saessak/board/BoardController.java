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



  @GetMapping("/{boardName}/detail/{boardId}")
  public ResponseEntity<?> readBoardDetail(@PathVariable("boardName") String boardName,
                                           @PathVariable("boardId") String boardId,
                                           @AuthenticationPrincipal String userId) {
    List<BoardDTO> list = new ArrayList<>();
    Board board = boardService.getBoard(boardId);
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
      Member member = boardService.getMember(userId);
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
            p.setBoardNumber(boardService.getMainNumber(p.getId()));
            break;
          case "ntc":
            p.setBoardNumber(boardService.getNtcNumber(p.getId()));
            break;
          case "voc":
            p.setBoardNumber(boardService.getVocNumber(p.getId()));
            break;
          default:
            break;
        }
      }).collect(Collectors.toList());
      if (Objects.equals(boardName, "voc")) {
        list = list.stream().filter(p->p.getWriter().equals(boardService.getMember(userId).getNickName())).collect(Collectors.toList());
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
                                       List<MultipartFile> imgs,
                                       BoardDTO boardDTO) {


    Member writer = boardService.getMember(userId);
    if (boardName.equals("ntc") && !writer.getRole().equals(Role.ADMIN)) {
      return ResponseEntity.badRequest().body("403");
    }
    Board board = new Board();
    board.setMember(writer);
//    log.info(boardDTO.getBoardName());
    board.setBoardName(boardDTO.getBoardName());
    board.setShowStatus(ShowStatus.SHOW);
    board.setTitle(boardDTO.getTitle());
    Board savedBoard = boardService.saveBoard(board);

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
      for (int i = 0; i < blobUrl.size(); i++) {
        content = content.replace(blobUrl.get(i), realUrl.get(i));
      }
    }

      for (int i = 0; i < blobUrl.size(); i++) {
        content = content.replace(blobUrl.get(i), realUrl.get(i));
      }


    savedBoard.setContent(content);
    boardService.saveBoard(savedBoard);

    switch (boardDTO.getBoardName()) {
      case "main":
        BoardMain boardMain = new BoardMain();
        boardMain.setBoard(savedBoard);
        boardService.saveBoardMain(boardMain);
        break;
      case "ntc":
        BoardNtc boardNtc = new BoardNtc();
        boardNtc.setBoard(savedBoard);
        boardService.saveBoardNtc(boardNtc);
        break;
      case "voc":
        BoardVoc boardVoc = new BoardVoc();
        boardVoc.setBoard(savedBoard);
        boardService.saveBoardVoc(boardVoc);
        break;
    }


    return ResponseEntity.ok().body("kk");

  }


  @DeleteMapping("/delete/{boardId}")
  public ResponseEntity<?> deleteBoard(@PathVariable("boardId") String boardId) {

    Board board = boardService.getBoard(boardId);
    board.setShowStatus(ShowStatus.HIDDEN);
    boardService.saveBoard(board);

    BoardResponseDTO<?> boardResponseDTO = BoardResponseDTO.builder()
        .msg("ok")
        .build();

    return ResponseEntity.ok().body(boardResponseDTO);
  }


  @PostMapping("/update/{boardName}/{boardId}")
  public ResponseEntity<?> updateBoard(@PathVariable("boardName") String boardName,
                                       @PathVariable("boardId") String boardId,
                                       @AuthenticationPrincipal String userId,
                                       List<MultipartFile> imgs,
                                       BoardDTO boardDTO) {

    Board board = boardService.getBoard(boardId);
    board.setTitle(boardDTO.getTitle());

    String content = boardDTO.getContent();

    String finalContent = content;
    boardService.getBoardImageList(boardId).forEach(p->{
      if (!finalContent.contains(p.getImgUrl())) {
        boardService.deleteImage(p.getId());
      }
    });

    List<String> blobUrl = new ArrayList<>();
    List<String> realUrl = new ArrayList<>();

    if (imgs!=null) {
      imgs.forEach(p->{
        Image image = new Image();
        image.setBoard(board);
        try {
          boardService.saveImg(image, p);
        } catch (Exception e) {
          throw new RuntimeException(e);
        }
        blobUrl.add(p.getOriginalFilename().split("\\?")[0]);
        realUrl.add("$back$"+image.getImgUrl());
      });
      for (int i = 0; i < blobUrl.size(); i++) {
        content = content.replace(blobUrl.get(i), realUrl.get(i));
      }
    }
    board.setContent(content);

    boardService.saveBoard(board);

    BoardResponseDTO<?> boardResponseDTO = BoardResponseDTO.builder()
        .msg("ok")
        .build();

    return ResponseEntity.ok().body(boardResponseDTO);
  }


  @GetMapping("/comments/{boardId}")
  public ResponseEntity<?> getComments(@PathVariable("boardId") String boardId,
                                       @AuthenticationPrincipal String userId
                                       ) {

    String role = "any";
    String userProfileImgUrl = "";
    String userNickName = "";
    if (!userId.equals("anonymousUser")) {
      role = boardService.getUserRole(userId);
      userProfileImgUrl = boardService.getMemberProfileImgUrl(Long.parseLong(userId));
      userNickName = boardService.getMember(userId).getNickName();
    }

    List<Comment> comments = boardService.getComments(boardId);
    List<BoardCommentDTO> list = comments.stream().map(p->{
      String writerNickName = boardService.getMember(p.getMember().getId()).getNickName();
      String writerProfileImgUrl = boardService.getMemberProfileImgUrl(p.getMember().getId());
      if (writerProfileImgUrl==null) {
        writerProfileImgUrl = "";
      }
      BoardCommentDTO boardCommentDTO = BoardCommentDTO.builder()
          .id(p.getId())
          .upTime(p.getRegTime())
          .writerNickName(writerNickName)
          .writerProfileImgUrl(writerProfileImgUrl)
          .build();
      if (p.getContent()!=null) {
        boardCommentDTO.setContent(p.getContent());
      } else {
        boardCommentDTO.setContent("");
      }
      if (p.getComment()!=null) {
        boardCommentDTO.setPid(p.getComment().getId());
      } else {
        boardCommentDTO.setPid(0L);
      }
      return boardCommentDTO;
    }).collect(Collectors.toList());

    BoardResponseDTO<BoardCommentDTO> responseDTO = BoardResponseDTO.<BoardCommentDTO>builder()
        .msg("good")
        .list(list)
        .userProfileImgUrl(userProfileImgUrl)
        .userNickName(userNickName)
        .viewerRole(role)
        .build();

    return ResponseEntity.ok().body(responseDTO);
  }


  @PostMapping("/comment/create/{boardId}")
  public ResponseEntity<?> createComment(@PathVariable("boardId") String boardId,
                                         @AuthenticationPrincipal String userId,
                                         @RequestBody BoardCommentDTO boardCommentDTO1
                                          ) {

    String content = boardCommentDTO1.getContent();
    Long pid = boardCommentDTO1.getPid();

    Comment comment = Comment.builder()
        .board(boardService.getBoard(boardId))
        .member(boardService.getMember(userId))
        .content(content)
        .build();

    log.info("------------------------------"+content+"----------------------------------- : " + pid);

    if (pid!=null) {
      comment.setComment(boardService.getComment(pid));
    }

    boardService.saveComment(comment);

    String role = "any";
    String userProfileImgUrl = "";
    String userNickName = "";
    if (!userId.equals("anonymousUser")) {
      role = boardService.getUserRole(userId);
      userProfileImgUrl = boardService.getMemberProfileImgUrl(Long.parseLong(userId));
      userNickName = boardService.getMember(userId).getNickName();
    }

    List<Comment> comments = boardService.getComments(boardId);
    List<BoardCommentDTO> list = comments.stream().map(p->{
      String writerNickName = boardService.getMember(p.getMember().getId()).getNickName();
      String writerProfileImgUrl = boardService.getMemberProfileImgUrl(p.getMember().getId());
      if (writerProfileImgUrl==null) {
        writerProfileImgUrl = "";
      }
      BoardCommentDTO boardCommentDTO = BoardCommentDTO.builder()
          .id(p.getId())
          .upTime(p.getRegTime())
          .writerNickName(writerNickName)
          .writerProfileImgUrl(writerProfileImgUrl)
          .build();
      if (p.getContent()!=null) {
        boardCommentDTO.setContent(p.getContent());
      } else {
        boardCommentDTO.setContent("");
      }
      if (p.getComment()!=null) {
        boardCommentDTO.setPid(p.getComment().getId());
      } else {
        boardCommentDTO.setPid(0L);
      }
      return boardCommentDTO;
    }).collect(Collectors.toList());

    BoardResponseDTO<BoardCommentDTO> responseDTO = BoardResponseDTO.<BoardCommentDTO>builder()
        .msg("good")
        .list(list)
        .userProfileImgUrl(userProfileImgUrl)
        .userNickName(userNickName)
        .viewerRole(role)
        .build();

    return ResponseEntity.ok().body(responseDTO);
  }




}
