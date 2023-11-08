import { Button } from "@mui/material";
import * as StompJs from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../ApiConfig";
import { chatCall } from "../../ChatService";
import { loginCheck } from "../../loginCheck";
import priceComma from "../../pricecomma";
import "./Chat.scss";

const Chat = () => {
  const { chatBoxId } = useParams();
  const [chatInput, setChatInput] = useState("");
  const [chatContent, setChatContent] = useState([]);
  const stompClient = useRef(null);
  const [me, setMe] = useState(""); // 현재 채팅방에 접속한 사람이 누구인지
  const [productId, setProductId] = useState(0);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState("");
  const [isSeller, setIsSeller] = useState(false); // 현재 채팅방에 접속한 사람이 판매자인지
  const [sellStatus, setSellStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const result = loginCheck();
    if (result === "not login") {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    } else if (result === "token expired") {
      alert("로그인 시간이 만료되었습니다, 다시 로그인해주세요!");
      navigate("/login");
      return;
    } else if (result === "login ok") {
      chatCall("/chatBox/validateUser", "POST", { id: chatBoxId }).then(
        (response) => {
          if (response && response.message) {
            if (response.message === "no chatBox") {
              alert("유효하지 않은 주소입니다.");
              navigate("/");
              return;
            } else if (response.message === "user not ok") {
              alert("등록된 유저가 아닙니다.");
              navigate("/");
              return;
            } else if (response.message === "user ok") {
              // 이전 채팅 데이터 불러오기
              const request = {
                id: chatBoxId,
              };
              chatCall("/chatBox/getList", "POST", request).then((response) => {
                if (response) {
                  setChatContent(response.chatList);
                  setMe(response.writer);
                  setProductId(response.productId);
                  setProductTitle(response.productTitle);
                  setProductPrice(response.productPrice);
                  setProductImg(response.imgUrl);
                  setIsSeller(response.seller);
                  setSellStatus(response.sellStatus);
                }
              });
            }
          }
        }
      );
    }
  }, [chatBoxId]);

  useEffect(() => {
    const connectWebSocket = () => {
      stompClient.current = new StompJs.Client({
        brokerURL: "ws://localhost:8888/chatting",
        reconnectDelay: 3000,
      });

      stompClient.current.onConnect = () => {
        stompClient.current.subscribe(
          `/topic/chatMessages/${chatBoxId}`,
          (message) => {
            const msgData = JSON.parse(message.body);
            setChatContent([...chatContent, msgData]);
          }
        );

        scrollToBottom();
      };

      stompClient.current.onStompError = (frame) => {
        console.error("WebSocket 오류: " + frame);
      };

      stompClient.current.activate();
    };

    connectWebSocket();

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.deactivate();
      }
    };
  }, [chatContent]);

  const handleInput = (e) => {
    setChatInput(e.target.value);
  };

  function scrollToBottom() {
    const chatForm = document.getElementById("talk");
    chatForm.scrollTop = chatForm.scrollHeight;
  }

  const handleSubmit = () => {
    if (chatInput !== "") {
      const data = {
        chatBoxId,
        memberId: me,
        memberNickname: localStorage.getItem("NICKNAME"),
        content: chatInput,
        regTime: new Date(),
      };

      const temp = JSON.stringify(data);

      if (stompClient.current) {
        stompClient.current.publish({
          destination: "/app/chat/" + chatBoxId,
          body: temp,
        });
      }

      setChatInput("");
    }
  };

  const handleSell = (e) => {
    e.preventDefault();

    chatCall("/chatBox/sell", "POST", { id: chatBoxId }).then((response) => {
      if (response && response.message === "success") {
        setSellStatus("SOLD_OUT");
      }
    });
  };

  const msgBox =
    chatContent &&
    chatContent.length !== 0 &&
    chatContent.map((item, idx) => (
      <div key={idx} className={item.memberId === me ? "me" : "other"}>
        <span>
          <b>{item.memberNickname}</b>
        </span>{" "}
        [ {new Date(item.regTime).toLocaleString()} ]<br />
        <span>{item.content}</span>
      </div>
    ));

  return (
    <>
      <div className="chatContainer">
        <div id="chat-wrap">
          <div id="chatt">
            <div id="title">
              <img
                src="/img/leaf1.png"
                style={{ width: "30px", height: "30px" }}
                alt="leaf1"
              />{" "}
              새싹 채팅방
            </div>
            <div className="chat-product">
              {productImg && (
                <div className="chat-product-img">
                  <img src={API_BASE_URL + productImg} alt="판매상품이미지" />
                </div>
              )}
              <div className="chat-productInfo">
                {sellStatus === "SELL" ? (
                  <h3 style={{ color: "#4F9051" }}>판매중</h3>
                ) : sellStatus === "SOLD_OUT" ? (
                  <h3 style={{ color: "#AC2F00" }}>판매완료</h3>
                ) : (
                  <h3 style={{ color: "#c8c8c8" }}>상품없음</h3>
                )}

                <p className="chat-product-title">상품명: {productTitle}</p>
                <p className="chat-product-price">
                  가격: {priceComma(productPrice)}원
                </p>
              </div>
              {isSeller && sellStatus === "SELL" ? (
                <div className="chat-productBtn">
                  <Button variant="contained" onClick={handleSell}>
                    판매완료
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
            <br />
            <div id="talk">
              <div className="talk-shadow">{msgBox}</div>
            </div>
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
