import 'svg.js';
import Workload from './Workload.js';

export default class PositionDesription {

  constructor() {
    this.id = null;
    this.name = null;
    this.markerPosition = {x:0, y:0};
    this.labelPosition = {x:0, y:0};
    this.color = null;
    this.workload = new Workload();
    this.axis = null;
    this.hasLabel = false;
    this.labelAlign = 'center';
  }

}
