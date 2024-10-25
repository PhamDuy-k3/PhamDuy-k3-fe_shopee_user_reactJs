import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"; // Import mic icons from react-icons
import "./style.scss";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { WaveMenu } from "./wave-menu";

const VoiceApp = ({ setValue }) => {
  const [isListening, setIsListening] = useState(false);
  const voiceRef = useRef();

  // Use useMemo to initialize the speech recognition instance
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = useMemo(() => {
    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.interimResults = true;
    recog.lang = "vi-VN";
    return recog;
  }, [SpeechRecognition]);

  // Handle listening to voice input
  const handleListen = useCallback(() => {
    if (isListening) {
      recognition.start();
      if (voiceRef.current) {
        voiceRef.current.style.visibility = "visible"; // Show wave animation or voice feedback
      }
    } else {
      recognition.stop();
      if (voiceRef.current) {
        voiceRef.current.style.visibility = "hidden"; // Show wave animation or voice feedback
      }
    }
  }, [isListening, recognition]);

  // Handle recognition results
  recognition.onresult = (event) => {
    let currentText = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      currentText += event.results[i][0].transcript;
    }
    setValue("search", currentText.trim()); // Set the value from voice input into the search field
  };

  // Toggle the listening state
  const toggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  // Use effect to manage listening state changes
  useEffect(() => {
    handleListen();
  }, [handleListen]);

  return (
    <div id="voice">
      <div style={{ visibility: "hidden" }} ref={voiceRef}>
        <WaveMenu />
      </div>
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
