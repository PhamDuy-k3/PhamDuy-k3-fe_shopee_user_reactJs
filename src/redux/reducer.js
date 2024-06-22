import { combineReducers } from "redux";
import {
  ADD_TO_CART,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  REMOVE_ALL_FROM_CART,
  REMOVE_FROM_CART,
  UPDATE_FROM_CART,
} from "./type";

const initialState = {
  items: [],
};
const initialStateProduct = {
  products: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        items: action.payload,
      };
    case UPDATE_FROM_CART:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
const productsReducer = (state = initialStateProduct, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case FETCH_PRODUCT_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  cart: cartReducer,
  product: productsReducer,
});

export default rootReducer;
