
import React, { useState, useEffect } from 'react';

import ForcedMap from './ForcedMap';
import Loader from '../Loader';

import backIcon from '../../assets/back_icon.svg';

import {getData} from '../../api/getData';

import './map.scss';

import { Topic } from '../LandingPage';

export type Node = {
  faction: number,
  id: string,
  index: 0,
  info: {gender_numner: string},
  label: string,
  vx: number,
  vy: number,
  weight: 2,
  x: number,
  y: number
}

export type Link = {
  id: string,
  directed: boolean,
  index: number,
  info: {
    headlines: Array<string>,
    other_topics: Array<Topic>
  },
  label: string,
  source: Node,
  target: Node,
  type: string,
  weight: number
}

export type Data = {
  layout: string,
  links: Array<Link>,
  nodes: Array<Node>,
  topic_label: string,
  type: string
}

const Maps: React.FC<{}> = () => {
   
  const [data, setData] = useState<Data | null>(null);

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
            {data && data.topic_label && data.topic_label.length === 2 ? 
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