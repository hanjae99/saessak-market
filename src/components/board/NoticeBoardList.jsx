import React from 'react';
import './NoticeBoardList.css';
import { Link } from 'react-router-dom';

const NoticeBoardList = () => {
  const post = ['자유게시판', '자주 찾는 질문', '고객의 소리', '공지사항'];

  return (
    <div className="notice-box">
      <ul className="notice-list">
        <h3 className="board-list-h3">소통</h3>
        <hr />
        <li value="자유게시판" className="board_li">
          <Link to="/boardmain" className="board_1">
            {post[0]}
          </Link>
        </li>
      </ul>
      <ul className="notice-list">
        <h3 className="board-list-h3">고객센터</h3>
        <hr />
        <li value="고객의 소리" className="board_li">
          <Link to="/boardmain/1" className="board_1">
            {post[2]}
          </Link>
        </li>
        <li value="공지사항" className="board_li">
          <Link to="/boardmain/ntc" className="board_1">
            {post[3]}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NoticeBoardList;
