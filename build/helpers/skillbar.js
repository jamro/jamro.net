module.exports = function(prop) {
  let now = (new Date()).getFullYear();
  let result = [];

  let from = this.from;
  let to = this.to ? this.to : now;
  let max = now - 2003;

  result['duration'] = to - from;
  result['percentage'] = Math.round(100 * result['duration']/max);

  return result[prop];
};
