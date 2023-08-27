import React, { useState } from 'react';
import './BoardMain.css';
import './BoardInfo.css';
import NoticeBoardList from './NoticeBoardList';
import Header from '../main/Header';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import CommentViewer from '../admin/CommentViewer'

const BoardInfo = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const infoData = useSelector((state) => state.board);
  const selectData = infoData.find((p) => p.id === id / 1);
  return (
    <>
      <Header />
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">
          <h3>카테고리</h3>
          <h1>{infoData.find((p) => p.id === id / 1).title}</h1>
          <div className="board-info-head">
            <span className="board-info-head-left">{selectData.writer}</span>
            <span className="board-info-head-center">{selectData.clicked}</span>
            <span className="board-info-head-right">{new Date(selectData.date).toLocaleString()}</span>
          </div>
          <hr />
          <div className="info_board">{selectData.content}</div>
          <CommentViewer isAnonymous={false} parent={'board'} parentId={id} />
        </div>
        <div className="board-rigth"></div>
      </div>
    </>
  );
};

export default BoardInfo;
