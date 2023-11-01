package com.saessak.mypage.controller;

import com.saessak.entity.Member;
import com.saessak.mypage.dto.MemberImageDTO;
import com.saessak.mypage.dto.MyPageMemberDTO;
//import com.saessak.mypage.security.TokenProvidor;
import com.saessak.mypage.dto.ResponseDTO;
import com.saessak.mypage.service.MyPageMemberService;
import com.saessak.repository.ImageRepository;
import com.saessak.repository.MemberRepository;
import com.saessak.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
@Slf4j
public class MyPageController {

    private final MemberRepository memberRepository;

    private final MyPageMemberService memberService;

    private final TokenProvider tokenProvider;

    private final ImageRepository imageRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @GetMapping("/mypage")
    public ResponseEntity<?> newMember(@AuthenticationPrincipal String userId){
        log.info(userId);

        Member user = memberService.read(userId);


        MyPageMemberDTO saveDto = new MyPageMemberDTO();
        saveDto.setId(user.getId());
        saveDto.setUserId(user.getUserId());
        saveDto.setEmail(user.getEmail());
        saveDto.setPhone(user.getPhone());
        saveDto.setNickName(user.getNickName());
        saveDto.setPassword(passwordEncoder.encode(user.getPassword()));
        saveDto.setName(user.getName());
        saveDto.setAddress(user.getAddress());
        saveDto.setRole(user.getRole());
        saveDto.setUserImgUrl(memberService.getMemberImg(userId));

        List<MyPageMemberDTO> list = new ArrayList<>();
        list.add(saveDto);

        ResponseDTO<MyPageMemberDTO> response = ResponseDTO.<MyPageMemberDTO>builder()
                .data(list)
                .build();

        return ResponseEntity.ok().body(response);



    }

    // 기존 Todo를 업데이트하는 API 엔드포인트
    @PutMapping("/changing")
    public ResponseEntity<?> updateMember(@RequestBody MyPageMemberDTO dto, @AuthenticationPrincipal String userId) {
//        Member user = memberService.getByCredentials(dto.getUserId(), dto.getPassword(), passwordEncoder);
//        user.setPassword(passwordEncoder.encode(dto.getPassword()));
//        log.info(user.getPassword());
//        log.info(dto.getPassword());

        Member updateMem = memberService.update(dto, userId);

        // 변환된 TodoDto 리스트를 사용하여 ResponseDto를 초기화
        ResponseDTO<String> response = ResponseDTO.<String>builder().error("no error").build();
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/changingpass")
    public ResponseEntity<?> updatePass(@RequestBody MyPageMemberDTO myPageMemberDTO, @AuthenticationPrincipal String userId){

        Member user = memberService.updatePass(myPageMemberDTO, userId);

        if (user.getPassword() == null) {
            ResponseDTO<String> response = ResponseDTO.<String>builder().error("nullpass").build();
            return ResponseEntity.ok().body(response);
        }
        ResponseDTO<String> response = ResponseDTO.<String>builder().error("true").build();
        return ResponseEntity.ok().body(response);


//        Member user = memberService.updatePass(myPageMemberDTO, userId);
//
//        myPageMemberDTO.setPassword(user.getPassword());
//
//        List<MyPageMemberDTO> updateList = new ArrayList<>();
//        updateList.add(myPageMemberDTO);
//
//        // 변환된 TodoDto 리스트를 사용하여 ResponseDto를 초기화
//        ResponseDTO<MyPageMemberDTO> response = ResponseDTO.<MyPageMemberDTO>builder().data(updateList).build();
//        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/changing/{newNickName}")
    public ResponseEntity<Integer> checkNickName(@PathVariable("newNickName") String nickName,
                                                 @AuthenticationPrincipal String userId
                                                 ){

        boolean check = memberService.existsNickNameCheck(nickName, userId);

        Integer response = check ? 1 : -1;

        log.info("이건 숫자몇이야 =======> ", response);

        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/changingpwd")
    public ResponseEntity<?> checkMember(@RequestBody MyPageMemberDTO dto, @AuthenticationPrincipal String userId){
        Member user = memberService.read(userId);
        log.info(dto.getPassword());

        if (user.getPassword() != null && passwordEncoder.matches(dto.getPassword(), user.getPassword())){
            ResponseDTO<String> response = ResponseDTO.<String>builder().error("true").build();
            return ResponseEntity.ok().body(response);
        }
        ResponseDTO<String> response = ResponseDTO.<String>builder().error("false").build();
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/mypage/imgupdate")
    public ResponseEntity<?> imgUpdate(@AuthenticationPrincipal String userId, MemberImageDTO memberImageDTO,
                                        MultipartFile memberImg) throws Exception {

        log.info(memberImageDTO.getImgName());
        log.info("===========" + userId);

        List<MemberImageDTO> img = memberService.imgUpdate(Long.parseLong(userId), memberImageDTO, memberImg);

        ResponseDTO<MemberImageDTO> response = ResponseDTO.<MemberImageDTO>builder().data(img).build();
        return ResponseEntity.ok().body(response);


    }










}
