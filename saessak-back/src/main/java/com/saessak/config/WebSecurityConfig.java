package com.saessak.config;


import com.saessak.security.JwtAuthenticationFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests().antMatchers("/",
                        "/game",
                        "/gameResul/**",
                        "/search",
                        "/search/**",
                        "/signup",
                        "/signup/**",
                        "/signup/**/**",
                        "/login",
                        "/login/**",
                        "/Detail/**",
                        "/board/main/**",
                        "/board/ntc/**",
                        "/boardmain/**",
                        "/boardmain",
                        "/images/**",
                        "/main/**",
                        "/product/searchcate",
                        "/product/search",
                        "/product/search/**",
                        "/swagger-resources/**", "/swagger-ui/**",
                        "/swagger/**","/v3/api-docs").permitAll()
                .anyRequest().authenticated();

        http.addFilterAfter(
                jwtAuthenticationFilter, CorsFilter.class
        );
    }
}
