package com.saessak.webSocket.controller;

import com.saessak.entity.Chat;
import com.saessak.webSocket.dto.ChatDTO;
import com.saessak.webSocket.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api")
@RequiredArgsConstructor
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    private final ChatService chatService;

    @MessageMapping("/chat/{chatBoxId}")
    public void sendToMessage(@DestinationVariable("chatBoxId") String chatBoxId, ChatDTO chatDTO) {

        System.out.println("시간: " + chatDTO.getRegTime());
        Long memberId = chatDTO.getMemberId();
        String content = chatDTO.getContent();
        Long chatBox = Long.valueOf(chatBoxId);

        Chat savedChat = chatService.saveMessage(chatBox, memberId, content);
        chatDTO.setRegTime(savedChat.getRegTime());

        simpMessageSendingOperations.convertAndSend("/topic/chatMessages/" + chatBoxId, chatDTO);

    }
}