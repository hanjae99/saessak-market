import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdReorder } from "react-icons/md";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div id="headContainer">
        <div className="headContent">
          <div className="logo">
            <Link to="/">
              <img src="../img/saessak.png" alt="logo" />
            </Link>
            <div>
              <Link to="/">새싹 마켓</Link>
            </div>
          </div>
          <div className="searchBox">
            <form>
              <label>
                <input type="search" placeholder="새싹을 심어보세요!" />
                <span>
                  <BiSearchAlt2 />
                </span>
              </label>
            </form>
          </div>
          <div className="userBtn">
            <button>로그인</button>
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
                <li className="categoryItem">
                  <Link to="/">수입명품</Link>
                </li>
                <li className="categoryItem">
                  <Link to="/">패션의류</Link>
                </li>
                <li className="categoryItem">
                  <Link to="/">뷰티</Link>
                </li>
                <li className="categoryItem">
                  <Link to="/">노트북/PC</Link>
                </li>
                <li className="categoryItem">
                  <Link to="/">모바일/태블릿</Link>
                </li>
                <li className="categoryItem">
                  <Link to="/">가구/인테리어</Link>
                </li>
                <li className="categoryItem">
                  <Link to="/">리빙/생활</Link>
                </li>
                <li className="categoryItem">
                  <Link to="/">도서/문구</Link>
                </li>
                <li className="categoryItem">
                  <Link to="/">스포츠</Link>
                </li>
                <li className="categoryItem">
                  <Link to="/">반려동물/취미</Link>
                </li>
                <li className="categoryItem">
                  <Link to="/">무료나눔</Link>
                </li>
              </ul>
            </div>
          </div>
          <nav className="menu">
            <div className="menuItem">
              <Link to="/">새싹 게시판</Link>
            </div>
            <div className="menuItem">
              <Link to="/">새싹 게임</Link>
            </div>
            <div className="menuItem">
              <Link to="/">상품 등록</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
