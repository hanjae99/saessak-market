package com.saessak.signup.controller;

import com.saessak.constant.Role;
import com.saessak.entity.Member;
import com.saessak.game.dto.ResponseDTO;
import com.saessak.signup.dto.SignUpDTO;
import com.saessak.signup.service.EmailService;
import com.saessak.signup.service.SignUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/signup")
public class SignUpController {


    private final SignUpService signUpService;
    private final EmailService emailService;


    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody SignUpDTO signUpDTO){
        try{
        Member member =Member.builder()
                .userId(signUpDTO.getUserId())
                .nickName(signUpDTO.getNickName())
                .password(passwordEncoder.encode(signUpDTO.getPassword()))
                .name(signUpDTO.getName())
                .email(signUpDTO.getEmail())
                .phone(signUpDTO.getPhone())
                .address(signUpDTO.getAddress())
                .gender(signUpDTO.getGender())
                .role(Role.USER)
                .build();

        Member registerdMember = signUpService.create(member);

        SignUpDTO responseDTO = SignUpDTO.builder()
                .id(registerdMember.getId())
                .userId(registerdMember.getUserId())
                .nickName(registerdMember.getUserId())
                .password(registerdMember.getPassword())
                .name(registerdMember.getName())
                .email(registerdMember.getEmail())
                .phone(registerdMember.getPhone())
                .address(registerdMember.getAddress())
                .gender(registerdMember.getGender())
                .role(registerdMember.getRole())
                .build();

        return ResponseEntity.ok().body(responseDTO);
    }catch (Exception e){
        ResponseDTO responseDTO = ResponseDTO.builder()
                .error(e.getMessage())
                .build();
        return ResponseEntity.badRequest().body(responseDTO);
    }

    }

    //@GetMapping("/{userId}")
    @GetMapping("/userId/{userId}")
    public ResponseEntity<Integer> checkId(@PathVariable("userId") String userId){
        boolean check = signUpService.existsUserIdCheck(userId);

        Integer result = check ? 1 : -1;

        return ResponseEntity.ok().body(result);
    }
    @GetMapping("/nickName/{nickName}")
    public ResponseEntity<Integer> checkNickName(@PathVariable("nickName") String nickName){
        boolean check = signUpService.existsNickName(nickName);

        Integer result = check ? 1 : -1;

        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/emailConfirm/{email}")
    public String emailConfirm(@PathVariable("email") String email) throws Exception {

        String confirm = emailService.sendSimpleMessage(email);

        log.info("인증문자 확인"+confirm);

        return null;
    }
}
