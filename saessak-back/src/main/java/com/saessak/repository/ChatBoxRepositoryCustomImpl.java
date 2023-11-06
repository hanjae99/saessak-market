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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.ArrayList;
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

        //내가 체팅을 보내서 만들어진 채팅방 목록
        List<ChatBoxListDTO> orderList = queryFactory
                .select(new QChatBoxListDTO(
                        chatBox.id,
                        product.id,
                        product.title,
                        product.price,
                        image.imgUrl,
                        chat.regTime,
                        member.nickName,
                        chat.content))
                .from(chatBox ,product ,image , member, chat)
                .where(chatBox.product.id.eq(product.id)
                        .and(product.id.eq(image.product.id))
                        .and(chatBox.sellMember.id.eq(member.id))
                        .and(chat.chatBox.id.eq(chatBox.id)))
                .where(checkOrderMemberId(Long.valueOf(userId)))
                .groupBy(chatBox.id)
                .orderBy(chat.regTime.desc())
                .offset(pageable.getOffset()== 0? 0:pageable.getOffset()/2)
                .limit(pageable.getPageSize()/2)
                .fetch();

        //내가 채팅을 받아서 만들어진 채팅방 목록
        List<ChatBoxListDTO> sellList = queryFactory
                .select(new QChatBoxListDTO(
                        chatBox.id,
                        product.id,
                        product.title,
                        product.price,
                        image.imgUrl,
                        chat.regTime,
                        member.nickName,
                        chat.content))
                .from(chatBox ,product ,image , member, chat)
                .where(chatBox.product.id.eq(product.id)
                        .and(product.id.eq(image.product.id))
                        .and(chatBox.orderMember.id.eq(member.id))
                        .and(chat.chatBox.id.eq(chatBox.id)))
                .where(checkSellMemberId(Long.valueOf(userId)))
                .groupBy(chatBox.id)
                .orderBy(chat.regTime.desc())
                .offset(pageable.getOffset()== 0? 0:pageable.getOffset()/2)
                .limit(pageable.getPageSize()/2)
                .fetch();

        long total = queryFactory
                .select(chatBox.id.countDistinct())
                .from(chatBox)
                .where(chatBox.sellMember.id.eq(Long.valueOf(userId)).or(chatBox.orderMember.id.eq(Long.valueOf(userId))))
                .fetchOne();

//        long selltotal = queryFactory
//                .select(chatBox.id.count())
//                .from(chatBox)
//                .where(checkSellMemberId(Long.valueOf(userId)))
//                .fetchOne();
//
//        long total =ordertotal + selltotal;

        List<ChatBoxListDTO> chatBoxListDTO = new ArrayList<>();

        chatBoxListDTO.addAll(orderList);
        chatBoxListDTO.addAll(sellList);

        return new PageImpl<>(chatBoxListDTO, pageable, total);
    }
}
