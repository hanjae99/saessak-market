package com.saessak.imgfile;

import com.saessak.entity.Image;
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
public class ProductImgService {

    @Value("${productImgLocation}")
    private String productImgLocation;

    private final ImageRepository imageRepository;

    private final FileService fileService;

    public void saveProductImg(Image image, MultipartFile productImgFile)throws Exception{
        String oriImgName = productImgFile.getOriginalFilename();
        String imgName = "";
        String imgUrl = "";

        if (oriImgName != null){
            imgName = fileService.uploadFile(productImgLocation, oriImgName, productImgFile.getBytes());
            imgUrl = "/images/product/" + imgName;
        }

        image.setOriName(oriImgName);
        image.setImgName(imgName);
        image.setImgUrl(imgUrl);

        imageRepository.save(image);
    }

    public void updateProductImg(Long imageId, MultipartFile productImgFile) throws Exception{

        if (!productImgFile.isEmpty()){
            Image savedProductImg = imageRepository.findById(imageId)
                    .orElseThrow(EntityNotFoundException::new);
            //기존 이미지 파일 삭제
            if (savedProductImg.getImgName() != null){
                fileService.deleteFile(productImgLocation + "/" + savedProductImg.getImgName());
            }

            String oriImgName = productImgFile.getOriginalFilename();
            String imgName = fileService.uploadFile(productImgLocation, oriImgName, productImgFile.getBytes());
            String imgUrl = "/images/item/" + imgName;
            // find 메소드로 savedProductImg 객체는 이미 영속 상태에 올려져있음
            // 이후 Repository.save 메소드 호출 필요없이 변경감지 기능으로 트랜잭션이 끝날 때 update 쿼리 자동 실행
            savedProductImg.setOriName(oriImgName);
            savedProductImg.setImgName(imgName);
            savedProductImg.setImgUrl(imgUrl);

        }
    }
}
