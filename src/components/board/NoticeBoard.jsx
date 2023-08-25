import React, { useCallback, useState } from 'react';
import './NoticeBoard.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ViewBoard from '../admin/ViewBoard';

const NoticeBoard = ({ page }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState('');

  const dummy = useSelector((state) => state.board);
  const viewList = {
    id: '글번호',
    title: '제목',
    writer: '작성자',
    date: '작성시간',
    clicked: '조회수',
  };

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

      <ViewBoard
        dataAry={dummy
          .filter((p) => p.title.includes(filter) || filter === '')
          .slice((page - 1) * 15, page * 15)
          .map((p) => ({
            ...p,
            date:
              new Date().getDate() === new Date(p.date).getDate()
                ? new Date(p.date).toLocaleTimeString()
                : new Date(p.date).toLocaleDateString(),
          }))}
        viewList={viewList}
      />
    </>
  );
};

export default NoticeBoard;
