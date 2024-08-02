import axios from "axios";
import {
  ADD_TO_CART,
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_SUCCESS,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  REMOVE_ALL_FROM_CART,
  REMOVE_FROM_CART,
  UPDATE_FROM_CART,
} from "./type";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const addToCartAsync = (product) => async (dispatch) => {
  dispatch(addToCart(product));
  try {
    const response = await axios.post("http://localhost:5050/carts", product);
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAILURE, payload: error.message });
  }
};

export const removeFromCart = (cartId) => ({
  type: REMOVE_FROM_CART,
  payload: cartId,
});
export const deleteCarts = (carts) => ({
  type: REMOVE_ALL_FROM_CART,
  payload: carts,
});

export const updateProductList = (updatedProduct) => ({
  type: UPDATE_FROM_CART,
  payload: updatedProduct,
});

export const fetchAllProducts = () => {
  return async (dispatch, getState) => {
    dispatch(fetchProductRequest());
    try {
      //gọi api
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      dispatch(fetchProductSuccess(data.products));
    } catch (error) {
      dispatch(fetchProductError());
    }
  };
};

export const fetchProductRequest = () => {
  return {
    type: FETCH_PRODUCT_REQUEST,
  };
};
export const fetchProductSuccess = (data) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: data,
  };
};
export const fetchProductError = () => {
  return {
    type: FETCH_PRODUCT_ERROR,
  };
};
