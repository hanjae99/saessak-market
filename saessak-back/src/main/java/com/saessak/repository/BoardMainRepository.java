package com.saessak.repository;

import com.saessak.entity.Board;
import com.saessak.entity.BoardMain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardMainRepository extends JpaRepository<BoardMain,Long> {


  BoardMain findByBoardId(Long id);
}
