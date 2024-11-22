import React, { useEffect, useRef, useState, memo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";

function UpDownQuantity({
  selectSize,
  colorProduct,
  quantity,
  setQuantity,
  product,
  setStockRTime,
  stockSize,
}) {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const socket = io("http://localhost:5050");

    socket.on("stockUpdated", (updatedProduct) => {
      if (updatedProduct._id === product._id) {
        setTotalProducts(updatedProduct.stock);
        setStockRTime(updatedProduct.stock);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [product, setStockRTime]);

  useEffect(() => {
    if (product) {
      setTotalProducts(product.stock);
      if (quantity > product.stock) {
        setQuantity(product.stock);
      }
    }
  }, [product, quantity, setQuantity]);

  const handleUpQuantity = () => {
    if (quantity >= stockSize) {
      toast.error("Quá số lượng sản phẩm có sẵn!");
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleDownQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.error("Số lượng tối thiểu là 1");
    }
  };

  const handleChange = (e) => {
    const quantity_ = e.target.value;
    if (quantity_ === "") {
      setQuantity("");
      return;
    }
    const quantityNumber = parseInt(quantity_, 10);
    if (quantityNumber > stockSize) {
      setQuantity(stockSize);
    } else if (quantityNumber < 1 || isNaN(quantityNumber)) {
      setQuantity(1);
    } else {
      setQuantity(quantityNumber);
    }
  };

  const isDisabled = totalProducts === 0 || !selectSize || !colorProduct;

  return (
    <div className="number-text d-flex">
      <ToastContainer
        position="top-center"
        autoClose={300}
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
      <button
        onClick={handleDownQuantity}
        className={`down ${isDisabled ? "disabled" : ""}`}
        disabled={isDisabled}
      >
        -
      </button>
      <input
        onChange={handleChange}
        className={`quantity ${isDisabled ? "disabled" : ""}`}
        type="number"
        min={totalProducts === 0 ? "0" : "1"}
        value={quantity}
        disabled={isDisabled}
      />
      <button
        className={`up ${isDisabled ? "disabled" : ""}`}
        onClick={handleUpQuantity}
        disabled={isDisabled}
      >
        +
      </button>
      {stockSize > 0 ? (
        <p>
          <span>{stockSize}</span> sản phẩm có sẵn
        </p>
      ) : stockSize === 0 ? (
        <p style={{ color: "red" }}>
          <span>Hết hàng</span>
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(UpDownQuantity);
