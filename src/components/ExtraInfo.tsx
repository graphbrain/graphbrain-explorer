import React, { Fragment } from 'react';

import closeInfoIcon from '../assets/close_info_icon.svg';

import './extraInfo.scss';

import { Link } from './map/Maps';
 

 const ExtraInfo: React.FC<{linkArr: Link[], closeExtraInfo: () => void}> = ({linkArr, closeExtraInfo}) => {

  return (
    <div className="infoWrapper">
      <img src={closeInfoIcon} alt='close' className="closeIcon" onClick={closeExtraInfo}/>
      {linkArr.map((link, index) => (
      <Fragment key={link.index}>
        <h3 className="linkTitle">{link.source.label} &rarr; {link.target.label}</h3>
        {link.info && link.info.headlines.length && (
          <div className="headlineArea">
            <h4>Headlines</h4>
            {link.info.headlines.map(headline => (
              <p className="headline" key={headline}>{headline}</p>
            ))}
          </div>
        )}
        {link.info && !link.info.headlines.length && (
            <div className="headlineArea">
              <h4>Headlines</h4>
                <p className="headline">No relevant headlines</p>
          </div>
        )}
        {link.info && link.info.other_topics.length > 0 && (
          <div className="headlineArea">
            <h4>Related maps</h4>
            {link.info.other_topics.map(topic => (
            <p key={topic.url[0]}> <a 
            href={topic.url[0].slice(topic.url.lastIndexOf('/'))} 
            className="topic" target="_blank" 
            rel="noopener noreferrer"
            key={topic.url[0]}>
              {topic.label}
            </a></p>
            ))}
          </div>
        )}
        {linkArr.length === 2 && index === 0 && <hr/>}
      </Fragment>
      ))}
    </div>
  )
}

export default ExtraInfo;