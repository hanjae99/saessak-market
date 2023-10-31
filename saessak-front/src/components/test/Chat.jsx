import React, { useCallback, useRef, useState, useEffect } from "react";
import "./Chat.scss";
import * as StompJs from "@stomp/stompjs";

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatContent, setChatContent] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [name, setName] = useState("");
  const [chkLog, setChkLog] = useState(false);

  // if (chatContent) {
  //   const msgBox = chatContent.map((item, idx) => (
  //     <div key={idx} className={item.name === name ? "me" : "other"}>
  //       <span>
  //         <b>{item.name}</b>
  //       </span>{" "}
  //       [ {item.date} ]<br />
  //       <span>{item.msg}</span>
  //     </div>
  //   ));
  // }

  const msgBox = chatContent.map((item, idx) => (
    <div key={idx} className={item.name === name ? "me" : "other"}>
      <span>
        <b>{item.name}</b>
      </span>{" "}
      [ {new Date(item.date).toLocaleString()} ]<br />
      <span>{item.msg}</span>
    </div>
  ));

  useEffect(() => {
    const connectWebSocket = () => {
      const client = new StompJs.Client({
        brokerURL: "ws://localhost:8888/chatTest",
        reconnectDelay: 5000,
      });

      client.onConnect = () => {
        setStompClient(client);
        console.log("WebSocket 연결 성공");

        client.subscribe("/topic/chatMessages", (message) => {
          console.log(message);
          const msgData = JSON.parse(message.body);
          console.log(msgData);
          setChatContent([...chatContent, msgData.body]);
        });
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

  const handleSubmit = () => {
    if (!chkLog) {
      if (name === "") {
        alert("이름을 입력하세요.");
        document.getElementById("name").focus();
        return;
      }
      // webSocketLogin();
      setChkLog(true);
    }
    if (chatInput !== "") {
      const data = {
        name,
        msg: chatInput,
        date: new Date(),
      };

      const temp = JSON.stringify(data);

      if (stompClient) {
        stompClient.publish({
          destination: "/app/chat",
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
            <h1 id="title">WebSocket Chatting</h1>
            <br />
            <div id="talk">
              <div className="talk-shadow"></div>
              {msgBox}
            </div>
            <input
              disabled={chkLog}
              placeholder="이름을 입력하세요."
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
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
                value="전송"
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
