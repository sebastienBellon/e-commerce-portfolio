import { CartActionsTypes } from "./cart.types";

export const toggleCartVisibility = () => ({
  type: CartActionsTypes.TOGGLE_CART_HIDDEN,
});
