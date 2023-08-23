import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SingUp = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    id: "",
    nickname: "",
    pwd: "",
    name: "",
    email: "",
    phone: "",
    address: "관악구",
    gender: "",
    userproduct: [],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("id", newUser.id);
    console.log("nickname", newUser.nickname);
    console.log("pwd", newUser.pwd);
    console.log("name", newUser.name);
    console.log("email", newUser.email);
    console.log("phone", newUser.phone);
    console.log("address", newUser.address);
    console.log("gender", newUser.gender);

    dispatch({ type: "user/add", payload: newUser });
  };

  const onNickname = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      nickname: e.target.value,
    }));
  };
  const onId = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      id: e.target.value,
    }));
  };
  const onPwd = (e) => {
    setNewUser((prevUser) => ({
      ...prevUser,
      pwd: e.target.value,
    }));
  };

  const onPwdCheck = (e) => {
    const { value } = e.target;
    if (newUser.pwd === value) {
      setNewUser((prevUser) => ({
        ...prevUser,
        pwd: e.target.value,
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

  return (
    <div>
      <h1>회원가입</h1>
      <form>
        <div>
          <label>아이디</label>
          <input
            type="text"
            placeholder="아이디를 입력해주세요"
            onChange={onId}
          />
          <button>중복확인</button>
        </div>
        <div>
          <label>닉네임</label>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={onNickname}
          />
          <button>중복확인</button>
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onPwd}
          />
        </div>
        <div>
          <label>비밀번호확인</label>
          <input
            type="password"
            placeholder="비밀번호를 한번더 입력해주세요"
            onChange={onPwdCheck}
          />
        </div>
        <div>
          <label>이름</label>
          <input
            type="text"
            placeholder="이름을입력해주세요"
            onChange={onName}
          />
        </div>
        <div>
          <label>이메일</label>
          <input
            type="text"
            placeholder="ex):saessak@gamil.com"
            onChange={onEmail}
          />
          <button>이메일 인증 api</button>
        </div>
        <div>
          <label>휴대폰</label>
          <input
            type="number"
            placeholder="숫자만 입력해주세요"
            onChange={onPhone}
          />
          <button>전화번호 인증 api</button>
        </div>
        <div>
          <label>주소</label>
          <input type="button" value="버튼" />
        </div>
        <div>
          <label>성별</label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={newUser.gender === "male"}
            onChange={onGenderChange}
          />
          남성
          <input
            type="radio"
            name="gender"
            value="female"
            checked={newUser.gender === "female"}
            onChange={onGenderChange}
          />
          여성
        </div>
        <br />
        <div>
          <label>이용약관</label>
          <p>
            <input type="checkbox" />
            이용약관
          </p>
          <p>
            <input type="checkbox" />
            개인정보 수집.이용 동의
          </p>
          <p>
            <input type="checkbox" />
            혜택/정보 수신동의
          </p>
          <p>
            <input type="checkbox" />
            마케팅 동의
          </p>
        </div>
      </form>
      <button type="button" onClick={onSubmit}>
        가입하기
      </button>
    </div>
  );
};

export default SingUp;
