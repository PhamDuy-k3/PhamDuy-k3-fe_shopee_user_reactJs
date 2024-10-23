import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"; // Import mic icons from react-icons
import "./style.scss";
import { useEffect, useState, useCallback, useMemo } from "react";

const VoiceApp = ({ setValue }) => {
  const [isListening, setIsListening] = useState(false);

  // Sử dụng useMemo để khởi tạo recognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = useMemo(() => {
    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = "vi-VN";
    return recog;
  }, [SpeechRecognition]);

  // Hàm lắng nghe giọng nói
  const handleListen = useCallback(() => {
    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }, [isListening, recognition]);

  recognition.onresult = (event) => {
    let currentText = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        currentText += event.results[i][0].transcript;
      } else {
        currentText += event.results[i][0].transcript;
      }
    }
    setValue("search", currentText);
  };

  const toggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  useEffect(() => {
    handleListen();
  }, [handleListen]);

  return (
    <div id="voice">
      {isListening ? (
        <FaMicrophoneSlash
          style={{ cursor: "pointer" }}
          onClick={toggleListening}
        />
      ) : (
        <FaMicrophone style={{ cursor: "pointer" }} onClick={toggleListening} />
      )}
    </div>
  );
};

export default VoiceApp;
