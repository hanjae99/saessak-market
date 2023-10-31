package com.saessak.webSocket.controller;

import com.saessak.webSocket.dto.ChatDataDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/api")
@RequiredArgsConstructor
public class ChatTestController {
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    @SendTo("/topic/chatMessages")
    public ResponseEntity<?> sendToMessage(ChatDataDTO chatDataDTO){
        return ResponseEntity.ok().body(chatDataDTO);
    }
//    public String sendToMessage(String message) {
//        return message;
//    }
}