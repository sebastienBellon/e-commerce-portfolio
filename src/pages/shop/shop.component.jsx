import React from "react";

import { connect } from "react-redux";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import { selectShopItems } from "../../redux/shop/shop.selector";

const ShopPage = ({ collections }) => {
  return (
    <div className="shop-page">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  collections: selectShopItems(state),
});

export default connect(mapStateToProps, null)(ShopPage);
