import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpDownQuantity({ quantity, setQuantity, product }) {
  //const [quantity, setQuantity] = useState(1);
  const [totalProducts, setTotalProducts] = useState(123);

  useEffect(() => {
    setTotalProducts(product?.stock);
  }, [product]);

  const handelUpQuantity = () => {
    if (quantity >= totalProducts) {
      setQuantity(totalProducts);
      toast.error(() => (
        <p style={{ paddingTop: "1rem" }}>Quá số lượng sản phẩm có sẵn!</p>
      ));
    } else {
      setQuantity(quantity + 1);
    }
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
      <ToastContainer
        position="top-right"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "350px" }}
      />
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
        <span>{totalProducts}</span> sản phẩm có sẵn
      </p>
    </div>
  );
}
export default UpDownQuantity;
