import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_SAVE_DELIVERY_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from "../constants/cartConstant";

const baseUrl = (process.env.REACT_APP_API_URL || "/api").replace(/\/+$/, "");
const API_URL = baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`${API_URL}/products/${id}`);
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty,
        },
      });
    
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (error) {
      console.error('Failed to add item to cart:', error.message);
      throw error;
    }
  };
  
  export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  export const clearCart = () => (dispatch) => {
    dispatch({
      type: CART_CLEAR_ITEMS,
    });
  
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  export const saveDeliveryAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_DELIVERY_ADDRESS, payload: data });
    localStorage.setItem("deliveryAddress", JSON.stringify(data));
  };
  
  export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };
  