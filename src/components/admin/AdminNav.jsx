import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Logo2 = () => {
  let store = useSelector(state => state);
  const [gogo, setGogo] = useState({text:'asd'});
  const gogoj = JSON.stringify(gogo)
  console.log(gogoj)
  const gogotj = JSON.parse(gogoj);
  console.log(gogotj)
  return (
    <div>
     <textarea onKeyUp={(e)=>{console.log(e.target.value); setGogo({text:e.target.value});}}></textarea>
     <textarea value={gogotj.text}></textarea>
    </div>
  )
}

const Logo = ({setModalData}) => {
  
  return (
    <h1 onClick={e=>{
      let modalData = {
        att: {
          style: {
            display: 'block',
            top: '200px',
            left: '200px',
            background: 'black',
            color: '#fff',
            width: '70%',
            height: '600px'
          },
          onClick: (e) => setModalData({ ...modalData, att: { ...modalData.att, style: {} } })
        },
        children: (
           (
              <Logo2 />
            )
        ),
        Logo2:Logo2
      }
      setModalData(modalData);
    }}>관리자모드</h1>
  )
}

const NavItem = () => {
  return (
    <ul>
      <li><NavLink to='/admin/productboard' >상품게시판</NavLink></li>
      <li><NavLink to='/admin/freeboard' >자유게시판</NavLink></li>
      <li><NavLink to='/admin/user' >회원관리</NavLink></li>
      <li><NavLink to='/admin/adminboard' >관리게시판</NavLink></li>
    </ul>
  )
}

const AdminNav = React.memo(({setModalData}) => {
  return (
    <div className='adminNav'>
      <Logo setModalData={setModalData} />
      <NavItem />
    </div>
  )
}) 

export default AdminNav