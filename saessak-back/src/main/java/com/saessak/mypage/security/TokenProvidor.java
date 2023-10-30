//package com.saessak.mypage.security;
//
//import com.saessak.entity.Member;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.time.Instant;
//import java.time.temporal.ChronoUnit;
//import java.util.Date;
//
//@Service
//@Slf4j
//public class TokenProvidor {
//
//    private static final String SECRET_KEY = "FlRpX30pMqDbiAkmlfArbrmVkDD4RqISskGZmBFax5oGVxzXXWUzTR5JyskiHMIV9M1Oicegkpi46AdvrcX1E6CmTUBc6IFbTPiD";
//
//    public String create(Member member){
//        // 현재 시간을 기준으로 1일 후의 시간을 계산하여 만료일을 설정합니다.
//        Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));
//
//        // JSON Web Token (JWT)을 생성하기 위해 사용하는 빌더 객체를 생성합니다.
//        return Jwts.builder()
//                // 서명 알고리즘을 HS512로 설정하고, 시크릿 키(SECRET_KEY)를 사용하여 JWT를 서명합니다.
//                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
//                // JWT의 "sub" (subject) 클레임을 사용자 엔티티(UserEntity)의 ID로 설정합니다.
//                .setSubject(member.getUserId())
//                // JWT의 "iss" (issuer) 클레임을 "todo app"으로 설정합니다.
//                .setIssuer("todo app")
//                // JWT의 "iat" (issued at) 클레임을 현재 시간으로 설정합니다.
//                .setIssuedAt(new Date())
//                // JWT의 "exp" (expiration) 클레임을 위에서 계산한 만료일로 설정합니다.
//                .setExpiration(expiryDate)
//                // JWT를 문자열로 변환하고 반환합니다.
//                .compact();
//    }
//
//    public String validateAndGetUserId(String token) {
//        // 주어진 토큰(token)을 파싱하여 해당 토큰에 포함된 클레임(claims)을 추출합니다.
//
//        // JWT 파서 객체를 생성하고, 시크릿 키(SECRET_KEY)를 사용하여 토큰을 검증하고 파싱합니다.
//        Claims claims = Jwts.parser()
//                .setSigningKey(SECRET_KEY)
//                .parseClaimsJws(token)
//                .getBody();
//
//        // 추출한 클레임 중 "sub" (subject) 클레임의 값을 반환합니다.
//        // "sub" 클레임은 주로 토큰의 소유자, 즉 사용자의 고유 식별자를 나타냅니다.
//        return claims.getSubject();
//    }
//
//
//}
