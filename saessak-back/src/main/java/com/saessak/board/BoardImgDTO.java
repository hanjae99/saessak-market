package com.saessak.board;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class BoardImgDTO {
  private MultipartFile file;
  private String url;
}
