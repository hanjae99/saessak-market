import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../main/Header";

const Login = () => {
  const navigate = useNavigate();
  const [inputid, setInputid] = useState("");
  const [inputpwd, setInputpwd] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user[1].id);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      console.log("asdaasd:" + inputid);
      console.log("dasdasdasd:" + inputpwd);
      const login = user.find((l) => l.id === inputid && l.pwd === inputpwd);

      console.log("login" + login);

      if (!login) {
        console.log("아이디 비밀 번호를 다시입력해주세요");
      } else {
        dispatch({type:'login/login',payload:login.id})
        if (login.gender === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    },
    [inputid, inputpwd, user]
  );
  const onChangeId = (e) => {
    setInputid(e.target.value);
  };

  const onChangepwd = (e) => {
    setInputpwd(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();

    console.log("회원가입 페이지로 이동");

    navigate("/singup");
  };

  console.log("아이디: " + inputid);
  console.log("비밀번호: " + inputpwd);

  return (
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
              value={inputid}
              onChange={onChangeId}
            />
          </div>
          <div className="login-input2">
            <input
              className="login-inputBox2"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={inputpwd}
              onChange={onChangepwd}
            />
          </div>
          <div className="login-idpwd">
            <span>아이디찾기</span>| <span>비밀번호 찾기</span>
          </div>
          <div className="login-button-container">
            <button className="login-button1" type="submit">
              로그인
            </button>
            <button className="login-button1">api로그인</button>
            <button className="login-button1" onClick={onClick}>
              회원가입
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
