package com.saessak.signup.controller;

import com.saessak.constant.Role;
import com.saessak.entity.Member;
import com.saessak.game.dto.ResponseDTO;
import com.saessak.security.TokenProvider;
import com.saessak.signup.dto.SignUpDTO;
import com.saessak.signup.dto.SmsDTO;
import com.saessak.signup.service.EmailService;
import com.saessak.signup.service.SignUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.message.exception.NurigoException;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/signup")
public class SignUpController {


    private final SignUpService signUpService;
    private final EmailService emailService;
//    private final SmsService smsService;
    private final TokenProvider tokenProvider;


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
    public ResponseEntity<?> emailConfirm(@PathVariable("email") String email) throws Exception {

        boolean emailCheck = signUpService.existsEmail(email);

        String result = emailCheck ? "1" : "-1";
        if(emailCheck){
            ResponseDTO response=ResponseDTO.builder().message(result).build();

         return ResponseEntity.ok().body(response);
        }else {
            String confirm = emailService.sendSimpleMessage(email);

            log.info("인증문자 확인 : " + confirm);

            ResponseDTO response=ResponseDTO.builder().message(confirm).build();
            return ResponseEntity.ok().body(response);
        }
    }

//    // sms 인증
//    @PostMapping("/smsSend/{phoneNum}")
//    public ResponseEntity<?> sendSmsToSignUp(@PathVariable("phoneNum") String phoneNum){
//
//        // 하이픈 검사
//        phoneNum = phoneNum.replaceAll("-", "");
//
//        String verifyKey = smsService.createKey();
//        final String verifyToken = tokenProvider.createSmsToken(verifyKey);
//        Date expireDate = tokenProvider.getExpiration(verifyToken);
//
//        // 문자 발송
//        try {
////            SingleMessageSentResponse smsResponse = smsService.sendOne(phoneNum, verifyKey);
//            smsService.sendOne(phoneNum, verifyKey);
//
//            SmsDTO smsDTO = SmsDTO.builder()
//                    .token(verifyToken)
//                    .expireDate(expireDate)
//                    .build();
//
//            return ResponseEntity.ok(smsDTO);
//        }catch (Exception e){
//            System.out.println(e.getMessage());
//
//            return ResponseEntity.ok(e.getMessage());
//        }
//    }
}
