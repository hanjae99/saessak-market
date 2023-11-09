import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../main/Header";
import Footer from "../main/Footer";
import { call, login } from "../../ApiService";

const FindByPwd = () => {
  const navigate = useNavigate();
  const backUrl = useSelector((state) => state.login.url);
  const [findByIdDTO, setFindByIdDTO] = useState({
    name: "",
    email: "",
    userId: "",
    password: "",
  });
  const [emailPass, setEmailPass] = useState("");
  const [emailPassFailed, setEmailPassFailed] = useState(0); // 상태 추가
  const [receiveEmail, setReceiveEmail] = useState("");
  const [resultPass, setResultPass] = useState(0);
  const [pwdCheck, setPwdCheck] = useState("");
  const [pwdPass, setPwdPass] = useState(0);
  const [changPass, setChangPass] = useState(true);

  const onChangeUserId = (e) => {
    setFindByIdDTO((prevUser) => ({
      ...prevUser,
      userId: e.target.value,
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

    call("/login/auth/emailPwdPass", "POST", findByIdDTO).then((response) => {
      // console.log(response);
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
      setResultPass(-1);
      return setChangPass(false);
    }
    return setResultPass(1);
  };

  const onPassword = (e) => {
    setFindByIdDTO((prevUser) => ({
      ...prevUser,
      password: e.target.value,
    }));
  };

  const onPwdCheck = (e) => {
    setPwdCheck(e.target.value);
  };

  const onChangePassword = (e) => {
    e.preventDefault();
    if (findByIdDTO.password === pwdCheck) {
      call("/login/findByPwd", "PUT", findByIdDTO).then((response) => {
        setPwdPass(0);
        navigate("/login");
      });
    } else {
      setPwdPass(-1);
    }
  };

  return (
    <>
      <div className="login-container">
        <Header />
        <main className="login-child">
          {changPass ? (
            <form>
              <h2 className="login-title">비밀번호 찾기</h2>
              <div className="login-input1">
                <input
                  className="login-inputBox1"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  value={findByIdDTO.userId}
                  onChange={onChangeUserId}
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
                    <button
                      className="login-inputButton3"
                      onClick={onEmailTrue}
                    >
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
                  <button className="login-button3" onClick={onClick}>
                    로그인
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form>
              <h2 className="login-title">비밀번호를 변경하세요</h2>
              <div className="login-input1">
                <input
                  className="login-inputBox1"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  value={findByIdDTO ? findByIdDTO.userId : ""}
                  onChange={onChangeUserId}
                  readOnly
                />
              </div>
              <div className="login-input2">
                <input
                  className="login-inputBox2"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={findByIdDTO ? findByIdDTO.password : ""}
                  onChange={onPassword}
                />
              </div>
              <div className="login-input2">
                <input
                  className="login-inputBox2"
                  type="password"
                  placeholder="비밀번호를 다시입력해주세요"
                  onChange={onPwdCheck}
                />
              </div>
              {pwdPass === -1 ? (
                <p className="login-failed-msg">비밀번호를 다시 확인해주세요</p>
              ) : (
                ""
              )}
              {pwdPass === 1 ? "" : ""}
              <div className="login-button-container">
                <div>
                  <button className="login-button3" onClick={onChangePassword}>
                    비밀번호 변경
                  </button>
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default FindByPwd;
