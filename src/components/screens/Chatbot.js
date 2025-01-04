import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isBotTyping, setIsBotTyping] = useState(false); // New state for bot typing indicator
  const chatBoxRef = useRef(null);

  const userAvatar = "https://www.w3schools.com/w3images/avatar2.png"; // Placeholder for user image
  const botAvatar = "/chatbot.png"; // Placeholder for bot image

  const sendMessage = async () => {
    if (!userInput) return;

    // Add user's message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userInput, avatar: userAvatar },
    ]);
    setUserInput("");

    try {
      setIsBotTyping(true); // Show the bot is typing

      const response = await axios.post("http://127.0.0.1:5000/get_response", {
        message: userInput,
      });

      setIsBotTyping(false); // Hide the typing indicator

      // Add bot's response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: response.data.response, avatar: botAvatar },
      ]);
    } catch (error) {
      setIsBotTyping(false); // Hide typing indicator on error
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, I couldn't process your request." },
      ]);
    }
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => {
      if (!prev && messages.length === 0) {
        setMessages([
          {
            sender: "bot",
            text: "If you have any queries, feel free to ask!",
            avatar: botAvatar,
          },
        ]);
      }
      setShowWelcome(false); // Hide welcome message when chat is opened
      return !prev;
    });
  };

  // Scroll to the bottom of the chatbox every time messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle "Enter" key press to send message
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      {/* Welcome Message */}
      {showWelcome && (
        <div className="welcome-message">
          If you have any queries, feel free to ask!
          <div className="arrow-down"></div>
        </div>
      )}

      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={toggleChat}>
        <span>💬</span>
      </div>

      {/* Chatbot Interface */}
      {isChatOpen && (
        <div className="chatbot">
          <div className="chatbox" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-avatar">
                  <img src={msg.avatar} alt="avatar" />
                </div>
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
            {isBotTyping && (
              <div className="message bot">
                <div className="message-avatar">
                  <img src={botAvatar} alt="avatar" />
                </div>
                <div className="message-text">Bot is typing...</div>
              </div>
            )}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress} // Add this line for handling "Enter" key press
              placeholder="Type your message..."
            />
            <button className="send-button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
