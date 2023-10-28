import React, { useCallback, useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdReorder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { call } from "../../ApiService";
import "./Header.scss";
import { Button } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

const Header = () => {
  const [value, setValue] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [categoryDTO, setCategoryDTO] = useState([]);

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
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken !== "") {
      // 토큰 유효시간 검사
      const expiration = localStorage.getItem("EXPIREDATE");
      if (expiration && expiration != "") {
        const now = new Date().getTime();
        // 토큰 만료
        if (now >= Date.parse(expiration)) {
          localStorage.setItem("ACCESS_TOKEN", "");
          localStorage.setItem("EXPIREDATE", "");
          setIsLogin(false);
          alert("로그인 시간이 만료되었습니다");
          navigate("/login");
        } else {
          // 토큰 유지, 로그인 유지
          setIsLogin(true);
        }
      }
    }

    // 카테고리 정보 가져오기
    call("/product/searchcate", "GET").then((response) => {
      // console.log(response.data);
      if (response && response.data && response.data != null) {
        setCategoryDTO(response.data);
      }
    });
  }, []);

  // const login = useSelector((state) => state.login);
  // const dispatch = useDispatch();

  const handleLogInAndOut = () => {
    if (isLogin) {
      localStorage.setItem("ACCESS_TOKEN", "");
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
            {/* <button onClick={handleLogInAndOut}>
              {isLogin ? "로그아웃" : "로그인"}
            </button>
            <button
              onClick={() => {
                navigate("/user/mypage");
              }}
            >
              마이페이지
            </button> */}
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
              <div
                style={{ width: "80%", height: "20px", zIndex: "-999" }}
              ></div>
              <ul>
                {/* {category
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
                        <Link to={"/search?category=" + c.categoryno}>
                          {c.categoryname}
                        </Link>
                      </li>
                    );
                  })} */}
                {categoryDTO.map((c) => (
                  <li className="categoryItem" key={c.id}>
                    <Link to={"/search?category=" + c.id}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <nav className="menu">
            <div
              className="menuItem"
              onClick={() => {
                navigate("/boardmain");
              }}
            >
              <Link to="/boardmain">새싹 게시판</Link>
            </div>
            <div className="menuItem">
              <Link to="/game">새싹 게임</Link>
            </div>
            <div className="menuItem">
              <Link onClick={handleCreateProduct}>상품 등록</Link>
            </div>
          </nav>
        </div>
        {isLogin ? (
          <div className="loginedUserId">
            환영해요, {localStorage.getItem("USERID")} 님
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
