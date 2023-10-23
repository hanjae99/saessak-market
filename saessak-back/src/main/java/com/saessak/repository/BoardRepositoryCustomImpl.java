package com.saessak.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.saessak.board.BoardDTO;
import com.saessak.board.BoardSearchDTO;
import com.saessak.board.QBoardDTO;
import com.saessak.constant.ShowStatus;
import com.saessak.entity.QBoard;
import com.saessak.entity.QMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;

public class BoardRepositoryCustomImpl implements BoardRepositoryCustom {

  private final JPAQueryFactory queryFactory;
  public BoardRepositoryCustomImpl(EntityManager em){
    this.queryFactory = new JPAQueryFactory(em);
  }

  private BooleanExpression checkBoardName(String boardName) {
    return QBoard.board.boardName.eq(boardName);
  }

  private BooleanExpression checkStatus(ShowStatus showStatus){
    if (showStatus == null){
      showStatus = ShowStatus.SHOW;
    }
    return QBoard.board.showStatus.eq(showStatus);
  }

  private BooleanExpression searchCheck(String searchQuery, String searchBy){

    if ( searchQuery == null || searchBy == null ) {
      return null;
    }

    if (searchBy.equals("name")) {
      return QMember.member.nickName.eq(searchQuery);
    }

    if (searchBy.equals("title")) {
      return QBoard.board.title.like("%"+searchQuery+"%");
    }

    if (searchBy.equals("content")) {
      return QBoard.board.content.like("%"+searchQuery+"%");
    }



    return null;
//
//
//    return searchQuery == null ? null :
//        QProduct.product.title.like("%" + searchQuery + "%");
  }

  @Override
  public Page<BoardDTO> getSearchBoardPage(BoardSearchDTO boardSearchDTO, Pageable pageable) {
    QBoard board = QBoard.board;
    QMember member = QMember.member;

    List<BoardDTO> content = queryFactory
        .select(new QBoardDTO(
            board.id,
            board.boardName,
            board.title,
            board.content,
            board.clickCount,
            board.recommend,
            board.showStatus,
            board.regTime,
            board.updateTime,
            member.nickName
        ))
        .from(board)
        .join(board.member, member)
        .where(checkStatus(boardSearchDTO.getSearchBoardStatus()),
            searchCheck(boardSearchDTO.getSearchQuery(), boardSearchDTO.getSearchBy()),
            checkBoardName(boardSearchDTO.getBoardName()))
        .orderBy(board.id.desc())
        .offset(pageable.getOffset())
        .limit(pageable.getPageSize())
        .fetch();



    Long total = queryFactory.select(Wildcard.count).from(board)
        .where(checkStatus(boardSearchDTO.getSearchBoardStatus()),
            searchCheck(boardSearchDTO.getSearchQuery(), boardSearchDTO.getSearchBy()))
        .fetchOne();



    return new PageImpl<>(content, pageable, total==null?0:total);
  }
}
