import React, { useState } from "react";
import { uploadProduct } from "../../ApiService";
import { API_BASE_URL } from "../../ApiConfig";

const ChattingBox = () => {
  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  uploadProduct("/chatBox/chatboxList", "GET").then((response) => {
    console.log(response);
    const userimg = API_BASE_URL + response.data[0].imgUrl;
    setImage(userimg);
  });

  return (
    <div>
      <div style={{ display: "flex", width: "800px", height: "100px" }}>
        <div style={{ flex: "0.5" }}>
          {/* <img src=""
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50px",
              border: "1px solid black",
            }}
          /> */}
        </div>
        <div
          style={{
            flex: "3",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>상품 제목</div>
          <div
            style={{
              width: "300px",
              height: "30px",
              marginTop: "20px",
              marginLeft: "10px",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            상대 이름
          </div>
          <div
            style={{
              marginLeft: "10px",
            }}
          >
            마지막 채팅기록
          </div>
        </div>
        <div style={{ flex: "0.5", display: "flex", flexDirection: "column" }}>
          <div style={{ height: "5px" }}></div>
          <input
            type="text"
            style={{
              width: "80px",
              height: "40px",
              lineHeight: "50px",
              textAlign: "center",
              border: "1px solid black",
              marginLeft: "10px",
              borderRadius: "10px",
            }}
            placeholder="들어가기"
          />
          <div style={{ height: "10px" }}></div>
          <input
            type="text"
            style={{
              width: "80px",
              height: "40px",
              lineHeight: "50px",
              textAlign: "center",
              border: "1px solid black",
              marginLeft: "10px",
              borderRadius: "10px",
            }}
            placeholder="나가기"
          />
        </div>
      </div>
    </div>
  );
};

export default ChattingBox;
