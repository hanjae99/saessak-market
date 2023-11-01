import React, { useCallback, useRef, useState, useEffect } from "react";
import "./Chat.scss";
import * as StompJs from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import { chatCall } from "../../ChatService";
import { API_BASE_URL } from "../../ApiConfig";

const Chat = () => {
  const { chatBoxId } = useParams();
  const [chatInput, setChatInput] = useState("");
  const [chatContent, setChatContent] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [me, setMe] = useState(""); // 현재 채팅방에 접속한 사람이 누구인지
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState("");

  const msgBox = chatContent.map((item, idx) => (
    <div key={idx} className={item.memberId === me ? "me" : "other"}>
      <span>
        <b>{item.memberId}</b>
      </span>{" "}
      [ {new Date(item.regTime).toLocaleString()} ]<br />
      <span>{item.content}</span>
    </div>
  ));

  useEffect(() => {
    // 이전 채팅 데이터 불러오기
    const request = {
      chatBoxId,
    };
    chatCall("/chatBox/getList", "POST", request).then((response) => {
      if (response && response.chatList) {
        setChatContent(response.chatList);
        setMe(response.writer);
        setProductTitle(response.productTitle);
        setProductPrice(response.productPrice);
        setProductImg(response.imgUrl);
      }
    });
  }, [chatBoxId]);

  useEffect(() => {
    const connectWebSocket = () => {
      const client = new StompJs.Client({
        brokerURL: "ws://localhost:8888/chatting",
        reconnectDelay: 5000,
      });

      client.onConnect = () => {
        setStompClient(client);
        console.log("WebSocket 연결 성공");

        client.subscribe(`/topic/chatMessages/${chatBoxId}`, (message) => {
          console.log(message);
          const msgData = JSON.parse(message.body);
          console.log(msgData);
          setChatContent([...chatContent, msgData.body]);
        });

        scrollToBottom();
      };

      client.onStompError = (frame) => {
        console.error("WebSocket 오류: " + frame);
      };

      client.activate();
    };

    connectWebSocket();

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, [chatContent]);

  const handleInput = (e) => {
    setChatInput(e.target.value);
  };

  function scrollToBottom() {
    const chatForm = document.getElementById("talk");
    console.log(chatForm);
    chatForm.scrollTop = chatForm.scrollHeight;
  }

  const handleSubmit = () => {
    if (chatInput !== "") {
      const data = {
        chatBoxId,
        memberId: me,
        content: chatInput,
      };

      const temp = JSON.stringify(data);

      if (stompClient) {
        stompClient.publish({
          destination: "/app/chat/" + chatBoxId,
          // contentType: "application/json",
          body: temp,
        });
      }

      setChatInput("");
    }
  };

  return (
    <>
      <div className="chatContainer">
        <div id="chat-wrap">
          <div id="chatt">
            {/* <h1 id="title">{chatContent.find(item => item.memberId !== me).memberNick} 채팅방</h1> */}
            <div id="title">
              <img
                src="/img/leaf1.png"
                style={{ width: "30px", height: "30px" }}
                alt="leaf1"
              />{" "}
              새싹 채팅방
            </div>
            <div className="chat-productInfo">
              <img src={API_BASE_URL + productImg} alt="판매상품이미지" />
              <div>
                <p className="chat-product-title">
                  상품명: {productTitle} dfsfsfsfsfsfsfsfsfsfsfsfsfssfsfs
                </p>
                <p className="chat-product-price">가격: {productPrice}원</p>
              </div>
            </div>
            <br />
            <div id="talk">
              <div className="talk-shadow">{msgBox}</div>
            </div>
            {/* <input
              disabled={chkLog}
              placeholder="이름을 입력하세요."
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            /> */}
            <div id="sendZone">
              <textarea
                id="msg"
                value={chatInput}
                onChange={handleInput}
                onKeyDown={(ev) => {
                  if (ev.keyCode === 13) {
                    handleSubmit();
                  }
                }}
              ></textarea>
              <input
                type="button"
                value="입력"
                id="btnSend"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
