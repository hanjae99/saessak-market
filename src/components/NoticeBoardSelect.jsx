import React from 'react';

import NoticeBoard from './NoticeBoard';

const NoticeBoardSelect = () => {
  return (
    <div>
      <div className="select">
        <div className="select1">
          <select name="number">
            <option>15 개</option>
            <option>20 개</option>
            <option>30 개</option>
          </select>
        </div>
        <div className="select1">
          <button>작성</button>
        </div>
      </div>
      <NoticeBoard />
    </div>
  );
};

export default NoticeBoardSelect;
