import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../main/Header";
import Footer from "../main/Footer";
import { login } from "../../ApiService";

const Login = () => {
  const navigate = useNavigate();
  const backUrl = useSelector((state) => state.login.url);
  // const [inputid, setInputid] = useState("");
  // const [inputpwd, setInputpwd] = useState("");
  //const user = useSelector((state) => state.user);
  const [loginDTO, setLoginDTO] = useState({
    userId: "",
    password: "",
  });
  // const dispatch = useDispatch();
  const [loginFailed, setLoginFailed] = useState(false); // 상태 추가
  //console.log(user[1].id);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // console.log("asdaasd:" + inputid);
      // console.log("dasdasdasd:" + inputpwd);
      //const login = user.find((l) => l.id === inputid && l.pwd === inputpwd);
      // console.log("login" + login);
      login(loginDTO).then((response) => {
        console.log("response : ", response);
        if (!response) {
          return setLoginFailed(true);
        } else {
          localStorage.setItem("ACCESS_TOKEN", response.token);
          localStorage.setItem("EXPIREDATE", response.expiration);
          localStorage.setItem("NICKNAME", response.nickName);
          console.log("response : ", response);
          if (response.role === "ADMIN") {
            return (window.location.href = "/admin");
          }
          return (window.location.href = backUrl);
        }
      });

      // if (!login) {
      //   // console.log("아이디 비밀 번호를 다시입력해주세요");
      //   setLoginFailed(true);
      // } else {
      //   //dispatch({ type: "login/login", payload: login.id });
      //   if (login.gender === "ADMIN") {
      //     navigate("/admin");
      //   } else {
      //     navigate("/");
      //   }
      // }
    },
    [loginDTO]
  );
  const onChangeId = (e) => {
    setLoginDTO((prevUser) => ({
      ...prevUser,
      userId: e.target.value,
    }));
  };

  const onChangepwd = (e) => {
    setLoginDTO((prevUser) => ({
      ...prevUser,
      password: e.target.value,
    }));
  };

  const onClick = (e) => {
    e.preventDefault();

    //   console.log("회원가입 페이지로 이동");

    navigate("/singup");
  };

  const KakaoLoginAPI = `https://kauth.kakao.com/oauth/authorize?
client_id=${"a72ff07499a78a559bb7e6bccb465597"}&redirect_uri=${"http://localhost:3000/login/auth/kakao"}&response_type=code`;

  /**온클릭 이벤트
   * 카카오 로그인용 새창을 띄운다.
   */

  const openKakaoLogin = () => {
    window.open(KakaoLoginAPI, "_self");
  };

  const onFindById = () => {
    navigate("/login/findbyId");
  };

  const onFindByPwd = () => {
    navigate("/login/findbyPwd");
  };

  //  console.log("아이디: " + inputid);
  //console.log("비밀번호: " + inputpwd);

  return (
    <>
      <div className="login-container">
        <Header />
        <main className="login-child">
          <form onSubmit={onSubmit}>
            <h2 className="login-title">로그인</h2>
            <div className="login-input1">
              <input
                className="login-inputBox1"
                type="text"
                placeholder="아이디를 입력해주세요"
                value={loginDTO.userId}
                onChange={onChangeId}
              />
            </div>
            <div className="login-input2">
              <input
                className="login-inputBox2"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={loginDTO.password}
                onChange={onChangepwd}
              />
            </div>
            {loginFailed && (
              <p className="login-failed-msg">
                아이디 또는 비밀번호가 잘못되었습니다.
              </p>
            )}
            <div className="login-idpwd">
              <span onClick={onFindById}>아이디찾기</span>|
              <span onClick={onFindByPwd}> 비밀번호 찾기</span>
            </div>
            <div className="login-button-container">
              <div>
                <button className="login-button1" type="submit">
                  로그인
                </button>
              </div>
              <div>
                <button className="login-button3" onClick={onClick}>
                  회원가입
                </button>
              </div>
              <div>
                <button className="login-button2" onClick={openKakaoLogin}>
                  카카오 로그인
                </button>
              </div>
              <div>
                <button className="login-button4">NAVER로그인</button>
              </div>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Login;
