import React, { Component, Fragment } from 'react';

// import { NavLink } from 'react-router-dom';

import {getData} from './api/getData';

import TopicsDropdown from './components/TopicsDropdown';

import Maps from './map/Maps';

import logo from './assets/graphbrain-logo.gif';

import './App.css';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenTopic: null,
      conflictsList: []
    }
  }

  componentDidMount() {
    getData('topics').then(data => {
        this.setState({
          conflictsList: data.viz_blocks[0].rows
        })
    })
    document.getElementById("topicsInput").focus();
  }

  handleSubmit() {
    if (this.state.chosenTopic) {
      // window.location.href = `/map/?topic=${this.state.chosenTopic}`;
    }
  }

  handleInputChange(e) { 
    const { conflictsList } = this.state; 
    const topicLabel = e.currentTarget.value; 
    const chosenTopic = conflictsList.find(conflict => conflict.label === topicLabel); 
    console.log('topic', chosenTopic)
    if (chosenTopic) {
      this.setState({chosenTopic});
      const topicUrl = chosenTopic.url[0].slice(chosenTopic.url[0].lastIndexOf('/'));
      window.history.pushState({urlPath: topicUrl}, '', topicUrl); 
    }
}

  handlePreDefinedClick() {
    this.setState({chosenTopic : "2"})
  }

  render () {
    const { chosenTopic } = this.state;
    return (
      <Fragment>
      {!chosenTopic && (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="mainText">
            <p>Graphbrain is an Artificial Intelligence open-source software library and scientific research tool.</p>
            <p>Its aim is to facilitate automated meaning extraction and text understanding, as well as the exploration and inference of knowledge.</p>
            <p>This website is both a demonstration and an application of Graphbrain. It allows you to experience the news in a different way: instead of following the timelines of events as they unfold, it makes it possible to navigate the implicit networks of meaning that traverse temporal spans and publications. We invite you to explore how the various actors, topics, places and events are interconnected through relations of cooperation, common interest and conflict, through the various viewpoints present in the media.</p>
            </div>
            <div className="buttonArea">
              <div className="dropdownArea">
                <TopicsDropdown 
                  handleSubmit={() => this.handleSubmit()} 
                  handleInputChange={(e) => this.handleInputChange(e)}
                  conflictsList={this.state.conflictsList}
                />
                {/* {this.state.chosenTopic && (
                <NavLink to={`/map?topic=${this.state.chosenTopic}`} className="navLivk"> Create Map </NavLink>) } */}
              </div>
              {/* <button className="navlink" onClick={() => this.handlePreDefinedClick()}> Pre-defined Map </button> */}
            </div>
          </header>
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
