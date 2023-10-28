package com.saessak.repository;

import com.saessak.entity.Board;
import com.saessak.entity.BoardVoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardVocRepository extends JpaRepository<BoardVoc,Long> {


  BoardVoc findByBoardId(Long id);
}
