package com.saessak.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saessak.admin.AdminImageDTO;
import com.saessak.admin.QAdminImageDTO;
import com.saessak.board.BoardDTO;
import com.saessak.board.QBoardDTO;
import com.saessak.constant.ShowStatus;
import com.saessak.entity.QBoard;
import com.saessak.entity.QImage;
import com.saessak.entity.QMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;

public class ImageRepositoryCustomImpl implements ImageRepositoryCustom {

  private final JPAQueryFactory queryFactory;
  public ImageRepositoryCustomImpl(EntityManager em){
    this.queryFactory = new JPAQueryFactory(em);
  }



  private BooleanExpression checkAdmin(){
    return QImage.image.adminMember.isNull();
  }

  @Override
  public Page<AdminImageDTO> getAdminImagePage(Pageable pageable) {
    QImage image = QImage.image;

    List<AdminImageDTO> content = queryFactory
        .select(new QAdminImageDTO(
            image.imgUrl,
            image.member.id,
            image.board.id,
            image.product.id,
            image.id
        ))
        .from(image)
        .where(checkAdmin())
        .orderBy(image.updateTime.desc())
        .offset(pageable.getOffset())
        .limit(pageable.getPageSize())
        .fetch();




    Long total = queryFactory.select(Wildcard.count).from(image)
        .where(checkAdmin())
        .fetchOne();



    return new PageImpl<>(content, pageable, total==null?0:total);
  }
}
