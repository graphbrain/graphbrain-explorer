import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './components/LandingPage.tsx';
import Maps from './components/map/Maps.tsx';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


const Index = () => (
  <Router>
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route path="/topic" component={Maps} />
    </div>
  </Router>
)

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
