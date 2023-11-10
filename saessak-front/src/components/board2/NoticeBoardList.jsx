import React from "react";
import "./NoticeBoardList.css";
import { Link } from "react-router-dom";

const NoticeBoardList = () => {
  const post = ["자유게시판", "자주 찾는 질문", "공지사항", "문의게시판"];

  return (
    <div className="notice-box">
      <div className="menuBtn1" style={{width:'100%', alignItems:'center'}}>
        {/* <img src="/img/leaf2.png" alt="" className="menuBtn1-img" style={{width:'50%', height:'80%'}} /> */}
      </div>
      <ul className="notice-list">
        <h3 style={{ fontSize: "1.1rem" }} className="board-list-h3">
          소통
        </h3>
        <hr className="notice-hr" />
        <li value="자유게시판" className="board_li">
          <Link to="/board/list/main" className="board_1">
            {post[0]}
          </Link>
        </li>
      </ul>
      <ul className="notice-list">
        <h3 className="board-list-h3" style={{ fontSize: "1.1rem" }}>
          고객센터
        </h3>
        <hr className="notice-hr" />
        <li value="공지사항" className="board_li">
          <Link to="/board/list/ntc" className="board_1">
            {post[2]}
          </Link>
        </li>
        <li value="문의게시판" className="board_li">
          <Link to="/board/list/voc" className="board_1">
            {post[3]}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NoticeBoardList;
