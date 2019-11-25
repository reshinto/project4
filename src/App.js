import React from 'react';
import './App.css';
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div>Hello world</div>
    </Provider>
  );
}

export default App;
