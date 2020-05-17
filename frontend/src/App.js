import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Navigation from './components/Navigation'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Settings from './components/Settings'

function App() {
  return (
    <Router>
      <Navigation/>

      <Route path="/settings" exact component={Settings} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Register} />
      <Route path="/home" exact component={Home} />

    </Router>
  );
}

export default App;
