package com.saessak.admin;


import com.saessak.board.BoardDTO;
import com.saessak.board.BoardResponseDTO;
import com.saessak.constant.Role;
import com.saessak.constant.SellStatus;
import com.saessak.constant.ShowStatus;
import com.saessak.entity.Board;
import com.saessak.entity.Image;
import com.saessak.entity.Member;
import com.saessak.entity.Product;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
@Log
public class AdminController {

  @Autowired
  private AdminService adminService;

  @GetMapping("/setuser/{mcase}/{userId}")
  public ResponseEntity<?> setUser(@PathVariable("mcase") String mcase, @PathVariable("userId") Long memberId, @AuthenticationPrincipal String userId) {

    Member member = adminService.getMember(memberId);

    switch (mcase) {
      case "user":
        member.setRole(Role.BLACKED);

        List<Product> productList = adminService.getProductList(member);
        List<Board> boardList = adminService.getBoardList(member);

        productList = productList.stream().peek(p-> p.setSellStatus(SellStatus.HIDDEN)).collect(Collectors.toList());
        boardList = boardList.stream().peek(p-> p.setShowStatus(ShowStatus.HIDDEN)).collect(Collectors.toList());

        adminService.saveProducts(productList);
        adminService.saveBoards(boardList);
        break;
      case "blacked":
      case "deleted":
        List<Product> productList2 = adminService.getProductList(member);
        List<Board> boardList2 = adminService.getBoardList(member);

        productList2 = productList2.stream().peek(p-> p.setSellStatus(SellStatus.SELL)).collect(Collectors.toList());
        boardList2 = boardList2.stream().peek(p-> p.setShowStatus(ShowStatus.SHOW)).collect(Collectors.toList());

        adminService.saveProducts(productList2);
        adminService.saveBoards(boardList2);
        member.setRole(Role.USER);
        break;
      default:
        break;
    }

    adminService.saveMember(member);

    AdminResponseDTO<?> responseDTO = AdminResponseDTO.builder()
        .msg("good")
        .build();

    return ResponseEntity.ok().body(responseDTO);
  }

  @GetMapping("/getusers")
  public ResponseEntity<?> getUsers(@AuthenticationPrincipal String userId) {

    List<Member> members = adminService.getMemberList();

    List<AdminGetMemberDTO> getMemberDTOS = members.stream().map(p->{
      return AdminGetMemberDTO.builder()
          .id(p.getId())
          .userId(p.getUserId())
          .name(p.getName())
          .nickName(p.getNickName())
          .address(p.getAddress())
          .email(p.getEmail())
          .gender(p.getGender().toString())
          .phone(p.getPhone())
          .role(p.getRole().toString())
          .profileImgUrl(adminService.getMemberImage(p.getId()))
          .build();
    }).collect(Collectors.toList());

    AdminResponseDTO<AdminGetMemberDTO> responseDTO = AdminResponseDTO.<AdminGetMemberDTO>builder()
        .list(getMemberDTOS)
        .build();

    return ResponseEntity.ok().body(responseDTO);
  }


  @GetMapping("/black/image/{imageId}")
  public ResponseEntity<?> blackImageTarget(@PathVariable("imageId") String imageId, @AuthenticationPrincipal String userId) {

    Image image = adminService.getImage(Long.parseLong(imageId));
    if (image.getBoard()!=null) {
      Board board = adminService.getBoard(image.getBoard().getId());
      board.setShowStatus(ShowStatus.HIDDEN);
      adminService.saveBoard(board);
    }
    if (image.getProduct()!=null) {
      Product product = adminService.getProduct(image.getProduct().getId());
      product.setSellStatus(SellStatus.HIDDEN);
      adminService.saveProduct(product);
    }
    image.setAdminMember(adminService.getMember(userId));
    adminService.saveImage(image);

    AdminResponseDTO<AdminImageDTO> responseDTO = AdminResponseDTO.<AdminImageDTO>builder()
        .msg("삭제 되었습니다.")
        .build();
    return ResponseEntity.ok().body(responseDTO);
  }

  @GetMapping("/black/user/{imageId}")
  public ResponseEntity<?> blackImageUser(@PathVariable("imageId") String imageId, @AuthenticationPrincipal String userId) {

    Image image = adminService.getImage(Long.parseLong(imageId));
    Member member = new Member();
    if (image.getBoard()!=null) {
      Board board = adminService.getBoard(image.getBoard().getId());
      member = board.getMember();
    }
    if (image.getProduct()!=null) {
      Product product = adminService.getProduct(image.getProduct().getId());
      member = product.getSellMember();
    }

    member.setRole(Role.BLACKED);

    List<Product> productList = adminService.getProductList(member);
    List<Board> boardList = adminService.getBoardList(member);

    productList = productList.stream().peek(p-> p.setSellStatus(SellStatus.HIDDEN)).collect(Collectors.toList());
    boardList = boardList.stream().peek(p-> p.setShowStatus(ShowStatus.HIDDEN)).collect(Collectors.toList());

    adminService.saveMember(member);
    adminService.saveProducts(productList);
    adminService.saveBoards(boardList);

    image.setAdminMember(adminService.getMember(userId));
    adminService.saveImage(image);

    AdminResponseDTO<AdminImageDTO> responseDTO = AdminResponseDTO.<AdminImageDTO>builder()
        .msg("차단 되었습니다.")
        .build();
    return ResponseEntity.ok().body(responseDTO);
  }

  @PostMapping("/save/images")
  public ResponseEntity<?> saveImageList(@RequestBody List<AdminImageDTO> data, @AuthenticationPrincipal String userId) {
    Member admin = adminService.getMember(userId);
    log.info("-----------------------"+admin.getNickName());
    data.forEach(p -> {
      Image image = adminService.getImage(p.getId());
      image.setAdminMember(admin);
      adminService.saveImage(image);
    });
    AdminResponseDTO<AdminImageDTO> responseDTO = AdminResponseDTO.<AdminImageDTO>builder()
        .msg("save ok")
        .build();
    return ResponseEntity.ok().body(responseDTO);
  }

  @GetMapping("/images/{page}")
  public ResponseEntity<?> getImageList(@PathVariable("page") int page, @AuthenticationPrincipal String userId) {

    int pageSize = 50;

    Pageable pageable = PageRequest.of(page - 1, pageSize);
    Page<AdminImageDTO> pi = adminService.getImageList(pageable);

    if (pi.isEmpty()) {
      AdminResponseDTO<AdminImageDTO> responseDTO = AdminResponseDTO.<AdminImageDTO>builder()
          .msg("empty")
          .build();
      return ResponseEntity.ok().body(responseDTO);
    }

    List<AdminImageDTO> list = pi.getContent().stream().peek(p->{
      if (p.getProduct_id()!=null) {
        p.setNickName(adminService.getNickNameFromProduct(p.getProduct_id()));
      }
      if (p.getBoard_id()!=null) {
        p.setNickName(adminService.getNickNameFromBoard(p.getBoard_id()));
      }
      if (p.getMember_id()!=null) {
        p.setNickName(adminService.getMember(p.getMember_id()).getNickName());
      }
    }).collect(Collectors.toList());

    int totalPageSize = pi.getTotalPages();


    AdminResponseDTO<AdminImageDTO> responseDTO = AdminResponseDTO.<AdminImageDTO>builder()
        .list(list)
        .pageSize(pageSize)
        .totalPageSize(totalPageSize)
        .build();

    return ResponseEntity.ok().body(responseDTO);
  }


}
