package com.saessak.wishlist.service;

import com.saessak.constant.SellStatus;
import com.saessak.entity.Product;
import com.saessak.entity.WishList;
import com.saessak.repository.ProductRepository;
import com.saessak.repository.WishListRepository;
import com.saessak.repository.WishListRepositoryCustom;
import com.saessak.wishlist.dto.BuyListDto;
import com.saessak.wishlist.dto.SellListDto;
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

        return wishListRepository.memberProductSelectdsl(userId);
    }

    public List<SellListDto> sellread(Long userId){


        return wishListRepository.sellMemberProductSelectdsl(userId);
    }

    public List<BuyListDto> buyread(Long userId){




        return wishListRepository.buyMemberProductSelectdsl(userId);
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
