import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import Header from '../main/Header';
import NoticeBoardList from './NoticeBoardList';
import { call } from '../../ApiService';
import BoardListViewer from './BoardListViewer';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BoardEditor from './BoardEditor';

const BoardEditorPage = () => {
  let title;
  const [contents, setContents] = useState("");
  const [images, setImages] = useState([]);

  console.log(contents);
  console.log(images);

  const onSubmit = (e) => {
    e.preventDefault();
    const boardTitle = e.target.elements.title.value;
    
    let imgs = images.filter(p=>contents.includes(p.url)).map(p=>p.file);
    imgs.forEach(p=>{
      
    })

  }

  return (
    <>
      <Header />
      <div className="board-main">
        <div className="board-left">
          <NoticeBoardList />
        </div>
        <div className="board-center">
        <form action="" className="createNotice" onSubmit={onSubmit}>
            <div className="cartegory-top">
              <div className="cartegory-top-left">
                <select name="category" className="categoryList">
                  <optgroup label="소통">
                    <option value="car1">자유게시판</option>
                  </optgroup>
                  <optgroup label="고객센터">
                    <option value="car2">고객의 소리</option>
                  </optgroup>
                </select>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="notice-title"
                  name="title"
                  defaultValue={title!==undefined?title:""}
                />
              </div>
              <div className="cartegory-top-right">
                <button className="createBtn" onClick={()=>{}}>
                  취소
                </button>
                <button type="submit" className="createBtn">
                  저장
                </button>
              </div>
            </div>
            <BoardEditor contents={contents} setContents={setContents} images={images} setImages={setImages} />
          </form>
        </div>
        <div className="board-rigth"></div>
      </div>
    </>
  )
}

export default BoardEditorPage