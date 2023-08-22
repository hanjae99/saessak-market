import React from 'react'
import { useNavigate } from 'react-router-dom'

const Changing = () => {
  const movePage = useNavigate();
  return (
    <div>
      <button onClick={() => movePage('mypage')}>수정 완료</button>
    </div>
  )
}

export default Changing