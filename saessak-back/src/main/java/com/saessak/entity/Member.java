package com.saessak.entity;

import com.saessak.constant.Gender;
import com.saessak.constant.Role;
import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="member_id")
  private Long id;

  @Column(unique = true)
  private String userId;
  private String password;
  @Column(unique = true)
  private String nickName;
  private String name;

  @Column(unique = true)
  private String email;

  @Column(unique = true)
  private String phone;

  private String address;

  @Enumerated(EnumType.STRING)
  @Column(length = 50)
  private Gender gender;

  @Enumerated(EnumType.STRING)
  @Column(length = 50)
  private Role role;

}
