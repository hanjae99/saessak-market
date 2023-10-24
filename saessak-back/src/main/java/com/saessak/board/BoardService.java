package com.saessak.board;

import com.saessak.imgfile.FileService;
import com.saessak.main.dto.ProductDTO;
import com.saessak.repository.BoardRepository;
import com.saessak.repository.ImageRepository;
import com.saessak.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {
  @Value("${imgLocation}")
  private String imgLocation;

  private final FileService fileService;
  private final ImageRepository imageRepository;
  private final BoardRepository boardRepository;
  private final MemberRepository memberRepository;

  public Page<BoardDTO> read(BoardSearchDTO boardSearchDTO, Pageable pageable) {
    return boardRepository.getSearchBoardPage(boardSearchDTO, pageable);
  }

  public String getUserRole(String userid) {
    return memberRepository.findById(Long.parseLong(userid)).orElseThrow(EntityNotFoundException::new).getRole().toString();
  }


}
