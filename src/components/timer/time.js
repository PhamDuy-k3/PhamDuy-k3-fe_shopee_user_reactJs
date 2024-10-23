import React, { useState, useEffect } from "react";
import "./time.scss";

function Time({ setIsTimeUp }) {
  const [countdown, setCountdown] = useState({
    day: "00",
    hour: "00",
    minute: "00",
    seconds: "00",
  });

  useEffect(() => {
    const endDate = new Date("11/29/2024 00:00:00").getTime();
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;
      if (distance <= 0) {
        setIsTimeUp(true);
        clearInterval(intervalId);
      } else {
        const day = Math.floor(distance / (24 * 60 * 60 * 1000));
        const hour = Math.floor(
          (distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
        );
        const minute = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((distance % (60 * 1000)) / 1000);

        setCountdown({
          day: day < 10 ? "0" + day : String(day),
          hour: hour < 10 ? "0" + hour : String(hour),
          minute: minute < 10 ? "0" + minute : String(minute),
          seconds: seconds < 10 ? "0" + seconds : String(seconds),
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="time d-flex">
      <div className="item">
        <div id="day">{countdown.day}</div>
      </div>
      <div className="item">
        <div id="hour">{countdown.hour}</div>
      </div>
      <div className="item">
        <div id="minute">{countdown.minute}</div>
      </div>
      <div className="item">
        <div id="seconds">{countdown.seconds}</div>
      </div>
    </div>
  );
}

export default Time;
