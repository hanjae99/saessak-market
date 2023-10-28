import React, { useState } from "react";

const ChatTest = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatContent, setChatcontent] = useState([]);

  const handleInput = (e) => {
    setChatInput(e.target.value);
  };

  const handleSubmit = () => {
    setChatcontent([...chatContent, chatInput]);
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
