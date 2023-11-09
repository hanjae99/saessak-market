package com.saessak.admin;


import com.saessak.board.BoardDTO;
import com.saessak.board.BoardResponseDTO;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

  @GetMapping("/images/{page}")
  public ResponseEntity<?> getImageList(@PathVariable("page") int page) {

    int pageSize = 50;

    Pageable pageable = PageRequest.of(page-1,pageSize);
    Page<AdminImageDTO> pi = adminService.getImageList(pageable);


    List<AdminImageDTO> list = pi.getContent();

    int totalPageSize = pi.getTotalPages();


    AdminResponseDTO<AdminImageDTO> responseDTO = AdminResponseDTO.<AdminImageDTO>builder()
        .list(list)
        .pageSize(pageSize)
        .totalPageSize(totalPageSize)
        .build();

    return ResponseEntity.ok().body(responseDTO);
  }


}
