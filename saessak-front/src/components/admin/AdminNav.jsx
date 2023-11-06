import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

// const Logo2 = () => {
//   let store = useSelector(state => state);
//   const [gogo, setGogo] = useState({ text: 'asd' });
//   const gogoj = JSON.stringify(gogo)
//   console.log(gogoj)
//   const gogotj = JSON.parse(gogoj);
//   console.log(gogotj)
//   return (
//     <div>
//       <textarea onKeyUp={(e) => { console.log(e.target.value); setGogo({ text: e.target.value }); }}></textarea>
//       <textarea value={gogotj.text}></textarea>
//     </div>
//   )
// }

const Logo = ({ setModalData }) => {

  return (
    <h1
    //  onClick={e => {
    //   let modalData = {
    //     att: {
    //       style: {
    //         display: 'block',
    //         top: '200px',
    //         left: '200px',
    //         background: 'black',
    //         color: '#fff',
    //         width: '70%',
    //         height: '600px'
    //       },
    //       onClick: (e) => setModalData({ ...modalData, att: { ...modalData.att, style: {} } })
    //     },
    //     children: (
    //       (
    //         <Logo2 />
    //       )
    //     ),
    //     Logo2: Logo2
    //   }
    //   // setModalData(modalData);
    // }}
    >관리자모드</h1>
  )
}

const NavItem = ({ page }) => {
  let p = 0;
  switch (page) {
    case 'user':
      p = 1;
      break;
    // case '':
    //   p = 2;
    //   break;
    // case 'adminboard':
    //   p = 3;
    //   break;
    default:
      p = 0;
      break;

  }
  return (
    <ul>
      <li style={p === 2 ? { fontWeight: 'bold' } : {}}><NavLink to='/board/list/ntc' >공지사항 바로가기</NavLink></li>
      <li style={p === 0 ? { fontWeight: 'bold' } : {}}><NavLink to='/admin/image' >이미지파일관리</NavLink></li>
      <li style={p === 1 ? { fontWeight: 'bold' } : {}}><NavLink to='/admin/user' >회원관리</NavLink></li>
      {/* <li style={p === 3 ? { fontWeight: 'bold' } : {}}><NavLink to='/admin/adminboard' >관리게시판</NavLink></li> */}
    </ul>
  )
}

const AdminNav = React.memo(({ setModalData, page }) => {
  return (
    <div className='adminNav'>
      <Logo setModalData={setModalData} />
      <NavItem page={page} />
    </div>
  )
})

export default AdminNav