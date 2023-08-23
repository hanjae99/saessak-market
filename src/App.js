import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./components/admin/AdminPage";
import Login from "./components/Login/Login";
import SingUp from "./components/Login/SingUp";
import Game from "./components/game/Game";
import GameResult from "./components/game/GameResult";
import Detail from "./components/detail/Detail";
import GameModal from "./components/game/GameModal";

const MainPage = () => {
  return (
    <div>
      <NavLink to="/admin">관리자페이지</NavLink>
    </div>
  );
};

function App() {
  return (
    <div>
      {/* <Login /> */}
      {/* <SingUp /> */}
      {/* <Game /> */}
      {/* <GameResult /> */}
      {/* <Detail /> */}
      {/* <GameModal /> */}

      <Routes>
        {/* <Route path="/admin/:page?" element={<AdminPage />} />
        <Route path="/*" element={<MainPage />} /> */}
        <Route path="/game" element={<Game />} />
        <Route path="/gameresult/:finalresult" element={<GameResult />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<SingUp />} />
      </Routes>
    </div>
  );
}

export default App;
