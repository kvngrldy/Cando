import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Room from './pages/Room'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/room">
            <Room />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
