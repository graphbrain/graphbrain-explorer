import React, { Fragment } from 'react';

import { NavLink } from 'react-router-dom';

import closeInfoIcon from '../assets/close_info_icon.svg';

import '../styles/extraInfo.scss';

import { Link } from './map/Maps';

const ExtraInfo: React.FC<{ linkArr: Link[]; closeExtraInfo: () => void }> = ({
  linkArr,
  closeExtraInfo,
}) => {
  return (
    <section className="infoWrapper">
      <img
        src={closeInfoIcon}
        alt="close"
        className="closeIcon"
        onClick={closeExtraInfo}
      />
      {linkArr.map((link, index) => (
        <Fragment key={link.index}>
          <h3 className="linkTitle">
            {link.source.label} &rarr; {link.target.label}
          </h3>
          <div className="headlineArea">
            <h4>Headlines</h4>
            {link.info &&
              link.info.headlines.length &&
              link.info.headlines.map((headline, index) => (
                <p className="headline" key={index}>
                  {headline}
                </p>
              ))}
            {link.info && !link.info.headlines.length && (
              <p className="headline">No relevant headlines</p>
            )}
          </div>
          {link.info && link.info.other_topics.length > 0 && (
            <div className="headlineArea">
              <h4>Related maps</h4>
              {link.info.other_topics.map((topic, index) => (
                <NavLink
                  key={topic.url}
                  to={topic.url.slice(topic.url.lastIndexOf('/'))}
                  className="topic"
                  target="_blank"
                >
                  {' '}
                  {topic.label}
                </NavLink>
              ))}
            </div>
          )}
          {linkArr.length === 2 && index === 0 && <hr />}
        </Fragment>
      ))}
    </section>
  );
};

export default ExtraInfo;
