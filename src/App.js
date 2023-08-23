import { NavLink, Route, Routes } from 'react-router-dom';
import AdminPage from './components/admin/AdminPage';
import Login from './components/Login/Login';
import SingUp from './components/Login/SingUp';
import Game from './components/game/Game';
import GameResult from './components/game/GameResult';
import Detail from './components/detail/Detail';
import GameModal from './components/game/GameModal';
import Main from './components/main/Main';
import ProductList from './components/productList/ProductList';
import AddProduct from './components/addProduct/AddProduct';
import BoardMain from './components/board/BoardMain';
import CreateNotice from './components/board/CreateNotice';
import CreateVoice from './components/board/CreateVoice';
import { useState } from 'react';
import BoardInfo from './components/board/BoardInfo';

const MainPage = () => {
  return (
    <div>
      <NavLink to="/admin">관리자페이지</NavLink>
    </div>
  );
};

function App() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <Routes>
        <Route path="/admin/:page?" element={<AdminPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/search/:searchItem?" element={<ProductList />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gameresult/:finalresult" element={<GameResult />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/boardmain" element={<BoardMain page={page} />} />
        <Route path="/boardwrite" element={<CreateNotice />} />
        <Route path="/boardmain/1" element={<CreateVoice page={page} />} />
      </Routes>
    </div>
  );
}

export default App;
