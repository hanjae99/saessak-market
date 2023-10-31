package com.saessak.webSocket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ChatTestController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("/chat/{boxId}")
//    @SendTo("/topic/chatMessages")
    public void sendToMessage(@DestinationVariable("boxId") String boxId, String message) {
        String seq="";
        simpMessageSendingOperations.convertAndSend("/topic/chatMessages/"+ boxId, message);

//        return message;
    }

    
}