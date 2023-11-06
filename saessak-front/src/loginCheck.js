export function loginCheck() {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== "") {
    // 토큰 유효시간 검사
    const expiration = localStorage.getItem("EXPIREDATE");
    if (expiration && expiration !== "") {
      const now = new Date().getTime();
      // 토큰 만료
      if (now >= Date.parse(expiration)) {
        localStorage.setItem("ACCESS_TOKEN", "");
        localStorage.setItem("EXPIREDATE", "");
        localStorage.setItem("NICKNAME", "");
        return "token expired";
      } else {
        // 토큰 유지, 로그인 유지
        return "login ok";
      }
    }
  } else {
    return "not login";
  }
}
