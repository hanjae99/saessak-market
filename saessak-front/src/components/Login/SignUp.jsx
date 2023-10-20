import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SignUp.css";
import Header from "../main/Header";
import { useNavigate } from "react-router-dom";
import Footer from "../main/Footer";
import { call, signup } from "../../ApiService";

const SignUp = () => {
  //const user = useSelector((state) => state.user);
  const [signFailed, setSignFailed] = useState(false);
  const [idCheck, setIdCheck] = useState(0);
  const [nicknameCheck, setNicknameCheck] = useState(0);
  //console.log(user);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [newUser, setNewUser] = useState({
    userId: "",
    nickName: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    address: "관악구",
    gender: "",
    //userproduct: [],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("id", newUser.id);
    // console.log("nickname", newUser.nickname);
    // console.log("pwd", newUser.pwd);
    // console.log("name", newUser.name);
    // console.log("email", newUser.email);
    // console.log("phone", newUser.phone);
    // console.log("address", newUser.address);
    // console.log("gender", newUser.gender);

    if (
      !newUser.userId ||
      !newUser.nickName ||
      !newUser.password ||
      idCheck !== -1 ||
      nicknameCheck !== -1 ||
      !newUser.name ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.gender
    ) {
      setSignFailed(true);
      return;
    } else {
      console.log(newUser);
      setSignFailed(false);
      signup(newUser).then((response) => {
        console.log(response);
        alert("계정이 성공적으로 생성되었습니다.");
        window.location.href = "/login";
      });
      //navigator("/login");
    }
  };

  const onNickname = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      nickName: e.target.value,
    }));
  };
  const onId = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      userId: e.target.value,
    }));
  };
  const onPwd = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      password: e.target.value,
    }));
  };

  const onPwdCheck = (e) => {
    const { value } = e.target;
    if (newUser.password === value) {
      setNewUser((prevUser) => ({
        ...prevUser,
        password: e.target.value,
      }));
    }
  };
  const onName = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      name: e.target.value,
    }));
  };
  const onEmail = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      email: e.target.value,
    }));
  };
  const onPhone = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      phone: e.target.value,
    }));
  };

  const onGenderChange = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      gender: e.target.value,
    }));
  };

  const onidCheck = (e) => {
    e.preventDefault();
    // const checkid = user.find((u) => u.id === newUser.id);
    call(`/signup/userId/${newUser.userId}`, "GET", null).then((response) => {
      //console.log(response);
      setIdCheck(response);
    });
    // if (checkid) {
    //   setIdCheck(1);
    // } else if (checkid === undefined && newUser.id === "") {
    //   setIdCheck(0);
    // } else {
    //   setIdCheck(-1);
    // }
  };

  const onNicknameCheck = (e) => {
    e.preventDefault();
    //const checkNickname = user.find((u) => u.nickname === newUser.nickname);
    call(`/signup/nickName/${newUser.nickName}`, "GET", null).then(
      (response) => {
        //  console.log(response.data);
        setNicknameCheck(response);
      }
    );

    // if (checkNickame) {
    //   setNicknameCheck(1);
    // } else if (checkNickname === undefined && newUser.nickname === "") {
    //   setNicknameCheck(0);
    // } else {
    //   setNicknameCheck(-1);
    // }
  };
  useEffect(() => {
    setIdCheck(0);
  }, [newUser.userId]);

  useEffect(() => {
    setNicknameCheck(0);
  }, [newUser.nickName]);
  return (
    <>
      <div className="signup-container1">
        <Header />
        <main>
          <div className="signup-divtitle">
            {" "}
            <h1 className="signup-title">회원가입</h1>
          </div>
          <form className="signup-form">
            <div className="signup-input-container">
              <label className="signup-text-id">아이디</label>
              <input
                className="signup-text-input"
                type="text"
                placeholder="아이디를 입력해주세요"
                onChange={onId}
                autoFocus={true}
                // style={idCheck ? { outlineColor: "red" } : {}}
              />
              <button onClick={onidCheck} className="signup-bt1">
                중복확인
              </button>
            </div>
            {idCheck === 1 ? (
              <p className="signup-duplicated-msg">
                이미 사용 중인 아이디입니다.
              </p>
            ) : (
              ""
            )}
            {idCheck === -1 ? (
              <p className="signup-duplicated1-msg">사용가능한 아이디입니다.</p>
            ) : (
              ""
            )}

            <div className="signup-input-container">
              <label className="signup-text-id">닉네임</label>
              <input
                className="signup-text-input"
                type="text"
                placeholder="닉네임을 입력해주세요"
                onChange={onNickname}
              />
              <button onClick={onNicknameCheck} className="signup-bt1">
                중복확인
              </button>
            </div>
            {nicknameCheck === 1 ? (
              <p className="signup-duplicated-msg">
                이미 사용 중인 닉네임입니다.
              </p>
            ) : (
              ""
            )}
            {nicknameCheck === -1 ? (
              <p className="signup-duplicated1-msg">사용가능한 닉네임입니다.</p>
            ) : (
              ""
            )}
            <div className="signup-input-container">
              <label className="signup-text-id">비밀번호</label>
              <input
                className="signup-text-input"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={onPwd}
              />
            </div>
            <div className="signup-input-container">
              <label className="signup-text-id">비밀번호확인</label>
              <input
                className="signup-text-input"
                type="password"
                placeholder="비밀번호를 한번더 입력해주세요"
                onChange={onPwdCheck}
              />
            </div>
            <div className="signup-input-container">
              <label className="signup-text-id">이름</label>
              <input
                className="signup-text-input"
                type="text"
                placeholder="이름을입력해주세요"
                onChange={onName}
              />
            </div>
            <div className="signup-input-container">
              <label className="signup-text-id">이메일</label>
              <input
                className="signup-text-input"
                type="text"
                placeholder="ex):saessak@gamil.com"
                onChange={onEmail}
              />
              <button className="signup-bt2">이메일 인증</button>
            </div>
            <div className="signup-input-container">
              <label className="signup-text-id">휴대폰</label>
              <input
                className="signup-text-input"
                type="number"
                placeholder="숫자만 입력해주세요"
                onChange={onPhone}
              />
              <button className="signup-bt3">전화번호 인증</button>
            </div>
            <div className="signup-input-container">
              <label className="signup-text-id">주소</label>
              <input
                className="signup-text-input"
                type="button"
                value="주소api 가져오기"
              />
            </div>
            <div className="signup-input-container">
              <label className="signup-text-id">성별</label>
              <input
                className="signup-text-radio"
                type="radio"
                name="gender"
                value="MALE"
                checked={newUser.gender === "MALE"}
                onChange={onGenderChange}
              />
              남성
              <input
                className="signup-text-radio"
                type="radio"
                name="gender"
                value="FEMALE"
                checked={newUser.gender === "FEMALE"}
                onChange={onGenderChange}
              />
              여성
            </div>
            {signFailed && (
              <p className="signup-failed-msg">
                필수 정보를 모두 입력해주세요.(중복확인 필수!)
              </p>
            )}
            <br />
            <div className="signup-Divcheckbox">
              <label className="sinup-text-id">이용약관</label>
              <p className="signup-checktype">
                <input type="checkbox" />
                이용약관
              </p>
              <p className="signup-checktype">
                <input type="checkbox" />
                개인정보 수집.이용 동의
              </p>
              <p className="signup-checktype">
                <input type="checkbox" />
                혜택/정보 수신동의
              </p>
              <p className="signup-checktype">
                <input type="checkbox" />
                마케팅 동의
              </p>
            </div>
          </form>
          <div className="signup-divcheckbtn">
            <button
              className="signup-checkbtn"
              type="button"
              onClick={onSubmit}
            >
              가입하기
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
