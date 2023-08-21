import ImgUpdate from "./ImgUpdate"
import './Manu.css'


const Manu = () => {
  return (
    <div>
      <div className="manu">
      <ul className="manu-1">
        <li><a href="/">마이페이지</a></li>
        <li><a href="/">상품조회</a></li>
        <li><a href="/">찜 목록</a></li>
      </ul>
      </div>
      <div>
        <h2>회원정보</h2>
        <div className="manu-2">
          <div>
          <label>이름 </label>
          <input type="text" placeholder="김진" readOnly></input>
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
          <div><button>회원정보수정</button></div>
        </div>
        <div>
      <ImgUpdate></ImgUpdate>
      <input type="text" placeholder="자기 소개"/>
        </div>
      </div>
    </div>
  )
}

export default Manu