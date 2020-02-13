import React from 'react';

import { NavLink } from 'react-router-dom';

import logo from './assets/graphbrain-logo.gif';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Language, Knowledge, Cognition
        </p>
        <NavLink to="/map" className="navlink"> See Map </NavLink>

      </header>
    </div>
  );
}

export default App;
