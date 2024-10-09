import axios from "axios";

export const deleteToCartsAsync = async (fetchProducts, user_token) => {
  try {
    if (!fetchProducts || !user_token) {
      return;
    }

    await axios.delete(`http://localhost:5050/carts/user/deleteCartUser`, {
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    });
    // Gọi hàm fetchProducts để cập nhật lại giỏ hàng
    fetchProducts();
  } catch (error) {
    console.error("Error deleting carts:", error);
  }
};

export const deleteToCartAsync = async (cartId, fetchProducts) => {
  try {
    if (!fetchProducts || !cartId) {
      return;
    }
    await axios.delete(`http://localhost:5050/carts/${cartId}`, {
      headers: {
        // Authorization: `Bearer ${cookies.user_token}`,
      },
    });
    fetchProducts();
  } catch (error) {}
};
