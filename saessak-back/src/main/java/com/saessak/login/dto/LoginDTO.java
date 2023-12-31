package com.saessak.login.dto;

import com.saessak.constant.Gender;
import com.saessak.constant.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginDTO {


    private String token;

    private Long id;

    @NotBlank(message = "아이디를 입력해주세요.")
    private String userId;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;

    private String name;

    private String nickName;

    private Role role;

    private Date expiration;

}
