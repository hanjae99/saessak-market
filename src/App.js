import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPage from './components/admin/AdminPage';
import Manu from './components/Manu';
import Check from './components/Check';
import Changing from './components/Changing';
import Changing_pwd from './components/Changing_pwd';
import Wish_List from './components/Wish_List';

const MainPage = () => {
  return (
    <div>
      {/* <NavLink to='/admin'>관리자페이지</NavLink> */}
      <NavLink to='/user/mypage'>마이페이지</NavLink>
      {/* <NavLink to='/user/check'>상품조회</NavLink> */}
      {/* <NavLink to='/user/changing'>정보 수정</NavLink>
      <NavLink to='/user/changingpwd'>비밀번호 확인</NavLink> */}
    </div>
  )
}


function App() {
  return (
    <div className='App'>
      <Routes>
        {/* <Route path='/admin/:page?' element={<AdminPage />} /> */}
        <Route path='/user/mypage' element={<Manu />}></Route>
        <Route path='/user/check' element={<Check />}></Route>
        <Route path='/user/changing' element={<Changing/>}></Route>
        <Route path='/user/changingpwd' element={<Changing_pwd/>}></Route>
        <Route path='/user/wishlist' element={<Wish_List/>}></Route>
        <Route path='/*' element={<MainPage />} />
      </Routes>


    </div>
  );
}

export default App;
