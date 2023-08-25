import React, { useState } from 'react';
import './BoardMain.css';
import './BoardInfo.css';
import NoticeBoardList from './NoticeBoardList';
import Header from '../main/Header';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

const BoardNtcInfo = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const dummy = useSelector((state) => state.ntcData);
  const ntcData = dummy.find((p) => p.id === id / 1);

  return (
    <>
      <Header />
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">
          <h3>카테고리</h3>
          <h1>{ntcData.title}</h1>
          <div className="board-info-head">
            <span className="board-info-head-left">{ntcData.writer}</span>
            <span className="board-info-head-center">{ntcData.clicked}</span>
            <span className="board-info-head-right">{new Date(ntcData.date).toLocaleString()}</span>
          </div>
          <hr />
          <div className="info_board">{ntcData.content}</div>
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

export default BoardNtcInfo;