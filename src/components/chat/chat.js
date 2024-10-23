import { useRef } from "react";
import "./style.scss";
import ChatRealTime from "../../views/chat/chat";

function Chat() {
  const chat_big = useRef();
  const chat_small = useRef();

  const displayChatBigUp = () => {
    chat_big.current.style.display = "block";
    chat_small.current.style.display = "none";
  };

  const displayChatBigDown = () => {
    chat_big.current.style.animationName = "chat-big-down";
    chat_small.current.style.display = "block";

    chat_big.current.addEventListener(
      "animationend",
      () => {
        chat_big.current.style.display = "none";
        chat_big.current.style.animationName = "";
      },
      { once: true }
    );
  };
  return (
    <div className="Chat">
      <div ref={chat_big} className="chat-big">
        <div className="chat d-flex ">
          <div className="chat-title d-flex col-12 ">
            <div className="chat-title-text col-10 d-flex p-2 ">
              <i className="fas fa-comment-alt"></i>
              <p>Chat</p>
            </div>
            <div className="chat-title-next d-flex ">
              <div className="hide">
                <i className="fas fa-arrow-right"></i>
              </div>
              <div onClick={displayChatBigDown} className="collapses">
                <i className="fas fa-chevron-right fa-rotate-90"></i>
              </div>
            </div>
          </div>
          <div className="chat-text">
            <ChatRealTime  />
          </div>
        </div>
      </div>
      <div ref={chat_small} onClick={displayChatBigUp} className="chat-small ">
        <div className="d-flex">
          <i className="fas fa-comment-alt"></i>
          <p>Chat</p>
        </div>
      </div>
    </div>
  );
}

export default Chat;
