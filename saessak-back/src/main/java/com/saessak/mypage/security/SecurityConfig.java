//package com.saessak.mypage.security;
//
//import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig{
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        // 1. formLogin() 메서드를 사용하여 폼 기반 로그인을 설정합니다.
//        http.formLogin()
//                .loginPage("/members/login") // 로그인 페이지의 URL을 설정합니다.
//                .defaultSuccessUrl("/") // 로그인 성공 시 이동할 기본 URL을 설정합니다.
//                .usernameParameter("userId") // 사용자 이름(여기서는 이메일)의 파라미터 이름을 설정합니다.
//                .failureUrl("/members/login/error") // 로그인 실패 시 이동할 URL을 설정합니다.
//                .and() // and()를 사용하여 다음 구성 항목으로 이동합니다.
//
//                // 2. logout() 메서드를 사용하여 로그아웃 설정을 구성합니다.
//                .logout()
//                .logoutRequestMatcher(new AntPathRequestMatcher("/members/logout")) // 로그아웃 요청을 일치시키는 URL을 설정합니다.
//                .logoutSuccessUrl("/"); // 로그아웃 성공 시 이동할 URL을 설정합니다.
//
//        // Spring Security의 보안 설정을 정의하기 위해 http 객체를 사용합니다.
//        http.authorizeRequests()
//                // '/'와 '/members/**', '/item/**', '/images/**' 경로에 대한 요청은 모두 인증 없이 허용합니다.
//                .mvcMatchers("/","/user/**", "/members/**", "/item/**", "/images/**").permitAll()
//                // '/admin/**' 경로에 대한 요청은 'ADMIN' 역할(role)을 가진 사용자만 허용합니다.
//                .mvcMatchers("/admin/**").hasRole("ADMIN")
//                // 그 외의 모든 요청은 인증(authenticated)이 필요합니다.
//                .anyRequest().authenticated();
//
//// 인증 실패 시 처리를 위한 커스텀 인증 진입점을 설정합니다.
////        http.exceptionHandling()
////                .authenticationEntryPoint(new CustomAuthenticationEntryPoint());
//
//        // 3. 보안 필터 체인을 구성한 후 이를 반환합니다.
//        return http.build();
//    }
//
//
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//
//        //BCryptPasswordEncoder를 사용해서 비밀번호를 암호화
//    }
//
//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer(){
//        return (web) -> web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
//        //css같은것은 보안이 필요없기에 보안 페이지를 걸러서 출력함
//    }
//
//
//}
//
