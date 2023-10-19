package com.saessak.signup.service;

import com.saessak.entity.Member;
import com.saessak.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class SignUpService {

    private final MemberRepository memberRepository;

    public Member create(final Member member){
        if(member == null || member.getUserId() ==null){
            throw new RuntimeException("invalid arguments");
        }

        final String userId = member.getUserId();
        if(memberRepository.existsByUserId(userId)){
            log.warn("이미 등록된 사용자가 있습니다.",userId);
            throw new RuntimeException("이미 등록된 사용자가 있습니다.");
        }
        return memberRepository.save(member);
    }

    public Member getByCredentials(final String username, final String password, final PasswordEncoder encoder){
        final Member oriUser = memberRepository.findByUserId(username);

        if(oriUser != null && encoder.matches(password, oriUser.getPassword())){
            return oriUser;
        }
        return null;
    }

    public boolean existsUserIdCheck(String userId){
        return memberRepository.existsByUserId(userId);
    }
    public boolean existsNickName(String nickName){
        return memberRepository.existsByNickName(nickName);
    }
}
