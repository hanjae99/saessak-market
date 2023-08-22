import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./components/admin/AdminPage";
import Game from "./components/Game";
import GameResult from "./components/GameResult";
import Login from "./components/Login";
import SingUp from "./components/SingUp";
import Detail from "./components/Detail";
import GameModal from "./components/GameModal";

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
      {/* <Login />
      <SingUp /> */}
      <Game />
      {/* <GameResult /> */}
      {/* <Detail /> */}
      <GameModal />

      {/* <Routes>
        <Route path="/admin/:page?" element={<AdminPage />} />
        <Route path="/*" element={<MainPage />} />
      </Routes> */}
    </div>
  );
}

export default App;
