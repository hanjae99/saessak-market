import React from 'react'
import { NavLink } from 'react-router-dom'


const Logo = () => {
  return (
    <h1><NavLink to='/admin' >관리자모드</NavLink></h1>
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

const AdminNav = () => {
  return (
    <div className='adminNav'>
      <Logo />
      <NavItem />
    </div>
  )
}

export default AdminNav