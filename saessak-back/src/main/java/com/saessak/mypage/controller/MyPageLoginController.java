//package com.saessak.mypage.controller;
//
//import com.saessak.entity.Member;
//import com.saessak.mypage.dto.MyPageMemberDto;
//import com.saessak.mypage.dto.ResponseDto;
////import com.saessak.mypage.security.TokenProvidor;
//import com.saessak.mypage.service.MyPageUserService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//@RequestMapping("/user")
//@Controller
//@RequiredArgsConstructor
//public class MyPageLoginController {
//
//    @Autowired
//    private MyPageUserService memberService; // UserService 인터페이스를 구현한 빈을 주입
//
////    @Autowired
//////    private TokenProvidor tokenProvidor;
//
//    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//    @PostMapping("/signup") // POST 요청이 "/auth/sigup" 경로로 들어올 때 이 메서드가 실행
//    public ResponseEntity<?> registerUser(@RequestBody MyPageMemberDto memberDto) { // HTTP 요청 본문에서 UserDto를 읽고 응답을 ResponseEntity로 반환
//
//        try {
//            // 사용자 정보와 비밀번호가 유효한지 확인
//            if (memberDto == null || memberDto.getPassword() == null) {
//                throw new RuntimeException("사용자 혹은 비밀번호가 없습니다.");
//            }
//
//
//            Member createMember = Member.builder()
//                    .name(memberDto.getName())
//                    .userId(memberDto.getUserId())
//                    .password(passwordEncoder.encode(memberDto.getPassword()))
//                    .phone(memberDto.getPhone())
//                    .address(memberDto.getAddress())
//                    .nickName(memberDto.getNickName())
//                    .email(memberDto.getEmail())
//                    .build();
//
//            // UserService를 사용하여 사용자 등록
//            Member registeredUser = memberService.create(createMember);
//
//            // 응답용 UserDto 객체 생성
//            MyPageMemberDto responseUserDto = MyPageMemberDto.builder()
//                    .id(registeredUser.getId())
//                    .userId(registeredUser.getUserId())
//                    .email(registeredUser.getEmail())
//                    .address(registeredUser.getAddress())
//                    .nickName(registeredUser.getNickName())
//                    .phone(registeredUser.getPhone())
//                    .build();
//
//            // 성공 응답 (HTTP 200 OK) 및 사용자 정보를 반환
//            return ResponseEntity.ok().body(responseUserDto);
//
//        } catch (Exception e) {
//            // 예외가 발생하면 에러 응답을 생성하여 반환
//            ResponseDto responseDto = ResponseDto.builder()
//                    .error(e.getMessage())
//                    .build();
//            return ResponseEntity.badRequest().body(responseDto); // HTTP 400 Bad Request 반환
//        }
//    }
//
//    @PostMapping("/signin") // POST 요청이 "/auth/signin" 경로로 들어올 때 이 메서드가 실행
//    public ResponseEntity<?> athunticate(@RequestBody MyPageMemberDto memberDto) { // HTTP 요청 본문에서 UserDto를 읽고 응답을 ResponseEntity로 반환
//
//        // UserService를 사용하여 사용자 인증을 시도
//        Member user = memberService.getByCredentials(memberDto.getUserId(), memberDto.getPassword(), passwordEncoder);
//
//        if (user != null) {
////            final String token = tokenProvidor.create(user);
//            // 사용자가 인증되면 사용자 정보를 응답용 UserDto 객체로 생성
//            final MyPageMemberDto responseUserDto = MyPageMemberDto.builder()
//                    .userId(user.getUserId())
//                    .id(user.getId())
////                    .token(token)
//                    .build();
//
//            // 성공 응답 (HTTP 200 OK) 및 사용자 정보를 반환
//            return ResponseEntity.ok().body(responseUserDto);
//        } else {
//            // 사용자 인증 실패 시 에러 응답을 생성하여 반환
//            ResponseDto responseDto = ResponseDto.builder()
//                    .error("login error")
//                    .build();
//
//            return ResponseEntity.badRequest().body(responseDto); // HTTP 400 Bad Request 반환
//        }
//    }
//}
//
//
