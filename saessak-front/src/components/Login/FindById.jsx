import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../main/Header";
import Footer from "../main/Footer";
import { call, login } from "../../ApiService";

const FindById = () => {
  const navigate = useNavigate();
  const backUrl = useSelector((state) => state.login.url);
  const [findByIdDTO, setFindByIdDTO] = useState({
    name: "",
    email: "",
    userId: "",
  });
  const [emailPass, setEmailPass] = useState("");
  const [emailPassFailed, setEmailPassFailed] = useState(0); // 상태 추가
  const [receiveEmail, setReceiveEmail] = useState("");
  const [resultPass, setResultPass] = useState(0);

  const onChangeName = (e) => {
    setFindByIdDTO((prevUser) => ({
      ...prevUser,
      name: e.target.value,
    }));
  };

  const onChangeEmail = (e) => {
    setFindByIdDTO((prevUser) => ({
      ...prevUser,
      email: e.target.value,
    }));
  };

  const onClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const onEmailCheck = (e) => {
    e.preventDefault();

    call("/login/auth/emailPass", "POST", findByIdDTO).then((response) => {
      console.log(response);
      if (response === -1) {
        return setEmailPassFailed(-1);
      }
      setEmailPassFailed(1);
      setReceiveEmail(response.message);
    });
  };

  const onInputEmailPass = (e) => {
    let value = e.target.value;
    setEmailPass(value);
  };

  const onEmailTrue = (e) => {
    e.preventDefault();
    console.log(receiveEmail);
    console.log("====================");
    console.log(emailPass);
    if (receiveEmail === emailPass) {
      call("/login/findById", "POST", findByIdDTO).then((response) => {
        console.log(response.userId);
        setFindByIdDTO((prevUser) => ({
          ...prevUser,
          userId: response.userId,
        }));
        return setResultPass(-1);
      });
    }
    return setResultPass(1);
  };

  const onFindByPwd = (e) => {
    e.preventDefault();
    navigate("/login/findbyPwd");
  };

  return (
    <>
      <div className="login-container">
        <Header />
        <main className="login-child">
          <form>
            <h2 className="login-title">아이디 찾기</h2>
            <div className="login-input1">
              <input
                className="login-inputBox1"
                type="text"
                placeholder="이름을 입력해주세요"
                value={findByIdDTO.name}
                onChange={onChangeName}
              />
            </div>
            <div className="login-input2">
              <input
                className="login-inputBox2"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={findByIdDTO.email}
                onChange={onChangeEmail}
              />
            </div>
            {emailPassFailed === 1 ? (
              <div className="login-inputFindById">
                <div className="login-input2">
                  <input
                    className="login-inputBox3"
                    type="text"
                    placeholder="인증번호 입력"
                    onChange={onInputEmailPass}
                  />
                </div>
                <div className="login-input2">
                  <button className="login-inputButton3" onClick={onEmailTrue}>
                    인증
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {emailPassFailed === -1 ? (
              <p className="login-failed-msg">
                이메일 혹은 이름을 다시 확인해주세요
              </p>
            ) : (
              ""
            )}
            {resultPass === 1 ? (
              <p className="login-failed-msg">인증번호를 다시 입력해주세요</p>
            ) : (
              ""
            )}
            {resultPass === -1 ? (
              <p>
                당신의 아이디는
                <span
                  style={{
                    color: "blue",
                    fontSize: "x-large",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {findByIdDTO.userId}{" "}
                </span>
                입니다.
              </p>
            ) : (
              ""
            )}
            <div className="login-button-container">
              {emailPassFailed === 1 ? (
                ""
              ) : (
                <div>
                  <button className="login-button1" onClick={onEmailCheck}>
                    이메일 전송
                  </button>
                </div>
              )}

              <div>
                <button className="login-button3" onClick={onFindByPwd}>
                  비밀번호 찾기
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default FindById;
