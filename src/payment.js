import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [orderInfo, setOrderInfo] = useState("pay with MoMo");

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5050/payment", {
        amount: parseFloat(amount), // Đảm bảo số tiền được gửi dưới dạng số
        orderInfo,
      });

      if (response.data.payUrl) {
        window.location.href = response.data.payUrl;
      } else {
        console.error("Error: No payment URL returned");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  return (
    <div>
      <h2>Thanh toán</h2>
      <div>
        <label>Số tiền: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Nhập số tiền"
        />
      </div>
      <div>
        <label>Thông tin đơn hàng: </label>
        <input
          type="text"
          value={orderInfo}
          onChange={(e) => setOrderInfo(e.target.value)}
          placeholder="Thông tin đơn hàng"
        />
      </div>
      <button onClick={handlePayment}>Thanh toán với MoMo</button>
    </div>
  );
};

export default PaymentForm;
