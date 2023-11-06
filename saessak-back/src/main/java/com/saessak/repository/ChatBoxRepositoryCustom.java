package com.saessak.repository;

import com.saessak.webSocket.dto.ChatBoxDTO;
import com.saessak.webSocket.dto.ChatBoxListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChatBoxRepositoryCustom {

    Page<ChatBoxListDTO> getChatList(String userId, Pageable pageable);
}
