package com.saessak.webSocket.service;

import com.saessak.constant.SellStatus;
import com.saessak.entity.*;
import com.saessak.repository.*;
import com.saessak.webSocket.dto.ChatBoxDTO;
import com.saessak.webSocket.dto.ChatBoxListDTO;
import com.saessak.webSocket.dto.ChatDTO;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatBoxRepository chatBoxRepository;
    private final MemberRepository memberRepository;
    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;

    public Chat saveMessage(Long chatBoxId,Long memberId, String message) {

        ChatBox chatBox= chatBoxRepository.findById(chatBoxId).orElseThrow();
        Member member = memberRepository.findById(memberId).orElseThrow();

        Chat chat = Chat.builder().chatBox(chatBox).member(member).content(message).build();

        Chat savedChat = chatRepository.save(chat);

        return savedChat;
    }

    public ChatBoxDTO getChatHistory(Long chatBoxId ,String senderId) {

       ChatBox chatBox =chatBoxRepository.findById(chatBoxId).orElseThrow(EntityNotFoundException::new);

        Product product = productRepository.findById(chatBox.getProduct().getId()).orElseThrow(EntityNotFoundException::new);

        List<Image> images=imageRepository.findByProductId(product.getId());

       List<Chat> chatList=chatRepository.findByChatBoxIdOrderByRegTimeAsc(chatBoxId);

        List<ChatDTO> chatDTOList = new ArrayList<ChatDTO>();

       if(chatList != null) {

           for (Chat chat : chatList) {
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
       }

       // 현재 채팅방에 입장한 사람이 판매자일 경우
        boolean isSeller = false;
       if (chatBox.getSellMember().getId() == Long.parseLong(senderId)){
           isSeller = true;
       }

        ChatBoxDTO chatBoxDTO = ChatBoxDTO.builder()
                .id(chatBox.getId())
                .productId(product.getId())
                .productTitle(product.getTitle())
                .productPrice(product.getPrice())
                .imgUrl(images.get(0).getImgUrl())
                .chatList(chatDTOList)
                .writer(Long.valueOf(senderId))
                .seller(isSeller)
                .sellStatus(product.getSellStatus())
                .build();

        return chatBoxDTO;
    }

    public Page<ChatBoxListDTO> chatBoxList(String userId, Pageable pageable){
        return chatBoxRepository.getChatList(userId, pageable);
    }

    public boolean productSoldOut(Long chatBoxId){
        ChatBox chatBox = chatBoxRepository.findById(chatBoxId).orElseThrow(EntityNotFoundException::new);
        Product savedProduct = productRepository.findById(chatBox.getProduct().getId()).orElseThrow(EntityNotFoundException::new);

        if (savedProduct.getSellStatus() == SellStatus.SELL){
            savedProduct.setSellStatus(SellStatus.SOLD_OUT);
            savedProduct.setOrderMember(chatBox.getOrderMember());
            return true;
        }else {
            return false;
        }
    }

    public int validateUser(Long chatBoxId, Long memberId){
        try {
            ChatBox chatBox = chatBoxRepository.findById(chatBoxId).orElseThrow(EntityNotFoundException::new);

            List<Long> memberIdList = new ArrayList<>();

            memberIdList.add(chatBox.getOrderMember().getId());
            memberIdList.add(chatBox.getSellMember().getId());

            // 현재 채팅방에 접속한 유저가 판매자 or 구매자 둘 중 하나인지
            if (memberIdList.contains(memberId)){
                return 1;
            }else {
                return -1;
            }
        }catch (EntityNotFoundException e){
            return 0;
        }
    }
}
