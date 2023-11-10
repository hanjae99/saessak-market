package com.saessak.detail.service;

import com.saessak.constant.SellStatus;
import com.saessak.detail.dto.*;
import com.saessak.entity.*;
import com.saessak.main.dto.ProductDTO;
import com.saessak.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class DetailService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ImageRepository imageRepository;
    private final ChatBoxRepository chatBoxRepository;
    private final WishListRepository wishListRepository;


    public DetailDTO get(Long productId){

        Product product = null;

        //제품상세 데이터
        try{
            product = productRepository.findById(productId)
                    .orElseThrow(EntityNotFoundException::new);
        }catch (Exception e){
            return null;
        }


        //제품이미지리스트
        List<String> imageUrls=
                imageRepository.findByProductId(productId).stream()
                        .map(Image::getImgUrl)
                        .collect(Collectors.toList());


        //상품을 등록한 유저 데이터(id, nickname)
        Member member= memberRepository
                .findById(product.getSellMember().getId())
                .orElseThrow();

        //유저의 다른 상품 목록 엔티티
        List<Product> memberProductlist = productRepository.findBySellMemberId(member.getId());
        List<MemberProductDTO> UserProductDTOList = new ArrayList<>();


        //유저의 다른상품 목록을 MemberProductDTO에 저장
        for(Product memberProduct : memberProductlist){

            List<Image> imglist = imageRepository.findByProductId(memberProduct.getId());

            MemberProductDTO memberProductDTO =
                    MemberProductDTO
                    .builder()
                            .productId(memberProduct.getId())
                            .price(memberProduct.getPrice())
                            .title(memberProduct.getTitle())
                            .imgUrl(imglist.get(0).getImgUrl())
                            .build();

            UserProductDTOList.add(memberProductDTO);
        }



        //카테고리 아이디 알아오기
        List<ProductCategory> productCateId = productCategoryRepository.findByProductId(productId);



        //카테고리로 랜덤 데이터 가져옴  productDTOList에 넣어놨음
        List<CateProductInter> list=productCategoryRepository.categoryRandomData(productCateId.get(0).getCategory().getId(), productId);
        List<CategoryProductDTO> productDTOList =new ArrayList<>();

        for(CateProductInter productDTO : list){
            CategoryProductDTO categoryProductDTO =CategoryProductDTO.builder()
                    .productId(productDTO.getProductId())
                    .categoryId(productDTO.getCategoryId())
                    .title(productDTO.getTitle())
                    .price(productDTO.getPrice())
                    .imgUrl(productDTO.getImgUrl())
                    .build();

            productDTOList.add(categoryProductDTO);
        }

        //member 데이터 완성
        DetailMemberDTO memberDTO=DetailMemberDTO.builder()
                .MemberId(member.getId())
                .nickName(member.getNickName())
                .productDTOList(UserProductDTOList)
                .build();


        //컨트롤러에서 받아야되는 데이터
        DetailDTO DetailDto=new DetailDTO(product.getId(),
                memberDTO,
                product.getTitle(),
                product.getContent(),
                imageUrls,
                product.getPrice(),
                product.getClickCount(),
                product.getSellStatus(),
                product.getMapData(),
                productDTOList,
                null
        );

        return DetailDto;
    }
    public void listget(Long categoryID){
        //카테고리로 랜덤 데이터 가져옴  productDTOList에 넣어놨음
        List<CateProductInter> list=productCategoryRepository.categoryRandomData(categoryID, 1L);
        List<CategoryProductDTO> productDTOList =new ArrayList<>();

        for(CateProductInter productDTO : list){
            log.info("#######################"+productDTO.toString());
            log.info("@@@@@@@@@@@@@@@@@@@@@@"+productDTO.getImgUrl());
            CategoryProductDTO categoryProductDTO =CategoryProductDTO.builder()
                    .productId(productDTO.getProductId())
                    .categoryId(productDTO.getCategoryId())
                    .title(productDTO.getTitle())
                    .price(productDTO.getPrice())
                    .imgUrl(productDTO.getImgUrl())
                    .build();

            productDTOList.add(categoryProductDTO);
        }
        log.info(productDTOList.toString());
    }

    public Long createChatBox(Long productId, Long sellMemberId , Long sendMemberId){

        ChatBox chatBox =chatBoxRepository.findByProductIdAndOrderMemberId(productId,sendMemberId);

        if(chatBox == null){

            Product product =productRepository.findById(productId).orElseThrow();

            Member sell_MemberId = memberRepository.findById(sellMemberId).orElseThrow();

            Member send_MemberId = memberRepository.findById(sendMemberId).orElseThrow();

            ChatBox createChatBox = ChatBox.builder().product(product).sellMember(sell_MemberId).orderMember(send_MemberId).build();

            chatBoxRepository.save(createChatBox);

            return createChatBox.getId();
        }

        return chatBox.getId();
    }

    public void addWishList(Long productId, Long memberId) {

        Member member = memberRepository.findById(memberId).orElseThrow(EntityNotFoundException::new);

        Product product = productRepository.findById(productId).orElseThrow(EntityNotFoundException::new);

        if (wishListRepository.existsByMemberIdAndProductId(memberId, productId)) {
            // 이미 찜한 상품이라면 추가 작업을 수행하지 않음
            return;
        }

        WishList wishList = new WishList();
        wishList.setMember(member);
        wishList.setProduct(product);
        wishListRepository.save(wishList);
    }




}
