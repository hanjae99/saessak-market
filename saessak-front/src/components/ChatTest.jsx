import React, { useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";

const ChatTest = () => {
  // 채팅 입력과 채팅 내용을 관리하기 위한 상태
  const [chatInput, setChatInput] = useState("");
  const [chatContent, setChatContent] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // 웹소켓을 설정하고 연결하는 함수
    const connectWebSocket = () => {
      // 웹소켓 연결 정보를 사용하여 StompJS 클라이언트를 생성
      const client = new StompJs.Client({
        brokerURL: `ws://localhost:8888/chatTest`,
        reconnectDelay: 5000,
      });

      // 웹소켓 연결이 수립되었을 때 수행할 작업 정의
      client.onConnect = () => {
        setStompClient(client); // 연결된 클라이언트를 상태에 설정
        console.log("WebSocket 연결 성공"); // 성공한 연결을 로그로 기록

        // 특정 웹소켓 주제를 구독하여 채팅 메시지를 수신
        client.subscribe("/topic/chatMessages", (message) => {
          // 받은 메시지로 채팅 내용을 업데이트
          setChatContent([...chatContent, message.body]);
        });
      };

      // 웹소켓 통신 중 발생할 수 있는 오류 처리
      client.onStompError = (frame) => {
        console.error("WebSocket 오류: " + frame); // 웹소켓 오류를 로그로 기록
      };

      // 웹소켓 연결 활성화
      client.activate();
    };

    // 웹소켓을 설정하고 연결하는 함수 호출
    connectWebSocket();

    // 컴포넌트가 언마운트될 때 웹소켓 연결 정리
    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.deactivate(); // 웹소켓 연결 비활성화
      }
    };
  }, [chatContent]);

  // 채팅 입력 필드 변경을 처리하는 함수
  const handleInput = (e) => {
    setChatInput(e.target.value);
  };

  // 채팅 메시지 제출을 처리하는 함수
  const handleSubmit = () => {
    if (stompClient) {
      // 웹소켓 특정 대상에 채팅 메시지 발행
      stompClient.publish({
        destination: "/app/chat/2",
        body: chatInput,
      });
    }
    setChatInput(""); // 제출 후 채팅 입력 필드 지우기
  };

  // 채팅 입력 상자와 채팅 상자 렌더링
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
