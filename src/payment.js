import axios from "axios";

// Hàm xử lý thanh toán
export const PaymentForm = async (amount, orderInfo) => {
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
