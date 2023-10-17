package com.saessak.main.controller;

import com.saessak.dto.ResponseDTO;
import com.saessak.main.dto.ProductDTO;
import com.saessak.main.dto.ProductFormDTO;
import com.saessak.main.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("product")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    @GetMapping({"/", "/{page}"})
    public ResponseEntity<?> selectProduct(@RequestBody ProductDTO productDTO,
                                           @PathVariable("page")Optional<Integer> page){

        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 30);

        Page<ProductDTO> result = productService.read(productDTO, pageable);

        try {
            ResponseDTO<ProductDTO> response = ResponseDTO.<ProductDTO>builder()
                    .data(result.getContent())
                    .build();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            String errorMsg = e.getMessage();

            ResponseDTO<ProductDTO> response = ResponseDTO.<ProductDTO>builder()
                    .error(errorMsg)
                    .build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/new")
    public ResponseEntity<?> createProduct(ProductFormDTO productFormDTO,
                                           @RequestPart List<MultipartFile> productImgFileList){

//        log.info("enter controller=============");
//        log.info(productFormDTO.getTitle());
//        for (MultipartFile productImgFile : productImgFileList){
//            log.info("productImgFile: " + productImgFile.getOriginalFilename());
//        }

        try {
            productService.saveProduct(productFormDTO, productImgFileList);
            return ResponseEntity.ok().body("success");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body("fail");
        }
    }

}
