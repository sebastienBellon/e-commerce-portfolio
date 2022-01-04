import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
