
import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import ForcedMap from './ForcedMap';
import PredefinedMap from './PredefinedMap';

import {getData} from '../api/getData';

import './map.scss';

class Maps extends Component {
  constructor(props) {
    super(props);

    console.log(window.location.search.slice(window.location.search.indexOf('=') + 1))

    this.state = {
      data: null,
      apiSearch: window.location.search.slice(window.location.search.indexOf('=') + 1)
    }
  }

  componentDidMount() {
    getData(this.state.apiSearch).then(data => {
      console.log(data);
      this.setState({data: data["viz_blocks"][0]})
    });
  }

  render() {
    const mapToRender = () => {
    if (this.state.data) {
      switch(this.state.apiSearch) {
        case '2': 
        return <PredefinedMap data={this.state.data}/>;
        default:
          return <ForcedMap data={this.state.data} topic={this.state.apiSearch}/>;
      }
    } 
    else return null;  
  }

    return (
      <div className="mapsArea">
        <NavLink to="/" className="backNavLink"> Go back </NavLink>
        {mapToRender()}
      </div>
    )
  }
}

export default Maps;