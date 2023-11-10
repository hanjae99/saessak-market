package com.saessak.admin;


import com.saessak.constant.Role;
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
import java.util.List;

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

  public List<Product> getProductList(Member member) {
    return productRepository.findBySellMemberId(member.getId());
  }

  public List<Board> getBoardList(Member member) {
    return boardRepository.findByMemberId(member.getId());
  }

  public void saveMember(Member member) {
    memberRepository.save(member);
  }

  public void saveProducts(List<Product> productList) {
    productRepository.saveAll(productList);
  }

  public void saveBoards(List<Board> boardList) {
    boardRepository.saveAll(boardList);
  }

  public void saveBoard(Board board) {
    boardRepository.save(board);
  }

  public void saveProduct(Product product) {
    productRepository.save(product);
  }

  public List<Member> getMemberList() {
    return memberRepository.findByNotAdmin();
  }

  public String getMemberImage(Long id) {
    Image image = imageRepository.findByMemberId(id);
    if (image!=null) {
      return image.getImgUrl();
    } else {
      return null;
    }
  }
}
