package com.saessak.webSocket.service;

import com.saessak.entity.Chat;
import com.saessak.entity.ChatBox;
import com.saessak.entity.Member;
import com.saessak.repository.ChatBoxRepository;
import com.saessak.repository.ChatRepository;
import com.saessak.repository.MemberRepository;
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
    private final MemberRepository memberRepository;

    public void saveMessage(Long chatBoxId,Long memberId, String message) {

        ChatBox chatBox= chatBoxRepository.findById(chatBoxId).orElseThrow();
        Member member = memberRepository.findById(memberId).orElseThrow();

        Chat chat = Chat.builder().chatBox(chatBox).member(member).content(message).build();

        chatRepository.save(chat);
    }

    public List<Chat> getChatHistory(Long orderMemberId, Long sellMemberId) {
       ChatBox chatBox =chatBoxRepository.findBySellMemberIdAndOrderMemberId(sellMemberId,orderMemberId);
        return chatRepository.findByChatBoxId(chatBox.getId());
    }


}
