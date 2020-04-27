import React, { Component, Fragment } from 'react';

import { NavLink } from 'react-router-dom';

import {getData} from './api/getData';

// import TopicsDropdown from './components/TopicsDropdown';

import Maps from './map/Maps';

import logo from './assets/graphbrain-logo.gif';

import './App.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenTopic: null,
      topicsList: []
    }
  }

  componentDidMount() {
    getData('topics').then(data => {
      const filteredTopics = data.viz_blocks[0].rows.filter(topic => 
        topic.label.split(" ").length < 5 && topic.label.length !== 1
        ).sort((a, b) => (
          b.label < a.label ? 1 : -1
        ))
        this.setState({
          topicsList: filteredTopics
        })
    })
  }


  handleInputChange(topic) { 
    this.setState({chosenTopic: topic})
}

  handlePreDefinedClick() {
    this.setState({chosenTopic : "2"})
  }

  render () {
    const { chosenTopic } = this.state;
    return (
      <Fragment>
      {!chosenTopic && (
        <div className="landingWrapper">
          <div className="aboutArea">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="mainText">
              <p>Graphbrain is an Artificial Intelligence open-source software library and scientific research tool.</p>
              <p>Its aim is to facilitate automated meaning extraction and text understanding, as well as the exploration and inference of knowledge.</p>
              <p>This website is both a demonstration and an application of Graphbrain. It allows you to experience the news in a different way: instead of following the timelines of events as they unfold, it makes it possible to navigate the implicit networks of meaning that traverse temporal spans and publications. We invite you to explore how the various actors, topics, places and events are interconnected through relations of cooperation, common interest and conflict, through the various viewpoints present in the media.</p>
            </div>
          </div>
            <div className="topicsArea">
              <h2 className="topicsTitle">Please choose a topic</h2>
              <div className="topicsList">
              {this.state.topicsList.map(topic => (
              <NavLink 
                key={topic.id}
                onClick={() => this.handleInputChange(topic)}
                to={`${topic.url[0].slice(topic.url[0].lastIndexOf('/'))}`} 
                className="navLink"> {topic.label.length === 2 ? topic.label.toUpperCase() : topic.label} 
              </NavLink>
              ))}
              </div>
              {/* <div className="dropdownArea">
                <TopicsDropdown 
                  handleSubmit={() => this.handleSubmit()} 
                  handleInputChange={(e) => this.handleInputChange(e)}
                  topicsList={this.state.topicsList}
                />
                {/* {this.state.chosenTopic && (
                <NavLink to={`/map?topic=${this.state.chosenTopic}`} className="navLivk"> Create Map </NavLink>) } */}
              </div> 
              {/* <button className="navlink" onClick={() => this.handlePreDefinedClick()}> Pre-defined Map </button> */}
            </div>
       )}
      {chosenTopic && (
        <Maps chosenTopic={chosenTopic} handleBackClick={() => this.handleBackClick()}/>
      )}
      </Fragment>
    );
  }
}

export default LandingPage;
