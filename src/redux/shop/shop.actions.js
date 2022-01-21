import ShopActionTypes from "./shop.types";

export const changeShopParams = (item) => ({
  type: ShopActionTypes.CHANGE_PARAMS,
  payload: item,
});

export const updateCollection = (item) => ({
  type: ShopActionTypes.UPDATE_COLLECTION,
  payload: item,
});
