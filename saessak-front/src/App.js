import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/SignUp";
import AddProduct2 from "./components/addProduct/AddProduct2";
import AdminPage from "./components/admin/AdminPage";
import BoardInfo from "./components/board/BoardInfo";
import BoardMain from "./components/board/BoardMain";
import BoardNtc from "./components/board/BoardNtc";
import BoardNtcInfo from "./components/board/BoardNtcInfo";
import CreateNotice from "./components/board/CreateNotice";
import CreateVoice from "./components/board/CreateVoice";
import BoardPage from "./components/board2/BoardPage";
import Detail from "./components/detail/Detail";
import Game from "./components/game/Game";
import GameResult from "./components/game/GameResult";
import Chatting from "./components/kimjin/Chatting";
import { Layout } from "./components/kimjin/layout";
import Main from "./components/main/Main";
import ProductList2 from "./components/productList/ProductList2";
import UpdateProduct2 from "./components/updateProduct/UpdateProduct2";
import BoardEditorPage from "./components/board2/BoardEditorPage";
import BoardViewerPage from "./components/board2/BoardViewerPage";
import SmsTest from "./components/SmsTest";
import KakaoLogin from "./components/Login/KakaoLogin";
import ChatTest from "./components/ChatTest";
import Chat from "./components/test/Chat";
import ChatApp from "./ChatApp";

function App() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <Routes>
        <Route path="/admin/:page?" element={<AdminPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/search/:searchItem?" element={<ProductList2 />} />
        <Route path="/addproduct" element={<AddProduct2 />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct2 />} />
        <Route path="/game" element={<Game />} />
        <Route path="/gameresult/:finalresult" element={<GameResult />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/detail" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SignUp />} />
        <Route path="/boardmain" element={<BoardMain page={page} />} />
        <Route path="/boardwrite" element={<CreateNotice />} />
        <Route path="/boardmain/1" element={<CreateVoice page={page} />} />
        <Route path="/user/*" element={<Layout />}></Route>
        <Route path="/boardmain/ntc" element={<BoardNtc />}></Route>
        <Route path="/boardmain/ntc/:id?" element={<BoardNtcInfo />}></Route>
        <Route path="/boardmain/info/:id?" element={<BoardInfo />}></Route>
        <Route path="/chatting" element={<Chatting />}></Route>
        <Route path="/board/list/:boardName?" element={<BoardPage />}></Route>
        <Route
          path="/board/write/:boardName"
          element={<BoardEditorPage />}
        ></Route>
        <Route
          path="/board/write/:boardName/:boardId"
          element={<BoardEditorPage />}
        ></Route>
        <Route
          path="/board/detail/:boardName/:boardId"
          element={<BoardViewerPage />}
        ></Route>
        <Route path="/login/auth/kakao?" element={<KakaoLogin />} />
        <Route path="/smstest" element={<SmsTest />} />
        <Route path="/chatTest" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
