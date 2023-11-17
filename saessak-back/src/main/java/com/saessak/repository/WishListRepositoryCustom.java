package com.saessak.repository;

import com.saessak.wishlist.dto.BuyListDto;
import com.saessak.wishlist.dto.SellListDto;
import com.saessak.wishlist.dto.WishListDTO;
import com.saessak.wishlist.dto.WishListInter;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WishListRepositoryCustom {

    List<WishListDTO> memberProductSelectdsl(@Param("memberId") Long userId);

    List<SellListDto>  sellMemberProductSelectdsl(@Param("memberId") Long userId);

    List<BuyListDto> buyMemberProductSelectdsl(@Param("memberId") Long userId);

}
