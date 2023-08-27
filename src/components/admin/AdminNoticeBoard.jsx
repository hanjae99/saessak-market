import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

const ADBoardNtcBd = ({ page,setViewPage }) => {
  const dummy = useSelector((state) => state.ntcData);
  const num = dummy.length;

  return (
    <>
      <div className="search">
        <input type="text" placeholder="제목 검색" />
        <FaSearch className="search-icon" size="30" />
      </div>
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th">번호</div>
            <div className="th">제목</div>
            <div className="th">작성자</div>
            <div className="th">작성일</div>
            <div className="th">조회수</div>
          </div>
        </div>
        <div className="tbody">
          {dummy.slice((page - 1) * 15, page * 15).map((e, i) => {
            return (
              <div className="tr" key={i} onClick={() => setViewPage(['2',e.id])}>
                <div className="td">{num - i - (page - 1) * 15}</div>
                <div className="td">{e.title}</div>
                <div className="td">{e.writer}</div>
                <div className="td">
                  {new Date().getDate() === new Date(e.date).getDate()
                    ? new Date(e.date).toLocaleTimeString()
                    : new Date(e.date).toLocaleDateString()}
                </div>
                <div className="td">{e.clicked}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};





const ADBoardNtc = ({setViewPage}) => {
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
          <h3 onClick={()=>setViewPage(['1','1'])}>뒤로가기</h3>
          <h1>{ntcData.title}</h1>
          <div className="board-info-head">
            <span className="board-info-head-left">{ntcData.writer}</span>
            <span className="board-info-head-center">{ntcData.clicked}</span>
            <span className="board-info-head-right">{new Date(ntcData.date).toLocaleString()}</span>
          </div>
          <hr />
          <div className="info_board">{ntcData.content}</div>
          <div className="info_comment">
            <div>작성자</div>
            <div>댓글</div>
            <div>
              작성일자 <span>답글쓰기</span>
            </div>
          </div>
          <div className="info_comment">
            <div>작성자</div>
            <div>댓글</div>
            <div>
              작성일자 <span>답글쓰기</span>
            </div>
          </div>
        </div>
    </>
  );
};

const AdminNoticeBoard = () => {
  const [viewPage, setViewPage] = useState(['1','1']);
  return (
    <>
      { viewPage[0] === '1' ? 
      <ADBoardNtc setViewPage={setViewPage} /> :
      <ADBoardInfo viewPage={viewPage} setViewPage={setViewPage} /> }
    </>
  )
}

export default AdminNoticeBoard