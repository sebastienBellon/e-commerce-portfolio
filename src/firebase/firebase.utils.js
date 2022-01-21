import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEe7flDcBvaSz8hX5p523zgzV6X_oCKZ0",
  authDomain: "crwn-db-43b8b.firebaseapp.com",
  projectId: "crwn-db-43b8b",
  storageBucket: "crwn-db-43b8b.appspot.com",
  messagingSenderId: "144425557164",
  appId: "1:144425557164:web:ca5343d9c0283ba4df9309",
  measurementId: "G-CEM6D5QKYW",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", userAuth.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user ", error.message);
    }
  }
  return userRef;
};

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectToAdd
) => {
  const batch = writeBatch(db);
  objectToAdd.forEach((element) => {
    const docRef = doc(collection(db, collectionKey));
    batch.set(docRef, element);
  });
  return await batch.commit();
};

export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
