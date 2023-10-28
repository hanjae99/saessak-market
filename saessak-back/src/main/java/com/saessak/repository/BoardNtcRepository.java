package com.saessak.repository;

import com.saessak.entity.Board;
import com.saessak.entity.BoardNtc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardNtcRepository extends JpaRepository<BoardNtc,Long> {


  BoardNtc findByBoardId(Long id);
}
