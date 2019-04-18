import 'svg.js';

export default class Timeline {

  constructor(svg, graph) {
    this.svg = svg;
    this.graph = graph;
    this.from = 0;
    this.to = 1;
    this.height = 20;
  }

  draw() {
    let monthCount = (this.to - this.from);
    let monthWidth = this.graph.width/monthCount;
    let color;
    let fontSize = this.height*0.5;
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
      color = (year % 2 == 0) ? '#2E2A2B' : '#231F20';
      let yearName = '';
      if(yearWidth > 50) {
        yearName = (year).toString();
      } else if(yearWidth > 35) {
        yearName = "'" + (year).toString().substr(2, 2);
      }
      this.svg.rect(yearWidth, this.height)
        .fill(color)
        .move(index*monthWidth, this.graph.height/2-this.height/2);
      let label = this.svg.text(yearName)
      label.font({ fill: '#fff', size: fontSize+"px" })
        .move(
          (index * monthWidth + yearWidth/2) - label.length()/2,
          this.graph.height/2 - this.height/2 + this.height*0.22
        );
      index+=monthsInYear;
      year++;
    }
  }


}
