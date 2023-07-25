import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast"
 

const store = configureStore({
  reducer : rootReducer
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store = {store} >
    <BrowserRouter>
      <React.StrictMode>
        <App />
        <Toaster/>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
