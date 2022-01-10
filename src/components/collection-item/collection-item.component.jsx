import React from "react";

import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

import {
  CollectionItemContainer,
  BackgroundImage,
  CollectionItemFooterContainer,
  NameContainer,
  PriceContainer,
  AddButton,
} from "./collection-item.styles";

const CollectionItem = ({ item, addItem }) => {
  return (
    <CollectionItemContainer>
      <BackgroundImage imageUrl={item.imageUrl} />
      <CollectionItemFooterContainer>
        <NameContainer>{item.name}</NameContainer>
        <PriceContainer>{item.price}</PriceContainer>
      </CollectionItemFooterContainer>
      <AddButton inverted onClick={() => addItem(item)}>
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
