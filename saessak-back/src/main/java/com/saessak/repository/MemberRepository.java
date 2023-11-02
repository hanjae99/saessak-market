package com.saessak.repository;

import com.saessak.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {

    Member findByEmail(String email);

    Member findByPhone(String phone);

    Member findByUserId(String userId);

    boolean existsByUserId(String userId);

    boolean existsByNickName(String nickName);
    boolean existsByEmail(String email);

    Member findByUserIdAndPassword(String userId, String password);

    Member findByNameAndEmail(String name, String email);

    Member findByUserIdAndEmail(String userId, String email);
}
