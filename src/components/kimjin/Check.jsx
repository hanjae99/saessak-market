import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Manu.css';
import { Button } from 'react-bootstrap'
import { deleteItem } from '../../userSlice';


const Check = () => {
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
        <div className="cont  ents">
          <div className="manu-main">
            <div className="manu">
              <div className="manu-1">
                <div className='logo1'>
                  <div className='logo2'>
                    <span className='logo3'>
                      <span>새싹</span>
                    </span>
                  </div>
                </div>
                <nav>
                  <div className="li-1">
                    <div className="li-1-1"><button className="li-1-1-1" onClick={() => movePage('/user/mypage')}>마이페이지</button></div>
                    <div className="li-1-2"><button className="li-1-2-1" onClick={() => movePage('/user/check')}>상품조회</button></div>
                    <div className="li-1-3"><button className="li-1-3-1" onClick={() => movePage('/user/wishlist')}>찜 목록</button></div>
                  </div>
                </nav>
              </div>
            </div>
            <div className="section">
              <div className='section_2'>
                <div className="section-2-1"></div>
              </div>
              <div className='manu-2'>
                <div className='manu-2-1'>
                  <div className="manu-2-1-1">
                    <span className="section-title">회원정보</span>
                  </div>
                  <tbody className='tbody-1'>
                    {
                      users[1].userproduct.map((a, i) =>
                        <div key={i}>
                          <div className='table-main'>
                            <div className='table-body'>
                              <div className='table-day'>
                                "2023. 08. 23 주문"
                              </div>
                            </div>
                            <tr>
                              <td className='td-1'>
                                <div className='td-1-1'>
                                  <div className='td-1-1-1'>
                                    <span className='td-1-1-1-1'>
                                      구매확정
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <div className='text-1'>
                                    <div className='text-1-1'>
                                      <div className='text-2'>
                                        <div className='text-2-1'>
                                          <div className='text-2-img'><img src={users[1].userproduct[i].imgsrc1} alt="" /></div>
                                          <div className='text-2-name'>
                                            <div className='text-2-name-1'>
                                              <div className='text-2-name-1-1'>{users[1].userproduct[i].name}</div>
                                              <div className='text-2-name-1-2'>{users[1].userproduct[i].price}</div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className='td-2'>
                                <div className='text-button'>
                                  <Button onClick={() => {
                                    dispatch({ type: "user/deleteItem", payload: users[1].userproduct[i].id })
                                  }} variant="outline-danger" className='text-button-1'>상품삭제</Button>
                                </div>
                              </td>
                            </tr>
                          </div>
                        </div>
                      )
                    }
                  </tbody>
                </div>
              </div>
            </div>
          </div>
          <div className='so1'></div>
        </div>
      </body >
      <footer>
        <h1>발바닥</h1>
      </footer>
    </div >
  )
}

export default Check