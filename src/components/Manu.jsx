import { useNavigate } from "react-router-dom";
import ImgUpdate from "./ImgUpdate"
import './Manu.css'


const Manu = () => {
  const movePage = useNavigate();
  return (
    <div className="all">
      <div >
        <h1 className='header'>새싹마켓</h1>
      </div>
      <div className="manu-main">
        <div className="manu">
          <div className="manu-1">
            <div className="li-1"><button onClick={() => movePage('/user/mypage')}>마이페이지</button></div>
            <div className="li-2"><button onClick={() => movePage('/user/check')}>상품조회</button></div>
            <div className="li-3"><button onClick={() => movePage('/user/wishlist')}>찜 목록</button></div>
          </div>
        </div>
        <div className="section">
          <div className="section-2">
            <div className="manu-2">
              <h2 className="section-title">회원정보</h2>
              <div>
                <label>이름 </label>
                <input type="text" placeholder="김진" readOnly></input>
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
                <input type="email" placeholder="rlawls2006@naver.com" readOnly></input>
              </div>
              <div>
                <label>연락처 </label>
                <input type="tel" placeholder="010-5061-8328" readOnly></input>
              </div>
              <div>
                <label>주소 </label>
                <input type="text" placeholder="강북구 미아동 ***-**" readOnly></input>
              </div>
              <div><button onClick={() => movePage('/user/changingpwd')}>회원정보수정</button></div>
            </div>
            <div className="manu-3">
              <ImgUpdate></ImgUpdate>
              <input type="text" placeholder="자기 소개" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Manu