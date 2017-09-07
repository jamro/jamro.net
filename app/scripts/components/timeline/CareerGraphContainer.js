import React from 'react';
import CareerGraph from '../../careerGraph/CareerGraph.js'

import timelineData from '../../../data/timeline.json';

export default class CareerGraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.resizeHandler = this.resize.bind(this);
    this.careerGraph = null;
    this.container = null;
  }

  componentDidMount() {
    if(this.careerGraph) {
      this.careerGraph.destroy();
    }
    this.careerGraph = new CareerGraph(this.container);
    for(let data of timelineData) {
      this.careerGraph.addSeries(data);
    }
    this.careerGraph.draw();
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    if(this.careerGraph) {
      this.careerGraph.destroy();
    }
    window.removeEventListener('resize', this.resizeHandler);
  }

  resize() {
    if(this.careerGraph) {
      this.careerGraph.resize(this.container.offsetWidth);
    }
  }

  setContainer(container) {
    this.container = container;
  }

  render() {
    return <div className="career-graph" ref={(container) => this.setContainer(container)}></div>;
  }
}
