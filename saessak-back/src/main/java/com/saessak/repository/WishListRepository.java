package com.saessak.repository;

import com.saessak.entity.Image;
import com.saessak.entity.WishList;
import com.saessak.wishlist.dto.WishListInter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WishListRepository extends JpaRepository<WishList,Long>, WishListRepositoryCustom {
    @Query( value = "SELECT M.member_id AS memberId, P.product_id AS productId, I.img_url AS imgUrl, " +
            "P.title, P.price, P.update_time AS updateTime, P.sell_status AS sellStatus , WL.wish_list_id AS wishListId " +
            "FROM MEMBER M, PRODUCT P, WISH_LIST WL, IMAGE I " +
            "WHERE M.member_id = WL.member_id " +
            "AND WL.product_id = P.product_id " +
            "AND P.product_id = I.product_id " +
            "AND M.member_id = :memberId " +
            "GROUP BY P.product_id", nativeQuery = true)
    List<WishListInter> memberProductSelect(@Param("memberId") Long userId);

    @Query( value = "SELECT P.sell_member_id AS sellMemberId, I.img_url AS imgUrl, " +
            "P.product_id AS productId, P.title, P.price, P.update_time AS updateTime, P.sell_status AS sellStatus " +
            "FROM PRODUCT P, IMAGE I " +
            "WHERE P.product_id = I.product_id " +
            "AND P.sell_member_id = :memberId " +
            "AND (P.sell_status = 'SOLD_OUT' or P.sell_status = 'SELL' or P.sell_status = 'SELL_AND_SOLD_OUT') " +
            "GROUP BY P.product_id", nativeQuery = true)
    List<WishListInter>  sellMemberProductSelect(@Param("memberId") Long userId);

    @Query( value = "SELECT P.order_member_id AS orderMemberId, I.img_url AS imgUrl, " +
            "P.product_id AS productId, P.title, P.price, P.update_time AS updateTime, P.sell_status AS sellStatus " +
            "FROM PRODUCT P, IMAGE I " +
            "WHERE P.product_id = I.product_id " +
            "AND P.order_member_id = :memberId " +
            "AND P.sell_status = 'SOLD_OUT' " +
            "GROUP BY P.product_id", nativeQuery = true)
    List<WishListInter> buyMemberProductSelect(@Param("memberId") Long userId);

    @Query(value = "DELETE " +
            "FROM WISH_LIST " +
            "WHERE wish_list_id = :wishListId", nativeQuery = true)
    void deleteById(@Param("wishListId") Long wishListId);

    List<WishList> findByMemberId(Long memberId);



    boolean existsByMemberIdAndProductId(Long memberId, Long productId);
}
