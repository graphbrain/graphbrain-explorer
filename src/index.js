import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './components/LandingPage.tsx';
import Maps from './components/map/Maps.tsx';
import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


const Index = () => (
  <Router>
    <main>
      <Route exact path="/" component={LandingPage} />
      <Route path="/topic" component={Maps} />
    </main>
  </Router>
)

ReactDOM.render( < Index /> , document.getElementById('root'));

