package com.saessak.login.controller;

import com.saessak.dto.ResponseDTO;
import com.saessak.entity.Member;
import com.saessak.login.dto.FindByIdDTO;
import com.saessak.login.dto.LoginDTO;
import com.saessak.login.service.LoginService;
import com.saessak.repository.MemberRepository;
import com.saessak.security.TokenProvider;
import com.saessak.signup.service.EmailService;
import com.saessak.signup.service.SignUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/login")
public class LoginController {


    private final LoginService loginService;
    private final TokenProvider tokenProvider;
    private final SignUpService signUpService;
    private final EmailService emailService;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping
    public ResponseEntity<?> authenticate(@RequestBody LoginDTO loginDTO){
        Member user = loginService.getByCredentials(
                loginDTO.getUserId(), loginDTO.getPassword(), passwordEncoder);

        if(user != null){

            final String token = tokenProvider.create(user);
            log.info(token);
            final LoginDTO responseUserDTO = LoginDTO.builder()
                    .userId(user.getUserId())
                    .name(user.getName())
                    .role(user.getRole())
                    .token(token)
                    .expiration(tokenProvider.getExpiration(token))
                    .build();
            return ResponseEntity.ok().body(responseUserDTO);
        }else {
            return ResponseEntity.ok().body(false);
        }

    }

    @GetMapping("/auth/kakao/{code}")
    public ResponseEntity<?> kakaologin(@PathVariable(value = "code")String code) throws Exception{

        LoginDTO responseUserDTO =loginService.kakaoLogin(code);

        return ResponseEntity.ok().body(responseUserDTO);
    }

    @PostMapping("/auth/emailPass")
    public ResponseEntity<?> emailPass(@RequestBody FindByIdDTO findByIdDTO) throws Exception {

        FindByIdDTO findById = loginService.findByIdPass(findByIdDTO.getName(),findByIdDTO.getEmail());
            String result2 = findById==null ? "-1" : "1";

        if(findById != null) {

            boolean emailCheck = signUpService.existsEmail(findById.getEmail());

            String result = emailCheck ? "-1" : "1";
            if (!emailCheck) {
                ResponseDTO response = ResponseDTO.builder().message(result).build();

                return ResponseEntity.ok().body(response);
            } else {
                String confirm = emailService.sendSimpleMessage(findById.getEmail());

                log.info("인증문자 확인 : " + confirm);

                ResponseDTO response = ResponseDTO.builder().message(confirm).build();
                return ResponseEntity.ok().body(response);
            }
        }
        return ResponseEntity.ok().body(result2);
    }

    @PostMapping("/findById")
    public ResponseEntity<?> getId(@RequestBody FindByIdDTO findByIdDTO){
        FindByIdDTO findById = loginService.findByIdPass(findByIdDTO.getName(),findByIdDTO.getEmail());
        return ResponseEntity.ok().body(findById);
    }

    @PostMapping("/auth/emailPwdPass")
    public ResponseEntity<?> emailPwdPass(@RequestBody FindByIdDTO findByIdDTO) throws Exception {

        FindByIdDTO findById = loginService.findByPwd(findByIdDTO.getUserId(),findByIdDTO.getEmail());
        String result2 = findById==null ? "-1" : "1";

        if(findById != null) {

            boolean emailCheck = signUpService.existsEmail(findById.getEmail());

            String result = emailCheck ? "-1" : "1";
            if (!emailCheck) {
                ResponseDTO response = ResponseDTO.builder().message(result).build();

                return ResponseEntity.ok().body(response);
            } else {
                String confirm = emailService.sendSimpleMessage(findById.getEmail());

                log.info("인증문자 확인 : " + confirm);

                ResponseDTO response = ResponseDTO.builder().message(confirm).build();
                return ResponseEntity.ok().body(response);
            }
        }
        return ResponseEntity.ok().body(result2);
    }
    @PutMapping("/findByPwd")
    public ResponseEntity<?> chagePwd(@RequestBody FindByIdDTO findByIdDTO){
        Member member = loginService.changePwd(findByIdDTO.getUserId(),findByIdDTO.getPassword());

        if(member==null){
            ResponseDTO responseDTO =ResponseDTO.builder().message("변경실패").build();
           return ResponseEntity.ok().body(responseDTO);
        }
        ResponseDTO responseDTO =ResponseDTO.builder().message("변경완료").build();
        return ResponseEntity.ok().body(responseDTO);

    }


}
