package com.saessak.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saessak.constant.SellStatus;
import com.saessak.detail.dto.CategoryProductDTO;
import com.saessak.entity.QImage;
import com.saessak.entity.QProduct;
import com.saessak.entity.QProductCategory;

import javax.persistence.EntityManager;
import java.util.List;

public class ProductCategoryCustomRepositoryImpl implements ProductCategoryCustomRepository {

    private JPAQueryFactory queryFactory;

    public ProductCategoryCustomRepositoryImpl(EntityManager em){

        this.queryFactory = new JPAQueryFactory(em);
    }

    private BooleanExpression searchSellStatusEq(SellStatus sellStatus){
        if (sellStatus == null){
            sellStatus = SellStatus.SELL;
        }
        return QProduct.product.sellStatus.eq(sellStatus);
    }

    @Override
    public List<CategoryProductDTO> cateRandomData(Long categoryId) {
//        QProduct product =QProduct.product;
//        QImage image =QImage.image;
//        QProductCategory productCategory =QProductCategory.productCategory;
//
//        List<CategoryProductDTO> dateList =queryFactory
//                .select(new QProduct(productCategory.product.id,
//                        product.price,
//                        product.title,
//                        image.imgUrl,
//                        productCategory.category.id))
//                .from(productCategory)
//                .join(productCategory.product,product)
//                .join(image.product, product)
//                .where()
//                .groupBy(product.id)
//                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
//                .limit(4);

        return null;
    }
}
