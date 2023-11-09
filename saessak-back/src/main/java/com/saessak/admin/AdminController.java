package com.saessak.admin;


import com.saessak.board.BoardDTO;
import com.saessak.board.BoardResponseDTO;
import com.saessak.entity.Image;
import com.saessak.entity.Member;
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
  public ResponseEntity<?> getImageList(@PathVariable("page") int page) {

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
