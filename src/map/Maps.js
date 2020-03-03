
import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import ForcedMap from './ForcedMap';
import PredefinedMap from './PredefinedMap';

import {getData} from '../api/getData';

import './map.scss';

class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      apiSearch: this.props.chosenTopic.url ? this.props.chosenTopic.url.slice(this.props.chosenTopic.url.lastIndexOf('/')) : "2"
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
          return <ForcedMap data={this.state.data} topic={this.props.chosenTopic}/>;
      }
    } 
    else return null;  
  }

    return (
      <div className="mapsArea">
        <button className="backNavLink" onClick={this.props.handleBackClick}> Go back </button>
        {mapToRender()}
      </div>
    )
  }
}

export default Maps;