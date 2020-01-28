
import React from 'react';
import logo from './logo.svg';

import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Define redux store
import store from "./store";


import Frontpage from './components/frontpage';

import './App.css';
require('dotenv').config()
function App() {
  return (

    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Frontpage} />
      </Router>
    </Provider>
  );
}

export default App;
