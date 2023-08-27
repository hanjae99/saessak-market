import React from 'react';
import './BoardMain.css';
import './BoardInfo.css';
import NoticeBoardList from './NoticeBoardList';
import Header from '../main/Header';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import CommentViewer from '../admin/CommentViewer';

const BoardNtcInfo = () => {
  const { id } = useParams();
  const dummy = useSelector((state) => state.ntcData);
  const ntcData = dummy.find((p) => p.id === id / 1);

  return (
    <>
      <Header />
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">
          <h3>카테고리</h3>
          <h1>{ntcData.title}</h1>
          <div className="board-info-head">
            <span className="board-info-head-left">{ntcData.writer}</span>
            <span className="board-info-head-center">{ntcData.clicked}</span>
            <span className="board-info-head-right">{new Date(ntcData.date).toLocaleString()}</span>
          </div>
          <hr />
          <div className="info_board">{ntcData.content}</div>
          <CommentViewer isAnonymous={false} parent={'ntcData'} parentId={id} />
        </div>
        <div className="board-rigth"></div>
      </div>
    </>
  );
};

export default BoardNtcInfo;
