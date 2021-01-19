import React, { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import {getData} from '../api/getData';

import Maps from './map/Maps';
import Error from './Error'

import logo from '../assets/graphbrain-logo.gif';

import '../styles/landingPage.scss';

export interface Topic {
  id: string,
  label: string,
  url: string,
  weight: number
}

const LandingPage: React.FC<{}> = () => {

  const [chosenTopic, setChosenTopic] = useState<Topic | null>(null);
  const [topicsList, setTopicsList] = useState<Array<Topic>>([]);
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    getData('topics').then(data => {
      if(data && data.viz_blocks) {
        const filteredTopics = data.viz_blocks[0].rows.filter((topic: Topic) => 
        topic.label.split(" ").length < 5 && topic.label.length !== 1
        ).sort((a:Topic, b:Topic) => (
          b.label < a.label ? 1 : -1
        ))
        setTopicsList(filteredTopics);
      }
      else {
        setError(true)
      }
    })
  }, [])

  const handleInputChange = (topic: Topic) => {
    setChosenTopic(topic);
  }

  // const handlePreDefinedClick = () => {
  //   setChosenTopic(2);
  // }

  return (
    <Fragment>
    {!chosenTopic && (
      <div className="landingWrapper">
        <aside className="aboutArea">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="mainText">
            <p>Graphbrain is an Artificial Intelligence open-source software library and scientific research tool. It's aim is to facilitate automated meaning extraction and text understanding, as well as the exploration and inference of knowledge.</p>
            <p>This website is both a demonstration and an application of Graphbrain. It allows you to experience the news in a different way: instead of following the timelines of events as they unfold, it makes it possible to navigate the implicit networks of meaning that traverse temporal spans and publications. </p>
            <p> We invite you to explore how the various actors, topics, places and events are interconnected through relations of cooperation, common interest and conflict, through the various viewpoints present in the media.</p>
          </div>
        </aside>
          <div className="topicsArea">
            <h2 className="topicsTitle">Please choose a topic</h2>
            <nav className="topicsList">
            {topicsList.map(topic => (
            <NavLink 
              key={topic.id}
              onClick={() => handleInputChange(topic)}
              to={`${topic.url[0].slice(topic.url[0].lastIndexOf('/'))}`} 
              className="navLink"> {topic.label.length === 2 ? topic.label.toUpperCase() : topic.label} 
            </NavLink>
            ))}
            </nav>
          </div> 
            {/* <button className="navlink" onClick={() => this.handlePreDefinedClick()}> Pre-defined Map </button> */}
      </div>
    )}
    {chosenTopic && (
      <Maps />
    )}
    {error && <Error/>}
    </Fragment>
  );
}


export default LandingPage;
