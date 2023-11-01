package com.saessak.mypage.dto;

import com.saessak.constant.Gender;
import com.saessak.constant.Role;
import com.saessak.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyPageMemberDTO {

    private Long id;  // 사용자의 고유한 식별자를 저장하는 변수

    private String userId;  // 사용자의 아이디를 저장하는 변수

    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    private String password;  // 사용자의 비밀번호를 저장하는 변수

    private String nickName;  // 사용자의 닉네임을 저장하는 변수

    private String name;  // 사용자의 이름을 저장하는 변수

    @Email(message = "이메일 형식으로 입력해 주세요.")
    private String email;  // 사용자의 이메일 주소를 저장하는 변수

    private String phone;  // 사용자의 전화번호를 저장하는 변수

    private String address;  // 사용자의 주소를 저장하는 변수

    private Gender gender;  // 사용자의 성별을 저장하는 변수

    private Role role;  // 사용자의 역할을 저장하는 변수

    private String token;

    private String userImgUrl;

//    public MyPageMemberDTO(final Member entity){
//        this.id = entity.getId();
//        this.userId = entity.getUserId();
//        this.password = entity.getPassword();
//        this.email = entity.getEmail();
//        this.address = entity.getAddress();
//        this.nickName = entity.getNickName();
//        this.phone = entity.getPhone();
//    }

    // 이 메서드는 TodoDto 객체를 TodoEntity 객체로 변환하는 정적 메서드입니다.
    public static Member toEntity(final MyPageMemberDTO memberDto) {
        // TodoEntity 객체를 빌더 패턴을 사용하여 생성합니다.
        return Member.builder()
                // TodoDto의 제목 정보를 가져와서 TodoEntity의 제목으로 설정합니다.
                .userId(memberDto.getUserId())
                // TodoDto의 ID 정보를 가져와서 TodoEntity의 ID로 설정합니다.
                .id(memberDto.getId())
                // TodoDto의 완료 여부 정보를 가져와서 TodoEntity의 완료 여부로 설정합니다.
                .password(memberDto.getPassword())
                .email(memberDto.getEmail())
                .address(memberDto.getAddress())
                .phone(memberDto.getPhone())
                .nickName(memberDto.getNickName())
                // TodoEntity 객체를 최종적으로 생성하고 반환합니다.
                .build();
    }

    public static MyPageMemberDTO fromEntity(Member member) {
        MyPageMemberDTO dto = new MyPageMemberDTO();
        dto.setUserId(member.getUserId());
        dto.setEmail(member.getEmail());
        dto.setPhone(member.getPhone());
        dto.setPassword(member.getPassword());
        dto.setAddress(member.getAddress());
        dto.setId(member.getId());
        dto.setName(member.getName());
        dto.setNickName(member.getNickName());

        return dto;
    }

}
