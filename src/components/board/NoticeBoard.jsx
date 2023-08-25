import React, { useCallback, useState } from 'react';
import './NoticeBoard.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const NoticeBoard = ({ page }) => {
  const dummy = useSelector((state) => state.board);
  const num = dummy.length;
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSearch = () => {
    setFilter(value);
  };

  const enterCheck = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      onSearch();
      return;
    }
  };
  return (
    <>
      <div className="searchBox">
        <form>
          <label>
            <input type="search" placeholder="제목 검색" value={value} onChange={onChange} onKeyDown={enterCheck} />
            <span onClick={onSearch}>
              <BiSearchAlt2 />
            </span>
          </label>
        </form>
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
          {dummy
            .filter((p) => p.title.includes(filter) || filter === '')
            .slice((page - 1) * 15, page * 15)
            .map((e, i) => {
              return (
                <div className="tr" key={i} onClick={() => navigate('info/' + e.id)}>
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

export default NoticeBoard;
