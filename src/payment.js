import axios from "axios";

// Hàm xử lý thanh toán
export const PaymentForm = async (data, user_token) => {
  try {
    const response = await axios.post("http://localhost:5050/payment", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_token}`,
      },
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
