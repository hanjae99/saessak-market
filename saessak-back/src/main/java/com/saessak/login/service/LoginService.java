package com.saessak.login.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.saessak.constant.Role;
import com.saessak.entity.Member;
import com.saessak.login.dto.KakaoDTO;
import com.saessak.login.dto.LoginDTO;
import com.saessak.repository.MemberRepository;
import com.saessak.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    private final PasswordEncoder passwordEncoder  = new BCryptPasswordEncoder();


    public Member getByCredentials(final String username, final String password, final PasswordEncoder encoder){
        final Member oriUser = memberRepository.findByUserId(username);

        if(oriUser != null && encoder.matches(password, oriUser.getPassword())){
            return oriUser;
        }
        return null;
    }

    public LoginDTO kakaoLogin(String code) throws JsonProcessingException {

        String accessToken = getAccessToken(code);

        Member kakaoUser = registerKakaoUserIfNeeded(accessToken);

        final String token = tokenProvider.create(kakaoUser);

        return LoginDTO.builder()
                .userId(kakaoUser.getUserId())
                .name(kakaoUser.getName())
                .role(kakaoUser.getRole())
                .token(token)
                .build();
    }

    private String getAccessToken(String code) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", 	"389cc5908fcd860e0a4e79072e5aafa6");
        body.add("redirect_uri", "http://localhost:3000/login/auth/kakao");
        body.add("code", code);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        return jsonNode.get("access_token").asText();
    }


    // 젤 처음 로그인 시, 회원 가입 안되어 있으면 회원 가입 시켜주기
    private Member registerKakaoUserIfNeeded(String accessToken) throws JsonProcessingException {
        JsonNode jsonNode = getKakaoUserInfo(accessToken);

        // DB 에 중복된 Kakao Id 가 있는지 확인
        String kakaoId = String.valueOf(jsonNode.get("id").asLong());
        Member kakaoUser = memberRepository.findByEmail(kakaoId);

        // 회원가입
        if (kakaoUser == null) {
            String kakaoNick = jsonNode.get("properties").get("nickname").asText();
//            String kakaoName = jsonNode.get("properties").get("name").asText();
//            String kakaoaddress = jsonNode.get("properties").get("address").asText();
 //           String kakaoaPhone = jsonNode.get("properties").get("phone").asText();

            // password: random UUID
            String password = UUID.randomUUID().toString();
            String encodedPassword = passwordEncoder.encode(password);

            kakaoUser = Member.builder()
                    .userId(kakaoId)
                    .email(kakaoId)
                    .name(kakaoNick)
                    .nickName(kakaoNick+1)
                    .password(encodedPassword)
                //    .phone(kakaoaPhone)
                   // .address(kakaoaddress)
                    .role(Role.USER)
                    .build();
            memberRepository.save(kakaoUser);
        }

        return kakaoUser;
    }

    // 카카오에서 동의 항목 가져오기
    private JsonNode getKakaoUserInfo(String accessToken) throws JsonProcessingException {
        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readTree(responseBody);
    }

}
