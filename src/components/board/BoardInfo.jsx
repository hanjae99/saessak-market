import React, { useState } from 'react';
import './BoardMain.css';
import './BoardInfo.css';
import NoticeBoardList from './NoticeBoardList';
import Header from '../main/Header';

const BoardInfo = () => {
  const [page, setPage] = useState(1);
  return (
    <>
      <Header />
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">
          <h3>카테고리</h3>
          <h1>제목</h1>
          <hr />
          <div className="info_board">내용</div>
          <div className="info_comment">
            <div>작성자</div>
            <div>댓글</div>
            <div>
              작성일자 <span>답글쓰기</span>
            </div>
          </div>
          <div className="info_comment">
            <div>작성자</div>
            <div>댓글</div>
            <div>
              작성일자 <span>답글쓰기</span>
            </div>
          </div>
        </div>
        <div className="board-rigth"></div>
      </div>
    </>
  );
};

export default BoardInfo;
