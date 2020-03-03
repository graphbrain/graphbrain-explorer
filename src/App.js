import React from 'react';

import { NavLink } from 'react-router-dom';

import TopicsDropdown from './components/TopicsDropdown';

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
          <TopicsDropdown />
          {/* <NavLink to="/map?1" className="navlink"> Force-directed map </NavLink> */}
          <NavLink to="/map?topic=2" className="navlink"> Pre-defined Map </NavLink>
        </div>
      </header>
    </div>
  );
}

export default App;
