import React from 'react';
import './NoticeBoardList.css';

const NoticeBoardList = () => {
  const post = ['자유게시판', '자주 찾는 질문', '고객의 소리', '공지사항'];

  return (
    <div>
      <ul className="notice-list">
        <h3>소통</h3>
        <li value="자유게시판">
          <a href="/boardmain">{post[0]}</a>
        </li>
      </ul>
      <ul>
        <h3>고객센터</h3>
        <li value="고객의 소리">
          <a href="/boardmain/1">{post[2]}</a>
        </li>
        <li value="공지사항">
          <a href="/boardmain/2">{post[3]}</a>
        </li>
      </ul>
    </div>
  );
};

export default NoticeBoardList;
