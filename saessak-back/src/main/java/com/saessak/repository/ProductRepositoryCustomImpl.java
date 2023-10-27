package com.saessak.repository;

import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.sql.SQLExpressions;
import com.saessak.constant.SellStatus;
import com.saessak.detail.dto.DetailDTO;
import com.saessak.entity.*;
import com.saessak.imgfile.FileService;
import com.saessak.main.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;

public class ProductRepositoryCustomImpl implements ProductRepositoryCustom{

    private JPAQueryFactory queryFactory;

    private final FileService fileService = new FileService();

    public ProductRepositoryCustomImpl(EntityManager em){
        this.queryFactory = new JPAQueryFactory(em);
    }

    private BooleanExpression searchSellStatusEq(SellStatus sellStatus){
        if (sellStatus == null){
            sellStatus = SellStatus.SELL;
        }
        return QProduct.product.sellStatus.eq(sellStatus);
    }

    private BooleanExpression productTitleCateLike(String searchBy, String searchQuery){
        if (searchBy.equals("product_title")){
           return QProduct.product.title.like("%" + searchQuery + "%");
        }else if (searchBy.equals("category_num")){
            return QProductCategory.productCategory.category.id.eq(Long.valueOf(searchQuery));
        }

        return null;
    }

    // 페이징 처리된 상품 검색 목록 가져오기
    @Override
    public Page<ProductDTO> getSearchedProductPage(ProductDTO productDTO, Pageable pageable) {

        QProduct product = QProduct.product;
        QImage image = QImage.image;
        QProductCategory productCategory = QProductCategory.productCategory;
        QWishList wishList = QWishList.wishList;

        List<ProductDTO> content = queryFactory
                .select(new QProductDTO(
                        product.id,
                        product.title,
                        product.price,
                        product.sellStatus,
                        image.imgUrl,
                        product.clickCount,
                        Expressions.asNumber(0),
                        product.regTime,
                        product.updateTime,
                        Expressions.asString(productDTO.getSearchBy()),
                        Expressions.asString(productDTO.getSearchQuery())
                ))
                .from(product, image, productCategory)
                .where(product.id.eq(image.product.id).and(product.id.eq(productCategory.product.id)))
                .where(searchSellStatusEq(productDTO.getSellStatus()),
                        productTitleCateLike(productDTO.getSearchBy(), productDTO.getSearchQuery()))
                .groupBy(product.id)
                .orderBy(product.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // 찜 수 조회
        for (ProductDTO dto : content){
            Long wishedCount = queryFactory
                    .select(wishList.id.count())
                    .from(wishList)
                    .where(wishList.product.id.eq(dto.getId()))
                    .fetchOne();
            dto.setWishedCount(wishedCount.intValue());
        }

        long total = queryFactory.select(product.id.countDistinct()).from(product, image, productCategory)
                .where(product.id.eq(image.product.id).and(product.id.eq(productCategory.product.id)))
                .where(searchSellStatusEq(productDTO.getSellStatus()),
                        productTitleCateLike(productDTO.getSearchBy(), productDTO.getSearchQuery()))
                .fetchOne();

//        System.out.println("============" + total);

        return new PageImpl<>(content, pageable, total);

    }

    @Override
    public ProductFormDTO getSearchedProduct(ProductFormDTO productFormDTO) {
        QProduct product = QProduct.product;
        QImage image = QImage.image;
        QProductCategory productCategory = QProductCategory.productCategory;

        List<ProductImageDTO> imageDTOList = queryFactory
                .select(new QProductImageDTO(
                        image.id,
                        image.imgName,
                        image.oriName,
                        image.imgUrl
                ))
                .from(image)
                .where(image.product.id.eq(productFormDTO.getId()))
                .fetch();

        Product searchedProduct = queryFactory
                .select(product)
                .from(product)
                .where(product.id.eq(productFormDTO.getId()))
                .fetchOne();

        ProductCategory searchedProductCate = queryFactory
                .select(productCategory)
                        .from(productCategory)
                                .where(productCategory.product.id.eq(productFormDTO.getId()))
                                        .fetchOne();

        productFormDTO.setTitle(searchedProduct.getTitle());
        productFormDTO.setPrice(searchedProduct.getPrice());
        productFormDTO.setContent(searchedProduct.getContent());
        productFormDTO.setSellStatus(searchedProduct.getSellStatus());
        productFormDTO.setMapData(searchedProduct.getMapData());
        productFormDTO.setImageDTOList(imageDTOList);
        productFormDTO.setCategoryId(searchedProductCate.getCategory().getId());

        return productFormDTO;

    }

    @Override
    public DetailDTO getDetailDTO(Long productId) {
        QProduct product = QProduct.product;
        QCategory category =QCategory.category;
        QMember member = QMember.member;
        return null;
    }

    public List<MainProductFormDTO> getRandomProduct() {
        QProduct product = QProduct.product;
        QImage image = QImage.image;
        QWishList wishList = QWishList.wishList;

        List<MainProductFormDTO> content = queryFactory
                .select(new QMainProductFormDTO(
                        product.id,
                        product.title,
                        product.price,
                        image.imgUrl,
                        product.clickCount,
                        Expressions.asNumber(0),
                        product.updateTime
                ))
                .from(image)
                .join(image.product, product)
                .where(searchSellStatusEq(SellStatus.SELL))
                .groupBy(product.id)
                .orderBy(Expressions.numberTemplate(Double.class, "rand()").asc())
                .limit(10)
                .fetch();

        // 찜 수 조회
        for (MainProductFormDTO dto : content){
            Long wishedCount = queryFactory
                    .select(wishList.id.count())
                    .from(wishList)
                    .where(wishList.product.id.eq(dto.getId()))
                    .fetchOne();
            dto.setWishedCount(wishedCount.intValue());
        }

        return content;
    }

    @Override
    public List<MainProductFormDTO> getNewestProduct() {
        QProduct product = QProduct.product;
        QImage image = QImage.image;
        QWishList wishList = QWishList.wishList;

        List<MainProductFormDTO> content = queryFactory
                .select(new QMainProductFormDTO(
                        product.id,
                        product.title,
                        product.price,
                        image.imgUrl,
                        product.clickCount,
                        Expressions.asNumber(0),
                        product.updateTime
                ))
                .from(image)
                .join(image.product, product)
                .where(searchSellStatusEq(SellStatus.SELL))
                .groupBy(product.id)
                .orderBy(product.updateTime.desc())
                .limit(4)
                .fetch();

        // 찜 수 조회
        for (MainProductFormDTO dto : content){
            Long wishedCount = queryFactory
                    .select(wishList.id.count())
                    .from(wishList)
                    .where(wishList.product.id.eq(dto.getId()))
                    .fetchOne();
            dto.setWishedCount(wishedCount.intValue());
        }

        return content;
    }
}
