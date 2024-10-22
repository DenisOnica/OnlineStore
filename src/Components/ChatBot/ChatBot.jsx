import { useState } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMessage = { sender: "bot", text: data.response };
    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setInput("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`chat-container ${isMinimized ? "minimized" : ""}`}>
      <div className="chat-header" onClick={toggleMinimize} id="chat-header">
        <span>{isMinimized ? "Open Chat" : "ChatBot"}</span>
        <button className="minimize-button" id="minimize-button">
          {isMinimized ? "🔼" : "🔽"}
        </button>
      </div>
      {!isMinimized && (
        <>
          <div className="chat-box" id="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input" id="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about a product..."
              id="chat-input-field"
            />
            <button onClick={sendMessage} id="send-button">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
