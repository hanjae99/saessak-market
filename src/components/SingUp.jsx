import React from "react";

const SingUp = () => {
  return (
    <div>
      <form>
        <h1>회원가입</h1>
        <form>
          <div>
            <label>아이디</label>
            <input type="text" placeholder="아이디를 입력해주세요" />
            <button>중복확인</button>
          </div>
          <div>
            <label>닉네임</label>
            <input type="text" placeholder="닉네임을 입력해주세요" />
            <button>중복확인</button>
          </div>
          <div>
            <label>비밀번호</label>
            <input type="password" placeholder="비밀번호를 입력해주세요" />
          </div>
          <div>
            <label>비밀번호확인</label>
            <input
              type="password"
              placeholder="비밀번호를 한번더 입력해주세요"
            />
          </div>
          <div>
            <label>이름</label>
            <input type="text" placeholder="이름을입력해주세요" />
          </div>
          <div>
            <label>이메일</label>
            <input type="text" placeholder="ex):saessak@gamil.com" />
            <button>이메일 인증 api</button>
          </div>
          <div>
            <label>휴대폰</label>
            <input type="number" placeholder="숫자만 입력해주세요" />
            <button>전화번호 인증 api</button>
          </div>
          <div>
            <label>주소</label>
            <input type="button" value="버튼" />
          </div>
          <div>
            <label>성별</label>
            <input type="radio" name="gender" value="male" />
            남성
            <input type="radio" name="gender" value="female" />
            여성
          </div>
          <br />
          <div>
            <label>이용약관</label>
            <p>
              <input type="checkbox" />
              이용약관
            </p>
            <p>
              <input type="checkbox" />
              개인정보 수집.이용 동의
            </p>
            <p>
              <input type="checkbox" />
              혜택/정보 수신동의
            </p>
            <p>
              <input type="checkbox" />
              마케팅 동의
            </p>
          </div>
          <button type="submit">가입하기</button>
        </form>
      </form>
    </div>
  );
};

export default SingUp;
