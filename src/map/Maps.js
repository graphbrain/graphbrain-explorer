
import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import ForcedMap from './ForcedMap';

import {getData} from '../api/getData';

import './map.scss';

class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      apiNum: window.location.search[1]
    }
  }

  componentDidMount() {
    getData(this.state.apiNum).then(data => {
      console.log(data);
      this.setState({data: data["viz-blocks"][0]})
    });
  }

  render() {
    const mapToRender = () => {
    if (this.state.data) {
      switch(this.state.apiNum) {
        case '1':
        return <ForcedMap data={this.state.data}/>;
        break;
        case '2': 
        return <ForcedMap data={this.state.data}/>;
        default:
          //do nothing
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