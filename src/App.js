import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubcribeFromAuth = null;
  componentDidMount() {
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          // userRef đươc trả về từ createUserProfileDocument
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                // phải gọi snapShot.data() mới xem được data
                ...snapShot.data()
              }
            },
            () => console.log(this.state)
          );
        });
      } else {
        this.setState({
          currentUser: userAuth
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
