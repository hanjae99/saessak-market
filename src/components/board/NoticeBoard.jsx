import React from 'react';
import './NoticeBoard.css';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const NoticeBoard = ({ page }) => {
  const dummy = useSelector((state) => state.board);
  const num = dummy.length;
  return (
    <>
      <div className="search">
        <input type="text" placeholder="제목 검색" />
        <FaSearch className="search-icon" size="30" />
      </div>
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th">번호</div>
            <div className="th">제목</div>
            <div className="th">작성자</div>
            <div className="th">작성일</div>
            <div className="th">조회수</div>
          </div>
        </div>
        <div className="tbody">
          {dummy.slice((page - 1) * 15, page * 15).map((e, i) => {
            return (
              <div className="tr" key={i}>
                <div className="td">{num - i - (page - 1) * 15}</div>
                <div className="td">{e.title}</div>
                <div className="td">{e.writer}</div>
                <div className="td">
                  {new Date().getDate() === new Date(e.date).getDate()
                    ? new Date(e.date).toLocaleTimeString()
                    : new Date(e.date).toLocaleDateString()}
                </div>
                <div className="td">{e.clicked}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NoticeBoard;
