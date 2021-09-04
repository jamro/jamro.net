import SVG from 'svg.js';
import Background from './Background.js';
import Timeline from './Timeline.js';
import PositionDesription from './PositionDesription.js';
import GraphStack from './GraphStack.js';

export default class CareerGraph {

  constructor(container) {
    if(!container) throw new Error('container is requried!')
    let currentYear = (new Date).getFullYear();
    this.width = null;
    this.height = null;
    this.from = this.dateStringToMonths(`${currentYear}-01-01`);
    this.to = this.dateStringToMonths(`${currentYear}-02-01`);
    this.canvas = SVG(container);
    this.background = new Background(this.canvas, this);
    this.timeline = new Timeline(this.canvas, this);
    this.upperStack = new GraphStack(this.canvas, this);
    this.bottomStack = new GraphStack(this.canvas, this);
    this.resize(container.offsetWidth);
  }

  resize(w) {
    this.width = w;
    this.height = w/2;
    this.timeline.height = 5 + Math.max(0, Math.min(250, this.width-300))/10;
    this.upperStack.strokeWidth = 0.5 + Math.min(1000, Math.max(0, this.width-300))/350;
    this.bottomStack.strokeWidth = this.upperStack.strokeWidth;

    this.upperStack.yOffset = (this.height - this.timeline.height)/2;
    this.bottomStack.yOffset = this.height - (this.height - this.timeline.height)/2;

    this.upperStack.heightMultiplier = -this.height * 0.5 * 0.4 * 0.125;
    this.bottomStack.heightMultiplier = this.height * 0.5 * 0.4 * 0.125;

    this.canvas.size(this.width, this.height);
    this.canvas.clear();
    this.draw();
  }

  addSeries(dataJson) {
    if(this.upperStack.length == 0 && this.bottomStack.length == 0) {
      this.from = null;
      this.to = null;
    }
    var description = new PositionDesription(dataJson.id, dataJson.type);
    description.axis = dataJson.axis;
    if(dataJson.label) {
      description.hasLabel = true;
      description.name = dataJson.label.name;
      description.labelAlign = dataJson.label.align;
      description.markerPosition.x = this.dateStringToMonths(dataJson.label.marker.x);
      description.markerPosition.y = Number(dataJson.label.marker.y);
      description.labelPosition.x = this.dateStringToMonths(dataJson.label.x);
      description.labelPosition.y = Number(dataJson.label.y);
    }
    for(let date in dataJson.workload) {
      description.workload.addEntry(this.dateStringToMonths(date), dataJson.workload[date]);
    }

    var dateRange = description.workload.getDateRange();

    if(this.from == null || dateRange.min < this.from) {
      this.from = dateRange.min;
    }
    if(this.to == null || dateRange.max > this.to) {
      this.to = dateRange.max;
    }

    this.from = Math.floor(this.from/12)*12;

    this.background.from = this.from;
    this.background.to = this.to;

    this.timeline.from = this.from;
    this.timeline.to = this.to;

    this.upperStack.from = this.from;
    this.upperStack.to = this.to;

    this.bottomStack.from = this.from;
    this.bottomStack.to = this.to;

    if(description.axis > 0) {
      this.upperStack.createArea(description);
    } else {
      this.bottomStack.createArea(description);
    }
  }

  dateStringToMonths(txt) {
    let result = txt.match(/([0-9]{4})-([0-9]{2})-[0-9]{2}/);
    let month = Number(result[1])*12 + Number(result[2]);
    return month;
  }

  draw() {
    this.background.draw();
    this.upperStack.draw();
    this.bottomStack.draw();
    this.timeline.draw();
  }

  destroy() {
    this.canvas.clear();
  }

}
