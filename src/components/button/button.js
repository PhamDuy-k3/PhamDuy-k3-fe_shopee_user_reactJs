import React from "react";
import "./style.scss";
export default function Button({ buy }) {
  return (
    <div onClick={buy} className="btn-buy">
      <button>
        {" "}
        Mua ngay
        <span></span>
      </button>
    </div>
  );
}
