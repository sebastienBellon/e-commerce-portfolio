import React from "react";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selector";
import { toggleCartVisibility } from "../../redux/cart/cart.actions";

import "./cart-dropdown.style.scss";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropDown = ({ cartItems, toggleCartVisibility }) => {
  let navigate = useNavigate();
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty </span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          navigate(`/checkout`);
          toggleCartVisibility();
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartVisibility: () => dispatch(toggleCartVisibility()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropDown);
