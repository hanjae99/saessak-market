import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import SingUp from "./components/Login/SingUp";
import AddProduct from "./components/addProduct/AddProduct";
import AdminPage from "./components/admin/AdminPage";
import BoardMain from "./components/board/BoardMain";
import CreateNotice from "./components/board/CreateNotice";
import CreateVoice from "./components/board/CreateVoice";
import Detail from "./components/detail/Detail";
import Game from "./components/game/Game";
import GameResult from "./components/game/GameResult";
import Main from "./components/main/Main";
import ProductList from "./components/productList/ProductList";
import BoardInfo from "./components/board/BoardInfo";
import BoardNtc from "./components/board/BoardNtc";
import BoardNtcInfo from "./components/board/BoardNtcInfo";
import UpdateProduct from "./components/updateProduct/UpdateProduct";
import { Layout } from "./components/kimjin/layout";
import Chatting from "./components/kimjin/Chatting";
import AddProduct2 from "./components/addProduct/AddProduct2";
import BoardPage from "./components/board2/BoardPage";

function App() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <Routes>
        <Route path="/admin/:page?" element={<AdminPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/search/:searchItem?" element={<ProductList />} />
        <Route path="/addproduct" element={<AddProduct2 />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gameresult/:finalresult" element={<GameResult />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/boardmain" element={<BoardMain page={page} />} />
        <Route path="/boardwrite" element={<CreateNotice />} />
        <Route path="/boardmain/1" element={<CreateVoice page={page} />} />
        <Route path="/user/*" element={<Layout />}></Route>
        <Route path="/boardmain/ntc" element={<BoardNtc />}></Route>
        <Route path="/boardmain/ntc/:id?" element={<BoardNtcInfo />}></Route>
        <Route path="/boardmain/info/:id?" element={<BoardInfo />}></Route>
        <Route path="/chatting" element={<Chatting />}></Route>
        <Route path="/board" element={<BoardPage />}></Route>
        <Route path="/board/:boardName?" element={<BoardPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
