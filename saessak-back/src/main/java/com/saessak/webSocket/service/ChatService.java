package com.saessak.webSocket.service;

import com.saessak.entity.*;
import com.saessak.repository.*;
import com.saessak.webSocket.dto.ChatBoxDTO;
import com.saessak.webSocket.dto.ChatDTO;
import com.saessak.webSocket.dto.ChatListDTO;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatBoxRepository chatBoxRepository;
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;

    public void saveMessage(Long chatBoxId,Long memberId, String message) {

        ChatBox chatBox= chatBoxRepository.findById(chatBoxId).orElseThrow();
        Member member = memberRepository.findById(memberId).orElseThrow();

        Chat chat = Chat.builder().chatBox(chatBox).member(member).content(message).build();

        chatRepository.save(chat);
    }

    public ChatBoxDTO getChatHistory(Long chatBoxId ,String senderId) {
       ChatBox chatBox =chatBoxRepository.findById(chatBoxId).orElseThrow(EntityNotFoundException::new);

        Product product = productRepository.findById(chatBox.getProduct().getId()).orElseThrow(EntityNotFoundException::new);

        List<Image> images=imageRepository.findByProductId(product.getId());

       List<Chat> chatList=chatRepository.findByChatBoxIdOrderByRegTimeAsc(chatBoxId);

       List<ChatDTO> chatDTOList = new ArrayList<ChatDTO>();

       for(Chat chat: chatList){
//           ChatDTO chatDTO=chat.createChatDTO();
           ChatDTO chatDTO = ChatDTO.builder()
                           .chatBoxId(chat.getChatBox().getId())
                                   .memberId(chat.getMember().getId())
                                            .memberNickname(chat.getMember().getNickName())
                                                    .content(chat.getContent())
                                                            .regTime(chat.getRegTime())
                                                                    .build();
           chatDTOList.add(chatDTO);
       }



        ChatBoxDTO chatBoxDTO = ChatBoxDTO.builder()
                .id(chatBox.getId())
                .productId(product.getId())
                .productTitle(product.getTitle())
                .productPrice(product.getPrice())
                .imgUrl(images.get(0).getImgUrl())
                .chatList(chatDTOList)
                .writer(Long.valueOf(senderId))
                .build();


        return chatBoxDTO;
    }



}
