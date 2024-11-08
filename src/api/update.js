import axios from "axios";

export const updateToCartsAsync = async (_id, quantity, sum, fetchProducts) => {
  try {
    if (!_id) {
      return;
    }
    const response = await axios.put(
      `http://localhost:5050/carts/${_id}`,
      {
        quantity,
        sum,
      },
      {
        headers: {
          // Authorization: `Bearer ${cookies.user_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    fetchProducts();
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error.message);
    return null;
  }
};

export const updateToCarts = async (_id, price, sum) => {
  try {
    if (!_id) {
      return;
    }
    const response = await axios.put(
      `http://localhost:5050/carts/${_id}`,
      {
        price,
        sum,
      },
      {
        headers: {
          // Authorization: `Bearer ${cookies.user_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error.message);
    return null;
  }
};
