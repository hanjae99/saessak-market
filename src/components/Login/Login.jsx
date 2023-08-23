import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [inputid, setInputid] = useState("");
  const [inputpwd, setInputpwd] = useState("");
  const user = useSelector((state) => state.user);
  console.log(user[1].id);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      console.log("asdaasd:" + inputid);
      console.log("dasdasdasd:" + inputpwd);
      const login = user.find((l) => l.id === inputid);
      const pwd = user.find((p) => p.pwd === inputpwd);

      console.log("login" + login);
      console.log("pwd" + pwd);

      if (!login || !pwd) {
        console.log("아이디 비밀 번호를 다시입력해주세요");
      } else {
        console.log("사이트로 이동");
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
    <div className="container">
      <div>
        <form onSubmit={onSubmit}>
          <h2>로그인</h2>
          <div>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              value={inputid}
              onChange={onChangeId}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={inputpwd}
              onChange={onChangepwd}
            />
          </div>
          <div>
            <span>아이디찾기</span>| <span>비밀번호 찾기</span>
          </div>
          <button type="submit">로그인</button>
          <button>api로그인</button>
          <button onClick={onClick}>회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
