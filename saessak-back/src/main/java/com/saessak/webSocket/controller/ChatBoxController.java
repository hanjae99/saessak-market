package com.saessak.webSocket.controller;

import com.saessak.detail.service.DetailService;
import com.saessak.dto.ResponseDTO;
import com.saessak.main.dto.ProductDTO;
import com.saessak.webSocket.dto.ChatBoxDTO;
import com.saessak.webSocket.dto.ChatBoxListDTO;
import com.saessak.webSocket.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

        if(newChatBoxDTO != null) {
            return ResponseEntity.ok().body(newChatBoxDTO);
        }

        ResponseDTO response = ResponseDTO.builder().message("noData").build();

        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/getChatBox")
    public ResponseEntity<?> createChatBox(@RequestBody ChatBoxDTO chatBoxDTO, @AuthenticationPrincipal String memberId){
        System.out.println("====createBox: " + chatBoxDTO.getProductId() + "," + chatBoxDTO.getWriter());
        Long sendMemberId =Long.parseLong(memberId);

        Long chatBoxId  =detailService.createChatBox(chatBoxDTO.getProductId(), chatBoxDTO.getWriter(), sendMemberId);

        ResponseDTO.builder().message(String.valueOf(chatBoxId)).build();
        return ResponseEntity.ok().body(chatBoxId);
    }

    @GetMapping({"/chatBox ", "/chatBox/{page}"})
    public ResponseEntity<?> chatBoxlist(@AuthenticationPrincipal String memberId, @PathVariable("page") Optional<Integer> page){
        Pageable pageable = PageRequest.of(page.isEmpty() || page.get() <= 0  ? 0 : page.get() -1, 10);

        try {
                Page<ChatBoxListDTO> result =chatService.chatBoxList(memberId,pageable);
                return ResponseEntity.ok().body(result);
            }catch (Exception e){
                e.printStackTrace();
                ResponseDTO<ChatBoxListDTO> response = ResponseDTO.<ChatBoxListDTO>builder()
                        .error("no chat")
                        .build();
                return ResponseEntity.ok().body(response);
            }
    }
}
