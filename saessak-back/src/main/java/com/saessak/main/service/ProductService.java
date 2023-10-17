package com.saessak.main.service;

import com.saessak.constant.SellStatus;
import com.saessak.entity.Image;
import com.saessak.entity.Product;
import com.saessak.imgfile.ProductImgService;
import com.saessak.main.dto.ProductDTO;
import com.saessak.main.dto.ProductFormDTO;
import com.saessak.main.dto.ProductImageDTO;
import com.saessak.repository.ImageRepository;
import com.saessak.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;
    private final ProductImgService productImgService;

    public Page<ProductDTO> read(ProductDTO productDTO, Pageable pageable){
        return productRepository.getSearchedProductPage(productDTO, pageable);
    }

    public Long saveProduct(ProductFormDTO productFormDTO,
                         List<MultipartFile> productImgFileList)throws Exception{
        //초기 등록 -> 판매중
        productFormDTO.setSellStatus(SellStatus.SELL);

        //상품 등록
        Product product = productFormDTO.createProduct();
        productRepository.save(product);

        //이미지 등록
        for (int i=0; i<productImgFileList.size(); i++){
            // 비어있는 itemImg 필터링
            if (productImgFileList.get(i).isEmpty()){
                continue;
            }
            Image productImg = new Image();
            productImg.setProduct(product);

            productImgService.saveProductImg(productImg, productImgFileList.get(i));
        }

        return product.getId();
    }
}
