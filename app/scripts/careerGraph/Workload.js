import 'svg.js';

export default class Workload {

  constructor(data) {
    this.data = data ? data : [];
  }

  addEntry(date, workAmount) {
    this.data[date] = workAmount;
  }

  add(workload) {
    for(let date in workload.data) {
      if(!this.data[date]) {
        this.data[date] = workload.data[date];
      } else {
        this.data[date] += workload.data[date];
      }
    }
  }

  get(date) {
    return this.data[date] ? this.data[date] : 0;
  }

  clone() {
    return new Workload(JSON.parse(JSON.stringify(this.data)));
  }

  getDateRange() {
    var result = {
      min: null,
      max: null
    }
    for(let date in this.data) {
      let month = date;
      if(result.min === null) {
        result.min = month;
      }
      if(result.max === null) {
        result.max = month;
      }
      result.min = Math.min(result.min, month);
      result.max = Math.max(result.max, month);
    }
    return result;
  }
}
