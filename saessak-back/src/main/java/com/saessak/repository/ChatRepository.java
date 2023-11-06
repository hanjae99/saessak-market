package com.saessak.repository;

import com.saessak.chat.dto.ChatInter;
import com.saessak.entity.Chat;
import com.saessak.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat,Long> {

    List<Chat> findByChatBoxIdOrderByRegTimeAsc(Long chatBoxId);

    }
