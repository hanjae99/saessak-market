package com.saessak.mypage.service;

import com.saessak.entity.Image;
import com.saessak.imgfile.FileService;
import com.saessak.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberImgService {

    private final ImageRepository imageRepository;

    private final FileService fileService;

    @Value("${imgLocation}")
    private String imgLocation;
    // 이미지 저장할 로컬 드라이브 내 최상 폴더 입력
    // ex C://saessak-image

    public void saveMemberImg(Image image, MultipartFile memberImgFile) throws Exception {
            String oriImgName = memberImgFile.getOriginalFilename();
            String imgName = "";
            String imgUrl = "";

            if (oriImgName != null){
                imgName = fileService.uploadFile(imgLocation + "/images/memberImgs", oriImgName, memberImgFile.getBytes());
                imgUrl = "/images/memberImgs/" + imgName;
            }

            image.setOriName(oriImgName);
            image.setImgName(imgName);
            image.setImgUrl(imgUrl);

            imageRepository.save(image);
    }

    public void updateMemberImg(Long imageId, MultipartFile memberImgFile) throws Exception {

            Image savedMemberImg = imageRepository.findById(imageId)
                .orElseThrow(EntityNotFoundException::new);
            // 이미지 바뀌어도 원래 이름은 그대로
            String oriImgName = memberImgFile.getOriginalFilename();
            String imgName = fileService.uploadFile(imgLocation + "/images/memberImgs", oriImgName, memberImgFile.getBytes());
            String imgUrl = "/images/memberImgs/" + imgName;
            // find 메소드로 savedProductImg 객체는 이미 영속 상태에 올려져있음
            // 이후 Repository.save 메소드 호출 필요없이 변경감지 기능으로 트랜잭션이 끝날 때 update 쿼리 자동 실행
        savedMemberImg.setOriName(oriImgName);
        savedMemberImg.setImgName(imgName);
        savedMemberImg.setImgUrl(imgUrl);

        }



    public void deleteMemberImg(Long imageId, String imgName) throws Exception {
//        imageRepository.deleteById(imageId);
        fileService.deleteFile(imgLocation + "/images/memberImgs/" + imgName);
    }

}
