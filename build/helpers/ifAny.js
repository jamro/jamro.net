module.exports = function(...args) {
  const values = args.slice(0, -1);
  const options = args[args.length - 1];

  if(values.some(v => !!v)) {
    return options.fn(this);
  }
  return options.inverse(this);
};
