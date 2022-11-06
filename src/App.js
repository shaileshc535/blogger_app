import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Provider store={store}>
      <HomePage />
      <ScrollToTop />
    </Provider>
  );
}

export default App;
