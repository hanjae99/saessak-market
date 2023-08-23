import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import AdminPage from './components/admin/AdminPage';
import BoardMain from './components/board/BoardMain';
import CreateNotice from './components/board/CreateNotice';
import CreateVoice from './components/board/CreateVoice';
import { useState } from 'react';
import BoardInfo from './components/board/BoardInfo';

function App() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <div className="container">
        <div className="header">
          <h2>nav바</h2>
        </div>
        <BoardInfo />
        <Routes>
          <Route path="/admin/:page?" element={<AdminPage />} />
          <Route path="/boardmain" element={<BoardMain page={page} />} />
          <Route path="/boardwrite" element={<CreateNotice />} />
          <Route path="/boardmain/1" element={<CreateVoice page={page} />} />
          <Route path="/*" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
