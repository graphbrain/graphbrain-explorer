
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
      apiSearch: window.location.search
      // apiSearch: this.props.chosenTopic.url[0] ? chosenTopic.url[0].slice(chosenTopic.url[0].lastIndexOf('/')) : "2"

    }
  }

  componentDidMount() {
    getData(this.state.apiSearch).then(data => {
        this.setState({data: data["viz_blocks"][0]})
    });
  }

  handleBackClick() {
    window.location.href = '/';
  }

  render() {
    const mapToRender = () => {
    if (this.state.data) {
      return <ForcedMap data={this.state.data} topic={this.props.chosenTopic}/>;
    } 
    else return null;  
  }

    return (
      <div className="mapsArea">
        <button className="backNavLink" onClick={this.handleBackClick}> Go back </button>
        {mapToRender()}
      </div>
    )
  }
}

export default Maps;