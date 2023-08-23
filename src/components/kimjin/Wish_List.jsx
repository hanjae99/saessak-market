import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Manu.css';
import { Button } from 'react-bootstrap'
import { deleteItem } from '../../userSlice';


const Wish_List = () => {
  const movePage = useNavigate();
  const users = useSelector(state => state.user);
  // console.log(users[1].userproduct.id)
  const dispatch = useDispatch();


  return (
    <div className="all">
      <header >
        <h1 className='header'>새싹마켓</h1>
      </header>
      <body>

        <div className="manu-main">
          <div className="manu">
            <div className="manu-1">
              <div className="li-1"><button onClick={() => movePage('/user/mypage')}>마이페이지</button></div>
              <div className="li-2"><button onClick={() => movePage('/user/check')}>상품조회</button></div>
              <div className="li-3"><button onClick={() => movePage('/user/wishlist')}>찜 목록</button></div>
            </div>
          </div>
          <div className="section">
            <div className='section_2'>
              <div className='table1'>
                <div className='thead1'>
                  <tr>
                    <th>상품이미지</th>
                    <th>상품명</th>
                    <th>가격</th>
                  </tr>
                </div>
                <div className='tbody1'>
                  {
                    users[1].userproduct.map((a, i) =>
                      <div key={i}>
                        <div className='img2'><img src={users[2].userproduct[i].imgsrc1} alt="" className='img1' /></div>
                        <div className='text1'>{users[2].userproduct[i].name}</div>
                        <div className='text1'>{users[2].userproduct[i].price}</div>
                        <Button onClick={() => {
                          dispatch({ type: "user/deleteItem", payload: users[1].userproduct[i].id })
                        }} variant="outline-danger">상품삭제</Button>
                        <div>
                          판매중
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      <footer>
        <h1>발바닥</h1>
      </footer>
    </div>
  )
}

export default Wish_List