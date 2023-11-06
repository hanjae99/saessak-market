package com.saessak.repository;

import com.saessak.entity.Category;
import com.saessak.entity.ChatBox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatBoxRepository extends JpaRepository<ChatBox,Long> ,ChatBoxRepositoryCustom {
    ChatBox findByProductIdAndOrderMemberId(Long productId, Long orderMemberId);

}
