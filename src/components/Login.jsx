import React from "react";

const Login = () => {
  return (
    <div className="container">
      <div>
        <form>
          <fieldset>
            <h2>로그인</h2>
            <div>
              <input type="text" placeholder="아이디를 입력해주세요" />
            </div>
            <div>
              <input type="password" placeholder="비밀번호를 입력해주세요" />
            </div>
            <div>
              <a>아이디찾기</a>| <a>비밀번호 찾기</a>
            </div>
            <button>로그인</button>
            <button>api로그인</button>
            <button>회원가입</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
