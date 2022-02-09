import ShopActionTypes from "./shop.types";

import { onSnapshot, collection } from "firebase/firestore";
import {
  db,
  convertCollectionSnapshotToMap,
} from "../../firebase/firebase.utils";

export const changeShopParams = (item) => ({
  type: ShopActionTypes.CHANGE_PARAMS,
  payload: item,
});

export const fetchCollectionStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap,
});
export const fetchCollectionFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = collection(db, "collections");
    dispatch(fetchCollectionStart());

    onSnapshot(collectionRef, (snapshot) => {
      const collectionMap = convertCollectionSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionMap));
    });
  };
};
