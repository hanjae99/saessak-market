package com.saessak.mypage.controller;

// 필요한 패키지를 가져옵니다.
import com.saessak.entity.Member;
import com.saessak.mypage.dto.MemberImageDTO;
import com.saessak.mypage.dto.MyPageMemberDTO;
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

// "/user" 엔드포인트에 매핑되는 RestController를 선언합니다.
@RequestMapping("/user")
@RestController
@RequiredArgsConstructor
@Slf4j
public class MyPageController {

    // MemberRepository를 주입하여 회원 데이터에 대한 CRUD 작업을 수행합니다.
    private final MemberRepository memberRepository;

    // MyPageMemberService를 주입하여 마이페이지 서비스 기능을 수행합니다.
    private final MyPageMemberService memberService;

    // TokenProvider를 주입하여 토큰 관련 기능을 수행합니다.
    private final TokenProvider tokenProvider;

    // ImageRepository를 주입하여 이미지 데이터에 대한 CRUD 작업을 수행합니다.
    private final ImageRepository imageRepository;

    // PasswordEncoder를 선언하여 패스워드 인코딩 기능을 수행합니다.
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // "/mypage" 엔드포인트에 대한 GET 요청을 처리하는 메서드입니다.
    @GetMapping("/mypage")
    public ResponseEntity<?> newMember(@AuthenticationPrincipal String userId){
        // 사용자 정보와 이미지를 읽어옵니다.
        Member user = memberService.read(userId);
        String img = memberService.getMemberImg(userId);

        // MyPageMemberDTO를 생성하여 사용자 정보를 설정합니다.
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

        // 이미지가 존재할 경우 DTO에 이미지 URL을 추가합니다.
        if (img != null){
            saveDto.setUserImgUrl(img);
        }

        // DTO 리스트를 초기화하여 응답합니다.
        List<MyPageMemberDTO> list = new ArrayList<>();
        list.add(saveDto);

        // 응답 데이터를 ResponseDTO로 래핑하여 반환합니다.
        ResponseDTO<MyPageMemberDTO> response = ResponseDTO.<MyPageMemberDTO>builder()
                .data(list)
                .build();

        return ResponseEntity.ok().body(response);
    }

    // "/delete" 엔드포인트에 대한 PUT 요청을 처리하는 메서드입니다.
    @PutMapping("/delete")
    public ResponseEntity<?> deleteMember(@AuthenticationPrincipal String memberId){
        // 회원을 삭제하고 응답합니다.
        memberService.deleteUpdateMember(Long.parseLong(memberId));

        // 응답 데이터를 ResponseDTO로 래핑하여 반환합니다.
        ResponseDTO<String> response = ResponseDTO.<String>builder()
                .error("삭제완료")
                .build();

        return ResponseEntity.ok().body(response);
    }

    // "/changing" 엔드포인트에 대한 PUT 요청을 처리하는 메서드입니다.
    @PutMapping("/changing")
    public ResponseEntity<?> updateMember(@RequestBody MyPageMemberDTO dto, @AuthenticationPrincipal String userId) {
        // 회원 정보를 업데이트하고 응답합니다.
        Member updateMem = memberService.update(dto, userId);

        // 응답 데이터를 ResponseDTO로 래핑하여 반환합니다.
        ResponseDTO<String> response = ResponseDTO.<String>builder().error("no error").build();
        return ResponseEntity.ok().body(response);
    }

    // "/changingpass" 엔드포인트에 대한 PUT 요청을 처리하는 메서드입니다.
    @PutMapping("/changingpass")
    public ResponseEntity<?> updatePass(@RequestBody MyPageMemberDTO myPageMemberDTO, @AuthenticationPrincipal String userId){
        // 회원 비밀번호를 업데이트하고 응답합니다.
        Member user = memberService.updatePass(myPageMemberDTO, userId);

        // 비밀번호가 null인 경우와 아닌 경우에 따라 응답합니다.
        if (user.getPassword() == null) {
            ResponseDTO<String> response = ResponseDTO.<String>builder().error("nullpass").build();
            return ResponseEntity.ok().body(response);
        }
        ResponseDTO<String> response = ResponseDTO.<String>builder().error("true").build();
        return ResponseEntity.ok().body(response);
    }

    // "/changing/{newNickName}" 엔드포인트에 대한 GET 요청을 처리하는 메서드입니다.
    @GetMapping("/changing/{newNickName}")
    public ResponseEntity<Integer> checkNickName(@PathVariable("newNickName") String nickName,
                                                 @AuthenticationPrincipal String userId
    ){
        // 닉네임이 존재하는지 확인하고 응답합니다.
        boolean check = memberService.existsNickNameCheck(nickName, userId);

        // 결과에 따라 응답합니다.
        Integer response = check ? 1 : -1;


        return ResponseEntity.ok().body(response);
    }

    // "/changingpwd" 엔드포인트에 대한 POST 요청을 처리하는 메서드입니다.
    @PostMapping("/changingpwd")
    public ResponseEntity<?> checkMember(@RequestBody MyPageMemberDTO dto, @AuthenticationPrincipal String userId){
        // 회원의 비밀번호를 확인하고 응답합니다.
        Member user = memberService.read(userId);
        log.info(dto.getPassword());

        // 비밀번호가 일치하는지에 따라 응답합니다.
        if (user.getPassword() != null && passwordEncoder.matches(dto.getPassword(), user.getPassword())){
            ResponseDTO<String> response = ResponseDTO.<String>builder().error("true").build();
            return ResponseEntity.ok().body(response);
        }
        ResponseDTO<String> response = ResponseDTO.<String>builder().error("false").build();
        return ResponseEntity.ok().body(response);
    }

    // "/mypage/imgupdate" 엔드포인트에 대한 PUT 요청을 처리하는 메서드입니다.
    @PutMapping("/mypage/imgupdate")
    public ResponseEntity<?> imgUpdate(@AuthenticationPrincipal String userId, MemberImageDTO memberImageDTO,
                                       MultipartFile memberImg) throws Exception {
        // 회원 이미지를 업데이트하고 응답합니다.
        List<MemberImageDTO> img = memberService.imgUpdate(Long.parseLong(userId), memberImageDTO, memberImg);

        // 응답 데이터를 ResponseDTO로 래핑하여 반환합니다.
        ResponseDTO<MemberImageDTO> response = ResponseDTO.<MemberImageDTO>builder().data(img).build();
        return ResponseEntity.ok().body(response);
    }
}
