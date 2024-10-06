import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpDownQuantity({ quantity, setQuantity, product }) {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    if (product) {
      setTotalProducts(product.stock);
      // Đặt lại quantity nếu lớn hơn số lượng sản phẩm có sẵn
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
      <button onClick={handleDownQuantity} className="down">
        -
      </button>
      <input
        onChange={handleChange}
        className="quantity"
        type="number"
        min="1"
        value={quantity}
      />
      <button onClick={handleUpQuantity} className="up">
        +
      </button>
      <p>
        <span>{totalProducts}</span> sản phẩm có sẵn
      </p>
    </div>
  );
}

export default UpDownQuantity;
