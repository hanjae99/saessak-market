import { useNavigate } from "react-router-dom";
import ImgUpdate from "./ImgUpdate";
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
                <input
                  type="text"
                  placeholder={꺼내온정보[2].name}
                  readOnly
                ></input>
                <input
                  type="text"
                  placeholder={꺼내온정보[2].nickname}
                  readOnly
                ></input>
                <input
                  type="passward"
                  placeholder={꺼내온정보[2].pwd}
                  readOnly
                ></input>
                <input
                  type="email"
                  placeholder={꺼내온정보[2].email}
                  readOnly
                ></input>
                <input
                  type="tel"
                  placeholder={꺼내온정보[2].phone}
                  readOnly
                ></input>
                <input
                  type="text"
                  placeholder={꺼내온정보[2].address}
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
