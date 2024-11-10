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

export const updateToCarts = async (cart_id, price, sum) => {
  try {
    if (!cart_id) throw new Error("cart_id is required.");

    const response = await axios.put(
      `http://localhost:5050/carts/updateInfor/cart?cart_id=${cart_id}`,
      { price, sum },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Failed to update cart, invalid response status.");
    }
  } catch (error) {
    console.error("Error updating cart:", error.message);
    throw error;
  }
};
