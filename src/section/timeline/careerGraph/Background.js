import 'svg.js';

export default class Background {

  constructor(svg, graph) {
    this.svg = svg;
    this.graph = graph;
    this.from = 0;
    this.to = 1;
  }

  draw() {
    let monthCount = (this.to - this.from);
    let monthWidth = this.graph.width/monthCount;
    let index = 0;
    let monthsInYear;
    let year = Math.floor(this.from/12);
    let yearWidth;
    while(index < monthCount) {
      if(index == 0) {
        monthsInYear = (this.from % 12) ? (this.from % 12) : 12;
      } else if(index > monthCount - 12) {
        monthsInYear = (this.to % 12) ? (this.to % 12) : 12;
      } else {
        monthsInYear = 12;
      }
      yearWidth = monthWidth * monthsInYear;
      let gradient = this.svg.gradient('linear', function(stop) {
        stop.at(0, '#ffffff')
        stop.at(0.5, (year % 2 == 0) ? '#f3f3f3' : '#e7e7e7')
        stop.at(1, '#ffffff')
      })
      gradient.from(0, 0).to(0, 1);
      this.svg.rect(yearWidth, this.graph.height)
        .fill(gradient)
        .move(index*monthWidth, 0);
      index+=monthsInYear;
      year++;
    }
  }

}
