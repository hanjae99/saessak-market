package com.saessak.repository;

import com.saessak.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findByProductId(Long productId);

    void deleteById(Long imageId);

    List<Image> findByBoardId(Long boardId);

    Image findByMemberId(Long id);
}
