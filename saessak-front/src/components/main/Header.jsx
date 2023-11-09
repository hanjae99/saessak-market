import LockOpenIcon from "@mui/icons-material/LockOpen";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Button } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdReorder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { call } from "../../ApiService";
import { loginCheck } from "../../loginCheck";
import "./Header.scss";

const Header = () => {
  const [value, setValue] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [categoryDTO, setCategoryDTO] = useState([]);
  const [loginMinute, setLoginMinute] = useState("");
  const [loginSecond, setLoginSecond] = useState("");
  const expireDate = localStorage.getItem("EXPIREDATE");
  const intervalId = useRef(0);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSearch = () => {
    let str = "/search";
    navigate(value ? str + "/" + value : str);
  };

  const enterCheck = (e) => {
    if (e.keyCode === 13) {
      onSearch();
      return;
    }
  };

  useEffect(() => {
    const result = loginCheck();
    if (result === "token expired") {
      setIsLogin(false);
      alert("로그인 시간이 만료되었습니다, 다시 로그인해주세요!");
      navigate("/login");
    } else if (result === "login ok") {
      setIsLogin(true);
    }

    // 카테고리 정보 가져오기
    call("/product/searchcate", "GET").then((response) => {
      if (response && response.data && response.data != null) {
        setCategoryDTO(response.data);
      }
    });

    // 관리자일 경우 관리자 페이지로 이동하는 버튼 노출
    if (localStorage.getItem("ISADMIN") === "true") {
      setIsAdmin(true);
      return;
    }

    intervalId.current = setInterval(() => {
      const now = new Date();
      setLoginMinute(
        new Date(Date.parse(expireDate) - now).getMinutes().toString()
      );
      setLoginSecond(
        new Date(Date.parse(expireDate) - now).getSeconds().toString()
      );
    }, 1000);
  }, []);

  // 타이머 정지
  if (loginMinute === "0" && loginSecond === "0") {
    clearInterval(intervalId.current);
  }

  const handleLogInAndOut = (e) => {
    if (isLogin) {
      localStorage.setItem("ACCESS_TOKEN", "");
      localStorage.setItem("EXPIREDATE", "");
      localStorage.setItem("NICKNAME", "");
      localStorage.setItem("ISADMIN", "");
      alert("로그아웃 되었습니다.");
      setIsLogin(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();

    if (isLogin) {
      navigate("/addproduct");
    } else {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
    }
  };

  return (
    <header>
      <div id="headContainer">
        <div className="headContent">
          <div className="logo">
            <Link to="/">
              <img src="/img/saessak.png" alt="logo" />
            </Link>
            <div className="logo-text">
              <Link to="/">
                <img src="/img/logo.png" alt="새싹마켓 logo" />
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
            <Button
              variant="text"
              // color="success"
              startIcon={<LockOpenIcon />}
              onClick={handleLogInAndOut}
            >
              {isLogin ? "로그아웃" : "로그인"}
            </Button>
            <Button
              variant="text"
              startIcon={<PermIdentityIcon />}
              onClick={() => {
                navigate("/user/mypage");
              }}
            >
              마이페이지
            </Button>
          </div>
        </div>
      </div>
      <div id="navContainer">
        <div className="navContent">
          <div className="category">
            <div className="category_selectBtn">
              <MdReorder />
              <span>카테고리</span>
            </div>
            <div id="categoryBox">
              <div
                style={{ width: "80%", height: "20px", zIndex: "-999" }}
              ></div>
              <ul>
                {categoryDTO.map((c) => (
                  <li className="categoryItem" key={c.id}>
                    <Link to={"/search?category=" + c.id}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <nav className="menu">
            <div className="menuItem">
              <Link to="/board/list">새싹 게시판</Link>
            </div>
            <div className="menuItem">
              <Link to="/game">새싹 게임</Link>
            </div>
            <div className="menuItem">
              <Link onClick={handleCreateProduct}>상품 등록</Link>
            </div>
          </nav>
        </div>
        {isAdmin ? (
          <div className="login-info">
            <div className="loginedUserNick">
              환영해요, {localStorage.getItem("NICKNAME")} 님
            </div>
            <Button variant="contained" onClick={() => navigate("/admin")}>
              관리자
            </Button>
          </div>
        ) : isLogin ? (
          <div className="login-info">
            <div className="loginedUserNick">
              환영해요, {localStorage.getItem("NICKNAME")} 님
            </div>
            <div className="loginTimer">
              <span>
                {loginMinute.padStart(2, 0)} : {loginSecond.padStart(2, 0)}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
