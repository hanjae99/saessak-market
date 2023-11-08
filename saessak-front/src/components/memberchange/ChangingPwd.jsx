import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { call } from "../../ApiService";

const ChangingPwd = () => {
  const movePage = useNavigate();
  const [password, setPassword] = useState("");
  const [privacys, setPrivacys] = useState([]);

  useEffect(() => {
    call("/user/mypage", "GET", null).then((response) => {
      console.log("==========useEffect 잘 가져왔나", response);
      setPrivacys(response.data[0]);
    });
  }, []);

  const pwdChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    call("/user/changingpwd", "POST", { password }).then((response) => {
      console.log(response.error);
      if (response.error === "true") {
        movePage("/user/changingpass");
      } else if (response.error === "false") {
        alert("비밀번호가 맞지않습니다.");
      }
    });
  };

  return (
    <div className="newmain4">
      <div className="pwdCheck">
        <div className="pwdCheck1">
          <h2
            style={{ fontSize: "40px", marginTop: "0", marginBottom: "80px" }}
          >
            비밀번호 확인
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="pwdCheck2">
              <div>
                <label style={{ marginRight: "40px" }}>아이디</label>
                <input
                  type="text"
                  style={{ border: "none" }}
                  placeholder={privacys.userId}
                  readOnly
                />
              </div>
              <div>
                <label style={{ marginRight: "20px" }}>비밀번호</label>
                <input
                  type="password"
                  value={password}
                  onChange={pwdChange}
                  style={{
                    borderRadius: "4px",
                    outlineColor: "rgba(109, 200, 42, 1)",
                  }}
                />
              </div>
            </div>
            <div className="pwdCheck3">
              <button
                type="submit"
                style={{
                  borderRadius: "4px",
                  backgroundColor: "rgba(109, 200, 42, 0.7)",
                  border: "none",
                  color: "white",
                }}
              >
                확인
              </button>
              <button
                style={{
                  borderRadius: "4px",
                  backgroundColor: "rgba(109, 200, 42, 0.7)",
                  border: "none",
                  color: "white",
                }}
                onClick={() => movePage("/user/mypage")}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangingPwd;
