package com.saessak.detail.controller;

import com.saessak.detail.dto.DetailDTO;
import com.saessak.detail.service.DetailService;
import com.saessak.entity.WishList;
import com.saessak.dto.ResponseDTO;
import com.saessak.entity.ChatBox;
import com.saessak.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.Objects;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/detail")
public class DetailController {

    private final DetailService detailService;

    private final MemberRepository memberRepository;


    @GetMapping("/{productId}")
    public ResponseEntity<?> getDetail(@PathVariable("productId") Long productId ,@AuthenticationPrincipal String memberId){
        DetailDTO dto =detailService.get(productId);
        log.info(memberId);


        if(dto != null){
            if( !Objects.equals(memberId, "anonymousUser")) {
                Long loginId = memberRepository.findById(Long.parseLong(memberId)).orElseThrow(EntityNotFoundException::new).getId();

                if (Objects.equals(loginId, dto.getMemberDTO().getMemberId())) {
                    dto.setIsWriter("true");
                }else{
                    dto.setIsWriter("false");
                }
            }
            return ResponseEntity.ok().body(dto);
        }else {
            return ResponseEntity.ok().body(1);
        }
    }

    @PostMapping("/addwish/{productId}")
    public ResponseEntity<?> addWishList(@PathVariable("productId") Long productId, @AuthenticationPrincipal String memberId){

        detailService.addWishList(productId, Long.parseLong(memberId));

        ResponseDTO<String> response = ResponseDTO.<String>builder()
                .error("success")
                .build();
        return ResponseEntity.ok().body(response);


    }

}
