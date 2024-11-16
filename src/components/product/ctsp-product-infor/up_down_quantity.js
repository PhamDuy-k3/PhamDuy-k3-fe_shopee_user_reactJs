import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { memo } from "react";

function UpDownQuantity({
  quantity,
  setQuantity,
  product,
  setStockRTime,
  stockSize,
}) {
  const [totalProducts, setTotalProducts] = useState(0);
  const socketRef = useRef(null);

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
  }, [product]);

  useEffect(() => {
    if (product) {
      setTotalProducts(product.stock);
      if (quantity > product.stock) {
        setQuantity(product.stock);
      }
    }
  }, [product, quantity, setQuantity]);

  const handleUpQuantity = () => {
    if (quantity >= totalProducts) {
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
    if (quantityNumber > totalProducts) {
      toast.error("Quá số lượng sản phẩm có sẵn!");
      setQuantity(totalProducts);
    } else if (quantityNumber < 1 || isNaN(quantityNumber)) {
      toast.error("Số lượng tối thiểu là 1");
      setQuantity(1);
    } else {
      setQuantity(quantityNumber);
    }
  };

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
      <button
        onClick={handleDownQuantity}
        className={`down ${totalProducts === 0 ? "disabled" : ""}`}
      >
        -
      </button>
      <input
        onChange={handleChange}
        className={`quantity ${totalProducts === 0 ? "disabled" : ""}`}
        type="number"
        min={totalProducts === 0 ? "0" : "1"}
        value={quantity}
      />
      <button
        className={`up ${totalProducts === 0 ? "disabled" : ""}`}
        onClick={handleUpQuantity}
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
