package com.saessak.signup.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Builder
@Getter
@Setter
@ToString
public class SmsDTO {

    private String phoneNum;

    private String token;

    private String verifyCode;

    private Date expireDate;
}
