import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getSteps } from "./actions/step.actions";

import logger from "redux-logger";
import { getTodos } from "./actions/todo.actions";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

store.dispatch(getSteps());
store.dispatch(getTodos());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
