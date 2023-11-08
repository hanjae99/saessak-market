import { useNavigate } from "react-router-dom";
import ImgUpdate from "../kimjin/ImgUpdate";
import { useEffect, useState } from "react";
import { call, memberdelete, signout } from "../../ApiService";

const MyPage = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken !== "") {
      // 로그인한 상태
      setIsLogin(true);
      call("/user/mypage", "GET", null).then((response) => {
        console.log("==========useEffect 잘 가져왔나", response);
        setPrivacys(response.data[0]);
      });
    } else {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
    }
  }, []);

  const [privacys, setPrivacys] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    const isConfirmed = window.confirm("정말 계정을 삭제하시겠습니까?");
    if (isConfirmed) {
      call("/user/delete", "PUT").then(() => {});
      alert("그동안 이용해주셔서 감사합니다.");
      navigate("/");
      memberdelete();
    }
  };

  return (
    <div className="section">
      <div className="manu-2">
        <div className="manu-2-1">
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
              <ImgUpdate privacys={privacys}></ImgUpdate>
            </div>
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
                  <label>이메일 </label>
                  <label>연락처 </label>
                  <label>주소 </label>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    type="text"
                    placeholder={privacys.name}
                    readOnly
                  ></input>
                  <input
                    type="text"
                    placeholder={privacys.nickName}
                    readOnly
                  ></input>
                  <input
                    type="email"
                    placeholder={privacys.email}
                    readOnly
                  ></input>
                  <input
                    type="tel"
                    placeholder={privacys.phone}
                    readOnly
                  ></input>
                  <input
                    type="text"
                    placeholder={privacys.address}
                    readOnly
                  ></input>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  onClick={() => navigate("/user/changing")}
                  className="mypage-button"
                >
                  회원정보수정
                </button>
              </div>
              <div
                style={{
                  width: "80px",
                  height: "50px",
                  display: "flex",
                  flexDirection: "column-reverse",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={handleDelete}
                  style={{
                    backgroundColor: "white",
                    border: 0,
                    color: "#C0C0C0",
                    cursor: "pointer",
                  }}
                >
                  회원 탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
