import React, { useState } from "react";
import { memo } from "react";
function ColorProduct({ colorProduct, setColorProduct }) {
  //const [colorProduct, setColorProduct] = useState("");

  const handleColorClick = (color) => {
    setColorProduct(color);
  };
  const colorProducts = ["Màu Trắng", "Màu Đen", "Màu Xám", "Màu Xanh Da Trời"];

  return (
    <section className="color d-flex">
      <div className="color-title col-2">
        <p>Màu Sắc</p>
      </div>
      <div className="color-list d-flex flex-wrap">
        <button disabled>Màu Đỏ</button>
        {colorProducts.map((item) => {
          return (
            <button
              key={item}
              className={`color-sp ${
                colorProduct === item ? "button-clicked" : ""
              }`}
              onClick={() => handleColorClick(item)}
            >
              {item}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default memo(ColorProduct);
