package com.saessak.admin;


import com.saessak.entity.Board;
import com.saessak.entity.Image;
import com.saessak.entity.Member;
import com.saessak.entity.Product;
import com.saessak.repository.BoardRepository;
import com.saessak.repository.ImageRepository;
import com.saessak.repository.MemberRepository;
import com.saessak.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {

  private final ImageRepository imageRepository;
  private final MemberRepository memberRepository;
  private final BoardRepository boardRepository;
  private final ProductRepository productRepository;

  public Page<AdminImageDTO> getImageList(Pageable pageable) {

    return imageRepository.getAdminImagePage(pageable);

  }

  public Member getMember(String userId) {
    return memberRepository.findById(Long.parseLong(userId)).orElseThrow(EntityNotFoundException::new);
  }

  public Member getMember(Long memberId) {
    return memberRepository.findById(memberId).orElseThrow(EntityNotFoundException::new);
  }

  public Board getBoard(Long boardId) {
    return boardRepository.findById(boardId).orElseThrow(EntityNotFoundException::new);
  }


  public Product getProduct(Long productId) {
    return productRepository.findById(productId).orElseThrow(EntityNotFoundException::new);
  }

  public Image getImage(Long id) {
    return imageRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  public void saveImage(Image image) {
    imageRepository.save(image);
  }

  public String getNickNameFromProduct(Long productId) {
    return getProduct(productId).getSellMember().getNickName();
  }

  public String getNickNameFromBoard(Long boardId) {
    return getBoard(boardId).getMember().getNickName();
  }
}
