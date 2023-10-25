import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { call } from "../../ApiService";

const KakaoLogin = () => {
  // const setUser = useSetRecoilState(userState);
  const navi = useNavigate();
  // 1.해당 페이지가 로딩되었다면 url 에 인가코드가 담기게 된다.
  useEffect(() => {
    //2.인가코드를 추출할 변수 생성. 현재 url 주소를 가지고 있다.
    const url = new URL(window.location.href);

    //3.위에서 만든 URL 에서 code=  라고 써진 키값을 찾아서 벨류를 반환받음.

    const code = url.searchParams.get("code");

    //4.위에서 얻은 인가코드를 백엔드의 카카로 로그인주소로 보냄.

    call(`/auth/kakao?code=${code}`, "GET").then((respones) => {
      localStorage.setItem("token", respones.data.token);

      //5. ok respone 확인하고, 이후 작업 해야함(유저로그인시키기, 토큰 브라우저에 저장)

      // axios //서버에서 유저정보 요청하는 url
      //   .get(`${REQUEST_ADDRESS}userinfo`, {
      //     headers: {
      //       //헤더에 token을 담아서 전달
      //       Authorization: "Bearer " + res.data.token,
      //     },
      //   })
      //서버에서 유휴성 검사 - > 확인되면 유저 데이터 전달해주고 프론트에서는
      // const setUser = useSetRecoilState(userState);
      // recoilstate로 유저 데이터 저장
      // 하고 dashboard로 이동 시키기  로그인끝!
      // .then((response) => {

      //   navi("/dashboard");
      // });
    });
  }, []);
  return <div>KakaoLogin</div>;
};

export default KakaoLogin;
