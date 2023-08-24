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
            <span className="section-title">회원정보</span>
          </div>
          <div>
            <label>이름 </label>
            <input
              type="text"
              placeholder={꺼내온정보[1].name}
              readOnly
            ></input>
          </div>
          <div>
            <label>닉네임 </label>
            <input type="text" placeholder="다이어트 호소인" readOnly></input>
          </div>
          <div>
            <label>비밀번호 </label>
            <input type="passward" placeholder="**********" readOnly></input>
          </div>
          <div>
            <label>이메일 </label>
            <input
              type="email"
              placeholder="rlawls2006@naver.com"
              readOnly
            ></input>
          </div>
          <div>
            <label>연락처 </label>
            <input type="tel" placeholder="010-5061-8328" readOnly></input>
          </div>
          <div>
            <label>주소 </label>
            <input
              type="text"
              placeholder="강북구 미아동 ***-**"
              readOnly
            ></input>
          </div>
          <div>
            <button onClick={() => movePage("/user/changingpwd")}>
              회원정보수정
            </button>
          </div>
          <div className="manu-3">
            <ImgUpdate></ImgUpdate>
            <input type="text" placeholder="자기 소개" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
