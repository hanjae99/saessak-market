import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Header from '../main/Header';
import NoticeBoardList from './NoticeBoardList';

const BoardPage = () => {
  const {boardName} = useParams();
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(boardName,searchParams.get("page"),window.location.search);

  useEffect(()=>{

    

  },[boardName,window.location.search])


  return (
    <>
    <Header />
    <div className="board-main">
      <div className="board-left">
        <NoticeBoardList />
      </div>
      <div className="board-center">
        {boardName}
      </div>
      <div className="board-rigth"></div>
    </div>
  </>
  )
}

export default BoardPage