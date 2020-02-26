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
        <div className="buttonArea">
          <NavLink to="/map?1" className="navlink"> See Map1 </NavLink>
          <NavLink to="/map?2" className="navlink"> See Map2 </NavLink>
        </div>
      </header>
    </div>
  );
}

export default App;
