import { useNavigate } from "react-router-dom";
import ImgUpdate from "./ImgUpdate";
// import './Manu.css'
import { useSelector } from "react-redux";

const MyPage = () => {
  const movePage = useNavigate();
  const 꺼내온정보 = useSelector((state) => state.user);
  console.log("꺼내온정보", 꺼내온정보);
  return (
    <div className="section">
      <div className="manu-2">
        <div className="manu-2-1">
          <div className="manu-2-1-1">
            <div className="manu-2-1-1-1">
              <span className="section-title">회원정보</span>
            </div>
            <div className="mypage-1" style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>이름 </label>
                <label>닉네임 </label>
                <label>비밀번호 </label>
                <label>이메일 </label>
                <label>연락처 </label>
                <label>주소 </label>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type="text"
                  placeholder={꺼내온정보[1].name}
                  readOnly
                ></input>
                <input
                  type="text"
                  placeholder="다이어트 호소인"
                  readOnly
                ></input>
                <input
                  type="passward"
                  placeholder="**********"
                  readOnly
                ></input>
                <input
                  type="email"
                  placeholder="rlawls2006@naver.com"
                  readOnly
                ></input>
                <input type="tel" placeholder="010-5061-8328" readOnly></input>
                <input
                  type="text"
                  placeholder="강북구 미아동 ***-**"
                  readOnly
                ></input>
              </div>
            </div>
            {/* <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div> */}
            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => movePage("/user/changingpwd")}
                style={{
                  marginRight: "10px",
                  width: "100px",
                  height: "40px",
                  backgroundColor: "rgba(109, 200, 42, 0.7)",
                  border: "none",
                }}
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
                width: "95%",
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
            <textarea
              style={{
                width: "95%",
                height: "400px",
                resize: "none",
                fontSize: "20px",
                borderBottomLeftRadius: "5px",
                borderBottomRightRadius: "5px",
                borderBottom: "2px solid #D3D3D3",
                borderRight: "2px solid #D3D3D3",
                borderLeft: "2px solid #D3D3D3",
              }}
              placeholder="자기 소개"
              className="textarea1"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
