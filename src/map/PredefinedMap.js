
import React, { Component } from 'react';

import * as d3 from "d3";

import './map.scss';


class PredefinedMap extends Component {
  constructor(props) {
    super(props);

    const uniqueTypes = [];

    this.props.data.links.forEach(link => {
      if (uniqueTypes.indexOf(link.type) === -1) {
        uniqueTypes.push(link.type);
      }
    })

    console.log(window.innerWidth);
    console.log(window.innerHeight);

    this.state = {
      nodes: this.props.data.nodes,
      links: this.props.data.links,
      width: 600,
      height: 600,
      margin: {top: 40, right: 20, bottom: 20, left: 40},
      types: uniqueTypes
    }
  }


  componentDidMount() {
    const { width, height, margin, types, nodes, links } = this.state;

    const multi = 300;

    const svg = d3.select("svg")
    .attr("viewBox", [-width / 2 + 150, -height / 2 + 300, width, height])
    .style("font", "12px sans-serif");
                               
        const node = svg.append("g")
        .attr("fill", "currentColor")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g") 

        const findXAxis = (name) => {
          return nodes.filter(node => node.id === name)[0].x;
        }

        const findYAxis = (name) => {
          return nodes.filter(node => node.id === name)[0].y;
        }

        const link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", d => findXAxis(d.source) * multi)
        .attr("y1", d => findYAxis(d.source) * multi)
        .attr("x2", d => findXAxis(d.target) * multi)
        .attr("y2", d => findYAxis(d.target) * multi)
        .attr("stroke", "green")
        .attr("stroke-width", 1)


        node.append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("fill", "red")
        .attr("cx", d => d.x * multi)
        .attr("cy", d => d.y * multi)
        .attr("r", 3)

        node.append("text")
        .attr("x", d => d.x * multi)
        .attr("y", d => d.y * multi)
        .text(d => d.label)
        .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 3);


  }

  render() {

    return (
        <svg />
    )
  }
} 

export default PredefinedMap;