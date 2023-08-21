import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPage from "./components/admin/AdminPage";
import Main from "./components/Main";

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
      {/* <Routes>
        <Route path="/admin/:page?" element={<AdminPage />} />
        <Route path="/*" element={<MainPage />} />
      </Routes> */}
      <Main />
    </div>
  );
}

export default App;
