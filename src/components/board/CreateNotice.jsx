import React from 'react';
import './CreateNotice.css';
import Header from '../main/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CreateNotice = () => {
  const navigate = useNavigate();
  const board = useSelector((state) => state.board);
  const [serchParams, setSearchParams] = useSearchParams();
  const upId = serchParams.get('id');

  const onClickBtn = () => {
    navigate('/boardmain');
  };
  const dispatch = useDispatch();
  const handleCreate = (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const content = e.target.elements.content.value;

    const newCreate = {
      id: upId / 1,
      title,
      content,
    };

    upId === null
      ? dispatch({ type: 'board/add', payload: newCreate })
      : dispatch({ type: 'board/fix', payload: newCreate });
    navigate('/boardmain');
  };

  return (
    <>
      <Header />
      <div className="create_main">
        <div className="create-left"></div>
        <div className="create-center">
          <form action="" className="createNotice" onSubmit={handleCreate}>
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
                  defaultValue={upId === null ? '' : board.find((p) => upId / 1 === p.id).title}
                />
              </div>
              <div className="cartegory-top-right">
                <button className="createBtn" onClick={onClickBtn}>
                  취소
                </button>
                <button type="submit" className="createBtn">
                  저장
                </button>
              </div>
            </div>
            <textarea
              className="textBoard"
              name="content"
              defaultValue={upId === null ? '' : board.find((p) => upId / 1 === p.id).content}
            ></textarea>
          </form>
        </div>
        <div className="create-right"></div>
      </div>
    </>
  );
};

export default CreateNotice;
