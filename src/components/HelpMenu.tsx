import React from 'react';

import '../styles/map.scss';


const HelpMenu: React.FC = () => (
  <div className="helpMenuWrapper">
    <ul>
      <li>Hovering on a link (line between two nodes) will give you more information about it. </li>
      <li>Hovering on a node (circle) will show you only the related links.</li>
      <li>You can zoom in and out using the scroll functionality of the mouse/mouse pad. </li>
      <li>You can drag the graph around by clicking on a node.  </li>
    </ul>
  </div>
)

export default HelpMenu;