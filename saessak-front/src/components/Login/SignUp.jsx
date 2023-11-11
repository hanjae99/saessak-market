import React, { useCallback, useEffect, useState } from "react";
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
  const [pwdPass, setPwdPass] = useState("");
  const [pwdCheck, setPwdCheck] = useState(0);
  const [nicknameCheck, setNicknameCheck] = useState(0);
  const [emailCheck, setEmailCheck] = useState(0);
  const [emailCheckData, setEmailCheckData] = useState("");
  const [emailCheckInput, setEmailCheckInput] = useState("");
  const [emailPassCheck, setEmailPassCheck] = useState(0);
  const [emailId, setEmailId] = useState(""); // 이메일 아이디 상태
  const [passwordRegex, setPasswordRegex] = useState(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/
  );
  const [pwdRegCheck, setPwdRegCheck] = useState(0);

  const [emailDomain, setEmailDomain] = useState(""); // 이메일 도메인
  const [customDomain, setCustomDomain] = useState(""); // 직접 도메인 입력
  //console.log(user);
  // const dispatch = useDispatch();
  // const navigator = useNavigate();
  const [isSmsSend, setIsSmsSend] = useState(0); // 인증문자 발송 성공 여부
  const [smsCheckInput, setSmsCheckInput] = useState(""); // 인증문자 코드 입력
  const [isSmsChecked, setIsSmsChecked] = useState(0); // 인증 성공 여부

  const { daum } = window;

  const [newUser, setNewUser] = useState({
    userId: "",
    nickName: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !newUser.userId ||
      !newUser.nickName ||
      !newUser.password ||
      idCheck !== -1 ||
      pwdCheck !== -1 ||
      nicknameCheck !== -1 ||
      emailPassCheck !== -1 ||
      !newUser.name ||
      !newUser.email ||
      // !newUser.phone || // 개발중엔 휴대폰 인증 절차 비활성화
      // isSmsChecked !== 1 ||
      !newUser.gender
    ) {
      setSignFailed(true);
      return;
    } else {
      // console.log(newUser);
      setSignFailed(false);
      signup(newUser).then((response) => {
        // console.log(response);
        alert("계정이 성공적으로 생성되었습니다.");
        window.location.href = "/login";
      });
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
    const value = e.target.value;
    setPwdPass(value);
  };

  useEffect(() => {
    if (!newUser.password) {
      setPwdRegCheck(0);
    } else if (
      newUser.password.length < 4 ||
      !passwordRegex.test(newUser.password)
    ) {
      setPwdRegCheck(1);
    } else {
      setPwdRegCheck(-1);
    }
  }, [newUser.password, passwordRegex]);

  useEffect(() => {
    if (!pwdPass) {
      setPwdCheck(0);
    } else if (newUser.password === pwdPass && pwdRegCheck === -1) {
      setPwdCheck(-1);
    } else {
      setPwdCheck(1);
    }
  }, [newUser.password, pwdPass]);

  const onName = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      name: e.target.value,
    }));
  };

  const onEmail = (e) => {
    const value = e.target.value;
    setEmailId(value);
  };

  const onEmailDomain = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setEmailDomain("");
    } else {
      setEmailDomain(value);
    }
  };

  const onCustomDomain = (e) => {
    // console.log(e.target.value);
    const value = e.target.value;
    setCustomDomain(value);
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
    call(`/signup/userId/${newUser.userId}`, "GET", null).then((response) => {
      //console.log(response);
      setIdCheck(response);
    });
  };

  const onNicknameCheck = (e) => {
    e.preventDefault();
    call(`/signup/nickName/${newUser.nickName}`, "GET", null).then(
      (response) => {
        //  console.log(response.data);
        setNicknameCheck(response);
      }
    );
  };

  const onEmailCheck = (e) => {
    e.preventDefault();
    const domain = emailDomain === "" ? customDomain : emailDomain;
    const email = emailId + "@" + domain;
    console.log("이메일 들어갔음", email);

    if (email === "@" || domain === "") {
      return setEmailCheck(1);
    }
    setNewUser((prevUser) => ({
      ...prevUser,
      email: email,
    }));

    call(`/signup/emailConfirm/${email}`, "POST").then((response) => {
      console.log("서버에서 값 받아옴 ", response.message);
      if (response.message === "1") {
        return setEmailCheck(1);
      }
      setEmailCheckData(response.message);

      setEmailCheck(-1);
    });
  };

  const onEmailPass = (e) => {
    const value = e.target.value;
    setEmailCheckInput(value);
  };

  const onEmailCheckPass = (e) => {
    e.preventDefault();
    if (emailCheckInput === emailCheckData) {
      return setEmailPassCheck(-1);
    }
    setEmailPassCheck(1);
  };

  const sendSms = (e) => {
    e.preventDefault();

    if (newUser.phone.length !== 11) {
      alert("전화번호를 다시 입력해주세요");
      return;
    }
    const request = {
      phoneNum: newUser.phone,
    };
    call("/signup/smsSend", "POST", request).then((response) => {
      if (response && response.token) {
        // if (response && response.message === "success") {
        alert("인증번호가 전송되었습니다, 5분내 인증을 완료해주세요");
        localStorage.setItem("SMSTOKEN", response.token);
        localStorage.setItem("SMSTOKENEXPIRE", response.expireDate);
        setIsSmsSend(1);
      } else {
        // console.log(response);
        setIsSmsSend(-1);
      }
    });
  };

  const onSmsCheckInput = (e) => {
    setSmsCheckInput(e.target.value);
  };

  const sendSmsCheck = (e) => {
    e.preventDefault();
    // 문자 인증 토큰 만료시간 체크
    const smsExpireDate = localStorage.getItem("SMSTOKENEXPIRE");
    const now = new Date().getTime();
    if (now >= Date.parse(smsExpireDate)) {
      alert("인증시간이 만료되었습니다, 인증 문자를 다시 발송해주세요");
      return;
    }

    const request = {
      token: localStorage.getItem("SMSTOKEN"),
      verifyCode: smsCheckInput,
    };

    call("/signup/smsCheck", "POST", request).then((response) => {
      console.log(response);
      if (response && response.message === "success") {
        localStorage.setItem("SMSTOKEN", "");
        localStorage.setItem("SMSTOKENEXPIRE", "");
        setIsSmsChecked(1);
      } else if (response && response.error === "fail") {
        setIsSmsChecked(-1);
      }
    });
  };

  const handleAddr = () => {
    // 주소 검색
    new daum.Postcode({
      oncomplete: function (data) {
        // 검색한 주소명
        const addr = data.address;

        // 주소 정보를 해당 input 태그에 입력
        document.getElementById("memAddr").value = addr;
        setNewUser({ ...newUser, address: addr });
      },
    }).open();
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
              <label className="signup-text-id">아이디 *</label>
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
              <label className="signup-text-id">닉네임 *</label>
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
              <label className="signup-text-id">비밀번호 *</label>
              <input
                className="signup-text-input"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={onPwd}
              />
            </div>
            {pwdRegCheck === 1 ? (
              <p className="signup-duplicated-msg">
                비밀번호를 4자이상 문자,숫자를 한개이상 입력해주세요
              </p>
            ) : (
              ""
            )}
            <div className="signup-input-container">
              <label className="signup-text-id">비밀번호확인 *</label>
              <input
                className="signup-text-input"
                type="password"
                placeholder="비밀번호를 한번더 입력해주세요"
                onChange={onPwdCheck}
              />
            </div>
            {pwdCheck === 1 ? (
              <p className="signup-duplicated-msg">
                비밀번호를 다시확인해주세요
              </p>
            ) : (
              ""
            )}
            {pwdCheck === -1 ? (
              <p className="signup-duplicated1-msg">
                비밀번호를 사용할수있습니다
              </p>
            ) : (
              ""
            )}
            <div className="signup-input-container">
              <label className="signup-text-id">이름 *</label>
              <input
                className="signup-text-input"
                type="text"
                placeholder="이름을 입력해주세요"
                onChange={onName}
              />
            </div>
            <div className="signup-input-container">
              <label className="signup-text-id">이메일 *</label>
              <input
                className="signup-text-input-email"
                type="text"
                placeholder="ex):saessak"
                onChange={onEmail}
              />
              <span>@</span>
              <select
                className="signup-text-input-select"
                onChange={onEmailDomain}
              >
                <option value="custom">이메일 선택</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="hanmail.com">hanmail.com</option>
              </select>
              <input
                className="signup-text-input-email"
                type="text"
                placeholder="ex):mail.com"
                onChange={onCustomDomain}
              />
              <button className="signup-bt2" onClick={onEmailCheck}>
                인증번호발송
              </button>
            </div>
            {emailCheck === 1 ? (
              <p className="signup-duplicated-msg">
                사용할수 없는 이메일 입니다.
              </p>
            ) : (
              ""
            )}
            {emailCheck === -1 ? (
              <div className="signup-input-container">
                <label className="signup-text-id">인증 번호</label>
                <input
                  className="signup-text-input"
                  type="text"
                  placeholder="ex):복사한 인증키를 입력해주세요"
                  onChange={onEmailPass}
                />
                <button className="signup-bt2" onClick={onEmailCheckPass}>
                  인증
                </button>
              </div>
            ) : (
              ""
            )}
            {emailPassCheck === 1 ? (
              <p className="signup-duplicated-msg">
                인증 번호를 다시 확인 해주세요
              </p>
            ) : (
              ""
            )}
            {emailPassCheck === -1 ? (
              <p className="signup-duplicated1-msg">
                이메일 인증이 확인 되었습니다.
              </p>
            ) : (
              ""
            )}
            <div className="signup-input-container">
              <label className="signup-text-id">휴대폰 *</label>
              {/* <input
                className="signup-text-input"
                type="number"
                placeholder="숫자만 입력해주세요"
                onChange={onPhone}
              />
              <button className="signup-bt3" onClick={sendSms}>인증</button> */}
              <input
                className="signup-text-input"
                type="tel"
                name="phone"
                placeholder="전화번호 숫자만 입력해주세요"
                pattern="[0-9]{11}"
                onChange={onPhone}
                required
              />
              <button className="signup-bt3" onClick={sendSms}>
                인증
              </button>
            </div>
            {isSmsSend === -1 ? (
              <p className="signup-duplicated-msg">
                전화번호가 올바르지 않습니다.
              </p>
            ) : (
              ""
            )}
            {isSmsSend === 1 ? (
              <div className="signup-input-container">
                <label className="signup-text-id">인증 번호</label>
                <input
                  className="signup-text-input"
                  type="text"
                  placeholder="ex):복사한 인증키를 입력해주세요"
                  onChange={onSmsCheckInput}
                  readOnly={isSmsChecked === 1 ? true : false}
                />
                <button
                  className="signup-bt2"
                  onClick={sendSmsCheck}
                  disabled={isSmsChecked === 1 ? true : false}
                >
                  인증
                </button>
              </div>
            ) : (
              ""
            )}
            {isSmsChecked === -1 ? (
              <p className="signup-duplicated-msg">
                인증 번호를 다시 확인 해주세요
              </p>
            ) : (
              ""
            )}
            {isSmsChecked === 1 ? (
              <p className="signup-duplicated1-msg">
                전화번호 인증이 확인 되었습니다.
              </p>
            ) : (
              ""
            )}
            <div className="signup-input-container">
              <label className="signup-text-id">주소</label>
              <input
                className="signup-text-input"
                id="memAddr"
                type="text"
                // value={address}
                placeholder="주소를 등록하세요!"
                onClick={handleAddr}
                readOnly
              />
            </div>
            <div className="signup-input-container">
              <label className="signup-text-id">성별 *</label>
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
                필수 정보를 모두 입력해주세요.(*표시, 중복확인 필수!)
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
