import React, { useEffect, useState } from "react";
import { uploadProduct } from "../../ApiService";
import { API_BASE_URL } from "../../ApiConfig";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

const ChattingBox = () => {
  const [chat, setChat] = useState([]);

  const movePages = useNavigate();

  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);

  let { page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // 페이지 초기 값 설정
  if (!page) {
    page = 1;
  }

  useEffect(() => {
    uploadProduct(`/chatBox/chatBox/${page}`, "GET").then((response) => {
      console.log(response.content);
      if (response && response !== null) {
        setChat(response.content);
      }
    });
  }, [currentPage]);

  const goToPreviousPage = () => {
    const prevPage = Math.max(1, currentPage - 1);
    setCurrentPage(prevPage);

    uploadProduct(`/chatBox/chatBox/${prevPage}`, "GET").then((response) => {
      if (response && response !== null) {
        setChat(response.content);
      }
    });
  };

  const goToNextPage = () => {
    const totalPage = 10;
    const nextPage = Math.min(totalPage, currentPage + 1);
    setCurrentPage(nextPage);

    uploadProduct(`/chatBox/chatBox/${nextPage}`, "GET").then((response) => {
      if (response && response !== null) {
        setChat(response.content);
      }
    });
  };

  return (
    <div>
      <div>
        {chat &&
          chat.map((e, i) => (
            <div key={i}>
              <div
                style={{
                  width: "900px",
                  height: "150px",
                  // border: "2px solid black",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center" /* 수평 가운데 정렬 */,
                  alignItems: "center" /* 수직 가운데 정렬 */,
                  borderBottom: "rgb(200, 200, 200)",
                }}
                onClick={() => movePages("/chat/" + chat[i].chatBoxId)}
              >
                <div
                  style={{
                    display: "flex",
                    width: "850px",
                    height: "100px",
                  }}
                >
                  <div style={{ flex: "0.429" }}>
                    <img
                      src={`${API_BASE_URL}${chat[i].imgUrl}`}
                      alt=""
                      style={{
                        width: "100%",
                        alt: "",
                        height: "100%",
                        borderRadius: "20px",
                      }}
                      onClick={() => movePages("/detail/" + chat[i].productId)}
                    />
                  </div>
                  <div
                    style={{
                      flex: "3",
                      display: "flex",
                      flexDirection: "column",
                      paddingLeft: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        borderBottom: "1px solid black",
                      }}
                    >
                      <div
                        style={{
                          flex: "5",
                          fontSize: "20px",
                          fontWeight: "bold",
                          whiteSpace:
                            "nowrap" /* 텍스트가 줄 바꿈되지 않도록 설정 */,
                          overflow: "hidden" /* 넘친 부분을 감춥니다. */,
                          textOverflow:
                            "ellipsis" /* 넘친 텍스트를 생략 부호(...)로 표시합니다. */,
                        }}
                        onClick={() => movePages("/chat/" + chat[i].chatBoxId)}
                      >
                        {chat[i].productTitle}
                      </div>
                      <div>
                        {(() => {
                          const date = new Date(chat[i].lastChatTime);
                          const year = date.getFullYear();
                          const month = (1 + date.getMonth())
                            .toString()
                            .padStart(2, "0");
                          const day = date
                            .getDate()
                            .toString()
                            .padStart(2, "0");
                          const hours = date
                            .getHours()
                            .toString()
                            .padStart(2, "0");
                          const minutes = date
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                          return `${year}-${month}-${day} ${hours}:${minutes}`;
                        })()}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "300px",
                        height: "30px",
                        marginTop: "15px",
                        marginLeft: "10px",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      {chat[i].counterNickName}
                    </div>
                    <div
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      {chat[i].lastChatContent}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: "15px",
                  backgroundColor: "rgb(240, 240, 240)",
                  borderRadius: "10px",
                }}
              ></div>
            </div>
          ))}
      </div>
      <div className="pagination1" style={{ marginTop: "20px" }}>
        {/* 이전 페이지로 이동하는 버튼 */}
        <button onClick={goToPreviousPage}>이전</button>
        {/* 다음 페이지로 이동하는 버튼 */}
        <button onClick={goToNextPage}>다음</button>
      </div>
    </div>
  );
};

export default ChattingBox;
