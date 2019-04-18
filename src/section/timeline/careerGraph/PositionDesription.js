import 'svg.js';
import Workload from './Workload.js';

export default class PositionDesription {

  constructor(id, type) {
    this.id = id;
    this.name = null;
    this.type = type;
    this.markerPosition = {x:0, y:0};
    this.labelPosition = {x:0, y:0};
    this.workload = new Workload();
    this.axis = null;
    this.hasLabel = false;
    this.labelAlign = 'center';

    if(!PositionDesription.nextColorIndex[type]) {
      PositionDesription.nextColorIndex[type] = 0;
    }
    if(!PositionDesription.colorCount[type]) {
      PositionDesription.colorCount[type] = 0;
    }

    this.colorIndex = PositionDesription.nextColorIndex[type];
    PositionDesription.nextColorIndex[type]++;
    PositionDesription.colorCount[type]++;
  }

  getColor() {
    let color1 = {r: 128, g:128, b: 128};
    let color2 = {r: 0, g:0, b: 0};
    let color = {};
    let progress = this.colorIndex/PositionDesription.colorCount[this.type];
    switch(this.type) {
      case 'job':
        color1 = {r: 231, g:122, b: 13};
        color2 = {r: 77, g:0, b: 0};
        break;
      case 'education':
        color1 = {r: 11, g:155, b: 255};
        color2 = {r: 0, g:0, b: 112};
        break;
      case 'business':
        color1 = {r: 188, g:232, b: 0};
        color2 = {r: 183, g:192, b: 0};
        break;
    }
    console.log(this.type);
    color.r = Math.round((1-progress)*color1.r + progress*color2.r).toString(16);
    color.g = Math.round((1-progress)*color1.g + progress*color2.g).toString(16);
    color.b = Math.round((1-progress)*color1.b + progress*color2.b).toString(16);

    while(color.r.length < 2) {
      color.r = '0' + color.r;
    }
    while(color.g.length < 2) {
      color.g = '0' + color.g;
    }
    while(color.b.length < 2) {
      color.b = '0' + color.b;
    }

    return '#' + color.r + color.g + color.b;
  }

}

PositionDesription.nextColorIndex = [];
PositionDesription.colorCount = [];
