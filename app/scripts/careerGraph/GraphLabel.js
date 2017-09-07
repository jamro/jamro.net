import 'svg.js';
import PositionDesription from './PositionDesription.js';

export default class GraphLabel {
  constructor(svg, graph) {
    this.svg = svg;
    this.graph = graph;
    this.from = 0;
    this.to = 1;
    this.strokeWidth = 1;
    this.yOffset = 0;
    this.heightMultiplier = 1;
    this.data = new PositionDesription();
  }

  draw() {
    let monthWidth = this.graph.width/(this.to - this.from);
    let markerX, markerY;
    let labelX, labelY;
    let lineX, lineY;
    let labelWidth, labelHeight;
    let markerRadius = this.strokeWidth*2;

    //label
    let fontSize = 5 + 3*this.strokeWidth;
    labelX = (this.data.labelPosition.x - this.from)*monthWidth;
    labelY = this.data.labelPosition.y * this.heightMultiplier + this.yOffset;

    let txt = this.svg
      .link('#' + this.data.id)
      .text(this.data.name)
      .font({ fill: '#000', size: fontSize+"px" })

    labelWidth = txt.length();
    labelHeight = fontSize;

    switch(this.data.labelAlign) {
      case 'center':
        labelX -= labelWidth/2;
        break;
      case 'right':
        labelX -= labelWidth;
        break;
    }
    txt.move(labelX, labelY);

    //line
    markerX = (this.data.markerPosition.x - this.from)*monthWidth;
    markerY = this.data.markerPosition.y * this.heightMultiplier + this.yOffset;

    if(this.heightMultiplier > 0) {
      lineY = labelY-3;
    } else {
      lineY = labelY + labelHeight+3;
    }

    lineX = null;
    if(markerX < labelX || markerX > labelX + labelWidth) {
      lineY += (labelHeight/2+3) * (this.heightMultiplier > 0 ? 1 : -1);

      let leftDistance = Math.abs(markerX - labelX);
      let rightDistance = Math.abs(markerX - labelX - labelWidth);
      if(leftDistance < rightDistance) {
        lineX = labelX - 3;
      } else {
        lineX = labelX + labelWidth + 3;
      }
    }
    this.svg
      .link('#' + this.data.id)
      .line(markerX, markerY, markerX, lineY).stroke({ width: 1 })
    if(lineX !== null) {
      this.svg
        .link('#' + this.data.id)
        .line(markerX, lineY, lineX, lineY).stroke({ width: 1 })
    }

    //marker
    this.svg
      .link('#' + this.data.id)
      .circle(markerRadius*2)
      .fill('#000')
      .stroke({ width: this.strokeWidth, color: '#fff' })
      .move(markerX-markerRadius, markerY-markerRadius);
  }
}
