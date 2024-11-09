import 'svg.js';

import Workload from './Workload.js';
import GraphArea from './GraphArea.js';
import GraphLabel from './GraphLabel.js';

export default class GraphStack {
  constructor(svg, graph) {
    this.svg = svg;
    this.graph = graph;
    this.from = 0;
    this.to = 1;
    this.areas = [];
    this.labels = [];
    this.currentStack = new Workload();
    this.yOffset = 0;
    this.strokeWidth = 1;
    this.heightMultiplier = 1;
    this.onClick = () => {}
  }

  createArea(description) {
    let area = new GraphArea(this.svg, this.graph);
    area.onClick = (target) => this.onClick(target)
    area.data = description;
    area.from = this.from;
    area.to = this.to;
    area.yOffset = this.yOffset;
    area.strokeWidth = this.strokeWidth;
    area.heightMultiplier = this.heightMultiplier;

    area.workloadOffset = this.currentStack.clone();
    this.currentStack.add(description.workload);

    this.areas.push(area);
    if(description.hasLabel) {
      let label = new GraphLabel(this.svg, this.graph);
      label.onClick = (target) => this.onClick(target)
      label.data = description;
      label.from = this.from;
      label.to = this.to;
      label.yOffset = this.yOffset;
      label.strokeWidth = this.strokeWidth;
      label.heightMultiplier = this.heightMultiplier;
      this.labels.push(label);
    }
  }

  get length() {
    return this.areas.length;
  }

  draw() {
    let area;
    for(area of this.areas) {
      area.from = this.from;
      area.to = this.to;
      area.yOffset = this.yOffset;
      area.strokeWidth = this.strokeWidth;
      area.heightMultiplier = this.heightMultiplier;
    }
    for(let i = this.areas.length-1; i >=0; i--) {
      this.areas[i].draw();
    }
    for(let label of this.labels) {
      label.from = this.from;
      label.to = this.to;
      label.yOffset = this.yOffset;
      label.strokeWidth = this.strokeWidth;
      label.heightMultiplier = this.heightMultiplier;
      label.draw();
    }
  }

}
