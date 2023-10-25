package com.saessak.signup.service;

import javax.mail.internet.MimeMessage;

public interface EmailService {

    MimeMessage createMessage(String to)throws Exception;
    String sendSimpleMessage(String to)throws Exception;
}
