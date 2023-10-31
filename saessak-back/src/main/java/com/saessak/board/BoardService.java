package com.saessak.board;

import com.saessak.entity.Board;
import com.saessak.entity.Image;
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

  public void saveBoard(Board board) {
    boardRepository.save(board);
  }
}
