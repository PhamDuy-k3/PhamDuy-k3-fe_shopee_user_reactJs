import axios from "axios";

export const updateToCartsAsync = async (_id, quantity, sum, fetchProducts) => {
  try {
    if (!_id) {
      return;
    }
    const response = await axios.put(`http://localhost:5050/carts/${_id}`, {
      quantity,
      sum,
    });
    console.log("Update successful:", response.data);
    fetchProducts();
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error.message);
    return null;
  }
};
