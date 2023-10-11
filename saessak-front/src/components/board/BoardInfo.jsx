import React from 'react';
import './BoardMain.css';
import './BoardInfo.css';
import NoticeBoardList from './NoticeBoardList';
import Header from '../main/Header';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import CommentViewer from '../admin/CommentViewer';
import { RxEraser } from 'react-icons/rx';
import { BsPencil } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BoardInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const infoData = useSelector((state) => state.board);
  const selectData = infoData.find((p) => p.id === id / 1);

  const handleDel = (e) => {
    dispatch({ type: 'board/del', payload: id });
    navigate('/boardmain');
  };

  const handleFix = (e) => {
    navigate('/boardwrite?id=' + id);
  };

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
            <div onClick={handleFix} className="board-info-btn">
              <BsPencil />
              <span className="board-info-btn-text">수정</span>
            </div>
            <div onClick={handleDel} className="board-info-btn">
              <RxEraser />
              <span className="board-info-btn-text">삭제</span>
            </div>
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
