import React, { Fragment, useState, useEffect, useRef } from 'react';
import * as d3 from "d3";

import ExtraInfo from '../ExtraInfo';
import HelpMenu from '../HelpMenu';

import closeHelpIcon from '../../assets/close_help_icon.svg';
import helpIcon from '../../assets/help_icon.svg';

import '../../styles/map.scss';

import { Data } from './Maps';
import { Link } from './Maps';



const ForcedMap: React.FC <{data: Data}> = ({data}) => {

  const [linkHovered, setLinkHovered] = useState<Link[] | null>(null);
  const [helpMenuOpen, toggleHelpMenu] = useState(false);
  const d3Container = useRef(null);

  const { nodes, links } = data;

  
  const linkTypes: Array<string> = [];
  data.links.forEach(link => {
    if (linkTypes.indexOf(link.type) === -1) {
      linkTypes.push(link.type);
    }
  })

  const factionTypes: Array<string> = [];
  data.nodes.forEach(node => {
    if (factionTypes.indexOf(node.faction.toString()) === -1) {
      factionTypes.push(node.faction.toString());
    }
  })

  // const nodeAndLinksTypes: Array<string> = linkTypes.concat(factionTypes);


  const width: number = 600;
  const height: number = 600;


  const drawMap = () => {
    const calcDiameter = (weight: number) => {
      let minWeight = Math.min.apply(null, nodes.map(node => node.weight));
      let maxWeight = Math.max.apply(null, nodes.map(node => node.weight));
      if (minWeight === maxWeight) {
        minWeight = 1;
        maxWeight = 2;

      }
      const minD = 2;
      const maxD = 15;

      const newWeight = (weight - minWeight) / (maxWeight - minWeight);
      const d = minD + newWeight * ( maxD - minD);
      return d;
    }

    const calcLinkWidth = (weight: number) => {
      const minWeight = Math.min.apply(null, links.map(link => link.weight));
      const maxWeight = Math.max.apply(null, links.map(link => link.weight));
      const minW = 1;
      const maxW = 2.5;

      const newWeight = (weight - minWeight) / (maxWeight - minWeight);
      const w = minW + newWeight * ( maxW - minW);

      return w;
    }

  
    const simulation: any = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d:any) => d.id))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("x", d3.forceX())
      .force("y", d3.forceY());


    const differentColors = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select(d3Container.current)
    .attr("viewBox", `${-width / 2 - 50}, ${-height / 2 + 60}, ${width}, ${height}`)
    // @ts-ignore
    .call(d3.zoom().on("zoom", () => {
      svg.attr("transform", d3.event.transform)
    }))
  
    .append("g")
      .style("font", "10px sans-serif")
 

    svg.append("defs").selectAll("marker")
    .data(linkTypes)
    .join("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 5)
      .attr("refY", -0.5)
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", d => differentColors(d))
      .attr("d", "M0,-5L10,0L0,5");

    const link = svg.append("g")
      .attr("fill", "none")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", d => differentColors(d.type))
      .attr("stroke-width", d => calcLinkWidth(d.weight))
      .attr('marker-end',d => d.directed ? `url(#arrow-${d.type})` : '')
      .attr('class', 'linkAndArrow')
      .attr("id", d => `link-${d.index}`)
      .on('mouseover', d => {
        const reversed = links.find(link => d.source.id === link.target.id && d.target.id === link.source.id);
        const checkLinkHovered = reversed ? [d, reversed] : [d];
        setLinkHovered(checkLinkHovered);
      })
      .on('mouseout', d => {
      })
   

      const node = svg.append("g")
        .attr("fill", "currentColor")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g") 
        // @ts-ignore
        .call(drag(simulation));

      node.append("circle")
        // .attr("stroke", "white")
        // .attr("stroke-width", 1.5)
        .attr("fill", (d:any) => differentColors(d.faction))
        .attr("id", d => d.id)
        .attr("class", "nodeCircle")
        .attr("r", d => calcDiameter(d.weight));
      

      node.append("text")
        .attr("class", "nodeText")
        .attr("x", 8)
        .attr("y", "0.31em")
        .text(d => d.label)
        .clone(true).lower()
        .attr("fill", "none")
        // .attr("stroke", "white")
        // .attr("stroke-width", 3);

    const calculateLinkLength = (d: any) => {
        const x1 = d.source.x;
        const y1 = d.source.y;
        const x2 = d.target.x;
        const y2 = d.target.y;
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const targetX = x2 - Math.cos(angle) * (calcDiameter(d.target.weight) + 5);
        const targetY = y2 - Math.sin(angle) * (calcDiameter(d.target.weight) + 5);
        return {targetX, targetY};
      }

      simulation.on("tick", () => {
        link
        .attr("class", "link")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => calculateLinkLength(d).targetX)
        .attr("y2", d => calculateLinkLength(d).targetY);
     
        node.attr("transform", d => `translate(${d.x},${d.y})`)
        .on("mouseover", (d: any) => {
          d3.selectAll('.link')
          .style("display", (l:any) => {
            if ((l.source.id !== d.id) && (l.target.id !== d.id)) {
              return "none"
            }
            else return "block";
          })
        })
        .on("mouseout", d => {
          d3.selectAll('.link')
          .style("display", "block")
        })
      });
   
  }

  const drag = (simulation: any) => {
    
    const dragstarted = (d: any) => {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
    
    const dragged = (d: any) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }
    
    const dragended = (d: any) => {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    
      return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
  }
  
    useEffect(drawMap, [])

      return (
        <Fragment>
          <div className="contentArea">
            {linkHovered && 
              <ExtraInfo 
                linkArr={linkHovered}  
                closeExtraInfo={() => setLinkHovered(null)}
              />
            }
            <svg ref={d3Container}/>
          </div>
          {helpMenuOpen && <HelpMenu />}
          <div className="helpButton">
            <img 
            src={helpMenuOpen ? closeHelpIcon : helpIcon} 
            className={helpMenuOpen ? "closeHelpIcon" : "helpIcon"}
            alt="help" onClick={() => toggleHelpMenu(helpMenuOpen => !helpMenuOpen)}/> 
          </div>
        </Fragment>
      )
}


export default ForcedMap;