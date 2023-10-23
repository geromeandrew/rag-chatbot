import React, { useState, useEffect } from "react";
import "./ChatWidget.css";

const ChatWidget = () => {
  const [showChatbox, setShowChatbox] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const toggleChatbox = () => {
    setShowChatbox(!showChatbox);
  };

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    setChatMessages([...chatMessages, { text: inputMessage, isUser: true }]);
    setInputMessage("");

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_question: inputMessage }),
      });

      if (response.ok) {
        const data = await response.text();
        setChatMessages([...chatMessages, { text: data, isUser: false }]);
      } else {
        console.error("Error sending the message");
      }
    } catch (error) {
      console.error("Error sending the message:", error);
    }
  };

  useEffect(() => {
    if (showChatbox) {
      const chatbox = document.getElementById("chatbox");
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }, [chatMessages, showChatbox]);

  return (
    <div className="chat-widget">
      <div className={`chatbox ${showChatbox ? "active" : ""}`}>
        <div className="chat-header">
          <span>LenraTechBot</span>
          <button onClick={toggleChatbox} className="close-button">
            X
          </button>
        </div>
        <div className="chat-messages" id="chatbox">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? "user" : "bot"}`}
            >
              {message.text}
            </div>
          ))}{" "}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputChange}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
      <button onClick={toggleChatbox} className="widget-button">
        Chat
      </button>
    </div>
  );
};

export default ChatWidget;
