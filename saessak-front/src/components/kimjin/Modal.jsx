import { PiGearSixBold } from "react-icons/pi";
import "../kimjin/Manu.css";
import { useState } from "react";
  
function Modal({ isOpen, content, closeModal }) {
  const [newChat, setNewChat] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const newChatChange = (e) => {
    setNewChat(e.target.value);
  };

  const sendChat = () => {
    if (newChat) {
      // 새로운 메시지를 chatHistory 배열에 추가
      setChatHistory([...chatHistory, newChat]);
      // 입력 필드 초기화
      setNewChat("");
    }
  };

  return (
    <div>
      <div
        style={{
          display: isOpen ? "block" : "none",
        }}
      >
        <div className="chatting-all">
          <div className="chatting-main">
            <div className="chatting-header">
              <img
                src="../../img/saessak.png"
                alt="logo"
                className="chatting-logo"
              />
              <img
                src="../../img/logo.png"
                alt="새싹마켓 logo"
                className="chatting-textlogo"
              />
              <div style={{ cursor: "pointer" }} className="chatting-icon">
                <PiGearSixBold />
              </div>
            </div>
            <div
              style={{
                height: "800px",
                backgroundColor: "#9bbbd4",
              }}
            >
              {chatHistory.map((message, index) => (
                <div key={index} style={{ zIndex: "1" }}>
                  {message}
                </div>
              ))}
            </div>
            <div className="chatting-footer">
              <div className="chatting-footer1">
                <input
                  type="text"
                  placeholder="입력해주세요...."
                  className="chatting-footer1-1"
                ></input>
              </div>
              <div className="chatting-footer2">
                <div className="chatting-footer2-0"></div>
                <div className="chatting-footer2-2">
                  <input type="text" value={newChat} onChange={newChatChange} />
                  <button onClick={sendChat}>전송</button>
                </div>
              </div>
              <div>{content}</div>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
