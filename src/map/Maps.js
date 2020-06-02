
import React, { useState, useEffect } from 'react';

import ForcedMap from './ForcedMap';

import Loader from '../components/Loader';

import backIcon from '../assets/back_icon.svg';

import {getData} from '../api/getData';

import './map.scss';


const Maps = () => {
   
  const [data, setData] = useState(null);

  useEffect(() => {
    getData(window.location.search).then(data => {
     setData(data["viz_blocks"][0]);
  });
  }, [])

  const handleBackClick = () => {
    window.location.href = '/';
  }

  const mapToRender = () => {
    if (data) {
      return <ForcedMap data={data}/>;
    } 
    else return <Loader />;  
  }

  return (
    <div className="mapsArea">
    {data && (
      <div className="mapHeader">
        <img src={backIcon} alt="back" className="backIcon" onClick={handleBackClick}/>
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

export default Maps;