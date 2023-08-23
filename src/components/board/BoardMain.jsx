import React, { useState } from 'react';
import './BoardMain.css';
import NoticeBoard from './NoticeBoard';
import NoticeBoardList from './NoticeBoardList';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BoardMain = () => {
  const [page, setPage] = useState(1);
  return (
    <div className="board-main">
      <div className="board-left">
        <NoticeBoardList />
      </div>
      <div className="board-center">
        <NoticeBoard page={page} />
        <div className="board-footer">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              >
                <FaArrowLeft />
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
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
  );
};

export default BoardMain;
