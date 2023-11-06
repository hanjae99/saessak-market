package com.saessak.wishlist.controller;

import com.saessak.mypage.dto.ResponseDTO;
import com.saessak.entity.WishList;
import com.saessak.repository.WishListRepository;
import com.saessak.wishlist.dto.WishListDTO;
import com.saessak.wishlist.service.WishListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
@Slf4j
public class WishListController {

    private final WishListService wishListService;

    @GetMapping("/wishlist")
    public ResponseEntity<?> readWishList(@AuthenticationPrincipal String userId){

        List<WishListDTO> readWish = wishListService.read(Long.parseLong(userId));

        ResponseDTO<WishListDTO> response = ResponseDTO.<WishListDTO>builder()
                .data(readWish)
                .build();

        return ResponseEntity.ok().body(response);

    }

    @GetMapping("/sellcheck")
    public ResponseEntity<?> readSellCheck(@AuthenticationPrincipal String userId){

        List<WishListDTO> readWish = wishListService.sellread(Long.parseLong(userId));

        ResponseDTO<WishListDTO> response = ResponseDTO.<WishListDTO>builder()
                .data(readWish)
                .build();

        return ResponseEntity.ok().body(response);

    }

    @GetMapping("/check")
    public ResponseEntity<?> readBuyCheck(@AuthenticationPrincipal String userId){

        List<WishListDTO> readWish = wishListService.buyread(Long.parseLong(userId));

        if (readWish.isEmpty()){
            ResponseDTO<String> response = ResponseDTO.<String>builder()
                    .error("null")
                    .build();
            return ResponseEntity.ok().body(response);
        }
        ResponseDTO<WishListDTO> response = ResponseDTO.<WishListDTO>builder()
                .data(readWish)
                .build();

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/wishlist/{wishListId}")
    public ResponseEntity<?> deleteWishList(@PathVariable("wishListId") Long wishListId){
        try {
            wishListService.delete(wishListId);
            ResponseDTO<String> response = ResponseDTO.<String>builder().error("success").build();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            ResponseDTO<String> response = ResponseDTO.<String>builder().error("fail").build();
            return ResponseEntity.ok().body(response);
        }

    }

    @DeleteMapping("/check/{buyListId}")
    public ResponseEntity<?> deleteBuyCheck(@PathVariable("buyListId") Long buyListId){
        try {
            wishListService.buyDelete(buyListId);
            ResponseDTO<String> response = ResponseDTO.<String>builder().error("success").build();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            ResponseDTO<String> response = ResponseDTO.<String>builder().error("fail").build();
            return ResponseEntity.ok().body(response);
        }
    }

    @PutMapping("/sellcheck/{productId}")
    public ResponseEntity<?> updateSellCheck(@PathVariable("productId") Long productId){

        try {
            wishListService.sellUpdate(productId);
            ResponseDTO<String> response = ResponseDTO.<String>builder().error("success").build();
            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            ResponseDTO<String> response = ResponseDTO.<String>builder().error("fail").build();
            return ResponseEntity.ok().body(response);
        }
    }




}

