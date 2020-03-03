import React, { Component, Fragment } from 'react';

import * as d3 from "d3";

import './map.scss';


class ForcedMap extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    const uniqueTypes = [];
    this.props.data.links.forEach(link => {
      if (uniqueTypes.indexOf(link.type) === -1) {
        uniqueTypes.push(link.type);
      }
    })

    this.state = {
      nodes: this.props.data.nodes,
      links: this.props.data.links,
      fullListNodes: this.props.data.nodes,
      fullListLinks: this.props.data.links, 
      width: 600,
      height: 600,
      types: uniqueTypes,
      linkHovered: null
    }

    this.drawMap = this.drawMap.bind(this);
  }

  drawMap() {
    const { width, height, types, nodes, links } = this.state;
        
    const calcDiameter = weight => {
      const minWeight = Math.min.apply(null, nodes.map(node => node.weight));
      const maxWeight = Math.max.apply(null, nodes.map(node => node.weight));
      const minD = 2;
      const maxD = 15;

      const newWeight = (weight - minWeight) / (maxWeight - minWeight);
      const d = minD + newWeight * ( maxD - minD);

      return d;
    }

    const calcLinkWidth = weight => {
      const minWeight = Math.min.apply(null, links.map(link => link.weight));
      const maxWeight = Math.max.apply(null, links.map(link => link.weight));
      const minW = 1;
      const maxW = 3;

      const newWeight = (weight - minWeight) / (maxWeight - minWeight);
      const w = minW + newWeight * ( maxW - minW);

      return w;
    }

    
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
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("stroke", d => color(d.type))
      .attr("stroke-width", d => calcLinkWidth(d.weight))
      .attr('marker-end',d => d.directed ? `url(#arrow-${d.type})` : '')
      .attr('class', 'linkAndArrow')
      .on('mouseover', d => {
        d3.select(`#linklabel${d.index}`).style("visibility", "visible")
        this.setState({linkHovered: d.index});
      })
      .on('mouseout', d => {
        d3.select(`#linklabel${d.index}`).style("visibility", "hidden")
      })
     

    const linkpaths = svg.selectAll(".linkpath")
      .data(links)
      .enter()
      .append('path')
      .attr("class", "linkpath")
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .attr("id", d => "linkpath" + d.index)
      .style("pointer-events", "none")
    

    const linklabels = svg.selectAll(".linklabels")
      .data(links)
      .enter()
      .append('text')
      .style("pointer-events", "none")
      .attr("class", "linklabels")
      .attr("font-size", 8)
      .attr("fill", "#00000")
      .attr("id", d => "linklabel" + d.index)
      .style("visibility", "hidden");
  

    linklabels.append('textPath')
      .attr('xlink:href', d => '#linkpath' + d.index)
      .style("text-anchor", "middle")
      .style("pointer-events", "none")
      .attr("startOffset", "50%")
      .text(d => d.label)

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
        .attr("id", d => d.id)
        .attr("class", "nodeCircle")
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
        link.attr("d", linkArc).attr("class", "linkArc")
       
        node.attr("transform", d => `translate(${d.x},${d.y})`)
        .on("mouseover", d => {
          d3.selectAll('.linkArc')
          .style("display", l => {
            if ((l.source.id !== d.id) && (l.target.id !== d.id)) {
              return "none"
            }
            else return "block";
          })
        })
        .on("mouseout", d => {
          d3.selectAll('.linkArc')
          .style("display", "block")
        })
        linkpaths.attr('d', d => 
           `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`
        );
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

  componentDidMount() {
  const { nodes, links } = this.state;
    this.drawMap();
  }


  render() {

    return (
      <Fragment>
        <h2 className="mapTitle">{this.props.topic}</h2>
          <svg />
      </Fragment>
    )
  }
} 

export default ForcedMap;