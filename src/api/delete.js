import axios from "axios";

// export const deleteToCartsAsync = async (fetchProducts, id_user) => {
//   try {
//     await axios.delete(
//       `http://localhost:5050/carts/deleteCartsByUserId/${id_user}`
//     );
//     fetchProducts();
//   } catch (error) {}
// };
export const deleteToCartsAsync = async (fetchProducts, id_user) => {
  try {
    if (!fetchProducts || !id_user) {
      return;
    }
    await axios.delete(
      `http://localhost:5050/carts/deleteCartsByUserId/${id_user}`
    );
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
    await axios.delete(`http://localhost:5050/carts/${cartId}`);
    fetchProducts();
  } catch (error) {}
};
