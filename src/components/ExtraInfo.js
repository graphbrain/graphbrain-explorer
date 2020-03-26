

import React from 'react';

import './extraInfo.scss';

export const ExtraInfo = (props) => {
  console.log(props);

  const { info } = props;
  return (
    <div className="infoWrapper">
      {info && info.headlines.length > 0 && (
        <div className="headlineArea">
          <h3>Headlines</h3>
          {info.headlines.map(headline => (
            <p className="headline">{headline}</p>
          ))}
        </div>
      )}
      {info && info.other_topics.length > 0 && (
        <div className="headlineArea">
          <h3>Related maps</h3>
          {info.other_topics.map(topic => (
            <p className="headline">{topic.label}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExtraInfo;