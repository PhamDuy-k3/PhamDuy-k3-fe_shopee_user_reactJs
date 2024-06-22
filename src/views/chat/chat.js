import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./ChatRealTime.scss";

const ChatRealTime = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null); // State để lưu trữ file ảnh
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:5050");
    socketRef.current = socket;

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...msg, sender: "server" },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const sendTextMessage = () => {
    if (message.trim() !== "") {
      const messageWithTimestamp = {
        text: message,
        timestamp: new Date().toISOString(),
        sender: "self",
      };
      socketRef.current.emit("message", messageWithTimestamp);
      setMessages((prevMessages) => [...prevMessages, messageWithTimestamp]);
      setMessage("");
    }
  };

  const sendImageMessage = () => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const messageWithTimestamp = {
          type: "image",
          data: event.target.result,
          timestamp: new Date().toISOString(),
          sender: "self",
        };
        socketRef.current.emit("message", messageWithTimestamp);
        setMessages((prevMessages) => [...prevMessages, messageWithTimestamp]);
        setImageFile(null); // Reset imageFile state after sending
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSendMessage = () => {
    if (imageFile) {
      sendImageMessage();
    } else {
      sendTextMessage();
    }
  };

  const messagesList = messages.map((msg, index) => (
    <div key={index} className={`message ${msg.sender}`}>
      {msg.type === "image" ? (
        <img
          style={{ width: "10rem", height: "10rem" }}
          src={msg.data}
          alt="sent"
        />
      ) : (
        <div>{msg.text}</div>
      )}
      <div className="timestamp-hidden">{formatTime(msg.timestamp)}</div>
    </div>
  ));

  return (
    <div className="chat-container">
      <div className="messages">{messagesList}</div>
      <div className="input-container">
        <input type="file" onChange={handleFileInputChange} />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRealTime;
