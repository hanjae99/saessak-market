package com.saessak.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saessak.constant.SellStatus;
import com.saessak.entity.Product;
import com.saessak.entity.QImage;
import com.saessak.entity.QProduct;
import com.saessak.entity.QProductCategory;
import com.saessak.main.dto.ProductDTO;
import com.saessak.main.dto.QProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;

public class ProductRepositoryCustomImpl implements ProductRepositoryCustom{

    private JPAQueryFactory queryFactory;

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
}
