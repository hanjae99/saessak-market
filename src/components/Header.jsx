import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdReorder } from "react-icons/md";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div id="headContainer">
        <div className="headContent">
          <div className="logo">
            <img src="../img/saessak.png" alt="logo" />
            <span>새싹 마켓</span>
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
          </div>
          <nav className="menu">
            <div className="menuItem">
              <a href="/">새싹 게시판</a>
            </div>
            <div className="menuItem">
              <a href="/">새싹 게임</a>
            </div>
            <div className="menuItem">
              <a href="/">상품 등록</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
