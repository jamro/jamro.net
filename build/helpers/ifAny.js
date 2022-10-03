module.exports = function(v1, v2, v3, options) {
  if(v1 || v2 || v3) {
    return options.fn(this);
  }
  return options.inverse(this);
};
