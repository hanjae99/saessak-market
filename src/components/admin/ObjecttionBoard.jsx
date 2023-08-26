import React from 'react'
import { useSelector } from 'react-redux'
import ViewBoard from './ViewBoard'


// commentId: commentId++ +'',
// upTime: "2023.08.21 05:39",
// fixTime: "2023.08.21 05:39",
// title: '제가 왜 정지당한거죠???',
// writer: 'psh',
// content : '풀어줘요!!'

const ObjecttionBoard = ({setViewPage}) => {
  const objecttionData = useSelector(state => state.objecttion);
  const users = useSelector(state => state.user);
  const viewList = {
    id: '글번호',
    title: '제목',
    writer: '작성자',
    upTime: "작성시간",
    viewCount: "조회수"
  }
  function onClick(e,p) {
    setViewPage(['2',p.id]);
  }
  return (
    <div className='objectionBoard'>
      <ViewBoard dataAry={objecttionData.map(p => ({ ...p, writer: users.find(q => q.id === p.writer).nickname }))} viewList={viewList} onClick={onClick}/>
    </div>
  )
}

export default ObjecttionBoard