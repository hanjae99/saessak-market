import React from "react";
import { call } from "../../ApiService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ChangingPass = () => {
  const [privacys, setPrivacys] = useState([]);

  useEffect(() => {
    call("/user/mypage", "GET", null).then((response) => {
      setPrivacys(response.data[0]);
    });
  }, []);

  const movePage = useNavigate();
  const [new_pwd, setNew_pwd] = useState("");
  const [new_pwd_check, setNew_pwd_check] = useState("");

  const onPassWordChange = (e) => {
    setNew_pwd(e.target.value);
  };
  const onNew_PswChange = (e) => {
    setNew_pwd_check(e.target.value);
  };

  const pwdSubmit = (e) => {
    e.preventDefault();

    console.log("new_pwd ====> ", new_pwd);
    console.log("new_pwd_check ====> ", new_pwd_check);
    console.log("privecy ====> ", privacys.password);

    //비밀번호가 틀렸을 때
    if (new_pwd !== new_pwd_check) {
      alert("비밀번호가 일치하지 않습니다.");
      setNew_pwd("");
      setNew_pwd_check("");
      return;
    }

    //비밀번호가 맞을 때
    if (new_pwd === "") {
      alert("비밀번호를 입력해 주세요.");
      return;
    }
    const item = {
      id: privacys.id,
      password: new_pwd,
    };

    call("/user/changingpass", "PUT", item).then((response) => {
      if (response.error === "null") {
        alert("새 비밀번호를 입력해주세요.");
      }
      if (response.error === "true") {
        movePage("/user/mypage");
      }
    });
  };

  return (
    <div>
      <form onSubmit={pwdSubmit}>
        <div className="Changing-1">
          <div>
            <h1 className="changing-h1">비밀번호 수정</h1>
          </div>
          <div className="changing1">
            <div className="mypage-2" style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>새 비밀번호</label>
                <label>새 비밀번호 확인</label>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input type="hidden" value={privacys.id ?? ""} />

                <input
                  type="password"
                  value={new_pwd}
                  onChange={onPassWordChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
                <input
                  type="password"
                  value={new_pwd_check}
                  onChange={onNew_PswChange}
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

export default ChangingPass;
