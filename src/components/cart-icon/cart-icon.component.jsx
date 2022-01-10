import React from "react";

import { connect } from "react-redux";

import { toggleCartVisibility } from "../../redux/cart/cart.actions";

import { selectCartItemsCount } from "../../redux/cart/cart.selector";

import {
  CartIconContainer,
  ItemCountContainer,
  ShoppingIcon,
} from "./cart-icon.styles";

const CartIcon = ({ toggleCartVisibility, itemCount }) => {
  return (
    <CartIconContainer onClick={toggleCartVisibility}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCountContainer>${itemCount}</ItemCountContainer>
    </CartIconContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartVisibility: () => dispatch(toggleCartVisibility()),
});

const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
