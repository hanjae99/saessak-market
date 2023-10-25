package com.saessak.webSocket.service;

import com.saessak.entity.Chat;
import com.saessak.entity.ChatBox;
import com.saessak.repository.ChatBoxRepository;
import com.saessak.repository.ChatRepository;
import com.saessak.webSocket.dto.ChatDTO;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatBoxRepository chatBoxRepository;

    public void saveMessage(Chat message) {
        message.setRegTime(LocalDateTime.now());
        chatRepository.save(message);
    }

    public List<Chat> getChatHistory(Long orderMemberId, Long sellMemberId) {
       ChatBox chatBox =chatBoxRepository.findBySellMemberIdAndOrderMemberId(sellMemberId,orderMemberId);
        return chatRepository.findByChatBoxId(chatBox.getId());
    }


}
