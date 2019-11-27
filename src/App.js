import React from "react";
import "./App.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./components/routes/BaseRouter";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <BaseRouter />
      </Router>
    </Provider>
  );
}

export default App;
