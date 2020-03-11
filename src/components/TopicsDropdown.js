import React from 'react';

import './topicsDropdown.scss';


const TopicsDropdown = (props) => {
  const { conflictsList } = props;

  const renderList = () => {
    return conflictsList.map(conf => (
          <option value={conf.label} key={conf.id} className="topicOption"/>
        )
      )
    }

    return (
        <div className="dropdownWrapper">
          <p className="dropdownTitle">Please choose a topic:</p>
          <form onSubmit={() => props.handleSubmit()}>
            <input list="topics" name="topic" onChange={(e) => props.handleInputChange(e)}/>
            <datalist id="topics">
              {renderList()}
            </datalist>
          </form>
      </div>
    )
}


export default TopicsDropdown;