package com.saessak.webSocket.controller;

import com.saessak.entity.Chat;
import com.saessak.webSocket.dto.ChatDTO;
import com.saessak.webSocket.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody ChatDTO message) {
        Chat chat=Chat.builder().content(message.getContent()).build();

//        chatService.saveMessage(chat);
        return ResponseEntity.ok("");
    }

    @GetMapping("/history/{senderId}/{receiverId}")
    public ResponseEntity<List<Chat>> loadChatHistory(
            @PathVariable Long senderId,
            @PathVariable Long receiverId
    ) {
        List<Chat> chatHistory = chatService.getChatHistory(senderId, receiverId);
        return ResponseEntity.ok(chatHistory);
    }
}
