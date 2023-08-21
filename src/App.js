import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import NoticeBoardList from './components/NoticeBoardList';
import NoticeBoardSelect from './components/NoticeBoardSelect';
import AdminPage from './components/admin/AdminPage';

function App() {
  return (
    <>
      <div className="container">
        <div className="header">
          <h2>nav바</h2>
        </div>
        <aside className="left-menu">
          <NoticeBoardList />
        </aside>
        <section>
          <NoticeBoardSelect />
        </section>
        <aside className="right-menu"></aside>
      </div>
      <div>
        <Routes>
          <Route path="/admin/:page?" element={<AdminPage />} />
          <Route path="/*" />
        </Routes>
      </div>
    </>
  );
}

export default App;
