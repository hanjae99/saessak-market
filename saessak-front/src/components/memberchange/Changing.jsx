import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { call } from "../../ApiService";

const Changing = () => {
  const onNickNameChange = (e) => {
    setNewNickName(e.target.value);
  };
  const onEmailChange = (e) => {
    setNewEmail(e.target.value);
  };
  const onPhoneChange = (e) => {
    setNewPhone(e.target.value);
  };
  const onPassWordChange = (e) => {
    setNew_pwd(e.target.value);
  };
  const onAddressChange = (e) => {
    setNewAddress(e.target.value);
  };
  const onNow_PswChange = (e) => {
    setNow_pwd(e.target.value);
  };
  const onNew_PswChange = (e) => {
    setNew_pwd_check(e.target.value);
  };

  // const onButtonClick = () => {
  //   const item = {
  //     id: "1",
  //     nickName: newNickName,
  //     email: newEmail,
  //     password: new_pwd,
  //     address: newAddress,
  //   };
  //   editItem(item);
  //   // movePage("/user/mypage");
  // };

  const [privacys, setPrivacys] = useState([]);

  useEffect(() => {
    call("/user/mypage", "GET", null).then((response) => {
      setPrivacys(response.data[0]);
      console.log("==========useEffect 잘 가져왔나", response);
    });
  }, []);

  const movePage = useNavigate();
  const [now_pwd, setNow_pwd] = useState("");
  const [new_pwd, setNew_pwd] = useState("");
  const [new_pwd_check, setNew_pwd_check] = useState("");
  const [newName, setNewName] = useState("");
  const [newNickName, setNewNickName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState(0);

  console.log(
    "value값",
    now_pwd,
    new_pwd,
    new_pwd_check,
    newName,
    newNickName,
    newEmail,
    newPhone,
    newAddress
  );

  const onCheckNickName = (e) => {
    e.preventDefault();

    console.log(newNickName);
    call(`/user/changing/${newNickName}`, "GET", null).then((response) => {
      if (response === 1) {
        console.log("이미 사용 중인 닉네임입니다.");
        setNicknameCheck(1); // 이미 사용 중인 닉네임이라면 1로 설정
      } else if (response === -1) {
        console.log("사용 가능한 닉네임입니다.");
        setNicknameCheck(-1); // 사용 가능한 닉네임이라면 -1로 설정
      }
    });

    if (nicknameCheck === 1) {
      return;
    }
  };

  const pwdSubmit = (e) => {
    e.preventDefault();

    console.log("privacys.email ====> ", privacys.email);
    console.log("privacys.nickname ====> ", privacys.nickName);
    console.log("privacys.address ====> ", privacys.address);
    console.log("new_pwd ====> ", new_pwd);
    console.log("new_pwd_check ====> ", new_pwd_check);
    console.log("now_pwd ====> ", now_pwd);
    console.log("privecy ====> ", privacys.password);

    const item = {
      id: privacys.id,
      nickName: newNickName,
      email: newEmail,
      address: newAddress,
    };

    call("/user/changing", "PUT", item)
      .then((response) => {
        console.log("Data updated successfully", response);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });

    // movePage("/user/mypage");
    // window.location.reload();
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
                {nicknameCheck === 1 ? (
                  <p className="changing-duplicated-msg4"></p>
                ) : (
                  ""
                )}
                {nicknameCheck === -1 ? (
                  <p className="changing-duplicated1-msg4"></p>
                ) : (
                  ""
                )}
                <label>이메일</label>
                <label>핸드폰 번호</label>
                <label>주소</label>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input type="hidden" value={privacys.id ?? ""} />
                <input
                  type="text"
                  value={newName}
                  placeholder={privacys.name}
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
                  placeholder={privacys.nickName}
                  onChange={onNickNameChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                {nicknameCheck === 1 ? (
                  <p className="changing-duplicated-msg3">
                    이미 사용 중인 닉네임입니다.
                  </p>
                ) : (
                  ""
                )}
                {nicknameCheck === -1 ? (
                  <p className="changing-duplicated1-msg3">
                    사용가능한 닉네임입니다.
                  </p>
                ) : (
                  ""
                )}
                <input
                  type="email"
                  value={newEmail}
                  placeholder={privacys.email}
                  onChange={onEmailChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="text"
                  value={newPhone}
                  placeholder={privacys.phone}
                  onChange={onPhoneChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                  readOnly
                />
                <input
                  type="address"
                  value={newAddress}
                  placeholder={privacys.address}
                  onChange={onAddressChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
              </div>
              <div>
                <button
                  style={{ width: "90px", marginTop: "53px" }}
                  className="signup-bt1"
                  onClick={onCheckNickName}
                >
                  중복확인
                </button>
              </div>
            </div>
            <div
              style={{
                marginTop: "130px",
                textAlign: "right",
                marginRight: "10px",
              }}
            >
              <button
                className="changing-com-button"
                onClick={(e) => movePage("/user/changingpwd")}
              >
                비밀번호 변경
              </button>
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
