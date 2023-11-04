package com.saessak.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saessak.entity.*;
import com.saessak.webSocket.dto.ChatBoxDTO;
import com.saessak.webSocket.dto.ChatBoxListDTO;
import com.saessak.webSocket.dto.ChatDTO;
import com.saessak.webSocket.dto.QChatBoxListDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;


public class ChatBoxRepositoryCustomImpl implements  ChatBoxRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public ChatBoxRepositoryCustomImpl(EntityManager em){
        this.queryFactory =new JPAQueryFactory(em);
    }

    private BooleanExpression checkSellMemberId(Long userId){
        return QChatBox.chatBox.sellMember.id.eq(userId);
    }

    private  BooleanExpression checkOrderMemberId(Long userId){
        return QChatBox.chatBox.orderMember.id.eq(userId);
    }

    @Override
    public Page<ChatBoxListDTO> getChatList(String userId, Pageable pageable) {
        QImage image=QImage.image;
        QChatBox chatBox= QChatBox.chatBox;
        QMember member =QMember.member;
        QProduct product =QProduct.product;
        QChat chat =QChat.chat;

//        List<ChatBoxListDTO> chatBoxSendList = queryFactory
//                .select(new QChatBoxListDTO(
//                        chatBox.id,
//                ))
//                .from(chatBox ,product ,image , member, chat)
//                .where(chatBox.product.id.eq(product.id)
//                        .and(product.id.eq(image.product.id))
//                        .and(chatBox.sellMember.id.eq(member.id))
//                        .and(chat.chatBox.id.eq(chatBox.id)))
//                .where(checkSellMemberId())


        return null;
    }
}
