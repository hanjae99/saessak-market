//package com.saessak.mypage.security;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.util.StringUtils;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Slf4j
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    @Autowired
//    private TokenProvidor tokenProvidor;
//
//    // 모든 HTTP 요청에 대해 실행되는 필터를 구현한 클래스입니다.
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//
//        try {
//            // HTTP 요청에서 Bearer 토큰을 추출합니다.
//            String token = parseBearerToken(request);
//            log.info("Filter is running");
//            // 토큰이 null이 아니고 "null"이 아닐 경우
//            if (token != null && !token.equalsIgnoreCase("null")){
//                // 토큰에서 추출한 사용자 ID를 사용하여 유효성을 검사하고 가져옵니다.
//                String userId = tokenProvidor.validateAndGetUserId(token);
//                log.info("userId : " + userId);
//
//                // 추출한 사용자 ID를 사용하여 인증 토큰을 생성합니다.
//                AbstractAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
//                        userId,
//                        null,
//                        AuthorityUtils.NO_AUTHORITIES
//                );
//                // 인증 세부 정보를 설정합니다.
//                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                // 보안 컨텍스트를 생성하고 인증을 설정합니다.
//                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
//                securityContext.setAuthentication(auth);
//                SecurityContextHolder.setContext(securityContext);
//            }
//        } catch (Exception e){
//            logger.error("사용자 인증 컨텍스트 생성 에러", e);
//        }
//
//        // 필터 체인의 다음 필터로 이동합니다.
//        filterChain.doFilter(request, response);
//    }
//
//    // Authorization 헤더에서 Bearer 토큰을 추출하는 메서드입니다.
//    private String parseBearerToken(HttpServletRequest request) {
//
//        String bearerToken = request.getHeader("Authorization");
//
//        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")){
//            // "Bearer " 접두사를 제거하고 토큰을 반환합니다.
//            return bearerToken.substring(7);
//        }
//        // 토큰이 존재하지 않으면 null을 반환합니다.
//        return null;
//    }
//}
