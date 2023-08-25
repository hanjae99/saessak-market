import React, { useState } from 'react';
import './BoardMain.css';
import NoticeBoardList from './NoticeBoardList';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../main/Header';
import BoardNtcBd from './BoardNtcBd';

const BoardNtc = () => {
  const [page, setPage] = useState(1);
  return (
    <>
      <Header />
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">
          <BoardNtcBd page={page} />
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
          </div>
        </div>
        <div className="board-rigth"></div>
      </div>
    </>
  );
};

export default BoardNtc;
