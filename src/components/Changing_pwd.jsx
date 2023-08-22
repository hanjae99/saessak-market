import React from 'react'
import { useNavigate } from 'react-router-dom';

const Changing_pwd = () => {
  const movePage = useNavigate();
  return (
    <div>
      <button onClick={() => movePage('/user/changing')}>확인</button>
      <button onClick={() => movePage('/user/mypage')}>취소</button>
    </div>
  )
}

export default Changing_pwd