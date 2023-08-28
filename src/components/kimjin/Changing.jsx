import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Changing = () => {
  const movePage = useNavigate();
  const users = useSelector((state) => state.user);
  const [now_pwd, setNow_pwd] = useState("");
  const [new_pwd, setNew_pwd] = useState("");
  const [new_pwd_check, setNew_pwd_check] = useState("");
  const [newName, setNewName] = useState("");
  const [newNickName, setNewNickName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const dispatch = useDispatch();

  //현재 비밀번호
  const pwdChange = (e) => {
    setNow_pwd(e.target.value);
  };
  //비밀번호 변경
  const newPwdChange = (e) => {
    setNew_pwd(e.target.value);
  };
  //비밀번호 확인
  const newPwdChangeCheck = (e) => {
    setNew_pwd_check(e.target.value);
  };
  //아이디 변경
  const newNameChange = (e) => {
    setNewName(e.target.value);
  };
  //닉네임 변경
  const newNickChange = (e) => {
    setNewNickName(e.target.value);
  };
  //이메일 변경
  const newEmailChange = (e) => {
    setNewEmail(e.target.value);
  };
  //핸드폰 번호 변경
  const newPhoneChange = (e) => {
    setNewPhone(e.target.value);
  };
  //주소 변경
  const newAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const pwdSubmit = (e) => {
    e.preventDefault();

    //이메일 입력안했을때
    if (newEmail === "") {
      alert("이메일을 입력해주세요");
      return;
    }

    //비밀번호가 틀렸을 때
    if (users.find((p) => p.id === "jin").pwd !== now_pwd) {
      alert("현재 비밀번호가 다릅니다. 다시 입력해주세요.");
      setNow_pwd("");
      return;
    }
    if (new_pwd !== new_pwd_check) {
      alert("비밀번호가 일치하지 않습니다.");
      setNew_pwd("");
      setNew_pwd_check("");
      return;
    }

    //비밀번호가 맞을 때
    if (new_pwd !== "") {
      dispatch({
        type: "user/update",
        payload: {
          ...users.find((p) => p.id === "jin"),
          nickname: newNickName,
          pwd: new_pwd,
          address: newAddress,
        },
      });
      setNewNickName("");
      setNow_pwd("");
      setNew_pwd("");
      setNew_pwd_check("");
      setNewAddress("");
      movePage("/user/mypage");
    }

    //주소를 적지않았을때
    if (newAddress === "") {
      setNewEmail(users[2].email);
    }
    return;
  };

  return (
    <div>
      <form onSubmit={pwdSubmit}>
        <div className="Changing-1">
          <div>
            <h1 className="changing-h1">회원정보 수정</h1>
          </div>
          <div className="changing1">
            <div className="mypage-2" style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>이름</label>
                <label>닉네임</label>
                <label>이메일</label>
                <label>핸드폰 번호</label>
                <label>현재 비밀번호</label>
                <label>새 비밀번호</label>
                <label>비밀번호 확인</label>
                <label>주소</label>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type="text"
                  value={newName}
                  placeholder={users[2].name}
                  onChange={newNameChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                    fontWeight: "bold",
                    border: "none",
                    fontSize: "20px",
                    color: "black",
                    paddingBottom: "9px",
                  }}
                  readOnly
                />
                <input
                  type="text"
                  value={newNickName}
                  placeholder={users[2].nickname}
                  onChange={newNickChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="email"
                  value={newEmail}
                  placeholder={users[2].email}
                  onChange={newEmailChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="phone"
                  value={newPhone}
                  placeholder={users[2].phone}
                  onChange={newPhoneChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                  readOnly
                />
                <input
                  type="text"
                  value={now_pwd}
                  onChange={pwdChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="password"
                  value={new_pwd}
                  onChange={newPwdChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="password"
                  value={new_pwd_check}
                  onChange={newPwdChangeCheck}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="address"
                  value={newAddress}
                  placeholder={users[2].address}
                  onChange={newAddressChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                marginTop: "130px",
                textAlign: "right",
                marginRight: "10px",
              }}
            >
              <button type="submit" className="changing-com-button">
                수정 완료
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Changing;
