package com.saessak.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saessak.constant.SellStatus;
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

    private BooleanExpression productTitleLike(String searchQuery){
//        if (searchBy.equals("product_title")){
//           return QProduct.product.title.like("%" + searchQuery + "%");
//        }else if (searchBy.equals("category_num")){
//            return QProductCategory.productCategory.category.in
//        }
        return searchQuery == null ? null : QProduct.product.title.like("%" + searchQuery + "%");
    }

    // 페이징 처리된 상품 검색 목록 가져오기
    @Override
    public Page<ProductDTO> getSearchedProductPage(ProductDTO productDTO, Pageable pageable) {

        QProduct product = QProduct.product;
        QImage image = QImage.image;

        List<ProductDTO> content = queryFactory
                .select(new QProductDTO(
                        product.title,
                        product.price,
                        product.sellStatus,
                        image.imgUrl,
                        product.regTime,
                        product.updateTime
                ))
                .from(image)
                .join(image.product, product)
                .where(searchSellStatusEq(productDTO.getSellStatus()),
                        productTitleLike(productDTO.getTitle()))
                .orderBy(product.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory.select(Wildcard.count).from(product)
                .where(searchSellStatusEq(productDTO.getSellStatus()),
                        productTitleLike(productDTO.getTitle()))
                .fetchOne();

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
        productFormDTO.setCategoryId(searchedProductCate.getId());

        return productFormDTO;

    }


}
