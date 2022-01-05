import { CartActionsTypes } from "./cart.types";

export const toggleCartVisibility = () => ({
  type: CartActionsTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: CartActionsTypes.ADD_ITEM,
  payload: item,
});

export const deleteItem = (item) => ({
  type: CartActionsTypes.DELETE_ITEM,
  payload: item,
});

export const removeItem = (item) => ({
  type: CartActionsTypes.REMOVE_ITEM,
  payload: item,
});
