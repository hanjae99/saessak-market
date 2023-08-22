import React from 'react'
import { useNavigate } from 'react-router-dom'

const Check = () => {
  const movePage = useNavigate();
  return (
    <div>
      <button onClick={() => movePage('/user/mypage')}>마이페이지</button>
      <button onClick={() => movePage('/user/check')}>상품 조회</button>
      <button onClick={() => movePage('/user/wishlist')}>찜 목록</button>
    </div>
  )
}

export default Check