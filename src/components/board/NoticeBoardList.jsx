import React from 'react';
import './NoticeBoardList.css';

const NoticeBoardList = () => {
  const post = ['자유게시판', '자주 찾는 질문', '고객의 소리', '공지사항'];

  return (
    <div>
      <ul className="notice-list">
        <h3>소통</h3>
        <li value="자유게시판" className="board_li">
          <a href="/boardmain" className="board_1">
            {post[0]}
          </a>
        </li>
      </ul>
      <ul>
        <h3>고객센터</h3>
        <li value="고객의 소리" className="board_li">
          <a href="/boardmain/1" className="board_1">
            {post[2]}
          </a>
        </li>
        <li value="공지사항" className="board_li">
          <a href="/boardmain/2" className="board_1">
            {post[3]}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NoticeBoardList;
