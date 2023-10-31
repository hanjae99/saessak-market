import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import ViewBoard from './ViewBoard';
import CommentViewer from '../board2/CommentViewer';

const ADBoardNtcBd = ({ page, setViewPage }) => {
  const dummy = useSelector((state) => state.ntcData);

  const viewList = {
    id: '번호',
    title: '제목',
    writer: '작성자',
    date: "작성일",
    clicked: "조회수"
  }
  function onClick(e, p) {
    setViewPage(['2', p.id]);
  }
  return (
    <>
      <div className="search">
        
      </div>
      <div className='objectionBoard'>
        <ViewBoard dataAry={dummy.slice((page - 1) * 15, page * 15).map(e => ({
          ...e, date: new Date().getDate() === new Date(e.date).getDate()
            ? new Date(e.date).toLocaleTimeString()
            : new Date(e.date).toLocaleDateString()
        }))} viewList={viewList} onClick={onClick} />
      </div>
    </>
  );
};





const ADBoardNtc = ({ setViewPage }) => {
  const [page, setPage] = useState(1);
  return (
    <>
      <div className="board-center">
        <ADBoardNtcBd page={page} setViewPage={setViewPage} />
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
          {/* <Link to="/boardwrite"> */}
          <button className="new-text">작성</button>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};


const ADBoardInfo = ({ viewPage, setViewPage }) => {
  const id = viewPage[1];
  const dummy = useSelector((state) => state.ntcData);
  const ntcData = dummy.find((p) => p.id === id / 1);

  return (
    <>
      <div className="board-center">
        <h3 onClick={() => setViewPage(['1', '1'])}>뒤로가기</h3>
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
    </>
  );
};

const AdminNoticeBoard = () => {
  const [viewPage, setViewPage] = useState(['1', '1']);
  return (
    <>
      {viewPage[0] === '1' ?
        <ADBoardNtc setViewPage={setViewPage} /> :
        <ADBoardInfo viewPage={viewPage} setViewPage={setViewPage} />}
    </>
  )
}

export default AdminNoticeBoard