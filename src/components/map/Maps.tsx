
import React, { useState, useEffect } from 'react';

import ForcedMap from './ForcedMap';
import Loader from '../Loader';
import Error from '../Error'

import backIcon from '../../assets/back_icon.svg';

import {getData} from '../../api/getData';

import '../../styles/map.scss';

import { Topic } from '../LandingPage';

export interface Node {
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

export interface Link {
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

export interface Data {
  layout: string,
  links: Array<Link>,
  nodes: Array<Node>,
  topic_label: string,
  type: string
}

const Maps: React.FC<{}> = () => {
   
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    getData(window.location.search).then(data => {
      if (data && data["viz_blocks"]) {
        setData(data["viz_blocks"][0]);
      }
      else setError(true)
  });
  }, [])

  const handleBackClick = () => {
    window.location.href = '/';
  }

  return (
    <div className="mapsArea">
    {data && (
      <div className="mapHeader">
        <img src={backIcon} alt="back" className="backIcon" aria-label="backIcon" onClick={handleBackClick}/>
        <h2 className="mapTitle">
            {data && data.topic_label && data.topic_label.length === 2 ? 
              data.topic_label.toUpperCase() : 
              data.topic_label}
        </h2> 
        <ForcedMap data={data}/>
      </div>
      )}
      {!data && !error && <Loader />}
      {error && <Error/>}
    </div>
  )
}

export default Maps;