// import React from 'react';

// import '../styles/topicsDropdown.scss';


// const TopicsDropdown = (props) => {
//   const { conflictsList } = props;

//   const renderList = () => {
//     return conflictsList.map(conf => (
//           <option value={conf.label} key={conf.id} className="topicOption"/>
//         )
//       )
//     }

//     return (
//         <div className="dropdownWrapper">
//           <label htmlFor="topicsInput" className="dropdownTitle">Please choose a topic</label>
//           {/* <form onSubmit={() => props.handleSubmit()}> */}
//             <input id="topicsInput" list="topics" name="topic" onChange={(e) => props.handleInputChange(e)} />
//             <datalist id="topics">
//               {renderList()}
//             </datalist>
//             {/* <button type="submit">Submit</button> */}
//           {/* </form> */}
//       </div>
//     )
// }



// export default TopicsDropdown;