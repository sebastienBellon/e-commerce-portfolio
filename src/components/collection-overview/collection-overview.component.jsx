import React from "react";
import { connect } from "react-redux";
import { selectShopItems } from "../../redux/shop/shop.selector";

import "./collection-overview.style.scss";

import CollectionPreview from "../collection-preview/collection-preview.component";

const CollectionOverview = ({ collections }) => {
  return (
    <div className="collection-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  collections: selectShopItems(state),
});

export default connect(mapStateToProps, null)(CollectionOverview);
