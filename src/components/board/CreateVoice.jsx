import React from 'react';
import './NoticeBoard.css';
import dummy from '../../board.json';
import NoticeBoardList from './NoticeBoardList';
import Header from '../main/Header';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './CreateVoice.css';

const CreateVoice = ({ page }) => {
  const num = dummy.length;
  return (
    <>
      <Header></Header>
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">
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
          <div className="board-footer">
            <ul className="pagination">
              <li className="page-item">
                <button>
                  <FaArrowLeft />
                </button>
              </li>
              <li className="page-item">
                <button>
                  <FaArrowRight />
                </button>
              </li>
            </ul>
            <Link to="/boardwrite">
              <button className="new-text">작성</button>
            </Link>
          </div>
        </div>
        <div className="board-rigth"></div>
      </div>
    </>
  );
};

export default CreateVoice;