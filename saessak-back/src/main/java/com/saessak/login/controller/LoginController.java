package com.saessak.login.controller;

import com.saessak.dto.ResponseDTO;
import com.saessak.entity.Member;
import com.saessak.login.dto.LoginDTO;
import com.saessak.login.service.LoginService;
import com.saessak.repository.MemberRepository;
import com.saessak.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/login")
public class LoginController {


    private final LoginService loginService;
    private final TokenProvider tokenProvider;

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

    @GetMapping("/auth/kakao")
    public ResponseEntity<?> kakaologin(@RequestParam(value = "code")String code){
        log.info("@@@@@@@@@@@@@@@@@@@@@@@@ :" +code);

        return null;
    }




}
