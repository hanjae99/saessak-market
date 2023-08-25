import React, { useState } from 'react'
import ObjecttionBoard from './ObjecttionBoard';
import { useSelector } from 'react-redux';



const ObjecttionDetail = ({ viewPage, setViewPage }) => {
  const id = viewPage[1];
  const dummy = useSelector((state) => state.objecttion);
  const users = useSelector(state=>state.user)
  const ntcData = dummy.find((p) => p.id === id);

  return (
    <div className='objecttionDetail'>
        <div className="board-center">
          <h3 onClick={()=>setViewPage(['1','1'])}>뒤로가기</h3>
          <h1>{ntcData.title}</h1>
          <div className="board-info-head">
            <span className="board-info-head-left">{users.find(p=>p.id===ntcData.writer).nickname }</span>
            <span className="board-info-head-center">{ntcData.viewCount}</span>
            <span className="board-info-head-right">{new Date(ntcData.upTime).toLocaleString()}</span>
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
    </div>
  );
};


const ObjecttionViewer = () => {
  const [viewPage, setViewPage] = useState(['1','1']);
  return (
    <>
      { viewPage[0] === '1' ? 
      <ObjecttionBoard setViewPage={setViewPage} /> :
      <ObjecttionDetail viewPage={viewPage} setViewPage={setViewPage} /> }
    </>
  )
}

export default ObjecttionViewer