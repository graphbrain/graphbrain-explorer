import React, { Component } from 'react';

import * as d3 from "d3";

import './map.scss';


class Map extends Component {
  constructor(props) {
    super(props);

    const uniqueTypes = [];
    this.props.data.links.forEach(link => {
      if (uniqueTypes.indexOf(link.type) === -1) {
        uniqueTypes.push(link.type);
      }
    })

    this.state = {
      nodes: this.props.data.nodes,
      links: this.props.data.links,
      width: 600,
      height: 600,
      types: uniqueTypes
    }
  }


  componentDidMount() {
    const { width, height, types, nodes, links } = this.state;
    
    var xScale = d3.scalePoint()
    // .domain([1, 2, 3, 4])
    .range([100, width - 100]);
    
    const calcDiameter = weight => {
      const minWeight = Math.min.apply(null, nodes.map(node => node.weight));
      const maxWeight = Math.max.apply(null, nodes.map(node => node.weight));

      const minD = 2;
      const maxD = 15;

      const newWeight = (weight - minWeight) / (maxWeight - minWeight);
      const d = minD + newWeight * ( maxD - minD);

      return d;

    }
    
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-400))
      // .force("x", d3.forceX(d => (d.x * 10)))
      // .force("y", d3.forceY(d => (d.y * 10)));
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const linkArc = (d) => {
      const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
      return `
        M${d.source.x},${d.source.y}
        A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
      `;
    }

    const color = d3.scaleOrdinal(types, d3.schemeCategory10);

    const svg = d3.select("svg")
    .attr("viewBox", [-width / 2 - 50, -height / 2 + 60, width, height])
    .style("font", "12px sans-serif");

    svg.append("defs").selectAll("marker")
    .data(types)
    .join("marker")
      .attr("id", d => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -0.5)
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
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
      .attr('marker-end',d => d.directed ? `url(#arrow-${d.type})` : '')

    const linkpaths = svg.selectAll(".linkpath")
      .data(links)
      .enter()
      .append('path')
      .attr("class", "linkpath")
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .attr("id", (d, i) => "linkpath" + i)
      .style("pointer-events", "none");

    const linklabels = svg.selectAll(".linklabels")
      .data(links)
      .enter()
      .append('text')
      .style("pointer-events", "none")
      .attr("class", "linklabels")
      .attr("font-size", 5)
      .attr("fill", "#aaa")
      .attr("id", (d, i) => "linklabel" + i)  

    linklabels.append('textPath')
      .attr('xlink:href', (d, i) => '#linkpath' + i)
      .style("text-anchor", "middle")
      .style("pointer-events", "none")
      .attr("startOffset", "50%")
      .text(d => d.label);

      const node = svg.append("g")
        .attr("fill", "currentColor")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g") 
        .call(this.drag(simulation));

      node.append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("fill", "red")
        .attr("r", d => calcDiameter(d.weight));

      node.append("text")
        .attr("x", 8)
        .attr("y", "0.31em")
        .text(d => d.label)
        .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 3);

      simulation.on("tick", () => {
        link.attr("d", linkArc).attr("class", "linkArc");
        node.attr("transform", d => `translate(${d.x},${d.y})`);
        // linkpaths.attr('d', d => 
        //    `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`
        // );
      });
  }

  drag (simulation) {
    
  const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
  
  const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
  
  const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }


  render() {

    return (
        <svg />
    )
  }
} 

export default Map;