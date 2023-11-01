package com.saessak.webSocket.controller;

import com.saessak.detail.service.DetailService;
import com.saessak.dto.ResponseDTO;
import com.saessak.webSocket.dto.ChatBoxDTO;
import com.saessak.webSocket.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chatBox")
@Slf4j
@RequiredArgsConstructor
public class ChatBoxController {

    private final ChatService chatService;
    private final DetailService detailService;

    @PostMapping("/getList")
    public ResponseEntity<?> getList(@RequestParam("chatBoxId") String chatBoxId , @AuthenticationPrincipal String senderId){


        ChatBoxDTO chatBoxDTO =chatService.getChatHistory(Long.valueOf(chatBoxId),senderId);


        return ResponseEntity.ok().body(chatBoxDTO);
    }

    @PostMapping("/getChatBox")
    public ResponseEntity<?> createChatBox(@RequestParam("productId") Long productId,@RequestParam("sellMemberId") Long sellMemberId , @AuthenticationPrincipal String memberId){
        Long sendMemberId =Long.parseLong(memberId);

        Long chatBoxId  =detailService.createChatBox(productId, sellMemberId,sendMemberId);

        ResponseDTO.builder().message(String.valueOf(chatBoxId)).build();
        return ResponseEntity.ok().body(chatBoxId);
    }
}
