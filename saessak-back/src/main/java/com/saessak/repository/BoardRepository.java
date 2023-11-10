package com.saessak.repository;

import com.saessak.entity.Board;
import com.saessak.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long>, BoardRepositoryCustom {


  List<Board> findByMemberId(Long memberId);
}
