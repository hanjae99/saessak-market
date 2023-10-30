import React, { useState } from "react";
import SockJsClient from "react-stomp";

function App() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message && clientRef) {
      clientRef.sendMessage("/app/sendTo", message);
    }
  };

  const handleReceiveMessage = (msg) => {
    setReceivedMessage(msg.message);
  };

  let clientRef = null;

  return (
    <div>
      <input type="text" value={message} onChange={handleMessageChange} />
      <button onClick={sendMessage}>Send</button>
      <div>Received Message: {receivedMessage}</div>
      <SockJsClient
        url="ws/chatTest"
        topics={["/topic/sendTo"]}
        onMessage={handleReceiveMessage}
        ref={(client) => {
          clientRef = client;
        }}
      />
    </div>
  );
}

export default App;
