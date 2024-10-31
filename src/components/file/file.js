import React, { useEffect } from "react";
import "./style.scss";

export default function File({ register }) {
  return (
    <div className="file__">
      <label htmlFor="file__image" className="open-file">
        <span className="file-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 71 67"
          >
            <path
              strokeWidth="5"
              stroke="black"
              d="M41.7322 11.7678L42.4645 12.5H43.5H68.5V64.5H2.5V2.5H32.4645L41.7322 11.7678Z"
            ></path>
          </svg>
          <span className="file-front"></span>
        </span>
        Open file
      </label>
      <input
        style={{ opacity: "0" }}
        id="file__image"
        type="file"
        {...register("avatar")}
      />
    </div>
  );
}
