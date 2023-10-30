package com.saessak.security;

import com.saessak.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
@Slf4j
public class TokenProvider {

    private static final String SECRET_KEY = "FlRpX30pMqDbiAkmlfArbrmVkDD4RqISskGZmBFax5oGVxzXXWUzTR5JyskiHMIV9M1Oicegkpi46AdvrcX1E6CmTUBc6IFbTPiD";

    public String create(Member member){
        Date expireDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));
//        Date expireDate = Date.from(Instant.now().plus(5, ChronoUnit.MINUTES));

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setSubject(String.valueOf(member.getId()))
                .setIssuer("saessak")
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .compact();
    }

    public String createSmsToken(String verifyKey){

        // 문자 인증 토큰 만료시간
        Date expireDate = Date.from(Instant.now().plus(5, ChronoUnit.MINUTES));

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setSubject(verifyKey)
                .setIssuer("saessak-sms")
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .compact();
    }

    public String validateAndGetUserId(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public Date getExpiration(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        return claims.getExpiration();
    }

    public boolean validateSmsToken(String token, String verifyCode){
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        // 사용자가 입력한 인증코드값과
        // 인증 문자로 발송된 인증코드값이 일치
        if (claims.getSubject().equals(verifyCode)){
            return true;
        }

        return false;
    }
}
