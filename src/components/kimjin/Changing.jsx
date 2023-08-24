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

    // //아이디
    // if(newName !== ""){
    //   dispatch({type: "user/update", payload: {...users.find(p => p.id === "jin"), name: newName}})
    // }

    //------------------------------------------------------------------------------------

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
          name: newName,
          pwd: new_pwd,
          phone: newPhone,
          address: newAddress,
        },
      });
      setNow_pwd("");
      setNew_pwd("");
      setNew_pwd_check("");
    }
  };

  return (
    <div>
      <form onSubmit={pwdSubmit}>
        <div className="Changing-1">
          <div>
            <h1
              style={{ fontSize: "40px", marginTop: "0", marginBottom: "40px" }}
            >
              회원정보 수정
            </h1>
          </div>
          <div className="changing1">
            <div>
              <label style={{ marginRight: "100px" }}>이름</label>
              <input
                type="text"
                value={newName}
                placeholder={users[2].name}
                onChange={newNameChange}
                style={{
                  borderRadius: "4px",
                  outlineColor: "rgba(109, 200, 42, 1)",
                }}
              />
            </div>
            <div>
              <label style={{ marginRight: "32.5px" }}>핸드폰 번호</label>
              <input
                type="phone"
                value={newPhone}
                placeholder={users[2].phone}
                onChange={newPhoneChange}
                style={{
                  borderRadius: "4px",
                  outlineColor: "rgba(109, 200, 42, 1)",
                }}
              />
            </div>
            <div>
              <label style={{ marginRight: "12.5px" }}>현재 비밀번호</label>
              <input
                type="text"
                value={now_pwd}
                onChange={pwdChange}
                style={{
                  borderRadius: "4px",
                  outlineColor: "rgba(109, 200, 42, 1)",
                }}
              />
            </div>
            <div>
              <label style={{ marginRight: "32.5px" }}>새 비밀번호</label>
              <input
                type="password"
                value={new_pwd}
                onChange={newPwdChange}
                style={{
                  borderRadius: "4px",
                  outlineColor: "rgba(109, 200, 42, 1)",
                }}
              />
            </div>
            <div>
              <label style={{ marginRight: "12px" }}>비밀번호 확인</label>
              <input
                type="password"
                value={new_pwd_check}
                onChange={newPwdChangeCheck}
                style={{
                  borderRadius: "4px",
                  outlineColor: "rgba(109, 200, 42, 1)",
                }}
              />
            </div>
            <div>
              <label style={{ marginRight: "100px" }}>주소</label>
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
            <div
              style={{
                marginTop: "130px",
                textAlign: "right",
                marginRight: "10px",
              }}
            >
              {/* <button onClick={() => movePage('mypage')}>수정 완료</button> */}
              <button
                type="submit"
                style={{
                  marginRight: "10px",
                  width: "100px",
                  height: "40px",
                  backgroundColor: "rgba(109, 200, 42, 0.7)",
                  border: "none",
                }}
              >
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
