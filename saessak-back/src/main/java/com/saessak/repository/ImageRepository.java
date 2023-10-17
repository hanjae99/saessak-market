package com.saessak.repository;

import com.saessak.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {

    Image findByProductId(Long productId);
}
