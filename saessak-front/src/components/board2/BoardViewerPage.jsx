import React, { useEffect, useState } from 'react';
import './BoardMain.css';
import './BoardInfo.css';
import './NoticeBoard.css';
import NoticeBoardList from './NoticeBoardList';
import Header from '../main/Header';
import { useParams } from 'react-router';
import CommentViewer from './CommentViewer';
import { RxEraser } from 'react-icons/rx';
import { BsPencil } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BoardViewer from './BoardViewer';
import { call } from '../../ApiService';
import { API_BASE_URL } from '../../ApiConfig';

const BoardViewerPage = () => {
  const { boardName, boardId } = useParams();
  const bn = boardName !== undefined ? boardName : "main";
  const [data, setData] = useState({title:"", content:"", clickCount:"", recommend:"", regTime:Date.now(), writer:""});
  const dispatch = useDispatch();


  useEffect(() => {
    const url = "/board/" + bn + "/detail/" + boardId;
    // console.log("url :", url);
    call(url, "GET").then(response => {
      console.log("response",response);
      if (response !== undefined) {
        setData(response);
        dispatch({type:'boardData/setData',payload:response});
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardName,boardId])

  const navigate = useNavigate();

  const handleDel = (e) => {
    call("/board/delete/"+boardId, "DELETE").then((response) => {
      console.log("res",response);
      if (response&&response.msg === "ok") {
        navigate('/board/list/'+boardName);
      }
    });
  };

  const handleFix = (e) => {
    navigate('/board/write/'+bn+'/'+boardId);
  };

  const contents = data.list&&data.list[0].content?data.list[0].content.split('"').join("'").split("$back$").join(API_BASE_URL):"";

  // console.log(contents);

  return (
    <>
      <Header />
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">
          <h1>{data.list&&data.list[0].title}</h1>
          <div className="board-info-head">
            글쓴이 :　<span className="board-info-head-left"> {data.list&&data.list[0].writer}</span>
            조회수 :　<span className="board-info-head-center"> {data.list&&data.list[0].clickCount}</span>
            작성일 :　<span className="board-info-head-right"> {new Date(data.list&&data.list[0].regTime).toLocaleString()}</span>
            
            {data.isMaster!=="no"&&(<><div onClick={handleFix} className="board-info-btn">
              <BsPencil />
              <span className="board-info-btn-text">수정</span>
            </div>
            <div onClick={handleDel} className="board-info-btn">
              <RxEraser />
              <span className="board-info-btn-text">삭제</span>
            </div></>)}
          </div>
          <hr />
          <div className="info_board">
            {data.list!==undefined?<BoardViewer contents={contents+"<br><br><br>"} />:""}
          </div>
          <CommentViewer isAnonymous={false} parent={bn} parentId={boardId} />
        </div>
        <div className="board-rigth"></div>
      </div>
    </>
  );
};

export default BoardViewerPage;
