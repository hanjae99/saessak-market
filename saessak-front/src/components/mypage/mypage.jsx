import { useNavigate } from "react-router-dom";
import ImgUpdate from "../kimjin/ImgUpdate";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { call } from "../../ApiService";

const MyPage = () => {
  const movePage = useNavigate();

  const [privacys, setPrivacys] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken !== "") {
      // 로그인한 상태
      setIsLogin(true);
    } else {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
    }
  }, []);

  // useEffect 훅 사용: 컴포넌트가 렌더링될 때 실행되며 초기 데이터를 불러옴
  useEffect(() => {
    call("/user/mypage", "GET", null).then((response) => {
      console.log("==========useEffect 잘 가져왔나", response);
      setPrivacys(response.data[0]);
    });
  }, []);

  return (
    <div className="section">
      <div className="manu-2">
        <div className="manu-2-1">
          <div className="manu-2-1-1">
            <div className="manu-2-1-1-1">
              <span className="section-title">회원정보</span>
            </div>
            <div className="mypage-1" style={{ display: "flex" }}>
              <div
                className="mypage-1-1"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label>이름 </label>
                <label>닉네임 </label>
                <label>비밀번호 </label>
                <label>이메일 </label>
                <label>연락처 </label>
                <label>주소 </label>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input type="text" placeholder={privacys.name} readOnly></input>
                <input
                  type="text"
                  placeholder={privacys.nickName}
                  readOnly
                ></input>
                <input
                  type="password"
                  placeholder={"***********"}
                  readOnly
                ></input>
                <input
                  type="email"
                  placeholder={privacys.email}
                  readOnly
                ></input>
                <input type="tel" placeholder={privacys.phone} readOnly></input>
                <input
                  type="text"
                  placeholder={privacys.address}
                  readOnly
                ></input>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => movePage("/user/changing")}
                className="mypage-button"
              >
                회원정보수정
              </button>
            </div>
          </div>
          <div className="manu-3">
            <div
              style={{
                textAlign: "center",
                height: "15%",
                width: "100%",
                backgroundColor: "#F5F5F5",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                borderTop: "2px solid #D3D3D3",
                borderRight: "2px solid #D3D3D3",
                borderLeft: "2px solid #D3D3D3",
              }}
            >
              <ImgUpdate></ImgUpdate>
            </div>
            <textarea placeholder="자기 소개" className="textarea1"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
