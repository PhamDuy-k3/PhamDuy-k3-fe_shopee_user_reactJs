import React, { useState } from "react";
import { memo } from "react";
function SizeProduct({ selectSize, setSelectSize }) {
  //const [selectSize, setSelectSize] = useState("");
  const HandleSizeClick = (size) => {
    setSelectSize(size);
  };
  var sizes = ["X", "M", "L", "XL", "XXL"];
  const sizes_new = sizes.map((size) => {
    return (
      <button
        key={size}
        className={`size-sp ${selectSize === size ? "size-clicked" : ""}`}
        onClick={() => HandleSizeClick(size)}
      >
        {size}
      </button>
    );
  });

  return (
    <section className="size d-flex">
      <div className="size-title col-2">
        <p>Size</p>
      </div>
      <div className="size-text d-flex">{sizes_new}</div>
    </section>
  );
}
export default memo(SizeProduct);
