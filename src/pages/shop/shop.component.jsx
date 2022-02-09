import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";

// import { onSnapshot, collection } from "firebase/firestore";
// import {
//   db,
//   convertCollectionSnapshotToMap,
// } from "../../firebase/firebase.utils";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  //unsubscribeFromSnapshot = null;

  componentDidMount() {
    // const { updateCollection } = this.props;
    // const collectionRef = collection(db, "collections");
    // onSnapshot(collectionRef, (snapshot) => {
    //   const collectionMap = convertCollectionSnapshotToMap(snapshot);
    //   updateCollection(collectionMap);
    //   this.setState({ loading: false });
    // });
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  componentWillUnmount() {}

  render() {
    const { isCollectionFetching } = this.props;
    return (
      <div className="shop-page">
        <Routes>
          <Route
            path="/"
            element={
              <CollectionsOverviewWithSpinner
                isLoading={isCollectionFetching}
                {...this.props}
              />
            }
          />
          <Route
            path=":collectionId"
            element={
              <CollectionPageWithSpinner
                isLoading={isCollectionFetching}
                {...this.props}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
