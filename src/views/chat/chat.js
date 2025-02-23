import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./ChatRealTime.scss";
import { useCookies } from "react-cookie";
import axios from "axios";
import moment from "moment";
import imgChatDf from "../../../src/assets/images/img/chat_default.jpg";
import LoadingMess from "../../components/loadingmess/loadingMess";
const ChatRealTime = ({ inputChat }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null); // State để lưu trữ file ảnh
  const socketRef = useRef(null);
  const [cookies, setCookie] = useCookies();
  const [idAdmin, setIdAdmin] = useState(""); // Thay đổi kiểu dữ liệu
  const [idRoom, setIdRoom] = useState();
  const [imageFileChoese, setImageFileChoese] = useState(null); // State để lưu trữ file ảnh
  const [loading, setLoading] = useState(false);

  const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;
    return Date.now() > exp;
  };
  //
  const refreshAccessToken = async () => {
    const refreshToken = cookies.user_refreshToken;
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await axios.post(
        "http://localhost:5050/auth/refreshToken",
        { refreshToken }
      );
      const { accessToken } = response.data;
      setCookie("user_token", accessToken, {
        path: "/",
        expires: moment()
          .add(1, "months")
          .toDate(),
      });
      return accessToken;
    } catch (error) {
      throw new Error("Failed to refresh token");
    }
  };

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
    if (!idAdmin) return;
    const data = {
      admin_Id: idAdmin,
    };

    try {
      const response = await axios.post(
        "http://localhost:5050/chats/create-chat-room",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.user_token,
          },
        }
      );
      const newRoomId = response.data.data._id;
      await createMessInRoomChat(newRoomId);
      await getMessInRoomChat(newRoomId);
    } catch (error) {
      console.error("Lỗi khi tạo phòng chat:", error);
    }
  };

  // Tìm phòng chat
  const getRoom = async () => {
    try {
      // Kiểm tra token và làm mới nếu hết hạn
      if (isTokenExpired(cookies.user_token)) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          cookies.user_token = newToken;
        } else {
          throw new Error("Không thể làm mới token");
        }
      }

      // Gọi API để lấy phòng chat
      const response = await axios.get(
        `http://localhost:5050/chats/chat-room`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.user_token,
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
        `http://localhost:5050/chats/chat-room`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.user_token,
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

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  // Tạo tin nhắn trong phòng chat
  const createMessInRoomChat = async (chatRoomId) => {
    if (!chatRoomId) return;

    let content = message;
    if (imageFile) {
      content = await convertFileToBase64(imageFile);
    }

    const data = {
      type: imageFile ? "image" : "text",
      content: content,
      sender: "user",
      chatRoomId: chatRoomId,
    };
    socketRef.current.emit("message", data);
    await handleMess(data);
    socketRef.current.emit("messloadingCompelete", false);
    setMessage("");
    setImageFile(null);
    setImageFileChoese(null);
  };

  const handleMess = async (data) => {
    try {
      await axios.post("http://localhost:5050/chats/send-message", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.user_token,
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
            Authorization: "Bearer " + cookies.user_token,
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
    socket.on("messloading", (value) => {
      setLoading(value);
    });
    socket.on("messloadingCompelete", (value) => {
      setLoading(value);
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
    const previewUrl = URL.createObjectURL(file);
    setImageFileChoese(previewUrl);
    setImageFile(file);
  };

  // Xử lý sự kiện gửi tin nhắn
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (message.trim() || imageFile) {
      getRoom();
    }
  };

  const messagesList =
    messages.length > 0 ? (
      messages.map((msg, index) => (
        <div key={index} className={`message ${msg.sender}`}>
          {msg.type === "image" ? (
            <img
              style={{ width: "10rem", height: "10rem" }}
              src={msg.content}
              alt="sent"
            />
          ) : (
            <div>{msg.content}</div>
          )}
          <div className="timestamp-hidden">{formatTime(msg.timestamp)}</div>
        </div>
      ))
    ) : (
      <img id="img-df-chat" src={imgChatDf} alt="img_chat" />
    );

  const handlekeyDown = (e) => {
    const data1 = {
      chatId: idRoom,
      check: true,
    };
    socketRef.current.emit("messloading", data1);
    if (e.key === "Enter") {
      const data2 = {
        chatId: idRoom,
        check: false,
      };
      socketRef.current.emit("messloadingCompelete", data2);
    }
  };
  return (
    <form onSubmit={handleSendMessage} className="chat-container">
      <div className="messages">{messagesList}</div>
      {loading && <LoadingMess />}
      <div className="input-container">
        <label htmlFor="file-img-mess">
          <i className="fa fa-camera"></i>
          <input
            id="file-img-mess"
            type="file"
            onChange={handleFileInputChange}
          />
        </label>

        <input
          onKeyDown={(e) => handlekeyDown(e)}
          ref={inputChat}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Gửi</button>
        {imageFileChoese !== null ? (
          <div className="img-choese">
            <img src={imageFileChoese} alt="anh" />
          </div>
        ) : (
          ""
        )}
      </div>
    </form>
  );
};

export default ChatRealTime;
