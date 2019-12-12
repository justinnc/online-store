import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
// import Provider từ react-redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./redux/store";

import "./index.css";
import App from "./App";

const { store, persistor } = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
