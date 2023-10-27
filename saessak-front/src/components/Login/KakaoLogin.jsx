import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { call } from "../../ApiService";

const KakaoLogin = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  useEffect(() => {
    const kakaoLogin = async () => {
      call(`/login/auth/kakao/${code}`, "GET").then((response) => {
        //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
        console.log(response);
        //계속 쓸 정보들( ex: 이름) 등은 localStorage에 저장해두자
        localStorage.setItem("ACCESS_TOKEN", response.token);
        //로그인이 성공하면 이동할 페이지
        //navigate("/");
      });
    };
    kakaoLogin();
  }, []);
  return (
    <div className="LoginHandeler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default KakaoLogin;
