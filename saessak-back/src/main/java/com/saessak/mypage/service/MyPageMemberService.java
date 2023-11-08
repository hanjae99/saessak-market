package com.saessak.mypage.service;

// 필요한 패키지를 가져옵니다.
import com.saessak.constant.Role;
import com.saessak.constant.SellStatus;
import com.saessak.entity.Image;
import com.saessak.entity.Member;
import com.saessak.entity.Product;
import com.saessak.mypage.dto.MemberImageDTO;
import com.saessak.mypage.dto.MyPageMemberDTO;
import com.saessak.repository.ImageRepository;
import com.saessak.repository.MemberRepository;
import com.saessak.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

// 이 클래스가 비즈니스 로직을 제공하는 서비스임을 나타내는 Service 어노테이션입니다.
@Service
@Slf4j // 로깅을 위한 롬복 어노테이션
@RequiredArgsConstructor // 필수 인수를 사용하여 생성자를 생성하는 롬복 어노테이션입니다.
@Transactional // 이 클래스의 메서드가 트랜잭션에 참여함을 나타냅니다.
public class MyPageMemberService {

    // Member 엔티티에 대한 CRUD 작업을 수행하기 위해 memberRepository를 주입합니다.
    private final MemberRepository memberRepository;

    // Image 엔티티에 대한 CRUD 작업을 수행하기 위해 imageRepository를 주입합니다.
    private final ImageRepository imageRepository;

    // 회원 이미지 작업을 처리하기 위해 memberImgService를 주입합니다.
    private final MemberImgService memberImgService;

    // Product 엔티티에 대한 CRUD 작업을 수행하기 위해 productRepository를 주입합니다.
    private final ProductRepository productRepository;

    // 패스워드 인코딩을 위해 BCryptPasswordEncoder를 생성합니다.
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 회원을 논리적으로 삭제하고 관련된 제품의 판매 상태를 DELETED로 업데이트하는 메서드입니다.
    public void deleteUpdateMember(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(EntityNotFoundException::new);

        member.setRole(Role.DELETED);

        List<Product> product = productRepository.findBySellMemberId(memberId);

        for (Product product1 : product) {
            product1.setSellStatus(SellStatus.DELETED);
        }

    }

    // 사용자 ID에 따라 To-Do 항목을 읽는 메서드입니다.
    public Member read(String userId) {
        return memberRepository.findById(Long.parseLong(userId)).orElseThrow(EntityNotFoundException::new);
    }

    // 사용자의 정보를 업데이트하는 메서드입니다.
    public Member update(MyPageMemberDTO myPageMemberDTO, String userId) {

        Member user = memberRepository.findById(Long.parseLong(userId)).orElseThrow(EntityNotFoundException::new);

        // 닉네임이 비어 있으면 기존 닉네임을 유지하고, 그렇지 않으면 새 닉네임으로 업데이트합니다.
        if (myPageMemberDTO.getNickName().isEmpty()) {
            user.getNickName();
        } else {
            user.setNickName(myPageMemberDTO.getNickName());
        }

        // 주소가 비어 있으면 기존 주소를 유지하고, 그렇지 않으면 새 주소로 업데이트합니다.
        if (myPageMemberDTO.getAddress().isEmpty()) {
            user.getAddress();
        } else {
            user.setAddress(myPageMemberDTO.getAddress());
        }

        return user;
    }

    // 닉네임이 존재하는지 확인하는 메서드입니다.
    public boolean existsNickNameCheck(String nickName, String userId) {
        return memberRepository.existsByNickName(nickName);
    }

    // 사용자의 비밀번호를 업데이트하는 메서드입니다.
    public Member updatePass(MyPageMemberDTO myPageMemberDTO, String userId) {
        Member user = memberRepository.findById(Long.parseLong(userId)).orElseThrow(EntityNotFoundException::new);

        // 비밀번호가 비어 있으면 기존 비밀번호를 유지하고, 그렇지 않으면 새 비밀번호로 업데이트합니다.
        if (myPageMemberDTO.getPassword().isEmpty()) {
            user.getPassword();
        } else {
            user.setPassword(passwordEncoder.encode(myPageMemberDTO.getPassword()));
        }

        return user;
    }

    // 주어진 사용자 정보와 비밀번호를 사용하여 사용자를 가져오는 메서드입니다.
    public Member getByCredentials(final String userId, final String password, final PasswordEncoder encoder) {

        log.info(userId);

        final Member oriUser = memberRepository.findById(Long.parseLong(userId)).orElseThrow(ExceptionInInitializerError::new);

        if (oriUser != null && encoder.matches(password, oriUser.getPassword())) {

            return oriUser; // 또는 다른 필요한 정보를 반환
        }

        return null;
    }

    // 주어진 사용자 정보와 비밀번호를 사용하여 사용자를 확인하는 메서드입니다.
    public boolean booleanMember(final String userId, final String password, final PasswordEncoder encoder) {

        final Member oriUser = memberRepository.findById(Long.parseLong(userId)).orElseThrow(ExceptionInInitializerError::new);

        if (oriUser != null && encoder.matches(password, oriUser.getPassword())) {

            return true; // 또는 다른 필요한 정보를 반환
        }
        return false;
    }

    // 사용자 이미지를 업데이트하는 메서드입니다.
    public List<MemberImageDTO> imgUpdate(Long userId, MemberImageDTO memberImageDTO, MultipartFile memberImg) throws Exception {

        Member member = memberRepository.findById(userId).orElseThrow(ExceptionInInitializerError::new);

        Image savedImg = imageRepository.findByMemberId(userId);

        if (savedImg == null){
            savedImg = new Image();

            savedImg.setMember(member);

            memberImgService.saveMemberImg(savedImg, memberImg);
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

    // 사용자 이미지를 가져오는 메서드입니다.
    public String getMemberImg(String userId) {

        Image savedImg = imageRepository.findByMemberId(Long.parseLong(userId));

        if (savedImg == null) {
            return null;
        }

        return savedImg.getImgUrl();

    }
}
