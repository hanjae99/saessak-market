package com.saessak.repository;

import com.saessak.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatBoxRepository extends JpaRepository<Category,Long> {
}
