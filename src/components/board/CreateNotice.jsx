import React from 'react';
import './CreateNotice.css';
import Header from '../main/Header';

const CreateNotice = () => {
  return (
    <>
      <Header />
      <div className="create_main">
        <div className="create-left"></div>
        <div className="create-center">
          <form action="" className="createNotice">
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
                <input type="text" placeholder="제목을 입력하세요" className="title" name="textTitle" />
              </div>
              <div className="cartegory-top-right">
                <button className="createBtn">취소</button>
                <button className="createBtn">저장</button>
              </div>
            </div>
            <textarea className="textBoard" name="textBoard"></textarea>
          </form>
        </div>
        <div className="create-right"></div>
      </div>
    </>
  );
};

export default CreateNotice;
