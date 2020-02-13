import React, { Component } from 'react';

import * as d3 from "d3";

import './map.scss';

import * as data from '../api/conflicts.json';


class Map extends Component {
  constructor(props) {
    super(props);

    console.log(window.screen.width);

    this.state = {
      nodes: data.nodes,
      links: data.links,
      width: 600,
      height: 600,
      types: ["claim", "support", "neutral"]
    }
  }

  componentDidMount() {
    const { width, height, types, nodes, links } = this.state;
    
    const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-400))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

    const linkArc = (d) => {
      const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
      return `
        M${d.source.x},${d.source.y}
        A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
      `;
    }

    const color = d3.scaleOrdinal(types, d3.schemeCategory10)

    const svg = d3.select("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .style("font", "12px sans-serif");

    svg.append("defs").selectAll("marker")
    .data(types)
    .join("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
    .append("path")
      .attr("fill", color)
      .attr("d", "M0,-5L10,0L0,5");

      const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("stroke", d => color(d.type))
      // .attr("marker-end", d => `url(${new URL(`#arrow-${d}}`, location)})`);
      .attr('marker-end',d => `url(#arrow-${d.type})`)

      const node = svg.append("g")
      .attr("fill", "currentColor")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
    .selectAll("g")
    .data(nodes)
    .join("g")

    node.append("circle")
    .attr("stroke", "white")
    .attr("stroke-width", 1.5)
    .attr("r", 3);

    node.append("text")
      .attr("x", 8)
      .attr("y", "0.31em")
      .text(d => d.label)
    .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3);

      simulation.on("tick", () => {
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
      });
  

  }


  render() {

    return (
        <svg />
    )
  }
} 

export default Map;