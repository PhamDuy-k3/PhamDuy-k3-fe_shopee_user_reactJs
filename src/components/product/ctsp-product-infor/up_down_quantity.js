import React, { useEffect, useState } from "react";

function UpDownQuantity({ quantity, setQuantity }) {
  //const [quantity, setQuantity] = useState(1);
  const [totalProducts, setTotalProducts] = useState(123);
  const handelUpQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handelDownQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };
  function handelChange(e) {
    setQuantity(e.target.value);
  }
  return (
    <div className="number-text d-flex">
      <button onClick={handelDownQuantity} className="down">
        -
      </button>
      <input
        // onChange={(e) => setQuantity(e.target.value)}
        onChange={(e) => handelChange(e)}
        className="quanty"
        type="number"
        min="1"
        value={quantity}
      />
      <button onClick={handelUpQuantity} className="up">
        +
      </button>
      <p>
        <span>{totalProducts}</span> sản phẩm có sẵn..
      </p>
    </div>
  );
}
export default UpDownQuantity;
