import { API_BASE_URL } from "./ApiConfig";

// API 호출을 수행하는 함수를 정의합니다.
export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // const accessToken =localStorage.getItem("ACCESS_TOKEN")
  // if(accessToken && accessToken != null){
  //     headers.append("Authorization","Bearer "+accessToken);
  // }

  // API 호출에 사용할 옵션 객체를 설정합니다.
  let options = {
    headers: headers,
    url: API_BASE_URL + api, // API 엔드포인트 URL을 설정합니다.
    method: method, // HTTP 요청 메서드를 설정합니다 (GET, POST, PUT, DELETE 등).
  };

  // 요청 데이터가 존재하는 경우, 요청 데이터를 JSON 문자열로 변환하여 옵션에 추가합니다.
  if (request) {
    options.body = JSON.stringify(request);
    console.log(options);
  }

  // fetch 함수를 사용하여 API에 요청을 보내고, 응답을 처리합니다.
  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json(); // 응답 데이터를 JSON 형식으로 파싱하여 반환합니다.
      } else if (response.status === 403) {
        // window.location.href = "/login";
      } else {
        throw Error(response);
      }
    })
    .catch((error) => {
      console.log(error); // 오류가 발생한 경우 콘솔에 오류 메시지를 출력합니다.
    });
}

export function uploadProduct(api, method, request) {
  let headers = new Headers({});

  // API 호출에 사용할 옵션 객체를 설정합니다.
  let options = {
    headers: headers,
    url: API_BASE_URL + api, // API 엔드포인트 URL을 설정합니다.
    method: method, // HTTP 요청 메서드를 설정합니다 (GET, POST, PUT, DELETE 등).
    body: request,
  };

  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200) {
        // window.location.href = "/search";
        return response.json();
      } else if (response.status === 400) {
        alert("등록실패! 상품 등록 정보를 확인해주세요");
        // window.location.href = "/addproduct";
      } else {
        throw Error(response);
      }
    })
    .catch((error) => {
      console.log(error); // 오류가 발생한 경우 콘솔에 오류 메시지를 출력합니다.
    });
}
