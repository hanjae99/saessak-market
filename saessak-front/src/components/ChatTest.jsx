import React, { useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";

const ChatTest = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatContent, setChatContent] = useState([]);
  const [stompClient, setStompClient] = useState(null);

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
          setChatContent([...chatContent, message.body]);
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
    if (stompClient) {
      stompClient.publish({
        destination: "/app/chat",
        body: chatInput,
      });
    }
    setChatInput("");
  };

  return (
    <div>
      <div className="chatInputBox">
        <input
          type="text"
          name="chatInput"
          value={chatInput}
          onChange={handleInput}
        />
        <button onClick={handleSubmit}>보내기</button>
      </div>
      <div className="chatBox">
        {chatContent.map((chat, index) => (
          <div key={index} style={{ border: "1px solid black" }}>
            {chat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatTest;
