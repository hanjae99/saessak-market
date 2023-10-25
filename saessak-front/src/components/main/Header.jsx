import React, { useCallback, useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdReorder } from "react-icons/md";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import category from "../../category.json";
import { useDispatch, useSelector } from "react-redux";
import { call } from "../../ApiService";

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
      // 로그인한 상태
      setIsLogin(true);

      // 카테고리 정보 가져오기
      call("/product/searchcate", "GET").then((response) => {
        // console.log(response.data);
        if (response.data && response.data != null) {
          setCategoryDTO(response.data);
        }
        console.log(categoryDTO);
      });
    }
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
              <img src="../../img/saessak.png" alt="logo" />
            </Link>
            <div className="logo-text">
              <Link to="/">
                <img src="../../img/logo.png" alt="새싹마켓 logo" />
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
            <button onClick={handleLogInAndOut}>
              {isLogin ? "로그아웃" : "로그인"}
            </button>
            <button
              onClick={() => {
                navigate("/user/mypage");
              }}
            >
              마이페이지
            </button>
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
      </div>
    </header>
  );
};

export default Header;
