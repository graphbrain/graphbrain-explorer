import React, { Component, Fragment } from 'react';

import { NavLink } from 'react-router-dom';

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
  }

  handleSubmit() {
    if (this.state.chosenTopic) {
      window.location.href = `/map/?topic=${this.state.chosenTopic}`;
    }
  }

  handleInputChange(e) { 
    const { conflictsList } = this.state; 
    const topicLabel = e.currentTarget.value; 
    const chosenTopic = conflictsList.find(conflict => conflict.label === topicLabel); 
    const topicUrl = chosenTopic.url[0].slice(chosenTopic.url[0].lastIndexOf('/'));
    // console.log(conflictsList.find(conflict => conflict.label === topicLabel)); 
    this.setState({chosenTopic});
    // console.log(conflictsList.find(conflict => conflict.label === topicLabel))
    window.history.pushState({urlPath: topicUrl}, '', topicUrl); 

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
            <p>
            Language, Knowledge, Cognition
            </p>
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
