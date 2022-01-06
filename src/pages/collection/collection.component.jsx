import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { selectCollection } from "../../redux/shop/shop.selector";
import { changeShopParams } from "../../redux/shop/shop.actions";

import "./collection.style.scss";

import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = ({ collection, changeParams }) => {
  let params = useParams();
  const { title, items } = collection;

  useEffect(() => {
    changeParams(params.collectionId);
  });

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  collection: selectCollection(state.shop.params)(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeParams: (item) => dispatch(changeShopParams(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionPage);
