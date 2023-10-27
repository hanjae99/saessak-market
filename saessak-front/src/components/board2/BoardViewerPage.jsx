import React, { useEffect, useState } from 'react';
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
import BoardViewer from './BoardViewer';
import { call } from '../../ApiService';

const BoardViewerPage = () => {
  const { boardName, boardId } = useParams();
  const bn = boardName !== undefined ? boardName : "main";
  const [data, setData] = useState({title:"", content:"", clickCount:"", recommend:"", regTime:Date.now(), writer:""});


  useEffect(() => {
    const url = "/board/" + bn + "/detail/" + boardId;
    // console.log("url :", url);
    call(url, "GET").then(response => {
      console.log("response",response);
      if (response !== undefined) {
        setData(response);
      }
    })
  }, [boardName,boardId])








  const navigate = useNavigate();

  const handleDel = (e) => {
    navigate('/boardmain');
  };

  const handleFix = (e) => {
    navigate('/boardwrite?id=');
  };

  console.log(data.list&&data.list[0]);

  return (
    <>
      {/* <Header />
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">
          <h3>카테고리</h3>
          <h1>{data.list&&data.list[0].title}</h1>
          <div className="board-info-head">
            <span className="board-info-head-left">{data.list&&data.list[0].writer}</span>
            <span className="board-info-head-center">{data.list&&data.list[0].clickCount},{data.list&&data.list[0].recommend}</span>
            <span className="board-info-head-right">{new Date(data.list&&data.list[0].regTime).toLocaleString()}</span>
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
          <div className="info_board"> */}
            <BoardViewer contents={data.list&&data.list[0].content} />
          {/* </div>
          <CommentViewer isAnonymous={false} parent={'board/main'} parentId={boardId} />
        </div>
        <div className="board-rigth"></div>
      </div> */}
    </>
  );
};

export default BoardViewerPage;
