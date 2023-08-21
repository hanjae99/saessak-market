import { Provider } from 'react-redux';
import './App.css';
import NoticeBoardList from './components/NoticeBoardList';
import NoticeBoardSelect from './components/NoticeBoardSelect';
import store from './store';
function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
