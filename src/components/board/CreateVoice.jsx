import React from 'react';
import './NoticeBoard.css';
import dummy from '../../board.json';
import NoticeBoardList from './NoticeBoardList';
const CreateVoice = ({ page }) => {
  const num = dummy.length;
  return (
    <div className="board-main">
      <div className="board-left">
        <NoticeBoardList />
      </div>
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th">번호</div>
            <div className="th">제목</div>
            <div className="th">작성자</div>
            <div className="th">작성일</div>
            <div className="th">조회수</div>
            <div className="th">추천</div>
          </div>
        </div>
        <div className="tbody">
          {dummy.slice((page - 1) * 15, page * 15).map((e, i) => {
            return (
              <div className="tr" key={i}>
                <div className="td"></div>
                <div className="td"></div>
                <div className="td"></div>
                <div className="td"></div>
                <div className="td"></div>
                <div className="td"></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="board-rigth"></div>
    </div>
  );
};

export default CreateVoice;
