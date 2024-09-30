import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./ChatRealTime.scss";
import { useCookies } from "react-cookie";
import axios from "axios";

const ChatRealTime = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null); // State để lưu trữ file ảnh
  const socketRef = useRef(null);
  const [cookies] = useCookies();
  const [idAdmin, setIdAdmin] = useState(""); // Thay đổi kiểu dữ liệu
  const [idRoom, setIdRoom] = useState();

  // Lấy thông tin admin
  const getAdmin = async () => {
    try {
      const response = await fetch(`http://localhost:5050/users?level=1`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.user_token,
        },
      });
      const result = await response.json();
      setIdAdmin(result.data[0]?._id || ""); // Thay đổi kiểu dữ liệu
    } catch (error) {
      console.error("Lỗi khi lấy thông tin admin:", error);
    }
  };

  // Tạo phòng chat
  const createRoomChat = async () => {
    if (!idAdmin) return; // Kiểm tra idAdmin trước khi gọi API
    const data = {
      userId: cookies.id_user,
      adminId: idAdmin,
    };

    try {
      const response = await axios.post(
        "http://localhost:5050/chats/create-chat-room",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: 'Bearer ' + cookies.user_token,
          },
        }
      );
      const newRoomId = response.data.data._id;
      await createMessInRoomChat(newRoomId); // Gọi hàm với idRoom mới
      await getMessInRoomChat(newRoomId); // Gọi hàm với idRoom mới
    } catch (error) {
      console.error("Lỗi khi tạo phòng chat:", error);
    }
  };

  // Tìm phòng chat
  const getRoom = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/chats/chat-room?user_id=${cookies.id_user}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: 'Bearer ' + cookies.user_token,
          },
        }
      );
      const data = response.data.data;
      if (response.data.status_code === 201) {
        await createRoomChat();
      } else {
        await createMessInRoomChat(data._id);
        await getMessInRoomChat(data._id);
      }
    } catch (error) {
      console.error("Lỗi khi tìm phòng chat:", error);
    }
  };

  const getRoomF = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/chats/chat-room?user_id=${cookies.id_user}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: 'Bearer ' + cookies.user_token,
          },
        }
      );
      const data = response.data.data;
      if (response.data.status_code === 200) {
        setIdRoom(data?._id);
        getMessInRoomChat(data?._id);
      }
    } catch (error) {
      console.error("Lỗi khi tìm phòng chat:", error);
    }
  };
  // hiển thị khi mới vào trang web
  useEffect(() => {
    getRoomF();
  }, []);
  // Tạo tin nhắn trong phòng chat
  const createMessInRoomChat = async (chatRoomId) => {
    if (!chatRoomId) return; // Kiểm tra idRoom trước khi gọi API
    const data = {
      content: message,
      sender: "user",
      chatRoomId: chatRoomId,
    };

    try {
      await axios.post("http://localhost:5050/chats/send-message", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: 'Bearer ' + cookies.user_token,
        },
      });
    } catch (error) {
      console.error("Lỗi khi tạo tin nhắn:", error);
    }
  };

  // Lấy tin nhắn trong phòng chat
  const getMessInRoomChat = async (chatRoomId) => {
    if (!chatRoomId) return; // Kiểm tra idRoom trước khi gọi API
    try {
      const response = await axios.get(
        `http://localhost:5050/chats/chat-room/${chatRoomId}/messages`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: 'Bearer ' + cookies.user_token,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy tin nhắn:", error);
    }
  };

  // Realtime
  useEffect(() => {
    const socket = io("http://localhost:5050");
    socketRef.current = socket;

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...msg, sender: "admin" },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    getAdmin();
  }, []);

  useEffect(() => {
    getAdmin();
  }, []);
  // Format thời gian
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

  // Gửi tin nhắn văn bản
  const sendTextMessage = () => {
    if (message.trim() !== "") {
      const messageText = {
        content: message,
        sender: "user",
      };
      socketRef.current.emit("message", messageText);
      setMessages((prevMessages) => [...prevMessages, messageText]);
      getRoom();
      setMessage("");
    }
  };

  // Gửi tin nhắn ảnh
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

  // Xử lý sự kiện gửi tin nhắn
  const handleSendMessage = () => {
    if (imageFile) {
      sendImageMessage();
    } else {
      sendTextMessage();
    }
  };

  const messagesList =
    messages.length > 0 ? (
      messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          {msg.type === "image" ? (
            <img
              style={{ width: "10rem", height: "10rem" }}
              src={msg.data}
              alt="sent"
            />
          ) : (
            <div>{msg.content}</div>
          )}
          <div className="timestamp-hidden">{formatTime(msg.timestamp)}</div>
        </div>
      ))
    ) : (
      <p>ko co mess</p>
    );

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
