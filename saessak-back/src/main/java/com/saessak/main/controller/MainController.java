package com.saessak.main.controller;

import com.saessak.dto.ResponseDTO;
import com.saessak.main.dto.MainProductFormDTO;
import com.saessak.main.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("main")
@Slf4j
public class MainController {

    private final ProductService productService;

    @GetMapping("/searchrandom")
    public ResponseEntity<?> searchRandom(){
        List<MainProductFormDTO> content = productService.searchRandomProduct();

        try {
            ResponseDTO<MainProductFormDTO> response = ResponseDTO.<MainProductFormDTO>builder()
                    .data(content)
                    .build();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            ResponseDTO<MainProductFormDTO> response = ResponseDTO.<MainProductFormDTO>builder()
                    .error("get random product fail")
                    .build();
            return ResponseEntity.ok().body(response);
        }
    }

    @GetMapping("/searchnewest")
    public ResponseEntity<?> searchNewestProduct(){
        List<MainProductFormDTO> content = productService.searchNewestProduct();

        try {
            ResponseDTO<MainProductFormDTO> response = ResponseDTO.<MainProductFormDTO>builder()
                    .data(content)
                    .build();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            ResponseDTO<MainProductFormDTO> response = ResponseDTO.<MainProductFormDTO>builder()
                    .error("get newest product fail")
                    .build();
            return ResponseEntity.ok().body(response);
        }
    }
}
