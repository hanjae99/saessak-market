package com.saessak.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // WebSocket을 사용하기 위한 환경 설정 클래스로 선언
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue"); // 메시지 브로커를 구성, "/topic" 및 "/queue"로 메시지 전송
        config.setApplicationDestinationPrefixes("/app"); // 클라이언트가 메시지를 전송할 때 '/app' 접두사 사용
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chatTest").setAllowedOrigins("*");// "/chatTest" 엔드포인트를 등록하고, 모든 origin에서 접근 허용
//                .withSockJS(); // SockJS 지원을 통해 WebSocket 연결 설정
    }
}
