package com.saessak.wishlist.service;

import com.saessak.constant.SellStatus;
import com.saessak.entity.Product;
import com.saessak.entity.WishList;
import com.saessak.repository.ProductRepository;
import com.saessak.repository.WishListRepository;
import com.saessak.wishlist.dto.WishListDTO;
import com.saessak.wishlist.dto.WishListInter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class WishListService {

    private final WishListRepository wishListRepository;


    private final ProductRepository productRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<WishListDTO> read(Long userId){

        List<WishListInter> list = wishListRepository.memberProductSelect(userId);
        List<WishListDTO> wishListDTOList = new ArrayList<>();

        for (WishListInter item : list) {
            WishListDTO dto = new WishListDTO();
            dto.setWishListId(item.getWishListId());
            dto.setProductId(item.getProductId());
            dto.setTitle(item.getTitle());
            dto.setPrice(item.getPrice());
            dto.setUpdateTime(item.getUpdateTime());
            dto.setSellStatus(item.getSellStatus());
            dto.setImgUrl(item.getImgUrl());
            wishListDTOList.add(dto);
        }


        return wishListDTOList;
    }

    public List<WishListDTO> sellread(Long userId){

        List<WishListInter> list = wishListRepository.sellMemberProductSelect(userId);
        List<WishListDTO> wishListDTOList = new ArrayList<>();

        for (WishListInter item : list) {
            WishListDTO dto = new WishListDTO();
            dto.setSellMemberId(item.getSellMemberId());
            dto.setProductId(item.getProductId());
            dto.setTitle(item.getTitle());
            dto.setPrice(item.getPrice());
            dto.setUpdateTime(item.getUpdateTime());
            dto.setSellStatus(item.getSellStatus());
            dto.setImgUrl(item.getImgUrl());
            wishListDTOList.add(dto);
        }


        return wishListDTOList;
    }

    public List<WishListDTO> buyread(Long userId){

        List<WishListInter> list = wishListRepository.buyMemberProductSelect(userId);
        List<WishListDTO> wishListDTOList = new ArrayList<>();

        for (WishListInter item : list) {
            WishListDTO dto = new WishListDTO();
            dto.setOrderMemberId(item.getOrderMemberId());
            dto.setBuyListId(item.getBuyListId());
            dto.setProductId(item.getProductId());
            dto.setTitle(item.getTitle());
            dto.setPrice(item.getPrice());
            dto.setUpdateTime(item.getUpdateTime());
            dto.setSellStatus(item.getSellStatus());
            dto.setImgUrl(item.getImgUrl());
            wishListDTOList.add(dto);
        }


        return wishListDTOList;
    }

    public WishList delete(Long wishListId){
        wishListRepository.deleteById(wishListId);
        return null;

    }

    public Product buyDelete (Long productId){
        Product product = productRepository.findById(productId).orElseThrow(EntityNotFoundException::new);
        product.setOrderMember(null);
        return product;
    }

    public Product sellUpdate(Long productId){

        Product product = productRepository.findById(productId).orElseThrow(EntityNotFoundException::new);
        product.setSellStatus(SellStatus.DELETED);

        return product;
    }



}
