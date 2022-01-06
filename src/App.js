import React, { Component } from "react";

import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sing-in-and-sign-up/sing-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // subscription to any modification done on the userRef data stored if firecloud
        onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        // in this case we know the user is null => not authenticated
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop/*" element={<ShopPage />} />
          <Route
            exact
            path="/signin"
            element={
              this.props.currentUser ? (
                <Navigate to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route exact path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
