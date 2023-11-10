package com.saessak.admin;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminGetMemberDTO {

  private Long id;
  private String userId;
  private String nickName;
  private String name;
  private String email;
  private String phone;
  private String address;
  private String gender;
  private String role;
  private String profileImgUrl;
}
