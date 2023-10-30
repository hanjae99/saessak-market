package com.saessak.mypage.service;

import com.saessak.entity.Member;
import com.saessak.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MyPageUserService {

    private final MemberRepository memberRepository;

    public Member create(final Member member){
        if(member == null || member.getUserId() == null){
            throw new RuntimeException("invalid arguments");
        }

        final String userid = member.getUserId();

        if(memberRepository.existsByUserId(userid)){
            log.warn("이미 등록된 사용자가 있습니다.", userid);
            throw new RuntimeException("invalid arguments");
        }

        return memberRepository.save(member);
    }

    public Member read(String userId) {
        return memberRepository.findByUserId(userId);
    }

//    public Member getByCredentials(final String userId, final String password, final PasswordEncoder encoder){
//
//        final Member oriUser = memberRepository.findByUserId(userId);
//
//        if(oriUser != null && encoder.matches(password, oriUser.getPassword())){
//
//        }
//        return null;
//
//    }

}
