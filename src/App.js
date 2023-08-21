<<<<<<< HEAD
import './App.css';
import Header from './components/Header';
import ImgUpdate from './components/ImgUpdate';
import Manu from './components/Manu';
=======
import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPage from './components/admin/AdminPage';

const MainPage = () => {
  return (
    <div>
      <NavLink to='/admin'>관리자페이지</NavLink>
    </div>
  )
}
>>>>>>> 30a96ef5b5a80fee4f9508d88c4897ed208c9b13


function App() {
  return (
<<<<<<< HEAD
    <div className="main">
      <Header></Header>
      <Manu></Manu>
    </div>

=======
        <div>
          <Routes>
            <Route path='/admin/:page?' element={<AdminPage />} />
            <Route path='/*' element={<MainPage />} />
          </Routes>
        </div>
>>>>>>> 30a96ef5b5a80fee4f9508d88c4897ed208c9b13
  );
}

export default App;
