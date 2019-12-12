// createStore, applyMiddleware từ redux
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger];

export default function configureStore() {
  const store = createStore(persistedReducer, applyMiddleware(...middlewares));

  // @NOTE not sure what this does, assuming listeners is defined outside of this method?

  const persistor = persistStore(store);

  return { store, persistor };
}
