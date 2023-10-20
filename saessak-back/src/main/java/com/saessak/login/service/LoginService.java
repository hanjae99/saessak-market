package com.saessak.login.service;

import com.saessak.entity.Member;
import com.saessak.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {

    private final MemberRepository memberRepository;


    public Member getByCredentials(final String username, final String password, final PasswordEncoder encoder){
        final Member oriUser = memberRepository.findByUserId(username);

        if(oriUser != null && encoder.matches(password, oriUser.getPassword())){
            return oriUser;
        }
        return null;
    }
}
