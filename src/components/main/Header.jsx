import React, { useCallback, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdReorder } from 'react-icons/md';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import category from '../../category.json';

const Header = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSearch = () => {
    navigate('/search/' + value);
  };

  const enterCheck = (e) => {
    if (e.keyCode === 13) {
      onSearch();
      return;
    }
  };

  return (
    <header>
      <div id="headContainer">
        <div className="headContent">
          <div className="logo">
            <Link to="/">
              <img src="../../img/saessak.png" alt="logo" />
            </Link>
            <div>
              <Link to="/">
                <span className="logo-text">새싹 마켓</span>
              </Link>
            </div>
          </div>
          <div className="searchBox">
            <form>
              <label>
                <input
                  type="search"
                  placeholder="새싹을 심어보세요!"
                  value={value}
                  onChange={onChange}
                  onKeyDown={enterCheck}
                />
                <span onClick={onSearch}>
                  <BiSearchAlt2 />
                </span>
              </label>
            </form>
          </div>
          <div className="userBtn">
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </button>
            <button>마이페이지</button>
          </div>
        </div>
      </div>
      <div id="navContainer">
        <div className="navContent">
          <div className="category">
            <span>
              <MdReorder />
            </span>
            <span>카테고리</span>
            <div id="categoryBox">
              <ul>
                {category
                  .filter((c) => c.categoryno <= 20)
                  .sort((a, b) =>
                    a.categoryno.length === b.categoryno.length
                      ? a.categoryno > b.categoryno
                        ? 1
                        : -1
                      : a.categoryno.length > b.categoryno.length
                      ? 1
                      : -1
                  )
                  .map((c) => {
                    return (
                      <li className="categoryItem" key={c.categoryno}>
                        <Link to={'/search?category=' + c.categoryno}>{c.categoryname}</Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <nav className="menu">
            <div
              className="menuItem"
              onClick={() => {
                navigate('/boardmain');
              }}
            >
              <Link to="/boardmain">새싹 게시판</Link>
            </div>
            <div className="menuItem">
              <Link to="/game">새싹 게임</Link>
            </div>
            <div className="menuItem">
              <Link to="/addproduct">상품 등록</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
