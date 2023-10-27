//package com.saessak.signup.service;
//
//import com.saessak.security.TokenProvider;
//import lombok.RequiredArgsConstructor;
//import net.nurigo.sdk.NurigoApp;
//import net.nurigo.sdk.message.model.Message;
//import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
//import net.nurigo.sdk.message.response.SingleMessageSentResponse;
//import net.nurigo.sdk.message.service.DefaultMessageService;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.annotation.PostConstruct;
//import java.util.Date;
//import java.util.Random;
//
//@Service
//@RequiredArgsConstructor
//@Transactional
//public class SmsService {
//
//    @Value("${sms.api.key}")
//    private String apikey;
//
//    @Value("${sms.api.secret.key}")
//    private String apiSecretKey;
//
//    @Value("${sendPhoneNum}")
//    private String sendPhoneNum;
//
//    private TokenProvider tokenProvider;
//
//    private DefaultMessageService messageService;
//
//    @PostConstruct
//    public void init(){
//        this.messageService = NurigoApp.INSTANCE.initialize(apikey, apiSecretKey, "https://api.solapi.com");
//    }
//
//    public String createKey() {
//        StringBuffer key = new StringBuffer();
//        Random rnd = new Random();
//
//        for (int i = 0; i < 8; i++) { // 인증코드 8자리
//            int index = rnd.nextInt(3); // 0~2 까지 랜덤
//
//            switch (index) {
//                case 0:
//                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
//                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
//                    break;
//                case 1:
//                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
//                    //  A~Z
//                    break;
//                case 2:
//                    key.append((rnd.nextInt(10)));
//                    // 0~9
//                    break;
//            }
//        }
//        return key.toString();
//    }
//
//    // 단일 메세지 발송
//    public void sendOne(String to, String verificationCode)throws Exception{
//        Message message = new Message();
//        // 발신번호 및 수신 번호는 하이픈 없이 01013232132 형태로 입력
//        message.setFrom("01062824550");
//        message.setTo(to);
////        message.setText("[Web발신]\n새싹마켓 입니다\n인증번호를 입력해주세요!\n" + verificationCode);
//        message.setText("SMS는 한글 45자, 영자 90자까지 입력할 수 있습니다.");
//
////        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
//        this.messageService.send(message);
//
////        return response;
//    }
//}
