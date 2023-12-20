package com.saessak.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saessak.constant.SellStatus;
import com.saessak.entity.QImage;
import com.saessak.entity.QMember;
import com.saessak.entity.QProduct;
import com.saessak.entity.QWishList;
import com.saessak.wishlist.dto.*;

import javax.persistence.EntityManager;
import java.util.List;

public class WishListRepositoryCustomImpl implements WishListRepositoryCustom{

    private JPAQueryFactory queryFactory;

    public WishListRepositoryCustomImpl(EntityManager em){

        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<WishListDTO> memberProductSelectdsl(Long userId) {
        QProduct product = QProduct.product;
        QImage image = QImage.image;
        QWishList wishList = QWishList.wishList;

        List<WishListDTO> wishListDTOList = queryFactory
                .select(new QWishListDTO(
                    product.id,
                        wishList.id,
                        product.title,
                        product.price,
                        wishList.updateTime,
                        product.sellStatus,
                        image.imgUrl,
                        product.sellMember.id,
                        product.orderMember.id
                ))
                .from(product, image, wishList)
                .where(image.product.id.eq(product.id))
                .where(wishList.member.id.eq(userId))
                .where(wishList.product.id.eq(product.id))
                .groupBy(product.id)
                .fetch();


        System.out.println("@@@@@@@@@@@@@@@@@@" + wishListDTOList.toString());
        return wishListDTOList;
    }

    @Override
    public List<SellListDto> sellMemberProductSelectdsl(Long userId) {
        QProduct product = QProduct.product;
        QImage image = QImage.image;

        List<SellListDto> sellListDtoList = queryFactory
                .select(new QSellListDto(
                        product.id,
                        product.title,
                        product.price,
                        product.sellStatus,
                        product.updateTime,
                        image.imgUrl,
                        product.sellMember.id,
                        product.orderMember.id
                ))
                .from(product, image)
                .where(image.product.id.eq(product.id))
                .where(product.sellMember.id.eq(userId))
                .where(product.sellStatus.eq(SellStatus.SOLD_OUT)
                .or(product.sellStatus.eq(SellStatus.SELL))
                .or(product.sellStatus.eq(SellStatus.SELL_AND_SOLD_OUT)))
                .groupBy(product.id)
                .fetch();


        return sellListDtoList;
    }

    @Override
    public List<BuyListDto> buyMemberProductSelectdsl(Long userId) {
        QProduct product = QProduct.product;
        QImage image = QImage.image;

        List<BuyListDto> buyListDTOList = queryFactory
                .select(new QBuyListDto(
                        product.id,
                        product.title,
                        product.price,
                        product.sellStatus,
                        product.updateTime,
                        image.imgUrl,
                        product.sellMember.id,
                        product.orderMember.id
                ))
                .from(product, image)
                .where(image.product.id.eq(product.id))
                .where(product.orderMember.id.eq(userId))
                .where(product.sellStatus.eq(SellStatus.SOLD_OUT))
                .groupBy(product.id)
                .fetch();


        return buyListDTOList;
    }
}
