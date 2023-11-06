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

    @PostMapping("/sell")
    public ResponseEntity<?> productSoldOut(@RequestBody ChatBoxDTO chatBoxDTO){
        boolean result = chatService.productSoldOut(chatBoxDTO.getId());

        if (result){
            ResponseDTO<String> response = ResponseDTO.<String>builder()
                    .message("success")
                    .build();
            return ResponseEntity.ok().body(response);
        }else {
            ResponseDTO<String> response = ResponseDTO.<String>builder()
                    .message("fail")
                    .build();
            return ResponseEntity.ok().body(response);
        }
    }

    @PostMapping("/validateUser")
    public ResponseEntity<?> validateUser(@RequestBody ChatBoxDTO chatBoxDTO, @AuthenticationPrincipal String memberId){

        int result = chatService.validateUser(chatBoxDTO.getId(), Long.parseLong(memberId));

        String message = "";

        // 등록된 유저
        if (result == 1){
            message = "user ok";
        }else if (result == -1){
            // 채팅방에 등록되지 않은 유저
            message = "user not ok";
        }else if (result == 0){
            // 존재하지 않는 채팅방 번호
            message = "no chatBox";
        }

        ResponseDTO<String> response = ResponseDTO.<String>builder()
                .message(message)
                .build();
        return ResponseEntity.ok().body(response);
    }
}
