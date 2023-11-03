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
    public ResponseEntity<?> getList(@RequestBody ChatBoxDTO chatBoxDTO , @AuthenticationPrincipal String senderId){


        ChatBoxDTO newChatBoxDTO =chatService.getChatHistory(Long.valueOf(chatBoxDTO.getId()),senderId);


        return ResponseEntity.ok().body(newChatBoxDTO);
    }

    @PostMapping("/getChatBox")
    public ResponseEntity<?> createChatBox(@RequestBody ChatBoxDTO chatBoxDTO, @AuthenticationPrincipal String memberId){
        System.out.println("====createBox: " + chatBoxDTO.getProductId() + "," + chatBoxDTO.getWriter());
        Long sendMemberId =Long.parseLong(memberId);

        Long chatBoxId  =detailService.createChatBox(chatBoxDTO.getProductId(), chatBoxDTO.getWriter(), sendMemberId);

        ResponseDTO.builder().message(String.valueOf(chatBoxId)).build();
        return ResponseEntity.ok().body(chatBoxId);
    }
}
