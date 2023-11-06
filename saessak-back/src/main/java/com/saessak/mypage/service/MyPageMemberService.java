package com.saessak.mypage.service;

import com.saessak.entity.Image;
import com.saessak.entity.Member;
import com.saessak.main.dto.ProductFormDTO;
import com.saessak.mypage.dto.MemberImageDTO;
import com.saessak.mypage.dto.MyPageMemberDTO;
import com.saessak.repository.ImageRepository;
import com.saessak.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MyPageMemberService {

    private final MemberRepository memberRepository;

    private final ImageRepository imageRepository;

    private final MemberImgService memberImgService;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 테스트를 위한 메서드
    public String createDate() {
        // 새로운 To-Do 항목을 생성하고 저장합니다.
        Member todo = Member.builder()
                .name("김진")
                .userId("rlawls2006")
                .password("1234")
                .address("강북구")
                .phone("01050618328")
                .email("rlawls2006@naver.com")
                .build();

        memberRepository.save(todo);

        // 저장된 To-Do 항목을 검색하고 그 제목을 반환합니다.
        Member savedEntity = memberRepository.findById(todo.getId()).get();
        return savedEntity.getName();
    }

    // To-Do 항목을 유효성 검사하는 메서드
    private void validate(final Member entity) {
        if (entity == null) {
            log.warn("Entity is null");
            throw new RuntimeException("Entity is null");
        }

        if (entity.getUserId() == null) {
            log.warn("Unknown user.");
            throw new RuntimeException("Unknown user.");
        }
    }

    // 사용자 ID에 따라 To-Do 항목을 읽는 메서드
    public Member read(String userId) {
        return memberRepository.findById(Long.parseLong(userId)).orElseThrow(EntityNotFoundException::new);
    }



        public Member update(MyPageMemberDTO myPageMemberDTO, String userId) {

            Member user = memberRepository.findById(Long.parseLong(userId)).orElseThrow(EntityNotFoundException::new);

            if(myPageMemberDTO.getNickName().isEmpty()){
                user.getNickName();
            }else {
                user.setNickName(myPageMemberDTO.getNickName());
            }
            if(myPageMemberDTO.getAddress().isEmpty()){
                user.getAddress();
            }else {
                user.setAddress(myPageMemberDTO.getAddress());
            }

            return user;
        }

        public boolean existsNickNameCheck(String nickName, String userId){
           return memberRepository.existsByNickName(nickName);
        }

        public Member updatePass(MyPageMemberDTO myPageMemberDTO, String userId){
        Member user = memberRepository.findById(Long.parseLong(userId)).orElseThrow(EntityNotFoundException::new);

            if(myPageMemberDTO.getPassword().isEmpty()){
                user.getPassword();
            }else {
                user.setPassword(passwordEncoder.encode(myPageMemberDTO.getPassword()));;
            }

        return user;
        }

    public Member getByCredentials(final String userId, final String password, final PasswordEncoder encoder) {

        log.info(userId);

        final Member oriUser = memberRepository.findById(Long.parseLong(userId)).orElseThrow(ExceptionInInitializerError::new);

        if (oriUser != null && encoder.matches(password, oriUser.getPassword())) {

            return oriUser; // 또는 다른 필요한 정보를 반환
        }

        return null;
    }
    public boolean booleanMember(final String userId, final String password, final PasswordEncoder encoder) {

        final Member oriUser = memberRepository.findById(Long.parseLong(userId)).orElseThrow(ExceptionInInitializerError::new);

        if (oriUser != null && encoder.matches(password, oriUser.getPassword())) {

            return true; // 또는 다른 필요한 정보를 반환
        }
        return false;
    }

    public List<MemberImageDTO> imgUpdate(Long userId, MemberImageDTO memberImageDTO, MultipartFile memberImg) throws Exception {

        Member member = memberRepository.findById(userId).orElseThrow(ExceptionInInitializerError::new);

        Image savedImg = imageRepository.findByMemberId(userId);

        if (savedImg == null){
            Image img = new Image();

            img.setMember(member);

            memberImgService.saveMemberImg(img, memberImg);
        }else {
            memberImgService.deleteMemberImg(savedImg.getId(), savedImg.getImgName());

            memberImgService.updateMemberImg(savedImg.getId(), memberImg);
        }

        MemberImageDTO memberImageDTO1 = new MemberImageDTO();

        memberImageDTO1.setImgUrl(savedImg.getImgUrl());

        List<MemberImageDTO> memberImgList = new ArrayList<>();
        memberImgList.add(memberImageDTO1);

        return memberImgList;
    }


    public String getMemberImg(String userId) {

        Image savedImg = imageRepository.findByMemberId(Long.parseLong(userId));

        if (savedImg == null){
            return null;
        }



        return savedImg.getImgUrl();

    }
}
