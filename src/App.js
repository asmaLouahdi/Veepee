import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Characters from "./components/Characters";
import Details from "./components/Details";
import Header from "./components/Header";
function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <Characters />
        <Details />
      </div>
    </Provider>
  );
}
export default App;
