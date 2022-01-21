import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

import { onSnapshot, collection } from "firebase/firestore";
import {
  db,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase.utils";

import { updateCollection } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollection } = this.props;
    const collectionRef = collection(db, "collections");

    onSnapshot(collectionRef, (snapshot) => {
      const collectionMap = convertCollectionSnapshotToMap(snapshot);
      updateCollection(collectionMap);
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {}

  render() {
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Routes>
          <Route
            path="/"
            element={
              <CollectionsOverviewWithSpinner
                isLoading={loading}
                {...this.props}
              />
            }
          />
          <Route
            path=":collectionId"
            element={
              <CollectionPageWithSpinner isLoading={loading} {...this.props} />
            }
          />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollection: (collectionMap) =>
    dispatch(updateCollection(collectionMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
