
import React, { Component } from 'react';

import ForcedMap from './ForcedMap';

import Loader from '../components/Loader';

import backIcon from '../assets/back_icon.svg';

import {getData} from '../api/getData';

import './map.scss';

class Maps extends Component {
  constructor(props) {
    super(props);
  
    console.log(window.location.search);
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
    const { data } = this.state;
    const mapToRender = () => {
    if (this.state.data) {
      return <ForcedMap data={data}/>;
    } 
    else return <Loader />;  
  }

    return (
      <div className="mapsArea">
       {data && (
        <div className="mapHeader">
          <img src={backIcon} alt="back" className="backIcon" onClick={this.handleBackClick}/>
          <h2 className="mapTitle">
              {data.topic_label.length === 2 ? 
                data.topic_label.toUpperCase() : 
                data.topic_label}
          </h2> 
        </div>
        )}
        {mapToRender()}
      </div>
    )
  }
}

export default Maps;