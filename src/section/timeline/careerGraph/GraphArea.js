import 'svg.js';
import Workload from './Workload.js';
import PositionDesription from './PositionDesription.js';

export default class CareerGraph {
  constructor(svg, graph) {
    this.svg = svg;
    this.graph = graph;
    this.from = 0;
    this.to = 1;
    this.strokeWidth = 1;
    this.yOffset = 0;
    this.heightMultiplier = 1;
    this.data = new PositionDesription();
    this.workloadOffset = new Workload();
  }

  draw() {
    let points = [];
    let monthWidth = this.graph.width/(this.to - this.from);
    let month;
    for(let date in this.data.workload.data) {
      month = date - this.from;
      points.push({
        x: month*monthWidth,
        y: this.data.workload.data[date] + this.workloadOffset.get(date)
      });
    }
    points = points.sort((a, b) => (b.x - a.x));
    points.unshift({
      x: points[0].x,
      y: -0.1
    })
    points.push({
      x: points[points.length-1].x,
      y: -0.1
    })

    // smooth data
    let oldPoints = points;
    points = [];
    points.push(oldPoints[0]);
    for(let i = 1; i < oldPoints.length-1; i++) {
      points[i] = {
        x: oldPoints[i].x,
        y: (oldPoints[i-1].y+oldPoints[i].y+oldPoints[i+1].y)/3
      }
    }
    points.push(oldPoints[oldPoints.length-1]);
    points = points.map((p) => {
      p.y = p.y * this.heightMultiplier + this.yOffset;
      return p;
    });
    points = points.reduce((serial, point) => {
      serial.push(point.x + "," + point.y);
      return serial;
    }, []);
    points = points.join(' ');

    this.svg
      .link('#' + this.data.id)
      .polygon(points)
      .fill(this.data.color)
      .stroke({ width: this.strokeWidth, color: '#fff' });
  }
}
