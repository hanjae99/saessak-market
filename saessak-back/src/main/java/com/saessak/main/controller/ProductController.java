package com.saessak.main.controller;

import com.saessak.dto.ResponseDTO;
import com.saessak.imgfile.FileService;
import com.saessak.main.dto.CategoryDTO;
import com.saessak.main.dto.ProductDTO;
import com.saessak.main.dto.ProductFormDTO;
import com.saessak.main.dto.ProductImageDTO;
import com.saessak.main.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("product")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    @PostMapping({"/search", "/search/{page}"})
    public ResponseEntity<?> selectProduct(@RequestBody ProductDTO productDTO,
                                           @PathVariable("page")Optional<Integer> page){

        Pageable pageable = PageRequest.of(page.isEmpty() || page.get() <= 0  ? 0 : page.get() -1, 3);

        try {
            Page<ProductDTO> result = productService.read(productDTO, pageable);

            return ResponseEntity.ok().body(result);
        }catch (Exception e){
            e.printStackTrace();
            ResponseDTO<ProductDTO> response = ResponseDTO.<ProductDTO>builder()
                    .error("no product")
                    .build();
            return ResponseEntity.ok().body(response);
        }

    }

    @PostMapping("/searchone")
    public ResponseEntity<?> selectOneProduct(@RequestBody ProductFormDTO productFormDTO,
                                              @AuthenticationPrincipal String memberId){
        try {
            List<ProductFormDTO> contentList = new ArrayList<>();
            ProductFormDTO content = productService.readOneProduct(productFormDTO, memberId);

            // 해당 상품을 등록한 유저가 아닐 경우
            if (content == null){
                ResponseDTO<ProductFormDTO> response = ResponseDTO.<ProductFormDTO>builder()
                        .error("no authority")
                        .build();
                return ResponseEntity.ok().body(response);
            }
            contentList.add(content);

            ResponseDTO<ProductFormDTO> response = ResponseDTO.<ProductFormDTO>builder()
                    .data(contentList)
                    .build();
            return ResponseEntity.ok().body(response);
        }catch (EntityNotFoundException e){
            // 존재하지 않는 상품일 경우
            ResponseDTO<ProductFormDTO> response = ResponseDTO.<ProductFormDTO>builder()
                    .error("no product")
                    .build();
            return ResponseEntity.ok().body(response);
        }
    }

    @GetMapping("/searchcate")
    public ResponseEntity<?> selectCate(){
        List<CategoryDTO> categoryDTOList = productService.readCate();

        ResponseDTO<CategoryDTO> response = ResponseDTO.<CategoryDTO>builder()
                .data(categoryDTOList)
                .build();

        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/new")
    public ResponseEntity<?> createProduct(ProductFormDTO productFormDTO,
                                           @RequestPart List<MultipartFile> productImgFileList,
                                           @AuthenticationPrincipal String memberId){

//        log.info("enter controller=============");
//        log.info(productFormDTO.getTitle());
//        for (MultipartFile productImgFile : productImgFileList){
//            log.info("productImgFile: " + productImgFile.getOriginalFilename());
//        }
        try {
            productService.saveProduct(productFormDTO, productImgFileList, memberId);

            List<String> list = new ArrayList<>();
            list.add("success");
            ResponseDTO<String> response = ResponseDTO.<String>builder()
                    .data(list)
                    .build();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            e.printStackTrace();

            List<String> list = new ArrayList<>();
            list.add("fail");
            ResponseDTO<String> response = ResponseDTO.<String>builder()
                    .data(list)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    // 상품 정보 및 기존 이미지 정보 업데이트 수행
    @PostMapping("/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductFormDTO productFormDTO){

        try {
            productService.updateProduct(productFormDTO);

            List<String> list = new ArrayList<>();
            list.add("success");
            ResponseDTO<String> response = ResponseDTO.<String>builder()
                    .data(list)
                    .build();

            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            e.printStackTrace();

            List<String> list = new ArrayList<>();
            list.add("fail");
            ResponseDTO<String> response = ResponseDTO.<String>builder()
                    .data(list)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    // 상품 수정 시 신규 이미지 업로드
    @PostMapping("/upload")
    public ResponseEntity<?> uploadProductImg(@RequestParam("id") Long id,
                                              @RequestPart List<MultipartFile> productImgList){
        try {
            productService.uploadProductImgOnly(id, productImgList);

            List<String> list = new ArrayList<>();
            list.add("imgUpload success");
            ResponseDTO<String> response = ResponseDTO.<String>builder()
                    .data(list)
                    .build();

            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            e.printStackTrace();

            List<String> list = new ArrayList<>();
            list.add("imgUpload fail");
            ResponseDTO<String> response = ResponseDTO.<String>builder()
                    .data(list)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
