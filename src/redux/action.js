import {
  ADD_TO_CART,
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

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});
export const deleteProductList = (deleteListProduct) => ({
  type: REMOVE_ALL_FROM_CART,
  payload: deleteListProduct,
});

export const updateProductList = (updatListProduct) => ({
  type: UPDATE_FROM_CART,
  payload: updatListProduct,
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
