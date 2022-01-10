import React from "react";

import {
  CartItemContainer,
  ItemDetailsContainer,
  ItemDetailsName,
  CartItemImg,
} from "./cart-item.styles";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
  return (
    <CartItemContainer>
      <CartItemImg src={imageUrl} alt="item" />
      <ItemDetailsContainer>
        <ItemDetailsName>{name}</ItemDetailsName>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetailsContainer>
    </CartItemContainer>
  );
};

export default CartItem;
