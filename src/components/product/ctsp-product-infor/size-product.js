import React, { useState } from "react";
import { memo } from "react";
function SizeProduct({ selectSize, setSelectSize, sizes ,stockSize }) {
  //const [selectSize, setSelectSize] = useState("");
  const HandleSizeClick = (size) => {
    setSelectSize(size);
  };

  

  const sizes_new =
  sizes?.length > 0
      ? sizes.map((size) => {
          return (
            <div
              key={size}
              className={`size-sp ${selectSize === size ? "size-clicked" : ""}`}
              onClick={() => HandleSizeClick(size)}
            >
              {size}
              {selectSize === size ? (
                <div className="highlight">
                  <i className="fas fa-check"></i>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })
      : [];
  return (
    <section className="size d-flex">
      {sizes[0] !== null && (
        <>
          <div className="size-title col-2">
            <p>Size</p>
          </div>
          <div className="size-text d-flex">{sizes_new}</div>
        </>
      )}
    </section>
  );
}
export default memo(SizeProduct);
