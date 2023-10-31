package com.saessak.board;

import com.saessak.entity.*;
import com.saessak.imgfile.FileService;
import com.saessak.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.List;

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
  private final BoardMainRepository boardMainRepository;
  private final BoardNtcRepository boardNtcRepository;
  private final BoardVocRepository boardVocRepository;
  private final CommentRepository commentRepository;

  public Page<BoardDTO> read(BoardSearchDTO boardSearchDTO, Pageable pageable) {
    return boardRepository.getSearchBoardPage(boardSearchDTO, pageable);
  }

  public String getUserRole(String userid) {
    return memberRepository.findById(Long.parseLong(userid)).orElseThrow(EntityNotFoundException::new).getRole().toString();
  }

  public void saveImg(Image image, MultipartFile productImgFile)throws Exception{
    String oriImgName = productImgFile.getOriginalFilename().split("\\?")[1];
    String imgName = "";
    String imgUrl = "";

    if (oriImgName != null){
      imgName = fileService.uploadFile(imgLocation + "/images/board", oriImgName, productImgFile.getBytes());
      imgUrl = "/images/board/" + imgName;
    }

    image.setOriName(oriImgName);
    image.setImgName(imgName);
    image.setImgUrl(imgUrl);

    imageRepository.save(image);
  }


  public Board getBoard(String boardId) {
    return boardRepository.findById(Long.parseLong(boardId)).orElseThrow(EntityNotFoundException::new);
  }

  public List<Image> getBoardImageList(String boardId) {
    return imageRepository.findByBoardId(Long.parseLong(boardId));
  }

  public void deleteImage(Long id) {
    imageRepository.deleteById(id);
  }

  public Board saveBoard(Board board) {
    return boardRepository.save(board);
  }

  public Long getMainNumber(Long id) {
    return boardMainRepository.findByBoardId(id).getId();
  }

  public Long getNtcNumber(Long id) {
    return boardNtcRepository.findByBoardId(id).getId();
  }

  public Long getVocNumber(Long id) {
    return boardVocRepository.findByBoardId(id).getId();
  }

  public void saveBoardMain(BoardMain boardMain) {
    boardMainRepository.save(boardMain);
  }

  public void saveBoardNtc(BoardNtc boardNtc) {
    boardNtcRepository.save(boardNtc);
  }

  public void saveBoardVoc(BoardVoc boardVoc) {
    boardVocRepository.save(boardVoc);
  }

  public void saveComment(Comment comment) {
    commentRepository.save(comment);
  }

  public Member getMember(String userId) {
    return memberRepository.findById(Long.parseLong(userId)).orElseThrow(EntityNotFoundException::new);
  }
  public Member getMember(Long userId) {
    return memberRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
  }

  public List<Comment> getComments(String boardId) {
    return commentRepository.findByBoardId(Long.parseLong(boardId));
  }

  public String getMemberProfileImgUrl(Long id) {
    Image image = imageRepository.findByMemberId(id);
    String result = "";
    if (image != null) {
      result = image.getImgUrl();
    }
    return result;
  }

  public Comment getComment(Long id) {
    return commentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }


}
