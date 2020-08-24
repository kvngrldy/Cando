import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Room from './pages/Room'
import UserProfile from './components/UserProfile';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/adminPage">
          <AdminPage />
        </Route>
        <Route path="/room/:roomname">
          <Room />
        </Route>
        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
