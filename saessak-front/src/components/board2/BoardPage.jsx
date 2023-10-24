import React, { useEffect, useState } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import Header from '../main/Header';
import NoticeBoardList from './NoticeBoardList';
import { call } from '../../ApiService';
import BoardListViewer from './BoardListViewer';

const BoardPage = () => {
  const {boardName} = useParams();
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewData, setVeiwData] = useState([]);
  const [viewList, setViewList] = useState({
    id: '글번호',
    title: '제목',
    writer: '작성자',
    date: '작성시간',
    clicked: '조회수',
  });
  const [pageSize, setPageSize] = useState(15);

  useEffect(()=>{
    const url = "/board/"+(boardName!==undefined?boardName:"main")+(searchParams.get("page")?"/"+searchParams.get("page"):"/1");
    console.log("url :", url)
    call(url,"GET").then(response => {
      console.log(response);
      setVeiwData(response.list);
      setPageSize(response.msg);
    })
  },[boardName,window.location.search])


  

  const onViewListClick = (e,p) => {Navigate('info/' + p.id)} 

  if (viewData.length < pageSize) {
    const dumy = pageSize - viewData.length;
    for ( let i=0; i<dumy; i++ ) {
      viewData.push({id:"nodata"})
    }
  }
  
  return (
    <>
    <Header />
    <div className="board-main">
      <div className="board-left">
        <NoticeBoardList />
      </div>
      <div className="board-center">
      <BoardListViewer
        dataAry={viewData}
        viewList={viewList} 
        onClick={onViewListClick}/>
      </div>
      <div className="board-rigth"></div>
    </div>
  </>
  )
}

export default BoardPage